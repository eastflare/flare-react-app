import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactModal from 'react-modal'
import App from './App.tsx'
import './index.css'
import ModalsProvider from './contexts/ModalsProvider.tsx'

ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </React.StrictMode>
)
