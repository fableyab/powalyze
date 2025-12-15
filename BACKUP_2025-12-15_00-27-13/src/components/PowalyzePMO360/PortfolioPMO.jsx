import React from 'react';
import ProjectTable from './ProjectTable';
import { motion } from 'framer-motion';

const PortfolioPMO = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h2 className="text-2xl font-bold text-white">Portfolio Detail</h2>
            <p className="text-gray-400 text-sm">Operational view of all active projects.</p>
         </div>
      </div>
      
      <ProjectTable projects={data.projects} />
    </motion.div>
  );
};

export default PortfolioPMO;