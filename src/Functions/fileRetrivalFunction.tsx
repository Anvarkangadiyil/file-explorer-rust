import { invoke } from "@tauri-apps/api";

async function GetFile(desktopPath:string){
    try{
      var fileDetails= await invoke('get_file_list',{path:desktopPath});
        console.log(fileDetails);
      return fileDetails;
    }catch(error){
      console.error("error:",error);
    }
    return;
  }

  export default GetFile;