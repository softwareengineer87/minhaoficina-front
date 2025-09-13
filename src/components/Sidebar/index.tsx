'use client';

import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
  IconHome,
  IconTools,
  IconUser
} from '@tabler/icons-react';
import './sidebar.css';
import { useState } from 'react';
import Link from 'next/link';

function Sidebar() {

  const [open, setOpen] = useState<boolean>(false);

  function openSidebar() {
    setOpen((state) => !state);
  }

  return (
    <section className={`sidebar-container ${open ? 'open-sidebar' : ''}`}>
      {open ? (
        <IconChevronCompactLeft className='icon-open' onClick={openSidebar} />
      ) : (
        <IconChevronCompactRight className='icon-open' onClick={openSidebar} />
      )}
      <div className="sidebar">
        <header className='header-sidebar'>
          <img src='./logo.png' alt='Logotipo' />
          <h4 className='close'>Oficina</h4>
        </header>
        <nav className='menu'>
          <ul>
            <li><Link className='link' href='/'><IconHome stroke={1} /><span className='close'>Home</span></Link></li>
            <li><Link className='link' href='/create-launch'><IconTools stroke={1} /><span className='close'>Criar lançamento</span></Link></li>
            <li><Link className='link' href='/profile'><IconUser stroke={1} /><span className='close'>Sua conta</span></Link></li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export { Sidebar }

