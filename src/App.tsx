import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";


import FileList from "./components/FileList";

//Layout
import AppLayout from "./Layout/AppLayout";
import FolderList from "./components/FolderList";
import { desktopDir } from '@tauri-apps/api/path';
const desktopPath = await desktopDir();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="List" element={<FolderList/>} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
