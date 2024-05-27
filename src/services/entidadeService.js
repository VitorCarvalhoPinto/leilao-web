import instance from "../api/axios"

export const getEntidade = async(idleilao) => {
    try{
        const response = await instance.get(`/entidade?idleilao${idleilao ? '=' + idleilao: ''}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 