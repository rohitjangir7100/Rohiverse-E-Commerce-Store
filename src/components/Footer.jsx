import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-lime-100 py-10 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* ✅ Brand & About */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/logo-footer.png"
              alt="Rohiverse Logo"
              className="w-20 h-20 object-contain"
              loading="lazy"
            />
            {/* <span className="text-xl font-bold text-lime-400 tracking-wide">
              Rohiverse
            </span> */}
          </div>
          <p className="text-gray-300 leading-relaxed">
            Your one-stop shop for tech, fashion, and lifestyle. Futuristic
            experience, now in your pocket.
          </p>
        </div>

        {/* 🔗 Navigation Links */}
        <div>
          <h3 className="text-lime-400 font-semibold text-lg mb-3">
            Navigation
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 📄 Legal */}
        <div>
          <h3 className="text-lime-400 font-semibold text-lg mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lime-400 font-semibold text-lg mb-3">
            Contact & Support
          </h3>
          <p className="mb-2">
            📧{" "}
            <a
              href="mailto:rohitjangir7100@gmail.com"
              className="hover:underline text-gray-300">
              rohitjangir7100@gmail.com
            </a>
          </p>
          <p className="mb-4">
            📞{" "}
            <a
              href="tel:+919571005964"
              className="hover:underline text-gray-300">
              +91 9571005964
            </a>
          </p>

          {/* 🌐 Social */}
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
              className="text-gray-400 hover:text-[#1D9BF0] transition duration-300 ease-in-out transform hover:scale-110">
              <i className="fa-brands fa-x-twitter"></i>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="text-gray-400 hover:text-[#1877F2] transition duration-300 ease-in-out transform hover:scale-110">
              <i className="fa-brands fa-facebook"></i>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="text-gray-400 hover:text-[#E4405F] transition duration-300 ease-in-out transform hover:scale-110">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="https://github.com/rohitjangir7100"
              target="_blank"
              rel="noopener  noreferrer"
              title="GitHub"
              className="text-gray-400 hover:text-[#6e5494] transition duration-300 ease-in-out transform hover:scale-110">
              <i className="fa-brands fa-github"></i>
            </a>

            <a
              href="https://linkedin.com/in/rohit7100"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="text-gray-400 hover:text-[#0A66C2] transition duration-300 ease-in-out transform hover:scale-110">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* ⬇️ Bottom Bar */}
      <div className="text-center mt-10 text-gray-500 text-xs border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} Rohiverse. All rights reserved.
        <br />
        Built with ❤️ by <span className="text-lime-400">Rohit Jangir</span>
      </div>
    </footer>
  );
}
