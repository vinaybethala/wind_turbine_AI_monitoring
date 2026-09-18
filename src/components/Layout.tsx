import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AlertPanel } from './AlertPanel';
import { MobileNav } from './MobileNav';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-textMain selection:bg-primary/30">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth pb-20 md:pb-8">
          <Outlet />
        </main>
        
        <MobileNav />
        
        <AlertPanel />
      </div>
    </div>
  );
};
