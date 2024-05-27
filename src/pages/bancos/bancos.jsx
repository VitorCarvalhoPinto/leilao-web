import { useState, useEffect } from "react"
import { getAssociado } from "../../services/bancoService"

const Bancos = () => {

    const [associado, setAssociado] = useState([])

    const id = sessionStorage.getItem('id')

    useEffect(() => {
        const dadoAssociado = async() => {
            await getAssociado()
            .then((response) => {
                setAssociado(response.data)
            })
        }

        dadoAssociado()
    }, [])

    return(
        <div>
            {id && <div className="tableForm">
                <table>
                    <thead>
                        <tr>
                            <th>Banco</th>
                            <th>Cliente</th>
                            <th>CNPJ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            associado.map((data) => (
                                <tr key={data.banco_nome}>
                                    <td>{data.banco_nome}</td>
                                    <td>{data.cliente_nome}</td>
                                    <td>{data.cnpj}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}

export default Bancos;