import { useState } from "react";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks, we'll be in touch soon!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-8 bg-gray-950 text-lime-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-lime-400">📬 Contact Us</h1>
      <div className="md:flex gap-8">
        {/* 📥 Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                setForm({ ...form, message: form.message + "\n" });
              }
            }}
            placeholder="Your message..."
            className="w-full px-4 py-2 bg-gray-800 rounded h-32"
            required
          />
          <button
            type="submit"
            className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-6 py-2 rounded">
            Send Message
          </button>
        </form>

        {/* 📍 Contact Details */}
        <div className="flex-1 space-y-4 mt-10 md:mt-0">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-6 h-6 text-lime-400" /> 123 Rohiverse St,
            Jaipur, India
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-6 h-6 text-lime-400" />{" "}
            <a
              href="tel:+919571005964"
              className="text-lime-400 hover:text-lime-300 hover:underline transition-colors">
              +91 9571005964
            </a>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-6 h-6 text-lime-400" />
            <a
              href="mailto:rohitjangir7100@gmail.com"
              className="text-lime-400 hover:text-lime-300 hover:underline transition-colors">
              rohitjangir7100@gmail.com
            </a>
          </div>

          {/* 🗺️ Map */}
          <div className="mt-6">
            <iframe
              src="https://maps.google.com/maps?q=Jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-48 rounded"
              loading="lazy"
              title="Our Location"
            />
          </div>

          {/* 🌐 Social Icons */}
          <div className="mt-6 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="text-gray-300 hover:text-blue-500 transition-transform hover:scale-110">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
              className="text-gray-300 hover:text-[#1D9BF0] transition-transform hover:scale-110">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="text-gray-300 hover:text-pink-500 transition-transform hover:scale-110">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="text-gray-300 hover:text-white transition-transform hover:scale-110">
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="text-gray-300 hover:text-blue-300 transition-transform hover:scale-110">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
// This Contact page provides a form for users to send messages, along with contact details and a map.
// It includes a responsive layout with a form on one side and contact details on the other.