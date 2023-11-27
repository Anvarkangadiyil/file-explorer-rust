import { invoke, shell } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useMyContext } from "../Context/globalPathContext";
import { FaRegFolder } from "react-icons/fa";


let fileDetails: string[] = [];







function FolderList() {
  const [directoryItem, setDirectoryItem] = useState([]);

  const context = useMyContext();

  const handleTdClick =async (item: string) => {
    
    //checking the file which type if it null folder type
    const itemType=await invoke('check_file_extension',{path:item});

    if(itemType==null){
      context.setGlobalState(item);
    }else{
      console.log(itemType);
       await invoke('open_file',{path:item})
    }
  };
   

 

  useEffect(() => {
    const getList = async () => {
      try {
        setDirectoryItem(
          await invoke("get_file_list",{path:context.globalState})
        );
        console.log(fileDetails);
      } catch (error) {
        console.error("error:", error);
      }
    };
    getList();
  }, [context.globalState]);

  return (
    <>
      <table className="table table-striped table-primary mb-0 table-hover">
        <thead className="table-dark">
          <tr>
           <th scope="col">Name</th>
           
          </tr>
        </thead >
        <tbody>
          {directoryItem.map((item) => (
            <tr style={{cursor:"pointer"}} >
              <td key={item}
                onDoubleClick={() => {
                  handleTdClick(item);
                }}
              >
               <span className="me-2"><FaRegFolder/></span>
                {extractLastWord(item)}
              </td>
              
              
             
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function extractLastWord(path: string): string {
  const pathParts: string[] = path.split("\\");
  let lastWord: string = pathParts[pathParts.length - 1];
  
 if(lastWord==""){
  lastWord="..";
 }

  return lastWord;
}


export default FolderList;
