

import { desktopDir } from '@tauri-apps/api/path';
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";



const desktopPath = await desktopDir();
let fileDetails: string[] = [];


const getList=async()=>{
  try{
    fileDetails= await invoke('get_file_list',{path:desktopPath});
      console.log(fileDetails);
    return fileDetails;
  }catch(error){
    console.error("error:",error);
  }
}




function  FileList() {

  useEffect(() => {
    getList(); 
  }, []);
  
  return (
    <>
    
      <table className="table table-success mainBlock " >
        <thead className="table-dark">
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {
           fileDetails.map( (item) => (
           
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

export default FileList;
