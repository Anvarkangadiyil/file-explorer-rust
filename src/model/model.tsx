


export interface FileDetailModel{
    file_name:string,
    file_type: string,
    size: number,
    date:String,
}

export interface Volume {
    name: string;
    mountpoint: string;
    available_gb: number;
    used_gb: number;
    total_gb: number;
  }
  