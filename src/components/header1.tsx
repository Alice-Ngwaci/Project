import { Link } from 'react-router-dom'

import { Logo } from './logo'

import {
  MDBIcon,
} from 'mdb-react-ui-kit';

export function Header({ title }: { title?: string }) {
  return (
    <header className="relative">
      <div className="mx-auto w-full max-w-6xl ">
        <div className="relative flex items-center justify-between">
         <h3 className=" mt-5 m-0 text-xl font-bold uppercase leading-none" >
            <Link to="/" className="flex items-center no-underline" style={{color: '#303030'}}>
              <Logo className="mr-3" /> MHASIBU SACCO
            </Link>
          </h3>

          <h3 className=" mt-4 m-0 text-xl font-bold leading-none" >
            <Link to="/login" className="flex items-center no-underline bg-dark w-full p-3 sm " style={{color: '#ffff', fontSize: '15px', width: '100px', borderRadius: '8px'}}>
            <MDBIcon fas icon='sign-in-alt'  className='mr-2' /> Login
            </Link>
          </h3>
          
         
        </div>
      </div>
    </header>
  )
}
