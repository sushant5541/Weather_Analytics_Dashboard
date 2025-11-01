import React from 'react';
import { Cloud } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Cloud, 
  title = 'No data available', 
  description = 'Try adding a city to get started' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Icon className="w-24 h-24 text-gray-300 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;