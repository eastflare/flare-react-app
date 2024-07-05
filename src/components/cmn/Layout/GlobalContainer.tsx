import TopMenu from './TopMenu';
import LeftMenu from './LeftMenu';
import { ReactNode } from 'react';
import TaskUpper from './TaskUpper';

const GloablContainer = (props: { children: ReactNode }) => {
  return (
    <>
      <TopMenu />
      <div className='container'>
        <LeftMenu />
        {/* <MainContent>{props.children}</MainContent> */}
        <TaskUpper>{props.children}</TaskUpper>
      </div>
    </>
  );
};

export default GloablContainer;
