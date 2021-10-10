import { supabase } from "../config/supabase";

export enum RegistrationStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export interface Registration {
  uuid: string;
  category_uuid: string;
  players: string[];
  status: RegistrationStatus;
  created_at: string;
  updated_at: string;
}

export async function createRegistration(
  registration: Omit<Registration, "uuid" | "created_at" | "updated_at">
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
