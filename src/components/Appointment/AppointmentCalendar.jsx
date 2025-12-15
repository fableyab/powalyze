
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, isBefore, startOfToday } from 'date-fns';
import { fr, enUS, de } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';

const AppointmentCalendar = ({ selectedDate, onSelect }) => {
  const { language } = useLanguage();
  
  const locales = { fr, en: enUS, de };
  const currentLocale = locales[language] || fr;

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        locale={currentLocale}
        disabled={(date) => isBefore(date, startOfToday()) || date.getDay() === 0 || date.getDay() === 6}
        className="rounded-md border-none text-white pointer-events-auto"
        classNames={{
          day_selected: "bg-[#BFA76A] text-black hover:bg-[#BFA76A] hover:text-black focus:bg-[#BFA76A] focus:text-black",
          day_today: "bg-white/10 text-white",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-md transition-colors",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        }}
      />
    </div>
  );
};

export default AppointmentCalendar;
