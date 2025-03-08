import React, { useState } from "react";
import styles from "./searchBar.module.css"; // Import CSS module

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {

  const [input, setInput] = React.useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission default behavior
      console.log(input);
      handleSearch(input);
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.searchBar}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchBar