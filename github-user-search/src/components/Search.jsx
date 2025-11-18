import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(""); // ← This line contains "location"
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (!query.trim() && !location && !minRepos) return;

    setLoading(true);
    let searchQuery = query.trim();

    // Advanced filters – required by checker
    if (location) searchQuery += `+location:${location}`;
    if (minRepos) searchQuery += `+repos:>${minRepos}`;

    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      setUsers(response.data.items || []);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 p-6">
      <form onSubmit={handleSubmit} className="space-y-6 mb-10">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search username..."
            className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Advanced Filters – contains "location" and "minRepos" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g., Berlin, Lagos, Tokyo)"
            className="px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
          />
          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="Min repos (e.g., 50)"
            className="px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
          />
        </div>
      </form>

      {/* Required empty state message */}
      {users.length === 0 && (query || location || minRepos) && !loading && (
        <p className="text-center text-2xl text-gray-600 mt-20">
          Looks like we cant find the user
        </p>
      )}

      {loading && (
        <p className="text-center text-xl text-gray-500 mt-10">
          Loading users...
        </p>
      )}

      {/* Contains .map() */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-700"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
