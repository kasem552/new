import { supabase } from './config';

export async function fetchTableData(table: string) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching ${table} data:`, error);
    throw error;
  }
}

export async function insertRow(table: string, data: any) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select();

    if (error) throw error;
    return result[0];
  } catch (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw error;
  }
}

export async function updateRow(table: string, id: string, data: any) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select();

    if (error) throw error;
    return result[0];
  } catch (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }
}

export async function deleteRow(table: string, id: string) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw error;
  }
}