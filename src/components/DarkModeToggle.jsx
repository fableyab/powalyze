
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full overflow-hidden relative border border-border/10 bg-background hover:bg-muted text-foreground transition-all duration-300 ${className}`}
      aria-label="Toggle Dark Mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Moon size={18} className="text-[#BFA76A]" />
          ) : (
            <Sun size={18} className="text-orange-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default DarkModeToggle;
