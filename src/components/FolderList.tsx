import { useEffect, useState } from "react";
import { dialog, invoke } from "@tauri-apps/api";
import { useMyContext } from "../context/globalPathContext";
import { FileDetailModel } from "../model/model";
import { extractLastWord, iconChecker } from "./functions/Function";
import { useContextMenu } from "./ContextMenu/contextMenuHook";
import ContextMenu from "./ContextMenu/ContextMenu";
import { confirm } from "@tauri-apps/api/dialog";

function FolderList() {
  const [directoryItem, setDirectoryItem] = useState<FileDetailModel[]>([]);

  const [reRender, setReRender] = useState(0);
  const context = useMyContext();
  const { isVisible, position, currentPath, showContextMenu, hideContextMenu } =
    useContextMenu();

  const handleTdClick = async (item: string) => {
    const itemType = await invoke("check_file_extension", { path: item });

    if (itemType === "Folder") {
      context.setGlobalState(item);
    } else {
      console.log(itemType);
      await invoke("open_file", { path: item });
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        setDirectoryItem(
          await invoke("get_file_details", { path: context.globalState })
        );
      } catch (error) {
        console.error("error:", error);
      }
    };
    getList();
  }, [context.globalState, reRender]);

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
      hideContextMenu();
      const confirmation = await confirm("do you want to delete the file?", {
        title: currentPath?.file_name,
        type: "warning",
      });

      if (confirmation == true) {
        await invoke("delete_folder_command", {
          path: currentPath?.file_name,
        });
      }

      setReRender(reRender + 1);
    } else if (actionType == "open") {
      if (currentPath) {
        dialog.open({ defaultPath: currentPath.file_name });
      }
    }
    hideContextMenu();
  };

  return (
    <>
      <table
        className="table table-striped table-primary mb-0 table-hover table-borderless"
        onClick={() => {
          hideContextMenu();
        }}
      >
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date Modified</th>
            <th scope="col">Type</th>
            <th scope="col">Size</th>
          </tr>
        </thead>
        <tbody>
          {directoryItem.map((item) => (
            <tr
              key={item.file_name}
              style={{ cursor: "pointer" }}
              onDoubleClick={() => {
                handleTdClick(item.file_name);
              }}
              onContextMenu={(e) => showContextMenu(e, item)}
            >
              <td className="fixed-column">
                <span className="me-2">{iconChecker(item.file_type)}</span>
                {extractLastWord(item.file_name)}
              </td>
              <td className="fixed-column">{item.date}</td>
              <td className="fixed-column">{item.file_type}</td>
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
    </>
  );
}

export default FolderList;
