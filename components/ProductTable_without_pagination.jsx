'use client'

import React from 'react';

export default function ProductTable({products}) {
  const tableColumns = [
    'Title',
    'Description',
    'Price',
    'Category',
    'Brand',
    'Stock',
    'Thumbnail',
  ];

  return (
      <table className="w-full bg-gray-900 rounded-2xl">
        <thead>
        <tr>
          {tableColumns.map((column) => (
              <th key={column}
                  // className="px-6 py-3 text-left"
                  className="px-6 py-3 text-left bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
              >
                {column}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
            <tr key={index}
                className="border-t border-gray-100 hover:bg-gray-700 hover:transform hover:scale-105 transition-transform">
              <td className="px-6 py-4 whitespace-normal">{product.title}</td>
              <td className="px-6 py-4 whitespace-normal">{product.description}</td>
              <td className="px-6 py-4 whitespace-normal">Rp {product.price}</td>
              <td className="px-6 py-4 whitespace-normal">{product.category}</td>
              <td className="px-6 py-4 whitespace-normal">{product.brand}</td>
              <td className="px-6 py-4 whitespace-normal">{product.stock}</td>
              <td>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain rounded-lg"
                    // className="w-12 h-12 object-contain rounded-lg"
                />
              </td>
            </tr>
        ))}
        </tbody>
      </table>
  );
}
