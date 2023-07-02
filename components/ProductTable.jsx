'use client'

import React, {useState} from 'react';

export default function ProductTable({products, itemsPerPage}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const tableColumns = [
    'Title',
    'Description',
    'Price',
    'Category',
    'Brand',
    'Stock',
    'Thumbnail',
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
      <div>
        <table className="w-full bg-gray-900 rounded-2xl">
          <thead>
          <tr>
            {tableColumns.map((column) => (
                <th key={column}
                    // className="px-6 py-3 text-left"
                    className="px-6 py-3 text-left bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-gray-400">
                  {column}
                </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {currentProducts.map((product, index) => (
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
        {/* Pagination */}
        <div className='flex items-center justify-center'>
          {Array.from({length: totalPages}, (_, index) => index + 1).map(
              (page) => (
                  <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={page === currentPage}
                      className='bg-cyan-900 p-2 mt-4 mx-2 rounded-lg'
                  >
                    {page}
                  </button>
              )
          )}
        </div>
      </div>
  );
}
