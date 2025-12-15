import React from 'react';
import WhatIfScenario from './WhatIfScenario';

const WhatIfScenarios = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
         <WhatIfScenario />
      </div>
      <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6 flex items-center justify-center">
         <div className="text-center opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">Scenario Visualization</h3>
            <p className="text-gray-400 text-sm">Interactive Power BI chart reflecting parameter changes would appear here.</p>
         </div>
      </div>
    </div>
  );
};

export default WhatIfScenarios;