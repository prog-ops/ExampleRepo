'use client'

import {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {CategoryScale, } from 'chart.js';
import Chart from 'chart.js/auto';
import axios from "axios";
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
      const { category } = product;
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

  // Table columns
  const tableColumns = [
    'Title',
    'Description',
    'Price',
    'Category',
    'Brand',
    'Stock',
    'Thumbnail',
  ];

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
    <h1>Dashboard Overview</h1>

    {/* Filters */}
    <div>
      <h2>Filters</h2>
      <div>
        <label>
          Category:
          <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
          >
            <option value="">All</option>
            {/* Add available categories dynamically */}
            {Array.from(new Set(products.map((product) => product.category))).map(
                (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                )
            )}
          </select>
        </label>
      </div>
      <div>
        <label>
          Brand:
          <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
          >
            <option value="">All</option>
            {/* Add available brands dynamically */}
            {Array.from(new Set(products.map((product) => product.brand))).map(
                (brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                )
            )}
          </select>
        </label>
      </div>
    </div>

    {/* Search */}
    <div>
      <h2>Search</h2>
      <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
      />
    </div>

    {/* Key Metrics */}
    <div>
      <h2>Average Rating: {calculateAverageRating()}</h2>
    </div>

    {/* Chart */}
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
    {/*<div>
      <Bar data={chartData} />
    </div>*/}

    {/* Product Table */}
    <div>
      <h2>Product Table</h2>
      <table>
        <thead>
        <tr>
          {tableColumns.map((column) => (
              <th key={column}>{column}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.stock}</td>
              <td>
                <img src={product.thumbnail} alt={product.title} />
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div>
}
