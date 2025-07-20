import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-sky-500 mb-2">404</h1>
      <p className="text-gray-600 text-lg mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        to={-1}
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full text-sm shadow transition duration-200"
      >
        Go Back
      </Link>
    </div>
  );
};

export default PageNotFound;
