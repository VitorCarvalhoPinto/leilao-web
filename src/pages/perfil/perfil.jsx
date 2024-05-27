import { getLeilao } from "../../services/leilaoService";
import { getBanco } from "../../services/bancoService";
import { useState, useEffect } from "react";
import formatDate from "../../functions/formatDate";
import { useNavigate } from "react-router-dom";
import { getCliente } from "../../services/clienteService";

const Perfil = () => {

    const navigate = useNavigate()

    const [associado, setAssociado] = useState([])
    const [leilao, setLeilao] = useState([])
    const [cliente, setCliente] = useState([])


    const idCliente = sessionStorage.getItem('id')
    const cpfcnpjCliente = sessionStorage.getItem('cpfcnpj')

    const handleSair = () => {
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('cpfcnpj')
        navigate('/login')
      }

    useEffect(() => {
        const dadoLeilao = async() => {
            await getLeilao({idCliente})
            .then((response) => {
                setLeilao(response.data)
            })
        }

        const dadoBanco = async() => {
            await getBanco({cpfcnpjCliente})
            .then((response) => {
                setAssociado(response.data)
            })
        }
        
        const dadoCliente = async() => {
            await getCliente({idCliente})
            .then((response) => {
                setCliente(response.data[0])
            })
        }

        
        dadoLeilao()
        dadoBanco()
        dadoCliente()
    }, [cpfcnpjCliente, idCliente])
    
    return(
        <>
            <h1>{cliente.nome}</h1>
            <h2>{cliente.cpfcnpj}</h2>
            <div className="tableForm" style={{width: '60%', margin: '30px 0'}}>
                <table>
                        <thead>
                            <tr>
                                <th>nome</th>
                                <th>abertura</th>
                                <th>fechamento</th>
                                <th>estado</th>
                                <th>link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leilao.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.nome}</td>
                                        <td>{formatDate(data.data_abertura)}</td>
                                        <td>{formatDate(data.data_fechamento)}</td>
                                        <td>{data.estado}</td>
                                        <td>{data.link}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            </div>


            <div className="tableForm" style={{width: '60%', margin: '30px 0'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Banco</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            associado.map((data) => (
                                <tr key={data.nome}>
                                    <td>{data.nome}</td>
                                    <td>editar/apagar</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={handleSair} className="sidebar-button" style={{width: '200px'}}>Sair</button>
        </>
    )
}

export default Perfil;