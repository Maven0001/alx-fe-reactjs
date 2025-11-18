import axios from "axios";
import { useState } from "react";

function UserSearch() {
  const [search, setSearch] = useState(""); // Input value
  const [user, setUser] = useState(null); // API result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Trigger search when button is clicked
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${search.trim()}`
      );
      setUser(response.data); // Save user data
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "Looks like we cant find the user"
          : "Looks like we cant find the user"
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 ml-20 max-w-2xl">
      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for a GitHub username..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {user && (
        <div className="bg-white border rounded-lg p-6 shadow-lg flex items-center gap-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
            <p className="text-gray-600">@{user.login}</p>
            {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
            <div className="mt-3 flex gap-6 text-sm">
              <span>
                <strong>{user.public_repos}</strong> Repos
              </span>
              <span>
                <strong>{user.followers}</strong> Followers
              </span>
              <span>
                <strong>{user.following}</strong> Following
              </span>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
