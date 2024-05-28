import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { createLance } from '../services/lanceService';

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

const ModalCreateLance = ({ lance_minimo, incremento, id_entidade, open, handleClose }) => {

    const id = sessionStorage.getItem('id');

    const [lance, setLance ] = useState('') 
    const [showValorPequeno, setShowValorPequeno] = useState(false)

    const data = new Date()

    function parseMoney(moneyString) {
        const numberString = moneyString.replace(/[\$,]/g, '').trim();
        const number = parseFloat(numberString);
        return number;
    }

    const handleCreateLance = async() => {
        if (lance >= parseMoney(incremento) + lance_minimo){
            setShowValorPequeno(false)
            await createLance({"id_cliente": id,
            "id_entidade": id_entidade,
            "lance": lance,
            "data_lance": `${data.getUTCFullYear()}-${data.getUTCMonth() + 1}-${data.getUTCDate()}`})
            .then(() => window.location.reload())
        }else{
            setShowValorPequeno(true)
        }
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
                Dar lance
            </Typography>
            <TextField
                label="Lance"
                type='number'
                fullWidth
                margin="normal"
                value={lance}
                onChange={(e) => setLance(e.target.value)}
            />
            {showValorPequeno && <Typography style={{color: 'red'}} component="h5">
                Valor muito pequeno!
            </Typography>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateLance}
                fullWidth
            >
                Confirmar
            </Button>
        </Box>
        </Modal>
    );
};

export default ModalCreateLance;
