import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  className?: string;
  position?: 'bottom-left' | 'top-right';
  size?: 'small' | 'normal';
}

export const UserMenu: React.FC<UserMenuProps> = ({ className = '', position = 'top-right', size = 'normal' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    console.log(`Clicked: ${item}`);
    if (item === 'Audio Management') {
      navigate('/ai-voices');
    } else if (item === 'Course Stats') {
      navigate('/course-stats');
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    'Personal Information',
    'Admin Settings',
    'Course Stats',
    'Progress Matching',
    'Audio Management',
    'Logout'
  ];

  const avatarSize = size === 'small' ? 'w-8 h-8' : 'w-12 h-12';
  const menuPositionClass = position === 'bottom-left' 
    ? 'absolute bottom-full left-0 mb-2' 
    : 'absolute top-full right-0 mt-2';

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <div
        className={`stroke-[1px] border bg-[#0E58BE] ${avatarSize} fill-[#0E58BE] px-[3px] rounded-[50%] border-[rgba(0,0,0,0.1)] border-solid flex items-center justify-center text-white cursor-pointer hover:bg-[#0D4FA3] transition-colors text-sm font-medium`}
        aria-label="User profile"
        onClick={toggleMenu}
      >
        TL
      </div>
      
      {/* Context Menu */}
      {isMenuOpen && (
        <div className={`${menuPositionClass} bg-white shadow-lg rounded-lg p-2 z-50 w-[200px]`}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-sm font-normal leading-normal ${
                item === 'Audio Management' || item === 'Course Stats'
                  ? 'text-blue-600 hover:bg-blue-50' 
                  : 'text-gray-600'
              }`}
              style={{ fontSize: '14px', lineHeight: '20px' }}
              onClick={() => handleMenuItemClick(item)}
            >
              {(item === 'Audio Management' || item === 'Course Stats') && (
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              )}
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 