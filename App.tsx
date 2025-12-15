import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import AdminDashboard from './components/AdminDashboard';
import ChatAssistant from './components/ChatAssistant';
import { MOCK_COURSES, INITIAL_ADMIN_USER } from './constants';
import { Course, User, ViewState } from './types';
import { Search, ChevronRight, Mail, Phone, MapPin, CheckCircle, User as UserIcon } from 'lucide-react';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Filtered courses
  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate simple auth
    if (loginEmail === 'admin@formcampus.com' && loginPassword === 'admin') {
      setUser(INITIAL_ADMIN_USER);
      setView('admin');
    } else {
      // Simulate student
      setUser({ id: 's1', name: 'Étudiant Test', email: loginEmail, role: 'student' });
      setView('home');
    }
  };

  const renderContent = () => {
    switch(view) {
      case 'admin':
        if (!user || user.role !== 'admin') return <div className="p-10 text-center">Accès refusé</div>;
        return <AdminDashboard courses={courses} setCourses={setCourses} />;
      
      case 'login':
        return (
          <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border-t-4 border-brand-orange">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-blue">Connexion</h2>
                <p className="text-gray-500 mt-2">Accédez à votre espace personnel</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-lg">
                  Se connecter
                </button>
              </form>
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Pour tester admin: admin@formcampus.com / admin</p>
                <button onClick={() => setView('register')} className="text-brand-orange font-medium hover:underline mt-2">
                  Pas encore de compte ? S'inscrire
                </button>
              </div>
            </div>
          </div>
        );

      case 'register':
        return (
          <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border-t-4 border-brand-blue">
               <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-blue">Inscription</h2>
                <p className="text-gray-500 mt-2">Rejoignez Form'Campus aujourd'hui</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setView('login'); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-orange focus:border-brand-orange outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-orange focus:border-brand-orange outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-orange focus:border-brand-orange outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                  <input type="password" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-orange focus:border-brand-orange outline-none" />
                </div>
                <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-brand-lightOrange transition-all shadow-lg mt-4">
                  Créer mon compte
                </button>
              </form>
              <div className="mt-6 text-center text-sm">
                <button onClick={() => setView('login')} className="text-brand-blue font-medium hover:underline">
                  Déjà inscrit ? Se connecter
                </button>
              </div>
            </div>
          </div>
        );

      case 'formations':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Explorez nos Formations</h2>
              <div className="max-w-xl mx-auto relative">
                <input 
                  type="text" 
                  placeholder="Rechercher une formation, une compétence..." 
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} onDetails={() => {}} />
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                Aucune formation ne correspond à votre recherche.
              </div>
            )}
          </div>
        );

      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <div className="relative h-[650px] lg:h-[750px] flex items-center justify-center overflow-hidden">
              {/* Background Image & Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Étudiants travaillant"
                />
                <div className="absolute inset-0 bg-brand-blue opacity-85 mix-blend-multiply"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <h2 className="text-brand-orange font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-6 animate-fade-in-up">
                  Form'Campus Academy
                </h2>
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Cultivez votre avenir <br className="hidden lg:block" />
                  <span className="text-brand-orange">Professionnel & Personnel</span>
                </h1>
                <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto mb-12 font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Des formations d'excellence pour maîtriser les compétences de demain. 
                  Rejoignez une communauté passionnée et boostez votre carrière dès aujourd'hui.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <button 
                    onClick={() => setView('register')} 
                    className="px-10 py-4 bg-white text-brand-blue text-lg font-bold rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 min-w-[200px]"
                  >
                    REJOINDRE
                  </button>
                  <button 
                    onClick={() => setView('formations')} 
                    className="px-10 py-4 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-brand-blue transition-all duration-300 min-w-[200px]"
                  >
                    DÉCOUVRIR
                  </button>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-16">
                  <h2 className="text-sm font-bold text-brand-orange tracking-widest uppercase mb-3">Pourquoi nous choisir</h2>
                  <p className="text-3xl md:text-4xl font-extrabold text-brand-blue">
                    Une pédagogie axée sur la réussite
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                      <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                        <CheckCircle className="text-brand-blue w-8 h-8 group-hover:text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-blue mb-4">Certification Reconnue</h3>
                      <p className="text-gray-500 leading-relaxed">Nos formations délivrent des certifications reconnues par l'État et les entreprises du secteur pour valoriser votre CV.</p>
                   </div>
                   <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                      <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                        <UserIcon className="text-brand-orange w-8 h-8 group-hover:text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-blue mb-4">Mentorat Personnalisé</h3>
                      <p className="text-gray-500 leading-relaxed">Chaque étudiant est suivi individuellement par un mentor expert dans son domaine pour garantir sa progression.</p>
                   </div>
                   <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                      <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                         <ChevronRight className="text-brand-blue w-8 h-8 group-hover:text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-blue mb-4">Accès à Vie</h3>
                      <p className="text-gray-500 leading-relaxed">Accédez aux supports de cours, aux vidéos et à toutes les mises à jour futures même après la fin de votre formation.</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Featured Courses Preview */}
            <div className="py-24 bg-white border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Nos formations phares</h2>
                    <p className="text-gray-500 max-w-2xl">Découvrez les programmes les plus populaires choisis par nos étudiants cette année.</p>
                  </div>
                  <button onClick={() => setView('formations')} className="hidden sm:flex items-center px-6 py-3 bg-gray-100 text-brand-blue font-bold rounded-full hover:bg-brand-orange hover:text-white transition-all">
                    Tout voir <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {courses.slice(0, 3).map(course => (
                    <CourseCard key={course.id} course={course} onDetails={() => setView('formations')} />
                  ))}
                </div>
                <div className="mt-12 text-center sm:hidden">
                   <button onClick={() => setView('formations')} className="w-full px-6 py-4 bg-gray-100 text-brand-blue font-bold rounded-full hover:bg-brand-orange hover:text-white transition-all">Voir toutes les formations</button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar 
        currentView={view} 
        onChangeView={setView} 
        user={user}
        onLogout={() => { setUser(null); setView('home'); }}
      />

      <div className="flex-grow">
        {renderContent()}
      </div>

      <ChatAssistant courses={courses} />

      <footer className="bg-brand-blue text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-white/10 p-2 rounded-lg mr-3">
                <CheckCircle className="w-6 h-6" />
              </span>
              Form'Campus
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              L'école de référence pour les métiers du numérique et du management. 
              Notre mission est de rendre l'excellence accessible à tous grâce à la technologie et l'humain.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-brand-orange uppercase text-sm tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm text-blue-200">
              <li className="flex items-center hover:text-white transition-colors"><Phone className="w-5 h-5 mr-3 text-brand-orange" /> 01 23 45 67 89</li>
              <li className="flex items-center hover:text-white transition-colors"><Mail className="w-5 h-5 mr-3 text-brand-orange" /> contact@formcampus.com</li>
              <li className="flex items-center hover:text-white transition-colors"><MapPin className="w-5 h-5 mr-3 text-brand-orange" /> 123 Avenue de l'Innovation, Paris</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-brand-orange uppercase text-sm tracking-widest">Navigation</h4>
            <ul className="space-y-3 text-sm text-blue-200">
              <li><button onClick={() => setView('home')} className="hover:text-white hover:translate-x-1 transition-all">Accueil</button></li>
              <li><button onClick={() => setView('formations')} className="hover:text-white hover:translate-x-1 transition-all">Nos Formations</button></li>
              <li><button onClick={() => setView('register')} className="hover:text-white hover:translate-x-1 transition-all">Inscription</button></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-sm text-blue-400">
          &copy; 2024 Form'Campus. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

export default App;