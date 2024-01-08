import { FaDesktop, FaDownload, FaFile, FaImages, FaMusic, FaVideo } from "react-icons/fa";
import { Menu, MenuItem, Sidebar, menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Drive from "./Drive";
import { useMyContext } from "../context/globalPathContext";
import { useEffect, useState } from "react";
import { audioDir, desktopDir, documentDir, downloadDir, pictureDir, videoDir } from "@tauri-apps/api/path";
import { Volume } from "../model/model";
import { invoke } from "@tauri-apps/api";



const desktopPath = await desktopDir();
const downloadPath = await downloadDir();
const documentPath = await documentDir();
const picturePath = await pictureDir();
const musicPath = await audioDir();
const videoPath = await videoDir();

function SideBar(){

    const context = useMyContext();

    const [_, setSelectedMenuItem] = useState<string>("none");
    
  const [volumes, setVolumes] = useState<Volume[]>([]);
    function handlePath(path: string) {
        context.setGlobalState(path);
        setSelectedMenuItem(path);
        document.documentElement.scrollTop = 0;
      }

      useEffect(() => {
        const getVolume = async () => {
          let volumeValue = await invoke<Volume[]>("get_volume");
          setVolumes(volumeValue);
        };
    
        getVolume();
      }, [context.globalState]);
    
    return(
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
                borderLeft:"3px solid #212529",
                borderRight:"3px solid #212529",
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
            className={
              context.globalState == desktopPath ? "select-menuItem-color" : ""
            }
          
          >
            Desktop
          </MenuItem>
          <MenuItem
            icon={<FaDownload />}
            component={<Link to={"List"} />}
            onClick={() => {
              handlePath(downloadPath);
            }}
            className={
              context.globalState == downloadPath ? "select-menuItem-color" : "" 
            }
          >
            Download
          </MenuItem>
          <MenuItem
            icon={<FaFile />}
            component={<Link to={"List"} />}
            onClick={() => {
              handlePath(documentPath);
            }}
            className={
              context.globalState == documentPath ? "select-menuItem-color" : ""
            }
          >
            Documents
          </MenuItem>
          <MenuItem
            icon={<FaImages />}
            component={<Link to={"List"} />}
            onClick={() => {
              handlePath(picturePath);
            }}
            className={
              context.globalState == picturePath ? "select-menuItem-color" : ""
            }
          >
            Picture
          </MenuItem>
          <MenuItem
            icon={<FaMusic />}
            component={<Link to={"List"} />}
            onClick={() => {
              handlePath(musicPath);
            }}
            className={
              context.globalState == musicPath ? "select-menuItem-color" : ""
            }
          >
            Music
          </MenuItem>
          <MenuItem
            icon={<FaVideo />}
            component={<Link to={"List"} />}
            onClick={() => {
              handlePath(videoPath);
            }}
            className={
              context.globalState == videoPath ? "select-menuItem-color" : ""
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