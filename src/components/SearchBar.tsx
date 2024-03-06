import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMyContext } from "../context/globalPathContext";
import { invoke } from "@tauri-apps/api/tauri";
import { extractLastWord } from "./functions/Function";
import { Tooltip } from 'react-tooltip';
import { dialog } from "@tauri-apps/api";
import { FileDetailModel } from "../model/model";



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

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchText = searchValue;

    if (searchText.length == 0) {
      return;
    }

    if (isSearching) {
      return;
    }

    document.documentElement.scrollTop = 0;

    try {
      setIsSearching(true);
      let searchResultList:FileDetailModel[] = await invoke("search_function", {
        path: context.globalState,
        searchInp: searchText.trim(),
      });
      if (searchResultList.length == 0) {
        await dialog.message(searchText+" is not found",{title:"Message",type:"error"});
      } else {
        context.setGlobalSearchState(searchResultList);
        navigate("Slist");
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsSearching(false);
    }
  };

  //const rotateIconStyle = {
  //  display: 'inline-block',
  //  animation: isSearching ? 'rotate 1s infinite' : 'none',
  //};

  return (
    <nav
      className="navbar bg-body-tertiary fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div>
          <button
            style={arrowButtonStyle}
            onClick={async () => {
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

        <a className="navbar-brand mx-auto text-white">
          <h2>
            Turbo
            <span className="fade fs-1">X</span>
            plorer
          </h2>
        </a>
        <form
  className="d-flex custom-search-form"
  role="search"
  onSubmit={(event) => {
    handleSubmit(event);
  }}
>
  <input
    className="form-control me-2 custom-search-input"
    type="search"
    placeholder={"Search " + extractLastWord(context.globalState)}
    aria-label="Search"
    onChange={(event) => {
      handleChange(event);
    }}
    id="search-inp"
  />
  
  <button
    className="btn btn-outline-info custom-search-button"
    type="submit"
    disabled={isSearching}
    data-tooltip-id="search-tooltip" 
    data-tooltip-content="Search button"
    data-tooltip-variant="info"
    
  >
    {isSearching !== true ? (
      <span className="fs-6">🔍</span>
    ) : (
      <span
        className="spinner-border spinner-border-sm text-light "
        role="status"
        aria-hidden="true"
      ></span>
    )}
  </button>
  <Tooltip id="search-tooltip" place="top-start"/>
  
   </form>

      </div>
    </nav>
  );
}

//<span style={rotateIconStyle}>🔍</span>
export default SearchBar;
