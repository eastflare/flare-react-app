import styled from "@emotion/styled";
import { usePageRouterContext } from "contexts/cmn/PageRouterContext";
import PageTab from "./PageTab";

const PageTopBar = () => {
  const { task, curTaskId, onNavigateTask, onDeleteTask } = usePageRouterContext();

  return (
    <StyledPageTopBar
      onContextMenu={e => {
        e.preventDefault();
        return false;
      }}
    >
      <StyledMDIContainer>
        {[...task.keys()].map((key: string) => {
          let objTask = task.get(key);
          let taskId = objTask?.id ?? "";
          let taskPath = objTask?.path ?? "";
          let taskLabel = objTask?.label ?? "";

          console.log("PageTopBar 현재 curTaskId ", curTaskId);

          return (
            <PageTab
              key={key}
              label={taskLabel}
              isActive={curTaskId === taskId}
              onClose={onDeleteTask(taskId)}
              onClick={() => onNavigateTask({ id: taskId, path: taskPath })}
              taskItem={task.get(key)!}
            />
          );
        })}
      </StyledMDIContainer>
    </StyledPageTopBar>
  );
};

export default PageTopBar;

const StyledPageTopBar = styled.div`
  height: 40px;
  padding: 4px 4px;
  background-color: #ffffff;
  border-bottom: 1px solid #000000;
  box-shadow: #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledMDIContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 4px;
`;
