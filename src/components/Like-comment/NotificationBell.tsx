
import React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationBellProps {
  unreadCount?: number;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  unreadCount = 0,
  size = 24,
  className,
  onClick
}) => {
  return (
    <div 
      className={cn("relative cursor-pointer transition-colors hover:text-primary", className)}
      onClick={onClick}
    >
      <Bell size={size} />
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
