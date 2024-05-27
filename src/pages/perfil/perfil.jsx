import { getLeilao } from "../../services/leilaoService";
import { deleteBanco, getBanco } from "../../services/bancoService";
import { useState, useEffect } from "react";
import formatDate from "../../functions/formatDate";
import { useNavigate } from "react-router-dom";
import { deleteCliente, getCliente } from "../../services/clienteService";
import { isCNPJ } from "../../functions/isCnpjCpf";
import ModalEditPerfil from "../../components/modalEditPerfil";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Perfil = () => {

    const navigate = useNavigate()

    const isCnpj = isCNPJ()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [associado, setAssociado] = useState([])
    const [leilao, setLeilao] = useState([])
    const [cliente, setCliente] = useState([])

    const MySwal = withReactContent(Swal);

    const idCliente = sessionStorage.getItem('id')
    const cpfcnpjCliente = sessionStorage.getItem('cpfcnpj')

    const handleSair = () => {
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('cpfcnpj')
        navigate('/login')
    }

    const handleDeletar = async() => {
        await deleteCliente(idCliente)
        .then(() => {
            handleSair()
        })
    }

    const handleDeleteBanco = async(idBanco) => {
        await deleteBanco(idBanco)
        .then(() => {
            // window.location.reload()
        })
    }

    const confirmDelecaoPerfil = () => {
        MySwal.fire({
          title: 'Tem certeza?',
          text: 'Você não poderá reverter isso!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        }).then((result) => {
          if (result.isConfirmed) {
            handleDeletar();
            MySwal.fire(
              'Deletado!',
              'Sua conta foi deletada.',
              'success'
            );
          }
        });
    };

    function confirmDelecaoBanco(idBanco) {
            MySwal.fire({
              title: 'Tem certeza?',
              text: 'Você não poderá reverter isso!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sim',
              cancelButtonText: 'Não'
            }).then((result) => {
              if (result.isConfirmed) {
                handleDeleteBanco(idBanco)
                MySwal.fire(
                  'Deletado!',
                  'Seu banco foi deletado.',
                  'success'
                );
              }
            });
    }
    


    useEffect(() => {
        const dadoLeilao = async() => {
            await getLeilao({idCliente})
            .then((response) => {
                setLeilao(response.data)
            })
        }

        const dadoBanco = async() => {
            await getBanco({cpfcnpjCliente})
            .then((response) => {
                setAssociado(response.data)
            })
        }
        
        const dadoCliente = async() => {
            await getCliente({idCliente})
            .then((response) => {
                setCliente(response.data[0])
            })
        }

        
        dadoLeilao()
        dadoBanco()
        dadoCliente()
    }, [cpfcnpjCliente, idCliente])
    
    return(
        <>
            <h1>{cliente.nome}</h1>
            <h2>{cliente.cpfcnpj}</h2>
            <button onClick={() => setOpen(true)} className="sidebar-button" style={{width: '200px'}}> Editar perfil </button>
            {isCnpj && <div className="tableForm" style={{width: '60%', margin: '30px 0'}}>
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
                                        <td>{formatDate(data.data_abertura)}</td>
                                        <td>{formatDate(data.data_fechamento)}</td>
                                        <td>{data.estado}</td>
                                        <td>{data.link}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            </div>
            }

            {isCnpj && <div className="tableForm" style={{width: '30%', margin: '30px 0'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Banco</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            associado.map((data) => (
                                <tr key={data.nome}>
                                    <td>{data.nome}</td>
                                    <td>
                                        <DeleteIcon onClick={() => confirmDelecaoBanco(data.id)}/>
                                        <ModeEditIcon onClick={() => console.log('editar')}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            }
            <button onClick={handleSair} className="sidebar-button" style={{width: '200px'}}>Sair</button>
            <button onClick={confirmDelecaoPerfil} className="sidebar-button" style={{width: '200px'}}>Deletar conta</button>
            <ModalEditPerfil open={open} handleClose={handleClose}/>
        </>
    )
}

export default Perfil;