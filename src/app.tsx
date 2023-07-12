import AccountPage from '@/routes/account'
import HomePage from '@/routes/home'
import DashboardPage from '@/routes/dashboard'
import Login from '@/routes/login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useEffect } from 'react'                                                                                                                 

import { ScrollToTop } from './components/scroll-to-top'

import { useGlobalContext } from './context/context'

//firebase

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseConfig.js';
import { useAuth } from "./context-stores/authcontext";


export default function App() {
  /**
   * Vite exposes env variables on the special import.meta.env object.
   * Basename needs to be set for GitHub Pages to function properly.
   *
   * @link https://vitejs.dev/guide/env-and-mode.html
   */
  const basename = import.meta.env.BASE_URL

  const { user, setUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {;
      setUser(user);
      
    });

    return () => {
      unsubscribe();
    }
  }, [])

  useGlobalContext()

  return (
    
    <BrowserRouter basename={basename}>
      <ScrollToTop>
        <Routes>
       
        {!user ? (

        <>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
         
        </>

        ):(

        <>

        <Route path="account" element={<AccountPage />} />
        <Route path="dashboard" element={<DashboardPage />} />

        </>
        )}

        <Route path="*" element={<Login />} />
          
      </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}
