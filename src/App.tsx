import './App.css'
import Modals , {modals} from 'components/organisms/Modals'
import useModals from 'hooks/cmn/useModals'

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
        <button onClick={handleClick}>월급루팡</button>
        <button onClick={handleClick1}>전선배</button>
        <button onClick={handleClick2}>요시키상</button>
        <button onClick={handleClick3}>카공족</button>
        <Modals/>
      </div>
    </>
  )
  
}

export default App
