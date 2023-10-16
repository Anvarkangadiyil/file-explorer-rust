


function SearchBar() {

return(
  
<nav className="navbar bg-body-tertiary navbar  " data-bs-theme="dark" style={{}} >
  <div className="container-fluid">
    <a className="navbar-brand text-white "><h2>Turbo<h1>X</h1>plorer</h2></a>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search File" aria-label="Search" />
      <button className="btn btn-outline-info" type="submit">Search</button>
    </form>
  </div>
</nav>

  );
}

export default  SearchBar;