import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import { FaArrowUp } from "react-icons/fa";
import { useMyContext } from "../context/globalPathContext";
import { desktopDir } from "@tauri-apps/api/path";

const desktopPath = await desktopDir();

function AppLayout() {
  const [visible, setVisible] = useState("none");
  const OutletRef = useRef<HTMLDivElement | null>(null);
  const scrollButtonRef = useRef<HTMLButtonElement | null>(null);

  // for setting the initial list as desktop
  const navigate = useNavigate();
  const context = useMyContext();
  useEffect(() => {
    context.setGlobalState(desktopPath);
    navigate("List");
  }, []);

  function scrollFunction() {
    const List = OutletRef.current;
    const scrollTop = List?.scrollTop || 0;

    if (scrollTop > 20) {
      setVisible("block");
    } else {
      setVisible("none");
    }
  }

  function topFunction() {
    const List = OutletRef.current;
    if (List) {
      List.scrollTop = 0;
    }
  }

  useEffect(() => {
    const List = OutletRef.current;
    const scrollButton = scrollButtonRef.current;

    if (List) {
      List.addEventListener("scroll", scrollFunction);
    }

    if (scrollButton) {
      scrollButton.addEventListener("click", topFunction);
    }

    return () => {
      // Clean up event listeners
      if (List) {
        List.removeEventListener("scroll", scrollFunction);
      }
      if (scrollButton) {
        scrollButton.removeEventListener("click", topFunction);
      }
    };
  }, []);

  useEffect(() => {
    const List = OutletRef.current;
    if (List) {
      List.scrollTop = 0;
    }
  }, [useMyContext().globalState]);

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
            overflowY: "auto",
            overflowX:"auto",
            scrollBehavior: "smooth",
          }}
          className="table-container"
          ref={OutletRef}
        >
          <Outlet />
          <button id="myBtn" style={{ display: visible }} ref={scrollButtonRef}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
