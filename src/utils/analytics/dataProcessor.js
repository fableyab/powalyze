import { startOfDay, subDays, format, parseISO } from 'date-fns';

/**
 * Process raw event data into chart-friendly formats
 */
export const processTrendData = (events, days = 7) => {
  const result = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayEvents = events.filter(e => 
      e.timestamp.startsWith(dateStr)
    );
    
    result.push({
      date: format(date, 'MMM dd'),
      rawDate: dateStr,
      count: dayEvents.length,
      users: new Set(dayEvents.map(e => e.user_id || 'anon')).size
    });
  }
  
  return result;
};

/**
 * Aggregate counts by a specific property
 */
export const aggregateByProperty = (data, property) => {
  const counts = {};
  data.forEach(item => {
    const key = item[property] || 'Unknown';
    counts[key] = (counts[key] || 0) + 1;
  });
  
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};