import instance from "../api/axios"

export const getEntidade = async(data = []) => {
    try{
        const response = await instance.get(`/entidade`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 