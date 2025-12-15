import React, { useState } from 'react';
import { Course } from '../types';
import { Trash2, Plus, Edit, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ courses, setCourses }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    category: '',
    level: 'Débutant',
    duration: '',
    description: '',
    image: 'https://picsum.photos/seed/new/800/600'
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleEdit = (course: Course) => {
    setFormData(course);
    setEditingId(course.id);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCourses(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } as Course : c));
    } else {
      const newCourse: Course = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        image: `https://picsum.photos/seed/${Math.random()}/800/600`
      } as Course;
      setCourses(prev => [...prev, newCourse]);
    }
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ title: '', category: '', level: 'Débutant', duration: '', description: '' });
  };

  // Stats for chart
  const statsData = courses.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: curr.category, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-brand-blue py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Tableau de Bord Administrateur</h1>
          <p className="text-blue-200 mt-2">Gérez les formations et visualisez les statistiques.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-brand-blue mb-4">Répartition des Formations par Catégorie</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis allowDecimals={false} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="count" fill="#E98E00" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Management Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Liste des Formations</h2>
          <button 
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', category: '', level: 'Débutant', duration: '', description: '' });
              setIsFormOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-brand-orange text-white rounded-md hover:bg-brand-lightOrange transition-colors shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter une formation
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={course.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(course)} className="text-brand-blue hover:text-blue-900 mr-4">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? 'Modifier la formation' : 'Nouvelle formation'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre</label>
                <input 
                  type="text" 
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-orange focus:border-brand-orange"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <input 
                    type="text" 
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-orange focus:border-brand-orange"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700">Niveau</label>
                   <select 
                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-orange focus:border-brand-orange"
                     value={formData.level}
                     onChange={e => setFormData({...formData, level: e.target.value as any})}
                   >
                     <option value="Débutant">Débutant</option>
                     <option value="Intermédiaire">Intermédiaire</option>
                     <option value="Avancé">Avancé</option>
                   </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Durée</label>
                <input 
                  type="text" 
                  required
                  placeholder="ex: 3 mois"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-orange focus:border-brand-orange"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-orange focus:border-brand-orange"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-brand-lightOrange shadow-sm"
                >
                  {editingId ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;