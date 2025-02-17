import React from 'react';

export default function Timeline({ items }) {
  return (
    <div className="bg-white shadow rounded-md p-6 my-4">
      <h2 className="text-2xl font-bold mb-4">Timeline</h2>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="border-l-4 border-blue-500 pl-4">
            <div className="text-xl font-semibold">{item.title}</div>
            <div className="text-sm text-gray-500">{item.date}</div>
            <div className="mt-1">{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
