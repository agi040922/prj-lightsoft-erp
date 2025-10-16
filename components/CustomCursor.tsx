'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    const cursorFollower = document.querySelector('.cursor-follower') as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }

      setTimeout(() => {
        if (cursorFollower) {
          cursorFollower.style.left = e.clientX - 10 + 'px';
          cursorFollower.style.top = e.clientY - 10 + 'px';
        }
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .gallery-item');

    const handleMouseEnter = () => {
      if (cursor) cursor.style.transform = 'scale(2)';
      if (cursorFollower) cursorFollower.style.transform = 'scale(1.5)';
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.transform = 'scale(1)';
      if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
    };

    interactiveElements.forEach(elem => {
      elem.addEventListener('mouseenter', handleMouseEnter);
      elem.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(elem => {
        elem.removeEventListener('mouseenter', handleMouseEnter);
        elem.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-follower"></div>
    </>
  );
}
