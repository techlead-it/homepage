import { Link } from "react-router-dom";
import { companyInfo } from "../data/company";
import { navLinks } from "../data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="text-gray-300 hover:text-white">
            30分無料相談
          </Link>
          <Link to="/slides" className="text-gray-300 hover:text-white">
            研修・資料
          </Link>
          <Link to="/engineers" className="text-gray-300 hover:text-white">
            エンジニアの方へ
          </Link>
          <a
            href="https://zenn.dev/p/techlead"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            技術ブログ (zenn)
          </a>
        </div>
        <div className="text-center text-gray-400 text-sm space-y-1">
          <p>{companyInfo.name}</p>
          <p>
            〒{companyInfo.address.postalCode} {companyInfo.address.prefecture}
            {companyInfo.address.city}
            {companyInfo.address.street} {companyInfo.address.building}
          </p>
          <p className="pt-2">
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
