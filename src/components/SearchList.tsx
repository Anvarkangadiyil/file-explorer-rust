import { dialog, invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useMyContext } from "../context/globalPathContext";
import { useNavigate } from "react-router-dom";
import { extractLastWord, iconChecker } from "./functions/Function";
import { FileDetailModel } from "../model/model";
import { useContextMenu } from "./ContextMenu/contextMenuHook";
import { confirm } from "@tauri-apps/api/dialog";
import ContextMenu from "./ContextMenu/ContextMenu";

function SearchList() {
  const context = useMyContext();

  const navigate = useNavigate();
  

  const [reRender, setReRender] = useState(0);

  

  const { isVisible, position, currentPath, showContextMenu, hideContextMenu } =
    useContextMenu();

    const handleContextButtonClick = async (actionType: String) => {
   
      if (actionType == "newFolder") {
        if (currentPath?.file_type == "Folder") {
          
          let name = prompt("Enter new folder name");
          if (name == undefined) {
            return;
          } else {
            await invoke("create_folder_command", {
              path: currentPath.file_name,
              name: name,
            });
          }
          context.setGlobalState(currentPath.file_name);
          setReRender(reRender + 1);
        }
      } else if (actionType == "delete") {
       
        let newSearchResultList:FileDetailModel[]= context.globalSearchState.filter((item)=>item.file_name !== currentPath?.file_name);
    
        const confirmation = await confirm("do you want to delete the file?", {
          title: currentPath?.file_name,
          type: "info",
        });
  
        if (confirmation == true) {
          await invoke("delete_folder_command", {
            path: currentPath?.file_name,
          });
          context.setGlobalSearchState(newSearchResultList);
        }
  
        setReRender(reRender + 1);
      }
      else if(actionType=='open'){
        if(currentPath){
         dialog.open({defaultPath:currentPath.file_name});
        }
      } else if (actionType === "copy") {
        if (currentPath) {
          context.setCopyPath(currentPath.file_name);
        }
        dialog.message("Copied successfully");
      } else if (actionType === "paste") {
        if (currentPath && context.copyPath) {
          await invoke('copy_file',{source:context.copyPath,destination:currentPath.file_name}).then(() => {
            dialog.message("Pasted successfully");
            setReRender(reRender+1);
          }).catch((error) => {
            dialog.message(error);
          });
        }
      }
      hideContextMenu();
    };

  const [directoryItem, setDirectoryItem] = useState<FileDetailModel[]>([]);

  async function handleTdClick(item: string) {
    const itemType = await invoke("check_file_extension", { path: item });

    if (itemType == "Folder") {
      context.setGlobalState(item);
      navigate(-1);
    } else {
      await invoke("open_file", { path: item });
    }
  }
 

  // the content showed in the search List the data list in globalSearchState
  useEffect(() => {
    setDirectoryItem(context.globalSearchState);
  });


 
  return (
    <div id="search-list" style={{ scrollBehavior: "smooth" }} onClick={()=>{hideContextMenu()}}>
      <table className="table table-danger table-borderless  table-hover striped mb-0 ">
        <thead className="table-dark">
          <tr>
            <th scope="col" >Name</th>
            <th scope="col">Date modified</th>
            <th scope="col">Type</th>
            <th scope="col">Size</th>
          </tr>
        </thead>
        <tbody>
          {directoryItem.map((item, index) => (
            <tr style={{ cursor: "pointer" }} 
            onDoubleClick={()=>{handleTdClick(item.file_name)}}
            onContextMenu={(e) => showContextMenu(e, item)}
            >
              <td
              className="fixed-column"
                key={index}
              >
                <span className="me-2">
                  {
                    iconChecker(item.file_type)
                  }
                </span>
                {extractLastWord(item.file_name)}
              </td>
              <td className="fixed-column">
                {item.date}
              </td>
              <td className="fixed-column">
                {item.file_type}
              </td>
              <td className="fixed-column">
              {item.size == null ? "" : item.size.toFixed(3) + " KB"}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <ContextMenu
        isVisible={isVisible}
        position={position}
        currentPath={currentPath}
        onContextButtonClick={handleContextButtonClick}
      />
    </div>
  );
}



export default SearchList;
