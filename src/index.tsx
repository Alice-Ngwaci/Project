import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import './assets/styles.css'

import AppContext  from './context/context'
import AuthContextProvider from "./context-stores/authcontext";

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <React.StrictMode>
    <AuthContextProvider>
    <AppContext>
      <App />
    </AppContext>
    </AuthContextProvider>
  </React.StrictMode>
)

