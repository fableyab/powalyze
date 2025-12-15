import React from 'react';
import RiskMatrix from './RiskMatrix';
import GovernancePanel from './GovernancePanel';
import { motion } from 'framer-motion';

const RisksGovernance = ({ data }) => {
  // Collect all risks from all projects
  const allRisks = data.projects.flatMap(p => 
     // We generate risks on the fly if not present in the main object for demo
     p.risks || []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <GovernancePanel />
       </motion.div>
       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <RiskMatrix risks={allRisks.length > 0 ? allRisks : []} />
       </motion.div>
    </div>
  );
};

export default RisksGovernance;