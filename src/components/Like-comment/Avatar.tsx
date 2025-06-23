
import React from 'react';

interface AvatarProps {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ userId, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Generate a consistent color based on userId
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500'
  ];
  
  const colorIndex = userId.charCodeAt(0) % colors.length;
  const initials = userId.slice(0, 2).toUpperCase();

  return (
    <div className={`
      ${sizeClasses[size]} 
      ${colors[colorIndex]} 
      rounded-full 
      flex 
      items-center 
      justify-center 
      text-white 
      font-semibold 
      ${textSizeClasses[size]}
      shadow-sm
    `}>
      {initials}
    </div>
  );
};
