import { useEffect, useState } from "react"
import { getLeilao } from "../../services/leilaoService"
import formatDate from "../../functions/formatDate"
import { isCNPJ } from "../../functions/isCnpjCpf"
import ModalCreateLeilao from "../../components/modalCreateLeilao"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate()

    const isCnpj = isCNPJ()

    const [tipo, setTipo] = useState('')
    const [nomeLeilao, setNomeLeilao] = useState('')
    const [leilao, setLeilao] = useState([])

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const id = sessionStorage.getItem('id')

    const handleChange = (e) => {
        setTipo(e.target.value);
    }

    useEffect(() => {
        const dadoLeilao = async() => {
            await getLeilao({tipo, nomeLeilao})
            .then((response) => {
                setLeilao(response.data)
            })
        }

        dadoLeilao()
    }, [nomeLeilao, tipo])

    const handleVerLeilao = (id) => {
        navigate('/leilao/'+id)
    }

    return(
        <>
            {id && <div className="tableForm">
                <div className="form-filter">
                    <select className="tipo" value={tipo} onChange={handleChange}>
                        <option value=''>Selecione o tipo</option>
                        <option value="1">IMOVEL</option>
                        <option value="2">VEICULO</option>
                    </select>
                    <input type="text" id="nome leilao" onChange={(e) => setNomeLeilao(e.target.value)} placeholder="nome leilao" />
                    {isCnpj && <button onClick={() => setOpen(true)} className="sidebar-button" style={{width: '250px'}}>Criar leilao</button>}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>nome</th>
                            <th>abertura</th>
                            <th>fechamento</th>
                            <th>estado</th>
                            <th></th>
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
                                    <td style={{cursor: 'pointer'}} onClick={() => handleVerLeilao(data.id)}>Ver mais</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>}
            <ModalCreateLeilao open={open} handleClose={handleClose}/>
        </>
        
    )
}

export default Home;