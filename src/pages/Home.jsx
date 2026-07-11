import { Link } from "react-router-dom";

import './Home.css'


function Home() {
    return (
        <div className="Container">

            <Link to="/CriarFicha">
                <div className="CriarFicha">
                    <p>Criar Ficha</p>
                    <h6>Sistema onde o cliente criara sua ficha</h6>
                </div>
            </Link>

            <Link to="/ChamarFicha">
                <div className="ChamarFicha">
                    <p>Chamar Ficha</p>
                    <h6>Sistema onde o Admistrador Chamará a ficha</h6>
                </div>
            </Link>

            <Link to="/VisualizarFicha">
                <div className="VisualizarFicha">
                    <p>Sistema Cliente de Visualizar Ficha chamada</p>
                    <h6>Sistema onde o Cliente verá qual ficha foi chamada</h6>
                </div>
            </Link >

            <footer>
                <p style={{ color: 'white' }}>Create By WERTHER CRILSEY</p>
            </footer>
        </div >
    )
}
export default Home