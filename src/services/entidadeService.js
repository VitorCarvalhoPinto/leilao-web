import instance from "../api/axios"

export const getEntidade = async(idleilao) => {
    try{
        const response = await instance.get(`/entidades?idleilao${idleilao ? '=' + idleilao: ''}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
}

export const getUmEntidade = async(idEntidade) => {
    try{
        const response = await instance.get(`/entidade/${idEntidade}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
}

export const getLances = async(idEntidade) => {
    try{
        const response = await instance.get(`/entidadecliente?identidade${idEntidade ? '=' + idEntidade: ''}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
}


export const createEntidade = async(data) => {
    try{
        const response = await instance.post(`/entidade`, data)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
}
