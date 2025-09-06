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
  // await delay(500);
  console.table(catData)
  const response = await fetchInstance.postMultipart({
    endpoint: "/animal",
    body: catData,
    credentials: 'include'
  });
  return await response.json();
};

export const deleteCat = async (catId) => {
  await delay(500);
  const response = await fetchInstance.delete({
    endpoint: `/animal/${catId}`,
    credentials:'include'
  });
  return await response.json();
};


export const fetchMyCats = async () => {
  await delay(800);
  const response = await fetchInstance.get({
    endpoint: "/animal/sponsorships",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
  return await response.json();
}

export const fetchLastCat = async ({adoptable}) =>{
  await delay(500);
  const response = await fetchInstance.get({
    endpoint: `/animal/last?adoptable=${adoptable}`,
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}
