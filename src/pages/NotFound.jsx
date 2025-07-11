import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-lime-100 p-4">
      <div className="text-6xl mb-4 animate-pulse">404</div>
      <p className="text-xl mb-6">Hmm… looks like you’re lost.</p>
      <Link
        to="/"
        className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-4 py-2 rounded-lg">
        Go Home
      </Link>
    </div>
  );
}
