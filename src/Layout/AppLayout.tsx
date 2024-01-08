
import { Outlet } from "react-router-dom";


import { useState } from "react";

import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import { FaArrowUp } from "react-icons/fa";



function AppLayout() {
 

  

  const [visible, setVisible] = useState("none");



  //scroll top button fuctions
  let scrollButton: HTMLElement | null = document.getElementById("myBtn");

  if (scrollButton) {
    scrollButton.addEventListener("click", topFunction);
  }

  function topFunction() {
    if (document.body) {
      document.body.scrollTop = 0;
    }
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
  }

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      (document.documentElement ? document.documentElement.scrollTop : 0) > 20
    ) {
      if (scrollButton) {
        setVisible("block");
      }
    } else {
      if (scrollButton) {
        setVisible("none");
      }
    }
  }



  return (
    <>
      <SearchBar />

      <div
        style={{
          display: "flex",
          height: "100%",
          minHeight: "89.9vh",
          marginTop: "5em",
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <SideBar />

        <div
          style={{
            marginLeft: "13em",
            width: "100vw",
            height: "inherit",
          }}
        >
          <Outlet />
          <button id="myBtn" style={{ display: visible }}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </>
  );
}
export default AppLayout;
