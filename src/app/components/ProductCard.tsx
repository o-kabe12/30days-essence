import { useState } from "react";
import { supabaseClientInstance } from "../lib/supabaseClient";

type Product = {
  id: string;
  name: string;
  price: number;
  reason: string;
  appeal: string;
  created_at: string;
  link: string;
  purchased?: boolean;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // 追加日を日付形式で表示
  const formattedDate = new Date(product.created_at).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const now = new Date();
  const addedDate = new Date(product.created_at);
  const daysPassed = Math.floor((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePurchase = async () => {
    await supabaseClientInstance
      .from("item")
      .update({ purchased: true })
      .eq("id", product.id);
    setIsPurchasing(false);
    closeModal();
    window.location.href = product.link;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <span className="text-gray-600 text-lg font-bold">¥{product.price.toLocaleString()}</span>
        </div>
        <div className="space-y-3 mb-4 flex-1">
          <div>
            <h4 className="text-sm font-medium text-gray-500">理由</h4>
            <p className="text-gray-700">{product.reason}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">魅力・こだわり</h4>
            <p className="text-gray-700">{product.appeal}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">追加日</h4>
            <p className="text-gray-700">{formattedDate}</p>
          </div>
        </div>
        {product.purchased ? (
          <span className="w-fit px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-sm">
            購入済み
          </span>
        ) : !product.purchased && daysPassed >= 30 ? (
          <div className="flex justify-between items-center mt-auto">
            <button
              onClick={openModal}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:opacity-70 text-sm"
            >
              購入する
            </button>
            <span className="px-3 py-1 bg-green-100 text-gray-500 rounded-md text-sm">
              購入可能
            </span>
          </div>
        ) : (
          <span className="w-fit px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm">
            購入待ち
          </span>
        )}
      </div>
      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-lg p-8 shadow-lg z-10 w-full max-w-xs mx-auto flex flex-col items-center">
            <p className="mb-6 text-gray-800 text-center">本当に購入しますか？</p>
            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                isPurchasing
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isPurchasing ? "購入中..." : "購入する"}
            </button>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}