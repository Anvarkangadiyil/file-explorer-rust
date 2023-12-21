import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMyContext } from "../Context/globalPathContext";
import { invoke } from "@tauri-apps/api/tauri";

export function SearchBar() {
  const navigate = useNavigate();
  const context = useMyContext();

  //arrow icon style
  const arrowButtonStyle = {
    border: "0",
    padding: "0",
    backgroundColor: "inherit",
    margin: "0 30px 0 30px",
  };

  const [searchValue, setSearchValue] = useState(" ");
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSearching) {
      return;
    }

    document.documentElement.scrollTop = 0;

    const searchText = searchValue;

    if (searchText === " ") {
      return;
    }

    try {
      setIsSearching(true);
      context.setGlobalSearchState(
        await invoke("search_function", {
          path: context.globalState,
          searchInp: searchText.trim(),
        })
      );
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsSearching(false);
      navigate("Slist");
    }
  };

  return (
    <nav className="navbar bg-body-tertiary fixed-top " data-bs-theme="dark">
      <div className="container-fluid">
        <div>
          <button
            style={arrowButtonStyle}
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowLeft />
          </button>
          <button
            style={arrowButtonStyle}
            onClick={() => {
              navigate(+1);
            }}
          >
            <FaArrowRight />
          </button>
        </div>

        <a className="navbar-brand text-white">
          <h2>
            Turbo
            <span className="fade">X</span>
            plorer
          </h2>
        </a>
        <form
          className="d-flex"
          role="search"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder={context.globalState}
            aria-label="Search"
            onChange={(event) => {
              handleChange(event);
            }}
            id="search-inp"
          />
          <button
            className="btn btn-outline-info"
            type="submit"
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </nav>
  );
}

export default SearchBar;
