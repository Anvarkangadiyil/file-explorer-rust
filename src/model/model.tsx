

// FileList type came from backend
export interface FileDetailModel{
    file_name:string,
    file_type: string,
    size: number,
    date:String,
}


// Drive Data Type  
export interface Volume {
    name: string;
    mountpoint: string;
    available_gb: number;
    used_gb: number;
    total_gb: number;
}
  