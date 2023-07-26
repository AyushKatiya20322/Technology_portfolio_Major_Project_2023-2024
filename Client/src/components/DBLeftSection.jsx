import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../assets';
import { HiCurrencyRupee } from '../assets/icons';
import { isNotActiveStyles, isActiveStyles } from '../utils/styles';

const NavLinkItem = ({ to, icon, label }) => {
  return (
    <NavLink
      isActive={(_, location) => location.pathname === to}
      className={({ isActive }) =>
        isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles
      }
      to={to}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {label}
    </NavLink>
  );
};

const DBLeftSection = () => {
  return (
    <div className="h-full flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to="/" className="flex items-center justify-center px-6 py-2 gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Radhe Radhe</p>
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-4">
        <NavLinkItem to="/dashboard/home" icon="🏠" label="Home" />
        <NavLinkItem to="/dashboard/orders" icon="🛒" label="Orders" />
        <NavLinkItem to="/dashboard/items" icon="🍔" label="Items" />
        <NavLinkItem to="/dashboard/newItem" icon="➕" label="Add New Item" />
        <NavLinkItem to="/dashboard/users" icon="👥" label="Users" />
      </ul>

      <div className="w-full items-center justify-center flex h-180 mt-auto px-2 pb-2">
        <div className="w-full hfull rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center m-2">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble with the website? Please contact us for more questions.
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer m-2">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
