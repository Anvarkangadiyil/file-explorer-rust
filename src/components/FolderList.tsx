

import { desktopDir } from '@tauri-apps/api/path';
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";



const desktopPath = await desktopDir();
let fileDetails: string[] = [];


function FolderList() {
 

  const [Items,setItem]=useState([" "]);

  useEffect(() => {
    const getList=async()=>{
      try{
        fileDetails= await  invoke('get_file_list',{path:desktopPath});
          console.log(fileDetails);
        setItem(fileDetails);
      }catch(error){
        console.error("error:",error);
      }
    }
    getList();
  }, []);
  
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
           Items.map( (item) => (
           
              <tr>
                <td>{item}</td>
              </tr>
           
          ))
        }
         </tbody>
      </table>
      
    </>
  );
}

export default FolderList;
