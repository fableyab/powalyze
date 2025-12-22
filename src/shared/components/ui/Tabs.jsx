/**
 * TABS COMPONENT
 * Onglets accessibles
 */

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function Tabs({ tabs, defaultTab, onChange, className }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={cn('w-full', className)}>
      <div className="border-b border-gray-700">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'text-brand-gold-500 border-b-2 border-brand-gold-500'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {tab.icon && <tab.icon size={16} className="inline mr-2" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-4">
        {activeTabContent?.content}
      </div>
    </div>
  );
}
