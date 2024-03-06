import {
  FaDesktop,
  FaDownload,
  FaFile,
  FaImages,
  FaMusic,
  FaVideo,
} from "react-icons/fa";
import { Menu, MenuItem, Sidebar, menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Drive from "./Drive";
import { useMyContext } from "../context/globalPathContext";
import { useEffect, useState } from "react";
import {
  audioDir,
  desktopDir,
  documentDir,
  downloadDir,
  pictureDir,
  videoDir,
} from "@tauri-apps/api/path";
import { Volume } from "../model/model";
import { invoke } from "@tauri-apps/api";
import { checkPathContain } from "./functions/Function";

function SideBar() {
  
  const context = useMyContext();

  const [paths, setPaths] = useState({
    desktopPath: "",
    downloadPath: "",
    documentPath: "",
    picturePath: "",
    musicPath: "",
    videoPath: "",
  });

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const desktop = await desktopDir();
        const download = await downloadDir();
        const document = await documentDir();
        const picture = await pictureDir();
        const music = await audioDir();
        const video = await videoDir();

        setPaths({
          desktopPath: desktop,
          downloadPath: download,
          documentPath: document,
          picturePath: picture,
          musicPath: music,
          videoPath: video,
        });
      } catch (error) {
        console.error("Error fetching paths:", error);
      }
    };

    fetchPaths();
  }, []);

  const [volumes, setVolumes] = useState<Volume[]>([]);

  function handlePath(path: string) {
    context.setGlobalState(path);
    // setSelectedMenuItem(path);
    document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
    const getVolume = async () => {
      try {
        let volumeValue = await invoke<Volume[]>("get_volume");
        setVolumes(volumeValue);
      } catch (error) {
        console.error("Error fetching volume:", error);
      }
    };

    getVolume();
  }, [context.globalState]);


  return (
    <Sidebar
      backgroundColor="#212529"
      width="210px"
      style={{
        position: "fixed",
        height: "100%",
        minHeight: "89.9vh",
        borderColor: "#555",
      }}
    >
      <div className="sidebar-heading mt-3 mb-3">Quick Access</div>
      <Menu
        rootStyles={{
          ["." + menuClasses.button]: {
            color: "white",
            "&:hover": {
              backgroundColor: "gray",
              borderLeft: "3px solid #212529",
              borderRight: "3px solid #212529",
              borderRadius: "5px",
            },
          },
        }}
      >
        <MenuItem
          icon={<FaDesktop />}
          component={<Link to={"List"} />}
          onClick={() => {
            handlePath(paths.desktopPath);
          }}
          className={
            checkPathContain(paths.desktopPath, context.globalState)
              ? "select-menuItem-color"
              : ""
          }
        >
          Desktop
        </MenuItem>
        <MenuItem
          icon={<FaDownload />}
          component={<Link to={"List"} />}
          onClick={() => {
            handlePath(paths.downloadPath);
          }}
          className={
            checkPathContain(paths.downloadPath, context.globalState)
              ? "select-menuItem-color"
              : ""
          }
        >
          Download
        </MenuItem>
        <MenuItem
          icon={<FaFile />}
          component={<Link to={"List"} />}
          onClick={() => {
            handlePath(paths.documentPath);
          }}
          className={
            checkPathContain(paths.documentPath, context.globalState)
              ? "select-menuItem-color"
              : ""
          }
        >
          Documents
        </MenuItem>
        <MenuItem
          icon={<FaImages />}
          component={<Link to={"List"} />}
          onClick={() => {
            handlePath(paths.picturePath);
          }}
          className={
            checkPathContain(paths.picturePath, context.globalState)
              ? "select-menuItem-color"
              : ""
          }
        >
          Picture
        </MenuItem>
        <MenuItem
          icon={<FaMusic />}
          component={<Link to={"List"} />}
          onClick={() => {
            handlePath(paths.musicPath);
          }}
          className={
            checkPathContain(paths.musicPath, context.globalState)
              ? "select-menuItem-color"
              : ""
          }
        >
          Music
        </MenuItem>
        <MenuItem
          icon={<FaVideo />}
          component={<Link to={"List"} />}
          onClick={() => {
            handlePath(paths.videoPath);
          }}
          className={
            checkPathContain(paths.videoPath, context.globalState)
              ? "select-menuItem-color"
              : ""
          }
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
  );
}

export default SideBar;
