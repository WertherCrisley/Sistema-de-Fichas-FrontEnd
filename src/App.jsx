import { Routes, Route } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

import CriarFicha from "./pages/ficha/createFicha";
import ChamarFicha from "./pages/chamar/admFicha";
import VisualizarFicha from "./pages/visualizar/clienteVisor";
import Home from './pages/Home';

function App() {

    return (
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/CriarFicha" element={<CriarFicha />} />
            <Route path="/ChamarFicha" element={<ChamarFicha />} />
            <Route path="/VisualizarFicha" element={<VisualizarFicha />} />
        </Routes>
    )

}
export default App