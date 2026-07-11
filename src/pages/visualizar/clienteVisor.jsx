import Nav from '../../componente/navBar'
import { useState, useEffect } from "react";
import api from "../../services/api";
import { io } from "socket.io-client";
import bipe from "../../../public/bipe.mp3"
import './visor.css'
const socket = io('https://sistema-de-fichas-backend.onrender.com');





function ClienteVisor() {
    const [historico, setHistorico] = useState([]);
    const [chamadaAtual, setChamadaAtual] = useState(null);
    const [somAtivado, setSomAtivado] = useState(false);

    async function carregarHistorico() {
        try {
            const res = await api.get('/fichas/historico');
            const [primeira, ...resto] = res.data;
            setChamadaAtual(primeira || null);
            setHistorico(resto);
        } catch (err) {
            console.error('Erro ao carregar histórico:', err);
        }
    }

    function anunciarFicha(ficha) {

        const bipe = new Audio(bipe);
        bipe.play();

        bipe.onended = () => {
            const texto = `Senha ${ficha.codigo.split('').join(' ')}, dirija-se ao guichê`;
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            fala.rate = 0.9; // um pouco mais devagar, fica mais claro
            window.speechSynthesis.speak(fala);
        };
    }

    function ativarSom() {
        // "destrava" o áudio/fala com uma interação real do usuário
        const fala = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(fala);

        const bipe = new Audio('/bipe.mp3');
        bipe.volume = 0;
        bipe.play();

        setSomAtivado(true);
    }


    useEffect(() => {
        carregarHistorico(); // carrega uma vez ao abrir a tela

        // socket.on('ficha-chamada', () => {
        //     carregarHistorico(); // recarrega só quando avisado
        // });
        socket.on('ficha-chamada', (ficha) => {
            // alert('Evento recebido! Ficha: ' + ficha.codigo); // teste temporário
            carregarHistorico();
        });

        return () => {
            socket.off('ficha-chamada');
        };
    }, []);




    return (
        <div>
            <Nav></Nav>

            {!somAtivado && (
                <div className='overlay-som'>
                    <button onClick={ativarSom}>🔊 Ativar som do painel</button>
                </div>
            )}

            <div className='container-visu'>

                <div className='historico'>
                    {historico.map((F) => (
                        <div key={F.id} className='box'>
                            <p>{F.codigo}</p>
                            <p>Chamada</p>
                        </div>
                    ))}


                </div>

                <div className='main'>
                    <h2>{chamadaAtual ? chamadaAtual.codigo : '--'}</h2>
                    <h6>Guichê <span>3</span></h6>
                </div>
            </div>
        </div>
    )
}
export default ClienteVisor