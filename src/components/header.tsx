import { Link } from 'react-router-dom'
import { NavLinks } from './nav-links'

import { Logo } from './logo'

export function Header({ title }: { title?: string }) {

  return (
    <header className="relative py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <h3 className="m-0 text-xl font-bold uppercase leading-none" >
            <Link to="/" className="flex items-center no-underline" style={{color: '#303030'}}>
              <Logo className="mr-3" /> MHASIBU SACCO
            </Link>
          </h3>

          
          <NavLinks  className="inline-flex w-full flex-none justify-center lg:order-1 lg:mb-0 lg:flex lg:w-1/2 lg:justify-center"/>
        
        </div>
      </div>
    </header>
  )
}
