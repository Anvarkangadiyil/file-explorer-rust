import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";



//Layout
import AppLayout from "./layout/AppLayout";
import { MyContextProvider } from "./context/globalPathContext";
import FolderList from "./components/FolderList";
import SearchList from "./components/SearchList";
import ErrorPage from "./components/ErrorPage";




const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<AppLayout />}>
      <Route path="List" element={<FolderList/>} />
      <Route path="Slist" element={<SearchList/>} />
      <Route path="error-page" element={<ErrorPage/>}/>
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
