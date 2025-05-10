'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/discount/stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">Admin Stats</h1>

        {stats ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">General Stats</h2>
              <p className="text-lg text-gray-600">Total Items: <span className="font-semibold">{stats.itemsCount}</span></p>
              <p className="text-lg text-gray-600">Total Purchase Amount: <span className="font-semibold">${stats.totalPurchaseAmount}</span></p>
              <p className="text-lg text-gray-600">Total Discount Given: <span className="font-semibold">${stats.totalDiscount}</span></p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Discount Codes</h2>
              <ul className="space-y-4">
                {stats.discountCodes.map((code: any, i: number) => (
                  <li key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100">
                    <span className="text-lg text-gray-800">{code.code}</span>
                    <span className={`px-4 py-1 text-sm rounded-full ${code.used ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {code.used ? 'Used' : 'Unused'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-600">Loading data...</p>
        )}
      </div>
    </div>
  );
}
