import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { getLogin } from "../../services/clienteService";
import { getMask } from "../../functions/getMask";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('cpfcnpj')
    }, [])

    const [cpfcnpj, setCpfcnpj] = useState('')
    const [selectedOption, setSelectedOption] = useState('')

    const handleRegister = () => {
        navigate('/register')
    }

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

    return(
        <div className="container-login">
            <div className="card-login">
                <h1>Login</h1>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="">Selecione a forma de Login</option>
                    <option value="cpf">CPF</option>
                    <option value="cnpj">CNPJ</option>
                </select>
                <InputMask
                    disabled={selectedOption === "" ? true : false}
                    placeholder="CPF/CNPJ"
                    mask={getMask(selectedOption)}
                    value={cpfcnpj}
                    onChange={(e) => setCpfcnpj(e.target.value)}
                />
                <button disabled={selectedOption === "" ? true : false} onClick={handleConfirm}>Confirmar</button>
                <p className="register-button" onClick={handleRegister}>Não possui uma conta? Registre-se!</p>
            </div>
        </div>
    );
}


export default Login;