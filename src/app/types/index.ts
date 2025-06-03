export interface Product {
  id: string;
  name: string;
  price: number;
  reason: string;
  appeal: string;
  created_at: string;
  link: string;
  purchased?: boolean;
}

export const canPurchase = (product: Product): boolean => {
  if (product.purchased) return false;
  
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const now = new Date();
  const addedDate = new Date(product.created_at);
  
  return now.getTime() - addedDate.getTime() >= thirtyDaysInMs;
};