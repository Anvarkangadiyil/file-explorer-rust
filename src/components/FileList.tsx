

import { desktopDir } from '@tauri-apps/api/path';
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { Response } from '@tauri-apps/api/http';
import React from 'react';



const desktopPath = await desktopDir();
let fileDetails: String[] = [];


const currentPath=React.createContext(null);


interface fileListProps{
  dirPath:String,
}



function  FileList({dirPath}:fileListProps) {

  const [directoryItem,setDirectoryItem]=useState([]);

  useEffect(() => {
    const getList=async()=>{
      try{
          setDirectoryItem(await invoke('get_file_list',{path:dirPath}));
          console.log(fileDetails);  
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

export default FileList;
