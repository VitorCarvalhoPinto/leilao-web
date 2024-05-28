import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { createClient } from "../../services/clienteService";
import { getMask } from "../../functions/getMask";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [cpfcnpj, setCpfcnpj] = useState('')

    const [selectedOption, setSelectedOption] = useState('')

    const handleConfirm = async () => {
        const data = { nome: name, cpfcnpj: cpfcnpj, auth: true }
        await createClient(data).then(response => {
            console.log('Resposta do servidor:', response.data);
            navigate('/login')
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    } 

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        setCpfcnpj('')
    }

    return(
        <div className="container-login">
            <div className="card-login">
            <h1>registro</h1>
            <select value={selectedOption} onChange={handleChange}>
                    <option value="">Selecione a forma de Login</option>
                    <option value="cpf">CPF</option>
                    <option value="cnpj">CNPJ</option>
            </select>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="name" id="name" />
            <InputMask
                placeholder="cpf/cnpj"
                mask={getMask(selectedOption)}
                value={cpfcnpj}
                onChange={(e) => setCpfcnpj(e.target.value)}
            />
                <button disabled={selectedOption === "" ? true : false} onClick={handleConfirm}>Confirmar</button>
            </div>
        </div>
    );
}


export default Register;