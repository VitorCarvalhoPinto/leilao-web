import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import InputMask from 'react-input-mask';
import { getMask } from '../functions/getMask';
import { updateCliente } from '../services/clienteService';

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

const ModalEditPerfil = ({ open, handleClose }) => {

    const id = sessionStorage.getItem('id');
    const cpfCnpj = sessionStorage.getItem('cpfcnpj');

    const [nome, setName] = useState('');
    const [cpfcnpj, setCpfCnpj] = useState('');

    const handleEdit = async () => {
            await updateCliente({"nome": nome, 
                                "cpfcnpj": cpfcnpj.length === 0 ? cpfCnpj : cpfcnpj, 
                                "auth": true}, id)
        .then(() => {
            window.location.reload()
        })
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
                Editar Perfil
            </Typography>
            <TextField
                label="Nome"
                fullWidth
                margin="normal"
                value={nome}
                onChange={(e) => setName(e.target.value)}
            />
            <InputMask
                mask={getMask(cpfCnpj)}
                value={cpfcnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
                maskChar=""
                >
                {() => (
                    <TextField
                    label="CPF/CNPJ"
                    fullWidth
                    margin="normal"
                    />
                )}
            </InputMask>
            <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                fullWidth
            >
                Editar
            </Button>
        </Box>
        </Modal>
    );
};

export default ModalEditPerfil;
