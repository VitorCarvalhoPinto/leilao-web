import { useCallback, useEffect, useState } from "react"
import { getLeilao } from "../services/leilaoService"
import formatDate from "../functions/formatDate"
import './style.css';

const Home = () => {

    const [tipo, setTipo] = useState('')
    const [nomeLeilao, setNomeLeilao] = useState('')
    const [leilao, setLeilao] = useState([])

    const id = sessionStorage.getItem('id')
    const cpfcnpj = sessionStorage.getItem('cpfcnpj') 

    const handleChange = (e) => {
        setTipo(e.target.value);
    }

    useEffect(() => {
        const teste = async() => {
            await getLeilao({tipo, nomeLeilao})
            .then((response) => {
                setLeilao(response.data)
            })
        }

        teste()
    }, [nomeLeilao, tipo])

    return(
        <>

            <div className="App">
                <div className="sidebar">
                    <button className="sidebar-button">Button 1</button>
                    <button className="sidebar-button">Button 2</button>
                    <button className="sidebar-button">Button 3</button>
                </div>
                <div className="content">

                <div className="tableForm">
                    <div className="form-filter">
                        <select className="tipo" value={tipo} onChange={handleChange}>
                            <option value=''>Selecione o tipo</option>
                            <option value="1">IMOVEL</option>
                            <option value="2">VEICULO</option>
                        </select>
                        <input type="text" id="nome leilao" onChange={(e) => setNomeLeilao(e.target.value)} placeholder="nome leilao" />
                    </div>

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
                </div>
            </div>
            
        </>
        
    )
}

export default Home;