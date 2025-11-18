import axios from "axios";
import { useEffect, useState } from "react";

function UserSearch() {
  const [search, setSearch] = useState("");

  function handleUserSearch(event) {
    setSearch(event.target.value);
  }

  function handleSearchResult(e) {
    setSearch(e.target.value);
    e.preventDefault();
  }

  const searchResults = async () => {
    await axios
      .get("https://api.github.com/users/{username}")
      .then((response) => {
        setSearch();
      });
  };

  useEffect(() => {
    searchResults();
  }, []);

  return (
    <>
      <div className=" mt-20 ml-20 mb-5 flex gap-2 border-3 border-black">
        <form action="">
          <input
            value={search}
            type="text"
            placeholder="Search for a username"
            onChange={handleUserSearch}
            className="m-auto border-2 border-black m-10 p-2 w-400 rounded-lg placeholder: text-gray-400 text-base  value: text-black"
          />
        </form>
        <button
          onSubmit={handleSearchResult}
          className="border-2 p-2 w-400 rounded-lg bg-blue-800 text-white mt-0"
        >
          Search
        </button>
      </div>
      <p>Search:{search}</p>
    </>
  );
}

export default UserSearch;
