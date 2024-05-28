import { useParams } from "react-router-dom"
import { getUmEntidade } from "../../services/entidadeService"
import { useEffect, useState } from "react"
import { getLances } from "../../services/entidadeService"
import lanceMinimo from "../../functions/lanceMinimo"
import ModalCreateLance from "../../components/modalCreateLance"

const Entidade = () => {

    const { idEntidade } = useParams()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [entidade, setEntidade] = useState([])
    const [lances, setlances] = useState([])
    const [incremento, setIncremento] = useState(0)
    const [primeirLance, setPrimeiroLance] = useState(0)

    useEffect(() => {
        const dadosEntidade = async() => {
            await getUmEntidade(idEntidade)
            .then((response) => {
                
                setEntidade(response.data[0])
                setIncremento(response.data[0].min_incremento)
                setPrimeiroLance(response.data[0].min_lance)
            })
        }
        
        const dadosLances = async() => {
            await getLances(idEntidade)
            .then((response) => {
                setlances(response.data)
            })
        }

        dadosEntidade()
        dadosLances()
    }, [idEntidade])
    
    return(
        <>
            {(entidade && lances) && <div className="tableForm">
                <div>
                    <h1>nome: {entidade.nome}</h1>
                    <h1>modelo: {entidade.modelo}</h1>
                    <h2>endereco: {entidade.endereco}</h2>
                    <h2>descricao: {entidade.descricao}</h2>
                    <h3>lance mínimo: {lances.length > 0 ? lanceMinimo(lances) : primeirLance} + {incremento}</h3>
                    <h3>incremento mínimo: {entidade.min_incremento}</h3>
                    <button className="sidebar-button" style={{width: '250px'}} onClick={() => setOpen(true)}>Dar lance</button>
                </div>
                
                <table style={{width: '20%'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>lances</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lances.map((data) => (
                                <tr key={data.lance}>
                                    <td style={{textAlign: 'center'}}>{data.lance}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <ModalCreateLance lance_minimo={lances.length > 0 ? lanceMinimo(lances) : primeirLance} incremento={incremento} id_entidade={entidade.id} open={open} handleClose={handleClose}/>
            </div>
            }
        </>
    )
}

export default Entidade