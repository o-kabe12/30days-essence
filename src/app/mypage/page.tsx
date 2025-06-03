'use client';

import { useEffect, useState} from 'react';
import { Product} from '../types';
import { supabaseClientInstance } from "../lib/supabaseClient";
import ProductCard from '../components/ProductCard';

export default function MyPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'waiting' | 'eligible' | 'purchased'>('all');

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabaseClientInstance
        .from('item')
        .select('*');

      if (error) {
        console.error('ユーザーデータの取得エラー:', error);
        return;
      }
      
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('データ取得中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const now = new Date();
    const addedDate = new Date(product.created_at);
    const daysPassed = Math.floor((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (filter) {
      case 'waiting':
        return !product.purchased && daysPassed < 30;
      case 'eligible':
        return !product.purchased && daysPassed >= 30;
      case 'purchased':
        return product.purchased;
      default:
        return true;
    }
  });

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">マイリスト</h1>
          <p className="text-gray-600">
            あなたが追加した商品のリストです。30日間の熟考プロセスを経て、本当に必要なものだけを購入しましょう。
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              すべて ({products.length})
            </button>
            <button
              onClick={() => setFilter('waiting')}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                filter === 'waiting'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              待機中
            </button>
            <button
              onClick={() => setFilter('eligible')}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                filter === 'eligible'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              購入可能
            </button>
            <button
              onClick={() => setFilter('purchased')}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                filter === 'purchased'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              購入済み
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">
              商品がありません
            </p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                すべての商品を表示
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
