import { ReactNode } from 'react';
import GlobalContainer from './GlobalContainer';

const UniversalContainer = (props: { children: ReactNode }) => {
  return <GlobalContainer>{props.children}</GlobalContainer>;
};

export default UniversalContainer;
