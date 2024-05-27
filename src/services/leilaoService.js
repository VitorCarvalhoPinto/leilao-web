import instance from "../api/axios"

export const getLeilao = async(data = []) => {
    try{
        const response = await instance.get(`/leilao?idtipo${data.tipo ? '=' + data.tipo: ''}&nome${data.nomeLeilao ? '=' + data.nomeLeilao : ''}&idcliente${data.idCliente ? '=' + data.idCliente : ''}`)
        return response
    } catch (e) {
        console.log('error: ' + e)
    }
} 