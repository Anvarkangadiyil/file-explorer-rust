import { useState } from 'react';
import { FileDetailModel } from '../../model/model';

interface ContextMenuHook {
  isVisible: string;
  position: { x: number; y: number };
  currentPath: FileDetailModel | undefined;
  showContextMenu: (e: React.MouseEvent, item: FileDetailModel) => void;
  hideContextMenu: () => void;
}


//hook to manage the context Menu
export const useContextMenu = (): ContextMenuHook => {
  const [isVisible, setIsVisible] = useState<string>('none');
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentPath, setCurrentPath] = useState<FileDetailModel | undefined>(undefined);

  const showContextMenu = (e: React.MouseEvent, item: FileDetailModel): void => {
    e.preventDefault();

   if(e.clientY>650){
    setPosition({ x: e.clientX, y: e.clientY-150});
   } else{
    setPosition({ x: e.clientX, y: e.clientY });
   }
   
    setIsVisible('block');
    
    setCurrentPath(item);
  };

  const hideContextMenu = (): void => {
    setIsVisible('none');
  };

  return { isVisible, position, currentPath, showContextMenu, hideContextMenu };
};
