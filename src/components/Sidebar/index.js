import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';

function Sidebar( {setOpenImages}) {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={'nav-menu active'}>
          <ul className='nav-menu-items'>
            <li className='navbar-heading'>
              <span>FIAT</span>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path.toString()} activeclassname="main-nav-active" onClick={() => {setOpenImages(false)}}>
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
