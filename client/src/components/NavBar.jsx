import React from 'react'
import { NavLink } from 'react-router-dom'

// NavBar component to display navigation links
const NavBar = ({setMenuOpened, containerStyles}) => {
  const navLinks = [
    {path: '/', title: 'Home'},
    {path: '/listing', title: 'Listing'},
    {path: '/blog', title: 'Blog'},
    {path: '/contact', title: 'Contact'},
  ]
  // Render navigation links
  return (
    <nav className={containerStyles}>
      {navLinks.map((link) => (
        <NavLink onClick={() => {setMenuOpened(false); scrollTo(0,0)}}
          key={link.title}
          to={link.path}
          className={({isActive}) => `${isActive ? 'active-link' : ''} px-3 py-2
          rounded-full uppercase text-sm font-bold`}
          >
          {link.title}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar