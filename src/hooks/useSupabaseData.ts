import { useState, useEffect } from 'react';
import { fetchTableData, insertRow, updateRow, deleteRow } from '../lib/supabase/data';

export function useSupabaseData<T = any>(table: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [table]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTableData(table);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const insert = async (rowData: Partial<T>) => {
    try {
      setError(null);
      const result = await insertRow(table, rowData);
      setData(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to insert data');
      throw err;
    }
  };

  const update = async (id: string, rowData: Partial<T>) => {
    try {
      setError(null);
      const result = await updateRow(table, id, rowData);
      setData(prev => prev.map(item => 
        (item as any).id === id ? result : item
      ));
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update data');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      setError(null);
      await deleteRow(table, id);
      setData(prev => prev.filter(item => (item as any).id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete data');
      throw err;
    }
  };

  const refresh = () => loadData();

  return {
    data,
    loading,
    error,
    insert,
    update,
    remove,
    refresh
  };
}