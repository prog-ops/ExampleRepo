'use client'

import {useEffect, useState} from "react";
import {Bar, } from "react-chartjs-2";
import {CategoryScale,} from 'chart.js';
import Chart from 'chart.js/auto';
import axios from "axios";
import ProductTable from "@/components/ProductTable";
import ProductFilter from "@/components/ProductFilter";
import SearchBar from "@/components/ProductSearchBar";

Chart.register(CategoryScale);

export default function Page() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  /*
  Fetching
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products')
        setProducts(response.data.products)
      } catch (e) {
        console.error('Error fetching data: ', e)
      }
    }
    fetchData()
  }, [])

  /*
  Filtering and Searching
   */
  useEffect(() => {
    // Apply filters and search query
    const applyFiltersAndSearch = () => {
      let filteredData = products;

      // Apply category filter
      if (filters.category !== '') {
        filteredData = filteredData.filter(
            (product) => product.category === filters.category
        );
      }

      // Apply brand filter
      if (filters.brand !== '') {
        filteredData = filteredData.filter(
            (product) => product.brand === filters.brand
        );
      }

      // Apply search query
      if (searchQuery !== '') {
        filteredData = filteredData.filter(
            (product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filteredData);
    };

    applyFiltersAndSearch();
  }, [products, filters, searchQuery]);

  // Calculate average rating
  const calculateAverageRating = () => {
    const totalRatings = products.reduce(
        (sum, product) => sum + product.rating,
        0
    );
    return (totalRatings / products.length).toFixed(2);
  };

  // Count products by category for chart
  const countProductsByCategory = () => {
    const categoryCount = {};
    filteredProducts.forEach((product) => {
      const {category} = product;
      if (categoryCount[category]) {
        categoryCount[category]++;
      } else {
        categoryCount[category] = 1;
      }
    });
    return categoryCount;
  };

  // Prepare chart data
  const categoryColors = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    // Add more colors if needed
  ];

  const chartData = {
    labels: Object.keys(countProductsByCategory()),
    datasets: [
      {
        label: 'Count of Products by Category',
        data: Object.values(countProductsByCategory()),
        // backgroundColor: 'rgba(75, 192, 192, 0.6)',
        backgroundColor: categoryColors.slice(0, Object.keys(countProductsByCategory()).length),
      },
    ],
  };

  // Handle filter changes
  const handleFilterChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.value,
    }));
  };

  // Handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Custom scale configuration
  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.5, // Customize the step size as needed
        },
      },
    },
  };

  // console.log('Dashboard')

  return <div className='mt-20'>
    <h1 className='text-5xl font-semibold'>Dashboard Overview</h1>

    <div className='flex justify-between'>
      {/* Search */}
      <SearchBar value={searchQuery} onChange={handleSearchQueryChange}/>
      {/* Filters */}
      <ProductFilter
          products={products}
          filters={filters}
          onFilterChange={handleFilterChange}/>
    </div>

    <h1 className='text-4xl mt-8'>Product Chart</h1>
    {/* Key Metrics */}
    <div>
      <h2 className='mt-4'>Average Rating: {calculateAverageRating()}</h2>
    </div>

    {/* Chart */}
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions}/>
    </div>
    {/*<div>
      <Bar data={chartData} />
    </div>*/}

    {/* Product Table */}
    <div>
      <h1 className='text-4xl mt-8 mb-4'>Product Table</h1>
      <ProductTable products={filteredProducts} itemsPerPage={10}/>
    </div>
  </div>
}
