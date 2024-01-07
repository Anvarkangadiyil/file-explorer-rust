



use std::fs::{self, metadata};
use std::path::Path;
use chrono::prelude::*;
use chrono::DateTime;
use serde::Serialize;

#[derive(Debug)]
#[derive(Serialize)]
pub struct FileDetails{
    file_name:String,
    file_type: Option<String>,
    size: Option<f64>,
    date:String,
}



#[tauri::command]
pub fn get_file_details(files: Vec<String>)->Vec<FileDetails> {
    
    let mut file_details_list = Vec::new();
    
    for file in files {
        let file_name=file.clone();
        let file_type=check_file_extension(file.clone());
        let file_size=find_file_size(&file);
        let file_mode=file_modified_date_and_time(&file);
        
        let file_details = FileDetails {
            file_name:file_name,
            file_type:file_type,
            size: file_size,
            date: file_mode,
        };
        
        file_details_list.push(file_details);
        
    }
    
    file_details_list 
}


pub fn file_modified_date_and_time(path: &str) -> String {
    let modified_time = fs::metadata(path)
        .expect("Failed to retrieve file metadata")
        .modified()
        .expect("Failed to retrieve modification time");

    // Convert modified time to DateTime<Local>
    let modified_date_time:DateTime<Local> = DateTime::from(modified_time);

    // Format the date as dd-mm-yy
    let formatted_date = modified_date_time.format("%d-%m-%y").to_string();

    // Format the time as HH:MM:SS
    let formatted_time = modified_date_time.format("%H:%M:%S").to_string();

    // Combine date and time
    let result = format!("Date: {}, Time: {}", formatted_date, formatted_time);

    result
}

pub fn check_file_extension(path: String) -> Option<String> {
   
    let path = Path::new(&path);

    let file_type= match path.extension() {
        Some(_) => path.extension()?.to_str()?.to_string(),
        None => String::from("Folder"),
    };

  Some(file_type)
}
    
    
    
pub fn find_file_size(file_path: &str) -> Option<f64> {
    if let Ok(metadata) = metadata(file_path) {
        // Retrieve the size from the metadata
        if check_file_extension(file_path.to_owned())==Some("Folder".to_string()){
            return None;
        }else{
        let size_in_kb = metadata.len() as f64 / 1024.0;
         return  Some(size_in_kb);
        }
    } else {
        // Return None if metadata retrieval fails
        None
    }
}
