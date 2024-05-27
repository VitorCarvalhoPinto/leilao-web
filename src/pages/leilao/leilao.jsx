import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneLeilao } from "../../services/leilaoService";
import formatDate from "../../functions/formatDate";
import { getEntidade } from "../../services/entidadeService";


const Leilao = () => {

    let { idLeilao } = useParams();

    const [leilao, setLeilao] = useState([])
    const [entidades, setEntidades] = useState([])

    useEffect(() => {
        const dadoLeilao = async() => {
            await getOneLeilao(idLeilao)
            .then((response) => {
                setLeilao(response.data[0])
            })
        }

        const dadosEntidades = async() => {
            await getEntidade(idLeilao)
            .then((response) => {
                setEntidades(response.data)
            })
        }

        dadosEntidades()
        dadoLeilao()
    }, [idLeilao])

    return (
        <>
            <div className="leilao-infos">
                <h1>{leilao.nome}</h1>
                <h2>{leilao.estado}, {leilao.cidade}</h2>
                <h2>{leilao.endereco}</h2>
                <h3>de {formatDate(leilao.data_abertura)} até {formatDate(leilao.data_fechamento)}</h3>
            </div>

            <div className="entidades-list">
                {entidades && entidades.map((entidade) => (
                        <div key={entidade.id} className="entidade-card">
                            <h2>{entidade.nome}</h2>
                            <p>{entidade.descricao}</p>
                            <p><strong>Endereço:</strong> {entidade.endereco}</p>
                            <p><strong>Incremento Mínimo:</strong> {entidade.min_incremento}</p>
                            <p><strong>Lance Mínimo:</strong> {entidade.min_lance}</p>
                            <p><strong>Modelo:</strong> {entidade.modelo}</p>
                            <p style={{fontSize: '22px'}}><strong>Lance Atual:</strong> atual</p>
                        </div>
                ))}
            </div>

        </>
    )
}

export default Leilao