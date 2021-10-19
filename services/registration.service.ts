import { supabase } from "../config/supabase";

export type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Registration {
  uuid: string;
  category_uuid: string;
  players: string[];
  status: RegistrationStatus;
  created_at: string;
  updated_at: string;
}

export async function createRegistration(
  registration: Pick<Registration, "category_uuid" | "players" | "status">
) {
  let { data, error } = await supabase
    .from<Registration>("registrations")
    .insert(registration);

  if (error) {
    throw error;
  } else {
    return data;
  }
}
