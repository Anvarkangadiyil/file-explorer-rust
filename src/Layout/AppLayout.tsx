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
} from "react-icons/fa";
import Drive from "../components/Drive";
import { audioDir, desktopDir, documentDir, downloadDir, pictureDir, videoDir } from '@tauri-apps/api/path';
import { useMyContext } from "../Context/globalPathContext";
import { useState } from "react";



const desktopPath=await desktopDir();
const downloadPath=await downloadDir();
const documentPath=await documentDir();
const picturePath=await pictureDir();
const musicPath=await audioDir();
const videoPath=await videoDir();


function AppLayout() {
  
    const context=useMyContext();

    const [selectedItem, setSelectedItem] = useState<string|null>(null);

     function handlePath(path:string){
      setSelectedItem(path); 
      context.setGlobalState(path);
    }
    

 
  return (
    <>
    
      <SearchBar />
      <div
        style={{
          display: "flex",
          height: "100%",
          minHeight: "89.5vh",
        }}
      >
        <Sidebar backgroundColor="#212529" width="210px"
       
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
              "&.active": {
                backgroundColor:"white",
                color: "green",
              },
              
             
            }}
          >
            <MenuItem icon={<FaDesktop />} component={<Link to={"List"}/>} onClick={()=>{handlePath(desktopPath)}} >
              Desktop
            </MenuItem>
            <MenuItem icon={<FaDownload /> } component={<Link to={"List"}/>} onClick={()=>{handlePath(downloadPath)}} >Download</MenuItem>
            <MenuItem icon={<FaFile />} component={<Link to={"List"}/>} onClick={()=>{handlePath(documentPath)}}>Documents</MenuItem>
            <MenuItem icon={<FaImages />} component={<Link to={"List"}/>} onClick={()=>{handlePath(picturePath)}} >Picture</MenuItem>
            <MenuItem icon={<FaMusic />} component={<Link to={"List"}/>} onClick={()=>{handlePath(musicPath)}} >Music</MenuItem>
            <MenuItem icon={<FaVideo />} component={<Link to={"List"}/>} onClick={()=>{handlePath(videoPath)}} >Videos</MenuItem>
          </Menu>
          <hr />
          <div className="sidebar-heading mt-3 m-3">Drive</div>
          <Drive type={"C:"} color={"success"} space={"25"} />
          <Drive type={"D:"} color={"warning"} space={"70"} />
          <Drive type={"E:"} color={"danger"} space={"90"} />
        </Sidebar>
        <div style={{
          width:"100vw",
          height:"inherit"
        }}>
        <Outlet  />
        </div>
      </div>
      
    </>
  );
}
export default AppLayout;
