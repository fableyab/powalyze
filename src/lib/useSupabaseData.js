import { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

/**
 * Hook générique pour récupérer des données depuis Supabase
 * @param table - Nom de la table Supabase
 * @param filters - Filtres optionnels [{ column: 'tenant_id', value: '123' }]
 * @param select - Colonnes à sélectionner (défaut: '*')
 * @returns { data, loading, error, refetch }
 */
export function useSupabaseData(table, filters = [], select = '*') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(table).select(select);

      // Appliquer les filtres
      if (filters && filters.length > 0) {
        filters.forEach((filter) => {
          if (filter.operator === 'in') {
            query = query.in(filter.column, filter.value);
          } else if (filter.operator === 'gt') {
            query = query.gt(filter.column, filter.value);
          } else if (filter.operator === 'lt') {
            query = query.lt(filter.column, filter.value);
          } else {
            // Par défaut: eq
            query = query.eq(filter.column, filter.value);
          }
        });
      }

      const { data: result, error: queryError } = await query;

      if (queryError) {
        throw queryError;
      }

      setData(result);
    } catch (err) {
      console.error(`Erreur lors de la récupération des données (${table}):`, err);
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [table, JSON.stringify(filters), select]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook pour récupérer une seule ligne
 */
export function useSupabaseSingle(table, id, idColumn = 'id') {
  const { data, loading, error, refetch } = useSupabaseData(
    table,
    [{ column: idColumn, value: id }]
  );

  return {
    data: data?.[0] || null,
    loading,
    error,
    refetch
  };
}
