import axios from "axios";

const BASE = "https://countriesnow.space/api/v0.1";

export const getCountries = async () => {
  const res = await axios.get(`${BASE}/countries/positions`);
  return res.data.data.map((c: any) => c.name);
};

export const getStates = async (country: string) => {
  const res = await axios.post(`${BASE}/countries/states`, { country });
  return res.data.data.states.map((s: any) => s.name);
};

export const getCities = async (country: string, state: string) => {
  const res = await axios.post(`${BASE}/countries/state/cities`, { country, state });
  return res.data.data;
};
