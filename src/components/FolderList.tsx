

import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useMyContext } from '../Context/globalPathContext';





let fileDetails: String[] = [];






function  FolderList() {

  const [directoryItem,setDirectoryItem]=useState([]);


  const context=useMyContext()
  useEffect(() => {
    const getList=async()=>{
      try{
          setDirectoryItem(await invoke('get_file_list',{path:context.globalState}));
          console.log(fileDetails);  
      }catch(error){
        console.error("error:",error);
      }
    }
  getList();
  },[context.globalState]);
  
  return (
    <>
    
      <table className="table table-success  striped mb-0">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {
           directoryItem.map( (item,index) => (
              <tr>
                <td key={index}>{item}</td>
              </tr> 
          ))
        }
         </tbody>
      </table>
      
    </>
  );
}

export default FolderList;
