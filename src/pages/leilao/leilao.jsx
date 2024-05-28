import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneLeilao } from "../../services/leilaoService";
import formatDate from "../../functions/formatDate";
import { getEntidade } from "../../services/entidadeService";
import ModalCreateBanco from "../../components/modalCreateEntidade";

const Leilao = () => {

    const navigate = useNavigate()
    const { idLeilao } = useParams();

    const [leilao, setLeilao] = useState([])
    const [entidades, setEntidades] = useState([])

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

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

            <button className="sidebar-button" style={{width: '250px'}} onClick={() => setOpen(true)}>
                {leilao.id_tipo === 1? 'Criar Imovel' : 'Criar Veiculo'}
            </button>

            <div className="entidades-list">
                {entidades && entidades.map((entidade) => (
                        <div key={entidade.id} className="entidade-card" onClick={() => navigate('/entidade/'+ entidade.id)}>
                            <h2>{entidade.nome}</h2>
                            <p>{entidade.descricao}</p>
                            <p><strong>Endereço:</strong> {entidade.endereco}</p>
                            <p><strong>Modelo:</strong> {entidade.modelo}</p>
                        </div>
                ))}
            </div>
            <ModalCreateBanco id_leilao={leilao.id} id_tipo={leilao.id_tipo} open={open} handleClose={handleClose}/>
        </>
    )
}

export default Leilao