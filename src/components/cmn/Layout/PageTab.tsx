import { TaskItem } from "routers/MainRoutes";
import styled from "@emotion/styled";

interface PageTabProps {
  label: string;
  onClick: (...args: any[]) => void;
  onClose: (e?: MouseEvent) => void;
  isActive: boolean;
  taskItem: TaskItem;
}

const PageTab = ({ label, onClick, onClose, isActive, taskItem }: PageTabProps) => {
  console.log(isActive);
  return (
    <StyledPageTab onClick={onClick}>
      <StyledPageTabLabel>{label}</StyledPageTabLabel>
      <StyledIconButton
        onClick={e => {
          e.stopPropagation();
          alert("팝업을 띄웁니다. " + taskItem.path);
        }}
      >
        ※
      </StyledIconButton>
      <StyledIconButton
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
      >
        X
      </StyledIconButton>
    </StyledPageTab>
  );
};

const StyledPageTab = styled.div``;
const StyledPageTabLabel = styled.span``;
const StyledIconButton = styled.button``;

export default PageTab;
