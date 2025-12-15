
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Clock } from 'lucide-react';

const TimeSlotSelector = ({ slots, selectedTime, onSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin text-[#BFA76A]" />
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return <div className="text-gray-500 text-center py-8">Aucun créneau disponible pour cette date.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {slots.map((slot, index) => (
        <Button
          key={index}
          variant="outline"
          disabled={!slot.available}
          onClick={() => onSelect(slot.time)}
          className={`
            border border-white/10 transition-all h-auto py-3 flex flex-col gap-1
            ${selectedTime === slot.time 
              ? 'bg-[#BFA76A] text-black border-[#BFA76A] hover:bg-[#BFA76A] hover:text-black font-bold ring-2 ring-[#BFA76A] ring-offset-2 ring-offset-black' 
              : slot.available 
                ? 'bg-[#111] text-white hover:bg-white/10 hover:border-white/20' 
                : 'bg-[#111]/50 text-gray-600 cursor-not-allowed border-transparent'
            }
          `}
        >
          <span className="text-sm">{slot.time}</span>
          {selectedTime === slot.time && <Clock size={12} className="opacity-80" />}
        </Button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
