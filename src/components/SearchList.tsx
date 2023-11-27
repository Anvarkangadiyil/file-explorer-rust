import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useMyContext } from "../Context/globalPathContext";
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";

function SearchList() {
  const context = useMyContext();

  const navigate = useNavigate();

  const [directoryItem, setDirectoryItem] = useState([" "]);

  async function handleTdClick(item: string) {
    const itemType = await invoke("check_file_extension", { path: item });

    if (itemType == null) {
      context.setGlobalState(item);
      navigate(-1);
    } else {
      await invoke("open_file", { path: item });
    }
  }

  useEffect(() => {
    setDirectoryItem(context.globalSearchState);
  });

  return (
    <>
      <table className="table table-danger  striped mb-0 ">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {directoryItem.map((item, index) => (
            <tr style={{ cursor: "pointer" }}>
              <td
                key={index}
                onDoubleClick={() => {
                  handleTdClick(item);
                }}
              >
                <span className="me-2">
                  <FaRegFolder />
                </span>
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

  if (lastWord == "") {
    lastWord = "..";
  }

  return lastWord;
}

export default SearchList;
