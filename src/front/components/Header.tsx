import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { navLinks } from "../data/navigation";

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
                src="/logo.webp"
                alt=""
                className="h-8 w-8 object-contain translate-y-0.5"
              />
              <span className="text-xl font-bold text-gray-900">
                株式会社テックリード
              </span>
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              30分無料相談
            </Link>
            <Link
              to="/engineers"
              className="text-gray-400 hover:text-gray-600 px-3 py-2 text-xs font-medium"
            >
              エンジニアの方へ
            </Link>
          </div>

          {/* ハンバーガーボタン（モバイルのみ） */}
          <div className="flex items-center lg:hidden">
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
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium text-center"
            >
              30分無料相談
            </Link>
            <Link
              to="/engineers"
              onClick={closeMobileMenu}
              className="block text-gray-400 hover:text-gray-600 px-3 py-2 text-sm font-medium"
            >
              エンジニアの方へ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
