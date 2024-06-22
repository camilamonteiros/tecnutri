import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import BasePage from "./pages/BasePage";
import LinhasProdutos from "./pages/LinhasProdutos";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<BasePage />}>
            <Route path="product" element={<Produtos />} />
            <Route path="product/linhasProdutos" element={<LinhasProdutos />} />
            <Route path="client" element={<Clientes />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
