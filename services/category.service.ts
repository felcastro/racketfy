import { supabase } from "../config/supabase";
import { Registration } from "./registration.service";

export interface Category {
  uuid: string;
  tournament_uuid: string;
  name: string;
  registrations: Registration[];
  created_at: string;
  updated_at: string;
}

export async function findCategoriesByTournamentUuid(tournament_uuid: string) {
  let { data, error } = await supabase
    .from<Category>("categories")
    .select("*, registrations (*)")
    .eq("uuid", tournament_uuid);

  if (error) {
    throw error;
  } else {
    return data;
  }
}
