import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          30days Essence
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/mypage" className="text-gray-600 font-600 hover:text-gray-900">
                My List
              </Link>
            </li>
            <li>
              <Link href="/mypage" className="text-gray-200 font-600 pointer-events-none">
                Template List
              </Link>
            </li>
            <li>
              <Link href="/mypage" className="text-gray-200 font-600 pointer-events-none">
                How to use
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 