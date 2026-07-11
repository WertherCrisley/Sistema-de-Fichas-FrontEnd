import { Link } from "react-router-dom";
import './nav.css'

function Nav() {
    return (
        <div>
            <div style={{ display: 'flex', width: '100%', height: '70px', color: 'white', background: '#0a383b', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
                <div style={{ flex: '40%' }}><Link to="/"><button className="btnVoltar"> ← Voltar</button></Link></div>
                <div style={{ flex: '60%', fontSize: '25px' }}><h2 style={{ marginTop: '5px' }}>Nome da Empresa</h2></div>
            </div>

        </div >

    )
}
export default Nav