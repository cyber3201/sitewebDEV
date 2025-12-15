import { Course } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Développement Web Fullstack',
    description: 'Devenez un expert du web moderne avec React, Node.js et Tailwind CSS. Créez des applications complètes de A à Z.',
    duration: '6 mois',
    level: 'Intermédiaire',
    image: 'https://picsum.photos/seed/web/800/600',
    category: 'Informatique'
  },
  {
    id: '2',
    title: 'Marketing Digital Stratégique',
    description: 'Maîtrisez le SEO, le SEA et les réseaux sociaux pour booster la visibilité de n\'importe quelle entreprise.',
    duration: '3 mois',
    level: 'Débutant',
    image: 'https://picsum.photos/seed/marketing/800/600',
    category: 'Business'
  },
  {
    id: '3',
    title: 'Data Science & IA',
    description: 'Apprenez à analyser des données complexes et à créer des modèles prédictifs avec Python et TensorFlow.',
    duration: '8 mois',
    level: 'Avancé',
    image: 'https://picsum.photos/seed/data/800/600',
    category: 'Data'
  },
  {
    id: '4',
    title: 'Management de Projet Agile',
    description: 'Les clés pour piloter des projets avec succès en utilisant les méthodes Scrum et Kanban.',
    duration: '2 mois',
    level: 'Débutant',
    image: 'https://picsum.photos/seed/mgmt/800/600',
    category: 'Management'
  }
];

export const INITIAL_ADMIN_USER = {
  id: 'admin-01',
  name: 'Administrateur',
  email: 'admin@formcampus.com',
  role: 'admin' as const
};