export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  image: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export type ViewState = 'home' | 'formations' | 'login' | 'register' | 'admin';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}