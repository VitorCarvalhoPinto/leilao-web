import instance from "../api/axios";

export const getLogin = async(data) => {
    try{
        const response = await instance.get(`/login?id=${data}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 

export const getCliente = async(data) => {
    try{
        const response = await instance.get(`/clientes?id${data.idCliente ? '=' + data.idCliente: ''}`)
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

export const updateCliente = async(data, id) => {
    try{
        const response = await instance.put(`/clientes/${id}`, data)
        
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
}

export const deleteCliente = async(id) => {
    try{
        const response = await instance.delete(`/clientes/${id}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
}