import { supabase } from "../config/supabase";
import { Category } from "./category.service";
export interface Tournament {
  uuid: string;
  user_uuid: string;
  name: string;
  location?: string;
  date: string;
  price: number;
  categories: Category[];
  created_at: string;
  updated_at: string;
}

export async function findTournament(uuid: string) {
  let { data, error } = await supabase
    .from<Tournament>("tournaments")
    .select("*, categories (*, registrations (*))")
    .eq("uuid", uuid)
    // TODO - Wait for https://github.com/supabase/postgrest-js/issues/197 resolution
    //@ts-ignore
    .filter('categories.registrations.status', 'eq', 'APPROVED')
    .limit(1)
    .single();

  if (error) {
    throw error;
  } else {
    return data;
  }
}
