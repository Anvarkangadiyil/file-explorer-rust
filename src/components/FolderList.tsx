import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useMyContext } from "../context/globalPathContext";
import { FaDatabase, FaFileAudio, FaFilePdf, FaFileVideo, FaFileWord, FaRegFolder } from "react-icons/fa";

let fileDetails: string[] = [];

interface FileDetails{
    file_name:string,
    file_type: String,
    size: number,
    date:String,
}



function FolderList() {
  const [directoryItem, setDirectoryItem] = useState<FileDetails[]>([]);

  const context = useMyContext();

  const handleTdClick = async (item: string) => {

    //checking the file which type if it null folder type

    const itemType = await invoke("check_file_extension", { path: item });

    if (itemType == null) {
      context.setGlobalState(item);
    } else {
      console.log(itemType);
      await invoke("open_file", { path: item });
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        let files=await invoke("get_file_list", { path: context.globalState });
        setDirectoryItem(
          await invoke("get_file_details",{files:files})
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
      <table className="table table-striped table-primary mb-0 table-hover table-borderless" onContextMenu={(e)=>{e.preventDefault()}}>
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date Modified</th>
            <th scope="col">Type</th>
            <th scope="col">Size</th>
          </tr>
        </thead>
        <tbody className="">
          {directoryItem.map((item) => (
            <tr style={{ cursor: "pointer" }}>
              <td
              
                onDoubleClick={() => {
                  handleTdClick(item.file_name);
                }}
                style={{ color: "black" }}
              >
                <span className="me-2">
                  {iconChecker(item.file_type)}
                </span>
                {extractLastWord(item.file_name)}
              </td>
              <td>
                {item.date}
              </td>
              <td>
                {item.file_type}
              </td>
              <td>
                {item.size==null?"":item.size+" KB"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function extractLastWord(path: string): string {
  const pathParts: string[] = path.split("\\");

  let lastWord: string = pathParts[pathParts.length - 1];

  if (lastWord == "") {
    lastWord=pathParts[pathParts.length-2];
  }

  return lastWord;
}

function iconChecker(type: String) {
  switch (type.toLowerCase()) {
    case "txt":
      return "📄"; 
    case "pdf":
      return "📜"; 
    case "mp4":
    case "mkv":
      return "🎬";
    case "avi":
      return "🎥"; 
    case "doc":
    case "docx":
      return "📝";
    case "xls":
    case "xlsx":
      return "📊"; 
    case "jpg":
    case "jpeg":
      return "📷"; 
    case "png":
      return "🖼️"; 
    case "gif":
      return "🎞️";
    case "exe":
      return "🚀"; 
    case "rar":
      return "📦"; 
      return "🎵";
    default:
      return "📂";
  }
}


export default FolderList;
