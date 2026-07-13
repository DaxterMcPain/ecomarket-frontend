import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL, logout } from "../config";

function Perfil() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/profile`
                );

                const data = await response.json();

                if (!response.ok) {

                    alert(data.message);

                    navigate("/login");

                    return;

                }

                setUsuario(data);

            } catch (error) {

                console.log(error);

            }

        };

        loadProfile();

    }, [navigate]);

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
                <h2 className="auth-title">Perfil de usuario</h2>
                <p className="auth-subtitle">
                    Información de tu cuenta en Ecomarket.
                </p>

                <div className="profile-row">
                    <span>Nombre</span>
                    <span>{usuario?.name}</span>
                </div>

                <div className="profile-row">
                    <span>Correo</span>
                    <span>{usuario?.email}</span>
                </div>

                <div className="profile-row">
                    <span>Contraseña</span>
                    <span>••••••••</span>
                </div>

                <div className="stack" style={{ marginTop: 24 }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate("/")}
                    >
                        Volver al catálogo
                    </button>

                    <button
                        className="btn btn-dark"
                        onClick={() => logout(navigate)}
                    >
                        Cerrar sesión
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Perfil;
