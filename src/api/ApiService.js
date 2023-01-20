const baseUrl = 'http://10.19.22.143:5000/';
// create API Services for each endpoint using Fetch

// GET /patterns/mps
const getMps = async () => {
    const response = await fetch(`${baseUrl}patterns/mps`);
    // return data 
    return response.json();


}
// GET /patterns/wps
const getWps = async () => {
    const response = await fetch(`${baseUrl}patterns/wps`);
    // return data
    return response.json();
}
// GET /patterns/wo
const getWo = async () => {
    const response = await fetch(`${baseUrl}patterns/wo`);
    // return data
    return response.json();
}

//export API Services
export { getMps, getWps, getWo };








