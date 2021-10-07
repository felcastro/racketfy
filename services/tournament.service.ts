import { supabase } from "../config/supabase";

export interface Team {
  uuid: string;
  players: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  uuid: string;
  tournamentUuid: string;
  name: string;
  teams: Team[];
  createdAt: string;
  updatedAt: string;
}

export interface Tournament {
  uuid: string;
  userUuid: string;
  name: string;
  location?: string;
  date: string;
  price: number;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export async function findTournament(uuid: string) {
  let { data, error } = await supabase
    .from<Tournament>("tournaments")
    .select(`*, categories (*, teams (*))`)
    .filter("uuid", "eq", uuid)
    .limit(1)
    .single();

  if (error) {
    throw error;
  } else {
    return data;
  }
}
