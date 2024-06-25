import './App.css'
import { useState } from 'react';
import MyModal from './components/MyModal'

function App() {

  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  }

  return (
    <>
      <div>
        <button onClick={handleClick}>모달열기</button>
        <MyModal isOpen={isOpen}/>
      </div>
    </>
  )
  
}

export default App
