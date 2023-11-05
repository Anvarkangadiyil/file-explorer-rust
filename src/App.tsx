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
import { MyContextProvider } from "./Context/globalPathContext";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="List" element={<FileList/>} />
    </Route>
  )
);
function App() {



  return (
   <MyContextProvider>
   <RouterProvider router={router} />
   </MyContextProvider>
      
    

  );
}

export default App;
