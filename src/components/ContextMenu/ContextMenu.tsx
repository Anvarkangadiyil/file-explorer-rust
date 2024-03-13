import React from "react";
import { FileDetailModel } from "../../model/model";

interface ContextMenuProps {
  isVisible: string;
  position: { x: number; y: number };
  currentPath: FileDetailModel | undefined;
  onContextButtonClick: (actionType: string) => Promise<void>;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  isVisible,
  position,
  currentPath,
  onContextButtonClick,
}) => {
  return (
    <div
      id="customContextMenu"
      className="list-group border border-dark"
      style={{
        display: isVisible,
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
    >
      <button
        className="list-group-item list-group-item-action"
        onClick={async () => onContextButtonClick("paste")}
      >
        📋 paste
      </button>
      <button
        className="list-group-item list-group-item-action"
        onClick={async () => onContextButtonClick("copy")}
      >
        ⚓ copy
      </button>
      <button
        className="list-group-item list-group-item-action"
        onClick={async () => onContextButtonClick("delete")}
      >
        🗑️ delete
      </button>
      <button
        className="list-group-item list-group-item-action"
        onClick={async () => onContextButtonClick("newFolder")}
      >
        📁 new Folder
      </button>
      <button
        className="list-group-item list-group-item-action"
        onClick={async () => onContextButtonClick("open")}
      >
        📂 open with
      </button>
    </div>
  );
};

export default ContextMenu;
