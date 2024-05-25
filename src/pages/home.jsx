import { useEffect, useState } from "react"
import { getLeilao } from "../services/leilaoService"
const Home = () => {

    const [tipo, setTipo] = useState('')
    const [nomeLeilao, setNomeLeilao] = useState('')
    const [leilao, setLeilao] = useState([])

    // const id = sessionStorage.getItem('id')
    // const cpfcnpj = sessionStorage.getItem('cpfcnpj') 

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
        <div>
            <select className="tipo">
                <option value="1">IMOVEL</option>
                <option value="2">VEICULO</option>
            </select>
            <input type="text" id="nome leilao" placeholder="nome leilao" />
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
                            <td>{data.data_abertura}</td>
                            <td>{data.data_fechamento}</td>
                            <td>{data.estado}</td>
                            <td>{data.link}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Home;