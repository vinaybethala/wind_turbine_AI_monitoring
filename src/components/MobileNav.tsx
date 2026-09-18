import React from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from './Sidebar';
import { cn } from '../lib/utils';

export const MobileNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-panel border-t border-white/5 pb-safe overflow-x-auto">
      <div className="flex px-2 py-2 w-max mx-auto min-w-full justify-between sm:justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-16 px-1 py-1 rounded-lg text-[10px] font-medium transition-colors gap-1",
              isActive 
                ? "text-primary" 
                : "text-textMuted hover:text-textMain"
            )}
          >
            <item.icon size={20} />
            <span className="truncate w-full text-center">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
