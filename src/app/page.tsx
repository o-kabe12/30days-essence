'use client';

import { useState } from 'react';
import AddProductForm from './components/AddProductForm';

export default function Home() {
  const [recentlyAdded, setRecentlyAdded] = useState(false);

  const handleProductAdded = () => {
    setRecentlyAdded(true);
    setTimeout(() => setRecentlyAdded(false), 3000);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 line-height-1.5">
            30days Essence
            <br className='md:hidden'/>
            （30日間で見極めた本質）
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            欲しいものを30日間考え抜いた後で、本当に必要なものだけを手に入れる
          </p>
        </div>

        {recentlyAdded && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
            商品が追加されました。30日後に購入の検討ができます。
          </div>
        )}

        <AddProductForm onAdd={handleProductAdded} />
        
        <div className="mt-8 bg-indigo-50 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">エクストリームミニマリストへの道</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>欲しいものを追加して、30日間冷静に考えてみましょう</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>30日後、その商品が本当に必要かどうか再確認できます</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>本当に必要なものだけを手に入れ、ミニマリストとしての生活を実現しましょう</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
