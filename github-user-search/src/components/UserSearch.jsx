import axios from "axios";
import { useEffect, useState } from "react";

function UserSearch() {
  const [search, setSearch] = useState("");

  function handleUserSearch(event) {
    setSearch(event.target.value);
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
      <form action="">
        <input
          value={search}
          type="text"
          placeholder="Search for a username"
          onChange={handleUserSearch}
          className="border-2 border-black m-10 p-2 w-400 rounded-lg placeholder: text-gray-400 text-base  value: text-black"
        />
      </form>
      <p>Search:{search}</p>
    </>
  );
}

export default UserSearch;
