import { useState } from "react";
import { Product } from "../types";
import { supabaseClientInstance } from "../lib/supabaseClient";

const productItem: Product = {
  name: "",
  price: 0,
  reason: "",
  appeal: "",
  link: "",
  id: "",
  created_at: new Date().toISOString(),
  purchased: false,
};

export default function AddProductForm({ onAdd }: { onAdd: () => void }) {
  const [item, setItem] = useState(productItem);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabaseClientInstance
      .from("item")
      .insert([
        {
          name: item.name,
          price: item.price,
          reason: item.reason,
          appeal: item.appeal,
          link: item.link,
          created_at: new Date(),
        },
      ]);

    if (error) {
      console.error("データの追加に失敗しました:", error.message);
    } else {
      setItem(productItem); // フォームをリセット
      onAdd(); // 成功時のみ呼ぶ
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">新しい商品を追加</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              商品名 *
            </label>
            <input
              id="name"
              type="text"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              価格 (円) *
            </label>
            <input
              id="price"
              type="number"
              value={item.price === 0 ? '' : item.price}
              onChange={(e) => {
                const value = e.target.value;
            
                // 数字以外の入力をブロック（空文字は許容）
                if (/^\d*$/.test(value)) {
                  setItem({ ...item, price: value === '' ? 0 : Number(value) });
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              欲しい理由・なぜ必要なのか *
            </label>
            <textarea
              id="reason"
              value={item.reason}
              onChange={(e) => setItem({ ...item, reason: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="appeal" className="block text-sm font-medium text-gray-700 mb-1">
              商品の魅力・こだわり *
            </label>
            <textarea
              id="appeal"
              value={item.appeal}
              onChange={(e) => setItem({ ...item, appeal: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              商品リンク *
            </label>
            <input
              id="link"
              type="url"
              value={item.link}
              onChange={(e) => setItem({ ...item, link: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "追加中..." : "30日間考える"}
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            追加した商品は30日間購入できません
          </p>
        </div>
      </form>
    </div>
  );
}
