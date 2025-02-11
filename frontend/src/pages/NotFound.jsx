import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center">
      {/* Animated Image */}
      <motion.img
        src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-12870.jpg?t=st=1739296089~exp=1739299689~hmac=d317114a1a5afaa66488375077f447015f7642c5dec1014977f7579c2a4a1756&w=740"
        alt="404 Not Found"
        className="w-72 md:w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Animated Text */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Oops! Page Not Found
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
