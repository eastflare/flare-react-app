import './App.css'
import Modals , {modals} from './components/Modals'
import useModals from './hooks/useModals'

function App() {

  const { openModal } = useModals();

  const handleClick = () => {
    openModal(modals.myModal, { onSubmit:()=>{alert('짱');}, foo: 'bar' });
  };
  const handleClick1 = () => {
    openModal(modals.myModal1, { onSubmit:()=>{alert('짱나');}, foo: 'bar' });
  };
  const handleClick2 = () => {
    openModal(modals.myModal2, { onSubmit:()=>{alert('짱나짱');}, foo: 'bar' });
  };
  const handleClick3 = () => {
    openModal(modals.myModal3, { onSubmit:()=>{alert('짱나짱나');}, foo: 'bar' });
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>모달 열기</button>
        <button onClick={handleClick1}>모달1 열기</button>
        <button onClick={handleClick2}>모달2 열기</button>
        <button onClick={handleClick3}>모달3 열기</button>
        <Modals/>
      </div>
    </>
  )
  
}

export default App
