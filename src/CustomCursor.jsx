import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring configuration
  const springConfig = { damping: 25, stiffness: 400, mass: 1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
        // Tag selector or class selector for hover effect
        if (
            e.target.tagName.toLowerCase() === 'a' ||
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.closest('a') !== null ||
            e.target.closest('button') !== null ||
            e.target.classList.contains('glass-panel')
        ) {
            setIsHovered(true);
        } else {
            setIsHovered(false);
        }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide original cursor
    document.body.style.cursor = 'none';
    
    // ensure links and buttons also hide cursor
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[var(--accent)] pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[rgba(var(--accent-rgb),0.5)] pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}