import './App.css';
import Modals, { modals } from 'components/cmn/Layout/Modals';
import useGoPage from 'hooks/cmn/useGoPage';
import { ToastContainer } from 'react-toastify';

function App() {
  const { goModal } = useGoPage();

  const handleClickMatthew = () => {
    goModal(
      modals.matthew,
      {
        foo: 'bar',
        callback : () => { alert('매튜 뭐하는 사람인가요?'); }
      }
    );
  };

  const handleClick = () => {
    goModal(
      modals.myModal,
      {
        foo: 'bar',
        callback : () => { alert('루팡 뭐하는 사람인가요?'); }
      },
    );
  };

  const handleClick1 = () => {
    goModal(
      modals.myModal1,
      {
        foo: 'bar',
        callback : () => { alert('전선배 뭐하는 사람인가요?'); }
      },
    );
  };
  const handleClick2 = () => {
    goModal(
      modals.myModal2,
      {
        foo: 'bar',
        callback : () => { alert('요시키 뭐하는 사람인가요?'); }
      }
    );
  };
  const handleClick3 = () => {
    goModal(
      modals.myModal3,
      {
        foo: 'bar',
        callback : () => { alert('김주팔 뭐하는 사람인가요?'); }
      }
    );
  };

  return (
    <>
      <div>
        <button onClick={handleClickMatthew}>Matthew</button>
        <button onClick={handleClick}>월급루팡</button>
        <button onClick={handleClick1}>전선배</button>
        <button onClick={handleClick2}>요시키상</button>
        <button onClick={handleClick3}>카공족</button>
        <Modals />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
