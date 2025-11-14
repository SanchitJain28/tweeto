import { FullProfile } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getFullProfile(): Promise<FullProfile> {
  try {
    const { data } = await axios.get("/api/fetch-user-profile");
    return data;
  } catch (error) {
    throw error;
  }
}

export const useFullProfile = ({
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["FullProfile"],
    queryFn: () => getFullProfile(),
    staleTime: 0,
    gcTime: 0,
    enabled: enabled,
  });
};