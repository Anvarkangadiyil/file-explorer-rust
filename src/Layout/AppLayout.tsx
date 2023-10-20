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
        <Sidebar backgroundColor="#212529" width="210px">
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
            <MenuItem icon={<FaDesktop />} component={<Link to={"List"} />}>
              Desktop
            </MenuItem>
            <MenuItem icon={<FaDownload />}>Download</MenuItem>
            <MenuItem icon={<FaFile />}>Documents</MenuItem>
            <MenuItem icon={<FaImages />}>Picture</MenuItem>
            <MenuItem icon={<FaMusic />}>Music</MenuItem>
            <MenuItem icon={<FaVideo />}>Videos</MenuItem>
          </Menu>
          <hr />
          <div className="sidebar-heading mt-3 m-3">Drive</div>
          <Drive type={"C:"} color={"success"} space={"25"} />
          <Drive type={"D:"} color={"danger"} space={"90"} />
        </Sidebar>
        <Outlet />
      </div>
    </>
  );
}
export default AppLayout;
