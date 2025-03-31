import { FC, useState, KeyboardEvent } from "react";
import styles from "./SearchBar.module.css"; // Import CSS module

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {

  const [input, setInput] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission default behavior
      console.log(input);
      handleSearch(input);
      setInput("");
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
      </form>
    </div>
  )
}

export default SearchBar