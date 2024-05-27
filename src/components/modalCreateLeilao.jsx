import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { getBanco } from '../services/bancoService';
// import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { createLeilao } from '../services/leilaoService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalCreateLeilao = ({ open, handleClose }) => {

    // const navigate = useNavigate()

    const id = sessionStorage.getItem('id');
    const cpfCnpj = sessionStorage.getItem('cpfcnpj');

    const [bancoOpt, setBancoOpt] = useState([])

    const [bancoOptChange, setBancoOptChange] = useState('')
    const [tipo, setTipo] = useState('')

    const [leilao, setLeilao] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [endereco, setEndereco] = useState('')
    const [value, setValue] = React.useState([
        dayjs(''),
        dayjs(''),
      ]);
    

    const handleChangeTipo = (e) => setTipo(e.target.value)
    const handleChangeBanco = (e) => setBancoOptChange(e.target.value)


    function formatDate(dateString) {
        const date = new Date(Date.parse(dateString));

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();

        return `${year}/${month}/${day}`;
    }


    const handleCreate = async () => {
        await createLeilao({
            "id_tipo": tipo,
            "id_banco": bancoOptChange,
            "id_cliente": id,
            "nome": leilao,
            "data_abertura": formatDate(value[0].$d).replaceAll('/', '-'),
            "data_fechamento": formatDate(value[0].$d).replaceAll('/', '-'),
            "endereco": endereco,
            "estado": estado,
            "cidade": cidade,
            "link": ''
        })
        .then(() => {
            // window.location.reload()
        })
    };

    useEffect(() => {
        const getBancoOptions = async() => {
            await getBanco({"cpfcnpjCliente": cpfCnpj})
            .then((response) => {
                setBancoOpt(response.data);
            })
        }

        getBancoOptions()
    }, [cpfCnpj])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
                Criar Leialo
            </Typography>
            <select className="tipo" value={tipo} onChange={handleChangeTipo}>
                <option value=''>Selecione o tipo</option>
                <option value="1">IMOVEL</option>
                <option value="2">VEICULO</option>
            </select>

            <select className="tipo" value={bancoOptChange} onChange={handleChangeBanco}>
                <option value=''>Selecione o banco</option>
                {bancoOpt.map((data) => (
                    <option value={data.id} key={data.id}>{data.nome}</option>
                ))}
            </select>

            <TextField
                label="Nome do Leilao"
                fullWidth
                margin="normal"
                value={leilao}
                onChange={(e) => setLeilao(e.target.value)}
            />

            <TextField
                label="Estado"
                fullWidth
                margin="normal"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            />

            <TextField
                label="Cidade"
                fullWidth
                margin="normal"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
            />

            <TextField
                label="Endereço"
                fullWidth
                margin="normal"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                    inputFormat="dd.MM.yyyy"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </LocalizationProvider>
            
            <Button
                style={{marginTop: '50px'}}
                disabled={bancoOptChange === "" ? true : false} //fazer verificação de campos vazios
                variant="contained"
                color="primary"
                onClick={handleCreate}
                fullWidth
            >
                Confirmar
            </Button>
        </Box>
        </Modal>
    );
};

export default ModalCreateLeilao;
