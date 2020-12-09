
export interface Health {
    status: string
}

export async function requestGetHealth() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/health');
    let result: Health;
    try { 
        result = await response.json();
        console.log('--health', result);
        return result;
    } catch(e) {
        // console.log('TODO handle fetch serious failure, like JSON or CORS', e);
        return {status: 'DOWN'};
    }
}
