import { NavLink } from 'react-router-dom'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

//firebase

import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context-stores/authcontext';

const NAV_LINKS = [
  // { name: 'Contact', to: '/contact' },
  // { name: 'About Us', to: '/about' },
  // { name: "FAQ's", to: '/faqs' },
  // { name: 'Support', to: '/support' },
  { name: 'Account', to: '/account' },
  // {name: 'Dashboard', to: '/dashboard'}

]

const NAV_LINK = [
  {name: 'Dashboard', to: '/dashboard'}
]


import {
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';

export function NavLinks({ className }: { className?: string }) {

  const navigate = useNavigate()
  const { setUser_data } = useAuth();

  const logout = () => {
    signOut(auth);
    setUser_data();
    navigate('/');
 }

 const [isAdmin, setIsAdmin] = useState(() => {
  if (auth.currentUser.email  === "admin@gmail.com") {
      return true;
  }
  return false;
  
});


  return (
    <ul className={className}>
      {NAV_LINKS.map((link) => (
        <li key={link.name} className="ml-4">
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'border-b text-white' : 'text-white hover:border-b'
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}

{isAdmin ?(
      <>
      {NAV_LINK.map((link) => (
        <li key={link.name} className="ml-4">
          <NavLink
            to={link.to}
            style={{fontWeight: 900}}
            className={({ isActive }) =>
              isActive ? 'border-b text-white' : 'text-white hover:border-b'
            }
            
          >
            {link.name}
          </NavLink>

          
         
        </li>
        
      ))}
      </>):null}
     
      <MDBBtn className="" color='dark' size='sm' style={{fontWeight: "bold", borderRadius: 4, fontSize: 10, marginTop: '-1px', position: 'absolute', marginLeft: '40%'}} onClick={logout}>
        <MDBIcon fas icon='sign-out-alt'  /> 
          LogOut
      </MDBBtn>
    </ul>
  )
}