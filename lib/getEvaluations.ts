import { supabase } from '@/lib/initSupabase';

export async function getEvaluations() {
  const data = await supabase.from('evaluations').select(`
    id,
    dataset_config (
        id,
        benchmark (
            id,
            name,
            description,
            type
        ),
        split_type,
        subtype
    ),
    model,
    evaluation_url
  `);

  return data;
}
