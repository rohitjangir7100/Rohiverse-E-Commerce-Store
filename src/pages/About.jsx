export default function About() {
  return (
    <div className="p-8 bg-gray-950 text-lime-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">About Rohiverse</h1>

      <p className="mb-4">
        <strong>Rohiverse</strong> is a modern e-commerce platform crafted with
        passion and precision — built entirely by{" "}
        <span className="text-lime-400 font-semibold">Rohit Jangir</span>. From
        idea 💡 to code 💻 to deployment 🚀, every line, every pixel, and every
        interaction has been designed and developed by me.
      </p>

      <p className="mb-4">
        I started Rohiverse with a vision: to create a sleek, fast, and
        delightful shopping experience that empowers users and keeps them coming
        back. Whether you're browsing products, managing your cart, or tracking
        your orders — everything is optimized for speed, usability, and
        satisfaction.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Who Am I?</h2>
      <ul className="list-disc pl-6 mb-4">
        <img
          src="/rohit-avatar.jpg"
          alt="Rohit Jangir"
          className="w-32 h-32 rounded-full object-cover mb-6"
        />
        <li>
          👨‍💻 <strong>Rohit Jangir</strong> — Developer, Designer & Founder
        </li>
        <li>
          🛠️ React, Firebase, TailwindCSS, and modern web tools enthusiast
        </li>
        <li>🧠 Driven by UX, performance, and clean design principles</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Why Choose Rohiverse?
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>⚡ Lightning-fast performance & responsive across all devices</li>
        <li>🎯 User-first design and seamless navigation</li>
        <li>🔒 Secure logins, smart checkout, and real-time data sync</li>
        <li>💬 Actively maintained and constantly improved by me</li>
      </ul>

      <p className="mb-4">
        Rohiverse is more than just a store — it's a passion project. I care
        deeply about every visitor and every click. Thank you for being a part
        of this journey!
      </p>

      <p className="mt-6 text-sm text-gray-400">
        For feedback, collaborations, or support, feel free to reach out at{" "}
        <a
          href="mailto:rohitjangir7100@gmail.com"
          className="text-lime-400 hover:underline">
          rohitjangir7100@gmail.com
        </a>
      </p>
    </div>
  );
}
