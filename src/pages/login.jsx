import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { getLogin } from "../services/clienteService";

const Login = () => {
    const navigate = useNavigate();

    const [cpfcnpj, setCpfcnpj] = useState('')
    const [selectedOption, setSelectedOption] = useState('')

    const handleConfirm = async () => {
        await getLogin(cpfcnpj)
        .then(response => {
            if(response.data.length) {
                sessionStorage.setItem('id', response.data[0].id)
                sessionStorage.setItem('cpfcnpj', response.data[0].cpfcnpj)
                navigate('/home')
            } else {
                console.log('cpf/cnpj não encontrado')
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    } 

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        setCpfcnpj('')
    }

    const getMask = () => {
        return selectedOption === 'cpf' ? '999.999.999-99' : '99.999.999/9999-99';
    }

    return(
        <div>
            <h1>login</h1>
            <select value={selectedOption} onChange={handleChange}>
                <option value="cpf">cpf</option>
                <option value="cnpj">cnpj</option>
            </select>
            <InputMask
                placeholder="cpf/cnpj"
                mask={getMask()}
                value={cpfcnpj}
                onChange={(e) => setCpfcnpj(e.target.value)}
            />
            <button onClick={handleConfirm}>Confirmar</button>
        </div>
    );
}


export default Login;