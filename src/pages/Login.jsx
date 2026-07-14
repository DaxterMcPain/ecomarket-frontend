import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
function Login() {
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                alert(data.message);
                return;
            }

            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            navigate("/perfil");

        } catch (error) {

            console.log(error);

            alert("No se pudo conectar con el servidor.");

        }

    };

    const handleGuest = async () => {

        try {

            const response = await fetch(
                `${API_URL}/guest`,
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("No se pudo conectar con el servidor.");

        }

    };

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

            <div className="auth-card">
                <h2 className="auth-title">Bienvenido de vuelta</h2>
                <p className="auth-subtitle">
                    Ingresa tus datos para continuar comprando.
                </p>

                <form className="stack" onSubmit={handleLogin}>

                    <div className="field">
                        <label>
                            Correo electrónico <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
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

                    <button type="submit" className="btn btn-dark">
                        Iniciar sesión
                    </button>

                    <div className="divider">o</div>

                    <Link to="/register">
                        <button type="button" className="btn btn-outline">
                            Crear una cuenta nueva
                        </button>
                    </Link>

                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleGuest}
                    >
                        Continuar como invitado
                    </button>

                    <Link to="/admin">
                        <button type="button" className="btn btn-muted">
                            🔒 Acceso de administrador
                        </button>
                    </Link>

                </form>
            </div>
        </div>
    );
}

export default Login;
