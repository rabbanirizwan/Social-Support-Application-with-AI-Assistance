import { useQuery } from "@tanstack/react-query";
import { getCountries, getStates, getCities } from "../api/location";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
};

export const useStates = (country: string | undefined) => {
    console.log("country",country)
  return useQuery({
    queryKey: ["states", country],
    queryFn: () => getStates(country!),
    enabled: !!country, // only fetch when country selected
  });
};

export const useCities = (country: string | undefined, state: string | undefined) => {
  return useQuery({
    queryKey: ["cities", country, state],
    queryFn: () => getCities(country!, state!),
    enabled: !!country && !!state, // only fetch when both selected
  });
};
