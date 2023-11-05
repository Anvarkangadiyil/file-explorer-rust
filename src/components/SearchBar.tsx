import { useNavigate } from "react-router-dom";
import { FaArrowLeft ,FaArrowRight } from "react-icons/fa";
import { useMyContext } from "../Context/globalPathContext";

export function SearchBar() {
  const navigate = useNavigate();

  const arrowButtonStyle=
    {
    border:"0",
    padding:"0",
    backgroundColor:"inherit",
    margin:"0 30px 0 30px"
    }
    

      const handleSubmit = async () => {
       
       }
     
  

  return (
    <nav
      className="navbar bg-body-tertiary "
      data-bs-theme="dark"
      
    >
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

        <a className="navbar-brand text-white ">
          <h2>
            Turbo<h1>X</h1>plorer
          </h2>
        </a>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder={useMyContext().globalState}
            aria-label="Search"
          />
          <button className="btn btn-outline-info" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default SearchBar;

