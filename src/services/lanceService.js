import instance from "../api/axios"

export const createLance = async(data) => {
    try{
        const response = await instance.post(`/entidadecliente`, data)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 