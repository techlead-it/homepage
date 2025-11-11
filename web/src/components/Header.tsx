import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ロゴ */}
          <div className="flex">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="株式会社テックリード"
                className="h-8 w-8 object-contain translate-y-0.5"
              />
              <span className="text-xl font-bold text-gray-900">
                株式会社テックリード
              </span>
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              トップ
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              会社概要
            </Link>
            <Link
              to="/introduction"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              会社説明
            </Link>
            <Link
              to="/contact"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              お問い合わせ
            </Link>
          </div>

          {/* ハンバーガーボタン（モバイルのみ） */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="メインメニュー"
            >
              {mobileMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* モバイルメニューパネル */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
            >
              トップ
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
            >
              会社概要
            </Link>
            <Link
              to="/introduction"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
            >
              会社説明
            </Link>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium text-center"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
