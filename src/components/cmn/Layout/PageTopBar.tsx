import styled from "@emotion/styled";
import { usePageRouterContext } from "contexts/cmn/PageRouterContext";
import PageTab from "./PageTab";

const PageTopBar = () => {
  const { task, curTask, onNavigateTask, onDeleteTask } = usePageRouterContext();

  return (
    <StyledMDIContainer>
      {[...task.keys()].map((key: string) => {
        let objTask = task.get(key);
        let taskId = objTask?.id ?? "";
        let taskPath = objTask?.path ?? "";
        let taskLabel = objTask?.label ?? "";

        return (
          <PageTab
            key={key}
            label={taskLabel}
            isActive={curTask === taskId}
            onClose={onDeleteTask(taskId)}
            onClick={() => onNavigateTask({ id: taskId, path: taskPath })}
            taskItem={task.get(key)!}
          />
        );
      })}
    </StyledMDIContainer>
  );
};

export default PageTopBar;

const StyledMDIContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 4px;
`;
