import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TopMenu from 'components/cmn/Layout/TopMenu';
import LeftMenu from 'components/cmn/Layout/LeftMenu';
import MainContent from 'components/cmn/Layout/MainContent';
import Modals from 'components/cmn/Layout/Modals';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <TopMenu />
        <div className='container'>
          <LeftMenu />
          <MainContent />
        </div>
        <ToastContainer />
        <Modals />
      </div>
    </Router>
  );
};

export default App;
