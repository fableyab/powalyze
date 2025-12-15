
import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, className = "" }) => {
  let color = "bg-[#BFA76A]";
  if (progress >= 100) color = "bg-blue-500";
  else if (progress < 30) color = "bg-red-500";

  return (
    <div className={`h-2 bg-[#222] rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
};

export default ProgressBar;
