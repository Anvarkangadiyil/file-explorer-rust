import {
  Menu,
  MenuItem,
  Sidebar,
  menuClasses,
} from "react-pro-sidebar";
import SearchBar from "../components/SearchBar";
import { Link, Outlet } from "react-router-dom";
import { FaDownload,FaDesktop,FaFile,FaVideo,FaMusic,FaImages} from "react-icons/fa";



function AppLayout() {
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
        <Sidebar
          backgroundColor="#212529"
        
        >
          <Menu
            rootStyles={{
              ["." + menuClasses.button]: {
                color: "white",
                "&:hover": {
                  backgroundColor: "#0dcaf0",
                  color: "#212529",
                },
              },
            }}>
          
            <MenuItem icon={<FaDesktop />} component={<Link to={"List"}/>}>Desktop</MenuItem>
            <MenuItem icon={<FaDownload/>} >Download</MenuItem>
            <MenuItem icon={<FaFile/>}>Documents</MenuItem>
            <MenuItem icon={<FaImages/>}>Picture</MenuItem>
            <MenuItem icon={<FaMusic/>}>Music</MenuItem>
            <MenuItem icon={<FaVideo/>}>Videos</MenuItem>
          </Menu>
        </Sidebar>
        <Outlet />
      </div>
    </>
  );
}
export default AppLayout;
