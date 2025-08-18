import { fetchInstance } from "../utils/Fetch";
import { delay } from "../utils/delay";
export const fetchCats = async () => {
    await delay(100000);
  const response = await fetchInstance.get({
    endpoint: "/animal?adoptable=true",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.data;
};

// Loader: devuelve un objeto con promesas
export const fetchCatsLoader = () => {
  return {
    cats: fetchCats(), // es una promesa, React Router lo entiende
  };
};
