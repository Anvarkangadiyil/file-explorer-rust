import { Menu, MenuItem, Sidebar, menuClasses } from "react-pro-sidebar";
import SearchBar from "../components/SearchBar";
import { Link, Outlet } from "react-router-dom";
import {
  FaDownload,
  FaDesktop,
  FaFile,
  FaVideo,
  FaMusic,
  FaImages,
  FaArrowUp,
} from "react-icons/fa";
import Drive from "../components/Drive";
import {
  audioDir,
  desktopDir,
  documentDir,
  downloadDir,
  pictureDir,
  videoDir,
} from "@tauri-apps/api/path";
import { useMyContext } from "../context/globalPathContext";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";

interface Volume {
  name: string;
  mountpoint: string;
  available_gb: number;
  used_gb: number;
  total_gb: number;
}

const desktopPath = await desktopDir();
const downloadPath = await downloadDir();
const documentPath = await documentDir();
const picturePath = await pictureDir();
const musicPath = await audioDir();
const videoPath = await videoDir();

function AppLayout() {
  const context = useMyContext();

  const [volumes, setVolumes] = useState<Volume[]>([]);

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

  function handlePath(path: string) {
    context.setGlobalState(path);
    document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
    const getVolume = async () => {
      let volumeValue = await invoke<Volume[]>("get_volume");
      setVolumes(volumeValue);
    };

    getVolume();
  }, [context.globalState]);

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
        onContextMenu={(e)=>{e.preventDefault()}}
      >
        <Sidebar
          backgroundColor="#212529"
          width="210px"
          style={{ position: "fixed", height: "100%", minHeight: "89.9vh" ,borderColor:"#555"}}
        >
          <div className="sidebar-heading mt-3 mb-3">Quick Access</div>
          <Menu
            rootStyles={{
              ["." + menuClasses.button]: {
                color: "white",
                "&:hover": {
                  backgroundColor: "#0dcaf0",
                  color: "#212529",
                },
              },
            }}
          >
            <MenuItem
              icon={<FaDesktop />}
              component={<Link to={"List"} />}
              onClick={() => {
                handlePath(desktopPath);
              }}
            >
              Desktop
            </MenuItem>
            <MenuItem
              icon={<FaDownload />}
              component={<Link to={"List"} />}
              onClick={() => {
                handlePath(downloadPath);
              }}
            >
              Download
            </MenuItem>
            <MenuItem
              icon={<FaFile />}
              component={<Link to={"List"} />}
              onClick={() => {
                handlePath(documentPath);
              }}
            >
              Documents
            </MenuItem>
            <MenuItem
              icon={<FaImages />}
              component={<Link to={"List"} />}
              onClick={() => {
                handlePath(picturePath);
              }}
            >
              Picture
            </MenuItem>
            <MenuItem
              icon={<FaMusic />}
              component={<Link to={"List"} />}
              onClick={() => {
                handlePath(musicPath);
              }}
            >
              Music
            </MenuItem>
            <MenuItem
              icon={<FaVideo />}
              component={<Link to={"List"} />}
              onClick={() => {
                handlePath(videoPath);
              }}
            >
              Videos
            </MenuItem>
          </Menu>
          <hr />
          <div className="sidebar-heading mt-3 m-3">Drive</div>
          {volumes.map((volume) => (
            <Drive
              color={"color"}
              available_space={volume.available_gb}
              total_space={volume.total_gb}
              used_space={volume.used_gb}
              mountPoint={volume.mountpoint}
              name={volume.name}
            ></Drive>
          ))}
        </Sidebar>
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
