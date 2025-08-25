import { fetchInstance } from "../utils/Fetch";
import { delay } from "../utils/delay";


export const fetchAllCats = async () => {
  await delay(500);
  const response = await fetchInstance.get({
    endpoint: "/animal?adoptable=false",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

export const fetchAdoptableCats = async () => {
  await delay(500);
  const response = await fetchInstance.get({
    endpoint: "/animal?adoptable=true",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

export const postCat = async (catData) => {
  await delay(500);
  const response = await fetchInstance.postMultipart({
    endpoint: "/animal",
    body: catData,
  });
  return await response.json();
};

export const deleteCat = async (catId) => {
  await delay(500);
  const response = await fetchInstance.delete({
    endpoint: `/animal/${catId}`,
  });
  return await response.json();
};
