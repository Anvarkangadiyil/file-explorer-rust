// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


mod volume;
mod files;



// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command


use files::{get_file_details,check_file_extension,open_file,search_function,create_folder_command,delete_folder_command};
use volume::get_volume;

use fs_extra;
use std::{ path::Path};


#[tauri::command]
fn copy_file(source: &str, destination: &str) {

    if Path::is_file(&Path::new(source)) {
        match fs_extra::copy_items(&[source], destination, &Default::default()) {
            Ok(_) => println!("File copied successfully!"),
            Err(err) => eprintln!("Error copying file: {}", err),
        }
    } else {
        match fs_extra::dir::copy(source, destination, &Default::default()) {
            Ok(_) => println!("File or folder copied successfully!"),
            Err(err) => eprintln!("Error copying file or folder: {}", err),
        }
    }
}


fn main() {
     get_volume();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![search_function,check_file_extension,open_file,get_volume,get_file_details,create_folder_command,delete_folder_command,copy_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
