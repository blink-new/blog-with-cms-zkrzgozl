
export default function Footer() {
  return (
    <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}