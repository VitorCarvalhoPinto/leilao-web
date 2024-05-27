import instance from "../api/axios"

export const getBanco = async(data = []) => {
    try{
        const response = await instance.get(`/banco?id${data.cpfcnpjCliente ? '=' + data.cpfcnpjCliente: ''}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 

export const getAssociado = async() => {
    try{
        const response = await instance.get(`/getassociate`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 