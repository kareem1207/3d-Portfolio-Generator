import { useState } from "react";

const MongoDBConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/test-connection", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setConnectionStatus(data);
      } else {
        setError(data.error || "Failed to connect to database");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 mt-4">
      <h3 className="text-lg font-semibold mb-2">MongoDB Connection Test</h3>

      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Testing..." : "Test MongoDB Connection"}
      </button>

      {connectionStatus && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-200 rounded">
          <p className="text-green-700 dark:text-green-300">
            {connectionStatus.message}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-200 rounded">
          <p className="text-red-700 dark:text-red-300">Error: {error}</p>
        </div>
      )}

      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Make sure you've added your MongoDB connection string to your
          .env.local file:
        </p>
        <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-sm overflow-x-auto">
          MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolioApp
        </pre>
      </div>
    </div>
  );
};

export default MongoDBConnectionTest;
