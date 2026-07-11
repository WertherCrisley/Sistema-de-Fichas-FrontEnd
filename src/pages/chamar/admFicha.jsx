import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

import './chamar.css'

function AdmFicha() {
    const [fila, setFila] = useState([]);
    const [fichaAtual, setFichaAtual] = useState(null);



    async function carregarFila() {
        try {
            const res = await api.get('/fichas/fila');
            setFila(res.data);
        } catch (err) {
            console.error('Erro ao carregar fila:', err);
        }
    }

    function formatarTipo(tipo) {
        return tipo === 'PREFERENCIAL' ? 'Preferencial' : 'Normal';
    }

    async function chamarFicha(id) {
        try {
            const res = await api.patch(`/fichas/${id}/chamar`);
            setFichaAtual(res.data);
            carregarFila();
        } catch (err) {
            console.error('Erro ao chamar ficha:', err);
        }
    }

    async function finalizarFicha() {
        if (!fichaAtual) return;

        try {
            await api.patch(`/fichas/${fichaAtual.id}/finalizar`);
            setFichaAtual(null);
        } catch (err) {
            console.error('Erro ao finalizar ficha:', err);
        }
    }


    useEffect(() => {
        carregarFila();
    }, []);




    return (
        <div>
            <div className="adm-ficha-container">
                <h1>Chamar Cliente</h1>

                <div className="painel-chamada">

                    <div className="ficha-atual">

                        <p>Ficha:</p>
                        <div className='numero-ficha'>
                            <span>{fichaAtual ? fichaAtual.codigo : '--'}</span>
                        </div>
                        <div className='btn'>
                            <button onClick={finalizarFicha} disabled={!fichaAtual}>Finalizar</button>
                        </div>
                    </div>

                    <div className="fila-container">
                        <div className="fila-scroll">
                            <table className="fila-tabela">
                                <thead>
                                    <tr >
                                        <th>Ficha:</th>
                                        <th>Tipo:</th>
                                        <th>Criada:</th>
                                        <th><i className="bi bi-circle-fill"></i></th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                                    <tr >
                                        <td>A1</td>
                                        <td>Normal</td>
                                        <td >09:23</td>
                                        <td><button className="btn-chamar">Chamar</button></td>
                                    </tr>
                                </tbody> */}
                                <tbody>
                                    {fila.map((f) => (
                                        <tr key={f.id}>
                                            <td>{f.codigo}</td>
                                            <td>{formatarTipo(f.tipo)}</td>
                                            <td>{new Date(f.criadaEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>
                                                <button className="btn-chamar" onClick={() => chamarFicha(f.id)}>
                                                    Chamar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div className="fot">
                    <Link to="/"> <button><i className="bi bi-box-arrow-left"></i> Voltar</button></Link>
                    <footer>Criado por Werther Crisley</footer>
                </div>
            </div >
        </div>
    )
}
export default AdmFicha