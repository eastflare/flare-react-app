import Home from "pages/HomePage";
import About from "pages/About";
import Services from "pages/Services";
import Contact from "pages/Contact";
import { Route, useLocation, useNavigate } from "react-router-dom";
import MainContainer from "components/cmn/Layout/MainContainer";
import Sample1 from "pages/Sample1";
import Sample2 from "pages/Sample2";
import Sample3 from "pages/Sample3";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import { PageRouterProvider } from "contexts/cmn/PageRouterContext";
import { useCallback, useEffect, useState } from "react";

export type TaskItem = { id: string; path: string; label: string };
export type TaskMap = Map<string, TaskItem>;

const HomeTaskItem: TaskItem = { id: "/", path: "/", label: "Home" };
//const MAX_TASK_SIZE = 10;

function initTaskMap(): TaskMap {
  return new Map([[HomeTaskItem.id, HomeTaskItem]]);
}

const MainRoutes = () => {
  const navigate = useNavigate();

  const [curTask, setCurTask] = useState<string>("");
  const [task, setTask] = useState<TaskMap>(initTaskMap());
  const [deletedTaskId, setDeletedTaskId] = useState<string | undefined>();
  const { key, pathname } = useLocation();

  const handleNavigateTask = useCallback(
    ({ path }: Pick<TaskItem, "path">) => {
      navigate?.(path);
    },
    [navigate]
  );

  //열려있는 모든 Tab을 초기화 한다.
  const handleClearTask = useCallback(() => {
    setTask(initTaskMap());
  }, [setTask]);

  //열려있는 탭을 삭제한다.
  const handleDeleteTask = useCallback(
    (id: string) => (e: MouseEvent | undefined) => {
      e?.stopPropagation();
      const isCurTab = curTask === id;

      if (isCurTab) {
        const ids = [...task.keys()];
        const targetIdx = ids.indexOf(id);
        const prevIdx = Math.max(targetIdx - 1, 0);
        const prevId = ids[prevIdx];
        const prevItem = task.get(prevId);

        if (prevItem && prevItem.path) {
          navigate?.(prevItem.path);

          setTask(prevState => {
            const newState = new Map(prevState);
            newState.delete(id);
            return newState;
          });

          setDeletedTaskId(id);
        }
      } else {
        alert("안열려있는 탭을 지울려고 하는가?");
      }
    },
    [task, setTask, curTask]
  );

  useEffect(() => {
    task.forEach((taskItem, id) => {
      if (taskItem.path === pathname) {
        setCurTask(String(id));
      }
    });
  }, [key, pathname, task]);

  const getPageRouterProviderProps = () => ({
    task,
    setTask,
    onClearTask: handleClearTask,
    onDeleteTask: handleDeleteTask,
    onNavigateTask: handleNavigateTask,
    deletedTaskId: deletedTaskId,
  });

  return (
    <PageRouterProvider value={{ ...getPageRouterProviderProps() }}>
      <MainContainer>
        <PageRoutes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sample1' element={<Sample1 />} />
          <Route path='/sample2' element={<Sample2 />} />
          <Route path='/sample3' element={<Sample3 />} />
        </PageRoutes>
      </MainContainer>
    </PageRouterProvider>
  );
};

export default MainRoutes;
