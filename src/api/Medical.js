import { fetchInstance } from "../utils/Fetch";
// import { delay } from "../utils/delay";




export const fetchMedicalData = async () => {
    // await delay(500);
    const response = await fetchInstance.get({
        endpoint: "/medical",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    });
    return await response.json();
}


export const createMedicalRecord = async (recordData) => {
    try {
        const response = await fetchInstance.post({
            endpoint: "/medical",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: recordData
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating medical record:", error); 
        throw error;
    }
}


export const updateMedicalRecord = async (id, updatedData) => {
    try {
        console.log('Updating medical record with data:', updatedData);
        console.log('Medical record ID:', id);
        const response = await fetchInstance.put({
            endpoint: `/medical/${id}`,
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: updatedData
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating medical record:", error);
        throw error;
    }
}