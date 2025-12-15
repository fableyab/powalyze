import { useState, useEffect, useRef } from 'react';
import { realtimeDataGenerator } from '@/services/liveData/realtimeDataGenerator';

export const useLiveData = (dataType, interval = 2000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const isMounted = useRef(true);

  const fetchData = () => {
    try {
      if (!isMounted.current) return;
      
      let newData;
      switch (dataType) {
        case 'kpi':
          newData = realtimeDataGenerator.generateRealtimeKPIData();
          break;
        case 'project':
          newData = realtimeDataGenerator.generateRealtimeProjectData();
          break;
        case 'financial':
          newData = realtimeDataGenerator.generateRealtimeFinancialData();
          break;
        case 'sales':
          newData = realtimeDataGenerator.generateRealtimeSalesData();
          break;
        case 'pmo':
          newData = realtimeDataGenerator.generateRealtimePMOData();
          break;
        default:
          throw new Error('Invalid data type');
      }
      
      setData(newData);
      setLoading(false);
    } catch (err) {
      if (isMounted.current) {
        setError(err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchData(); // Initial fetch
    
    timerRef.current = setInterval(fetchData, interval);

    return () => {
      isMounted.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dataType, interval]);

  return { data, loading, error };
};