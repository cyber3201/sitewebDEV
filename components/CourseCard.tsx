import React from 'react';
import { Course } from '../types';
import { Clock, BarChart, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onDetails: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {course.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-blue mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-brand-orange" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <BarChart className="w-4 h-4 mr-1 text-brand-blue" />
              {course.level}
            </div>
          </div>
        </div>

        <button 
          onClick={() => onDetails(course)}
          className="w-full mt-4 bg-brand-blue text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center"
        >
          Voir la formation
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;