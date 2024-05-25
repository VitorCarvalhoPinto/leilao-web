import instance from "../api/axios";

export const getLogin = async(data) => {
    try{
        const response = await instance.get(`/login?id=${data}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 

export const createClient = async(data) => {
    try{
        const response = await instance.post('/clientes', data)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
            
}