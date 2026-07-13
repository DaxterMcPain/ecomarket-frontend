import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, categoryIcon, logout } from "../config";

function Admin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [access, setAccess] = useState(false);
    const [error, setError] = useState("");

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setError(data.message);

                return;

            }

            if (data.user.role !== "admin") {

                setError("No tienes permisos de administrador.");

                return;

            }

            setAccess(true);

            setError("");

        } catch (error) {

            console.log(error);

            setError("No se pudo conectar con el servidor.");

        }

    };

    useEffect(() => {

        if (!access) return;

        fetch(`${API_URL}/products`)
            .then((response) => response.json())
            .then(setProducts)
            .catch(console.error);

        fetch(`${API_URL}/users`)
            .then((response) => response.json())
            .then(setUsers)
            .catch(console.error);

        fetch(`${API_URL}/reports`)
            .then((response) => response.json())
            .then(setReports)
            .catch(console.error);

    }, [access]);

    if (access) {

        const today = new Date();

        const salesToday = reports
            .filter((report) => {
                const date = new Date(report.purchase_date);
                return date.toDateString() === today.toDateString();
            })
            .reduce((sum, report) => sum + Number(report.total), 0);

        return (
            <div>
                <nav className="admin-navbar">
                    <div className="admin-navbar-left">
                        <span className="brand">
                            <span className="brand-mark"></span>
                            <span className="brand-text">
                                Eco<span>market</span>
                            </span>
                        </span>
                        <span className="admin-badge">Admin</span>
                    </div>

                    <div className="admin-nav-actions">
                        <Link to="/">
                            <button type="button" className="btn btn-outline btn-sm">
                                Ver tienda
                            </button>
                        </Link>
                        <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => logout(navigate)}
                        >
                            Salir
                        </button>
                    </div>
                </nav>

                <div className="admin-body">
                    <div className="admin-eyebrow">Panel de control</div>
                    <h1>Hola, Administrador</h1>
                    <p className="admin-subtitle">
                        Resumen del día — {today.toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </p>

                    <div className="stat-grid">
                        <div className="stat-card">
                            <div className="stat-label">Ventas hoy</div>
                            <div className="stat-value">S/ {salesToday}</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Órdenes</div>
                            <div className="stat-value">{reports.length}</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Usuarios registrados</div>
                            <div className="stat-value">{users.length}</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Inventario</div>
                            <div className="stat-value">{products.length} SKUs</div>
                        </div>
                    </div>

                    <div className="action-grid">
                        <Link to="/products" className="action-card">
                            <h3>Gestionar productos</h3>
                            <p>Agregar, editar o eliminar productos</p>
                        </Link>

                        <Link to="/users" className="action-card">
                            <h3>Gestionar usuarios</h3>
                            <p>Ver y eliminar cuentas de usuario</p>
                        </Link>

                        <Link to="/reports" className="action-card">
                            <h3>Ver reportes</h3>
                            <p>Historial de compras realizadas</p>
                        </Link>
                    </div>

                    <div className="panel">
                        <div className="panel-header">
                            <h2>Inventario de productos</h2>
                            <span className="panel-count">{products.length} productos</span>
                        </div>

                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="table-product">
                                                <div className="table-thumb">
                                                    {categoryIcon(product.category)}
                                                </div>
                                                {product.name}
                                            </div>
                                        </td>
                                        <td><span className="badge">{product.category}</span></td>
                                        <td>S/ {product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <Link to="/" className="brand-header">
                <span className="brand">
                    <span className="brand-mark"></span>
                    <span className="brand-text">
                        Eco<span>market</span>
                    </span>
                </span>
            </Link>

            <div className="auth-card admin">
                <h2 className="auth-title">Panel de Administrador</h2>
                <p className="auth-subtitle">
                    Acceso restringido. Solo personal autorizado.
                </p>

                <div className="notice">
                    ⚠️ Esta sección es solo para administradores.
                </div>

                <form className="stack" onSubmit={handleLogin}>

                    <div className="field">
                        <label>
                            Correo de administrador <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="admin@tienda.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label>
                            Contraseña <span className="required">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-accent">
                        Acceder como administrador
                    </button>

                    <Link to="/login">
                        <button type="button" className="btn btn-outline">
                            ← Volver al inicio de sesión
                        </button>
                    </Link>

                    {error && (
                        <p style={{ color: "var(--accent)", fontSize: "13px" }}>
                            {error}
                        </p>
                    )}

                </form>
            </div>
        </div>
    );
}

export default Admin;
