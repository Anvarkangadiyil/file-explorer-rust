// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


mod volume;
mod files;

use std::vec;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command


use files::{get_file_details,check_file_extension,open_file,search_function};
use volume::get_volume;



fn main() {
     get_volume();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![search_function,check_file_extension,open_file,get_volume,get_file_details])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
