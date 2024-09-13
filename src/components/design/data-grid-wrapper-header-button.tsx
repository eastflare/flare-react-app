/** @jsxImportSource @emotion/react */
import React from "react";
import { Button, ButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadIcon from "@mui/icons-material/Upload";

// 타입 정의
export type GridHeaderButtonType = "add" | "download" | "refresh" | "delete" | "setting" | "upload" | "custom";

export type GridHeaderButtonProps = ButtonProps & {
  buttonType: GridHeaderButtonType;
  label?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  customImage?: React.ReactNode;
  sx?: object;
};

// buttonType에 따른 아이콘 맵핑 함수
const getButtonIcon = (buttonType: GridHeaderButtonType) => {
  switch (buttonType) {
    case "add":
      return <AddIcon />;
    case "download":
      return <DownloadIcon />;
    case "refresh":
      return <RefreshIcon />;
    case "delete":
      return <DeleteIcon />;
    case "setting":
      return <SettingsIcon />;
    case "upload":
      return <UploadIcon />;
    case "custom":
      return null; // customImage로 대체
    default:
      return null;
  }
};

// buttonType에 따른 기본 라벨 설정 함수
const getDefaultLabel = (buttonType: GridHeaderButtonType) => {
  switch (buttonType) {
    case "add":
      return "추가";
    case "download":
      return "다운로드";
    case "refresh":
      return "새로고침";
    case "delete":
      return "삭제";
    case "setting":
      return "설정";
    case "upload":
      return "업로드";
    case "custom":
      return "커스텀";
    default:
      return "";
  }
};

// GridHeaderButton 컴포넌트 구현
export const GridHeaderButton: React.FC<GridHeaderButtonProps> = ({ buttonType, label, disabled, onClick, customImage, sx, ...rest }) => {
  return (
    <Button variant='outlined' size='small' disabled={disabled} onClick={onClick} startIcon={customImage || getButtonIcon(buttonType)} sx={sx} {...rest}>
      {label || getDefaultLabel(buttonType)}
    </Button>
  );
};

export default GridHeaderButton;
