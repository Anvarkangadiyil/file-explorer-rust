export function extractLastWord(path: string): string {
    const pathParts: string[] = path.split("\\");
  
    let lastWord: string = pathParts[pathParts.length - 1];
  
    if (lastWord == "") {
      lastWord=pathParts[pathParts.length-2];
    }
  
    return lastWord;
  }
  
export function iconChecker(type: string): string {
    const iconMap: Record<string, string> = {
      txt: "📄",
      pdf: "📜",
      mp4: "🎬",
      mkv: "🎬",
      avi: "🎥",
      doc: "📝",
      docx: "📝",
      xls: "📊",
      xlsx: "📊",
      jpg: "📷",
      jpeg: "📷",
      png: "🖼️",
      gif: "🎞️",
      exe: "🚀",
      rar: "📦",
      zip:"📦",
      mp3: "🎵",
  
    };
  
    const lowercaseType = type.toLowerCase();
    return iconMap[lowercaseType] || "📂";
}
  
  
export function checkPathContain(path:string,inPath:string){
  
  const pathToCheck: string = inPath;
  const substringToCheck: string = path;
  
  return pathToCheck.includes(substringToCheck);
       
}