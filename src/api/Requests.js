import { delay } from "../utils/delay";
import { fetchInstance } from "../utils/Fetch";


export const fetchAllRequests = async () => {
  await delay(500);
  return fetchInstance.get({
    endpoint: "/request-cat",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
};


export const fetchPendingRequests = async ()=>{
    await delay(500);
    return fetchInstance.get({
        endpoint: "/request-cat/pending",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    });

}

export const fetchRequestData = async ()=>{
    const [allRequests, pendingRequests] = await Promise.all([
        fetchAllRequests(),
        fetchPendingRequests()
    ]);

    const allRequestData = await allRequests.json();
    const pendingRequestData = await pendingRequests.json();

    return { allRequestData, pendingRequestData };
}

export const createRequest = async (requestData, type) => {
    await delay(500);
    const response = await fetchInstance.post({
        endpoint: `/request-cat?type=${type}`,
        headers: { "Content-Type": "application/json" },
        body: requestData,
        credentials: 'include'
    });
    const data = await response.json();
    return data;
};

export const acceptRequest = async (id) => {
  await delay(500);
  const response = await fetchInstance.patch({
    endpoint: `/request-cat/accept/${id}`,
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
  return await response.json();
};

export const rejectRequest = async (id) => {
  await delay(500);
  const response = await fetchInstance.patch({
    endpoint: `/request-cat/reject/${id}`,
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
  return await response.json();
};
