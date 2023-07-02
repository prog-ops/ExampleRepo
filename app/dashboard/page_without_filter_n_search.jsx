'use client'

import {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {CategoryScale, } from 'chart.js';
import Chart from 'chart.js/auto';
import axios from "axios";
Chart.register(CategoryScale);

export default function Page() {
  const [products, setProducts] = useState([]);

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
    products.forEach((product) => {
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
  const chartData = {
    labels: Object.keys(countProductsByCategory()),
    datasets: [
      {
        label: 'Count of Products by Category',
        data: Object.values(countProductsByCategory()),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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

  console.log('Dashboard')
  return <div className='mt-20'>
    <h1>Dashboard Overview</h1>
    <div>
      <h2>Average Rating: {calculateAverageRating()}</h2>
    </div>
    <div>
      <Bar data={chartData} />
    </div>
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
        {products.map((product, index) => (
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
