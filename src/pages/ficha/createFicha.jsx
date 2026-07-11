import { Link } from "react-router-dom";
import { useState } from "react";
import Nav from '../../componente/navBar'
import api from "../../services/api";
import './criar.css'


function CreateFicha() {
    const [fichaCriada, setFichaCriada] = useState(null);
    const [Iniciar, setIniciar] = useState(true);
    const [tipo, setTipo] = useState(false);
    const [final, setFinal] = useState(false)

    async function criarFicha(tipoFicha) {

        try {

            const resposta = await api.post("/Criarfichas", {
                tipo: tipoFicha
            });

            setFichaCriada(resposta.data);

            setIniciar(false);
            setTipo(false);
            setFinal(true);

            setTimeout(() => {
                setFinal(false);
                setIniciar(true);
            }, 4000);


        } catch (erro) {
            console.log("Erro ao criar ficha:", erro);
        }

    }

    // function finalizar() {
    //     setIniciar(false); 
    //     setTipo(false);
    //      setFinal(true)

    //      setTimeout(() => {
    //         setFinal(false);
    //         setIniciar(true);
    //     }, 3000);
    // }

    return (
        <div>
            {/* navbar */}
            <div style={{ position: 'fixed', display: 'flex', width: '100%', height: '70px', color: 'white', background: '#0a383b', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
                <div style={{ flex: '40%' }}><Link to="/"><button className="btnVoltar"> ← Voltar</button></Link></div>
                <div style={{ flex: '60%', fontSize: '25px' }}><h2 style={{ marginTop: '5px' }}>Nome da Empresa</h2></div>
            </div>


            <div className="container">

                {Iniciar &&
                    <div className="Part1">

                        <h1>Retire Sua Ficha</h1>

                        <div className="btn-ini">
                            <button onClick={() => { setTipo(!tipo); setIniciar(!Iniciar) }}>Iniciar Atendimento</button>
                        </div>
                    </div>}

                {
                    tipo && < div className="Part2">
                        <div className="Tipo">
                            <button onClick={() => criarFicha("PREFERENCIAL")}>Preferencial</button>

                            <button onClick={() => criarFicha("NORMAL")}>Normal</button>
                        </div>



                    </div>
                }
                {/* talvez tenha uma tela de loading escrtio imprimindo sua senha */}
                {
                    final && <div className="Part3">
                        <h2>Senha Criada Com Sucesso, Sua senha é</h2>
                        <h3>{fichaCriada?.codigo}</h3>
                        <p>Aguarde o Seu chamado no Guichê</p>
                    </div>
                }
            </div >
        </div>
    )
}
export default CreateFicha