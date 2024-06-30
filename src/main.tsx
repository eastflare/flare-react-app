import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';
import App from 'App.tsx';
import 'index.css';
import PageProvider from 'contexts/cmn/PageProvider';

ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageProvider>
      <App />
    </PageProvider>
  </React.StrictMode>
);
