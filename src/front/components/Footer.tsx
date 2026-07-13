export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-gray-400 text-sm text-center">
          &copy; {currentYear} 株式会社テックリード. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
