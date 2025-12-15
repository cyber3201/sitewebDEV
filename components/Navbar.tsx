import React from 'react';
import { ViewState, User } from '../types';
import { GraduationCap, LogIn, LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-brand-blue shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onChangeView('home')}
          >
            <div className="bg-white/10 p-2.5 rounded-full mr-3 group-hover:bg-brand-orange/20 transition-colors border border-white/20">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-tight">Form'Campus</span>
              <span className="text-xs text-brand-orange font-semibold uppercase tracking-widest">Excellence & Avenir</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            <button 
              onClick={() => onChangeView('home')}
              className={`text-sm font-semibold tracking-wide transition-all ${currentView === 'home' ? 'text-brand-orange' : 'text-blue-100 hover:text-white'}`}
            >
              ACCUEIL
            </button>
            <button 
              onClick={() => onChangeView('formations')}
              className={`text-sm font-semibold tracking-wide transition-all ${currentView === 'formations' ? 'text-brand-orange' : 'text-blue-100 hover:text-white'}`}
            >
              NOS FORMATIONS
            </button>
            {user?.role === 'admin' && (
              <button 
                onClick={() => onChangeView('admin')}
                className={`text-sm font-semibold tracking-wide transition-all ${currentView === 'admin' ? 'text-brand-orange' : 'text-blue-100 hover:text-white'}`}
              >
                ADMINISTRATION
              </button>
            )}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center gap-4">
                 <span className="hidden sm:block text-sm text-blue-100">
                  Bonjour, <span className="font-semibold text-white">{user.name}</span>
                </span>
                <button 
                  onClick={onLogout}
                  className="flex items-center px-5 py-2 border border-white/30 text-white rounded-full hover:bg-white hover:text-brand-blue transition-all text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onChangeView('login')}
                  className="hidden md:flex items-center text-white font-medium hover:text-brand-orange transition-colors"
                >
                  Se connecter
                </button>
                <button 
                  onClick={() => onChangeView('register')}
                  className="flex items-center px-7 py-3 bg-brand-orange text-white rounded-full hover:bg-white hover:text-brand-orange transition-all shadow-lg hover:shadow-xl font-bold text-sm tracking-wide"
                >
                  REJOINDRE
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;