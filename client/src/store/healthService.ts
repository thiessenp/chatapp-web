export interface Health {
    status: string
}

export async function requestGetHealth() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/health');

    try { 
        let result: Health = await response.json();
        return result;
    } catch(e) {
        return {status: 'DOWN'};
    }
}
