import { Routes, Route } from "react-router-dom";

import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import ProductForm from "./pages/ProductForm";
import Perfil from "./pages/Perfil";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Reports from "./pages/Reports";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductForm />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
        </Routes>
    );
}

export default App;