import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { createEntidade } from '../services/entidadeService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalCreateBanco = ({ id_leilao, id_tipo, open, handleClose }) => {

    // const navigate = useNavigate()

    // const cpfCnpj = sessionStorage.getItem('cpfcnpj');

    const [nomeEntidade, setnomeEntidade ] = useState('') //txt
    const [modeloEntidade, setmodeloEntidade ] = useState('')//txt
    const [enderecoEntidade, setEnderecoEntidade ] = useState('')//txt
    const [descEntidade, setDescEntidade ] = useState('')//txt
    const [lanceMin, setlanceMin ] = useState('')//txtn
    const [incrementoMin, setIncrementoMin ] = useState('')//txtn

    const handleCreateEntidade = async() => {
        await createEntidade({"id_tipo": id_tipo,
        "id_leilao": id_leilao,
        "nome": nomeEntidade,
        "modelo": modeloEntidade,
        "endereco": enderecoEntidade,
        "descricao": descEntidade,
        "min_lance": lanceMin,
        "min_incremento": incrementoMin})
        .then(window.location.reload())
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
                {id_tipo === 1? 'Criar Imovel' : 'Criar Veiculo'}
            </Typography>
            <TextField
                label="Nome"
                fullWidth
                margin="normal"
                value={nomeEntidade}
                onChange={(e) => setnomeEntidade(e.target.value)}
            />
            <TextField
                label="Modelo"
                fullWidth
                margin="normal"
                value={modeloEntidade}
                onChange={(e) => setmodeloEntidade(e.target.value)}
            />
            <TextField
                label="Endereço"
                fullWidth
                margin="normal"
                value={enderecoEntidade}
                onChange={(e) => setEnderecoEntidade(e.target.value)}
            />
            <TextField
                label="Descrição"
                fullWidth
                margin="normal"
                value={descEntidade}
                onChange={(e) => setDescEntidade(e.target.value)}
            />
            <TextField
                label="Lance mínimo"
                fullWidth
                type='number'
                margin="normal"
                value={lanceMin}
                onChange={(e) => setlanceMin(e.target.value)}
            />
            <TextField
                label="Incremento Adicional"
                type='number'
                fullWidth
                margin="normal"
                value={incrementoMin}
                onChange={(e) => setIncrementoMin(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateEntidade}
                fullWidth
            >
                Confirmar
            </Button>
        </Box>
        </Modal>
    );
};

export default ModalCreateBanco;
