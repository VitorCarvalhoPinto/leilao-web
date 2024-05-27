import { useState, useEffect } from "react"
import { getAssociado } from "../../services/bancoService"
import { isCNPJ } from "../../functions/isCnpjCpf"
import ModalCreateBanco from "../../components/modalCreateBanco"

const Bancos = () => {

    const [associado, setAssociado] = useState([])
    const isCnpj = isCNPJ()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    
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
            <div className="form-filter">
                    {isCnpj && <button onClick={() => setOpen(true)} className="sidebar-button" style={{width: '250px'}}>Criar instituição financeira</button>}
                </div>
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
            <ModalCreateBanco open={open} handleClose={handleClose}/>
        </div>
    )
}

export default Bancos;