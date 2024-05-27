import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import InputMask from 'react-input-mask';
import { getMask } from '../functions/getMask';
import { createBanco } from '../services/bancoService';
import { useNavigate } from 'react-router-dom';

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

const ModalCreateBanco = ({ open, handleClose }) => {

    const navigate = useNavigate()

    const cpfCnpj = sessionStorage.getItem('cpfcnpj');

    const [nomeBanco, setNameBanco] = useState('');
    // const [cpfcnpj, setCpfCnpj] = useState('');

    const handleCreate = async () => {
            await createBanco({"nome": nomeBanco, "cnpj": cpfCnpj})
        .then(() => {
            navigate('/bancos')
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
                Criar banco
            </Typography>
            <TextField
                label="Nome"
                fullWidth
                margin="normal"
                value={nomeBanco}
                onChange={(e) => setNameBanco(e.target.value)}
            />
            <InputMask
                disabled={true}
                mask={getMask(cpfCnpj)}
                value={cpfCnpj}
                // onChange={(e) => setCpfCnpj(e.target.value)}
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
                onClick={handleCreate}
                fullWidth
            >
                Confirmar
            </Button>
        </Box>
        </Modal>
    );
};

export default ModalCreateBanco;
