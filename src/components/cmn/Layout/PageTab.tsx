import styled from "@emotion/styled";

interface PageTabProps {
  label: string;
  onClick: (...args: any[]) => void;
  onClose: (e?: MouseEvent) => void;
  onPopup: () => void;
  isActive: boolean;
}

const PageTab = ({ label, onClick, onClose, isActive }: PageTabProps) => {
  const isNotClosable = ["Home"].includes(label);

  return (
    <StyledPageTab onClick={onClick} isOpenTab={isActive}>
      <StyledPageTabLabel>{label}</StyledPageTabLabel>
      {!isNotClosable && (
        <StyledIconButton
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
        >
          X
        </StyledIconButton>
      )}
    </StyledPageTab>
  );
};

const StyledPageTab = styled.div<{ isOpenTab: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0;
  padding: 0 6px;
  border-radius: 4px;
  border: 1px solid #000000;
  color: ${({ isOpenTab }) => (isOpenTab ? "red" : "#000000")};
  box-sizing: border-box;
  font-weight: 500;
`;

const StyledPageTabLabel = styled.span`
  cursor: pointer;
  font-size: 13px;
  overflow: hidden;
  letter-spacing: -0.2px;
  max-width: 155px;
  margin-right: 2px;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: veritcal;

  line-break: auto;
`;

const StyledIconButton = styled.button`
  background-color: unset;
  padding: unset;
  border: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s;
`;

export default PageTab;
