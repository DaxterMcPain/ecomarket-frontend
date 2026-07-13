import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            if (response.ok) {

                navigate("/login");

            }

        } catch (error) {

            console.log(error);

            alert("No se pudo conectar con el servidor");

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

                <h2 className="auth-title">Crear una cuenta</h2>
                <p className="auth-subtitle">
                    Regístrate para empezar a comprar en Ecomarket.
                </p>

                <form
                    className="stack"
                    onSubmit={handleRegister}
                >

                    <div className="field">
                        <label>
                            Nombre <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="field">
                        <label>
                            Correo electrónico <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
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
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <button type="submit" className="btn btn-dark">
                        Crear cuenta
                    </button>

                    <div className="divider">o</div>

                    <Link to="/login">
                        <button type="button" className="btn btn-outline">
                            Ya tengo una cuenta
                        </button>
                    </Link>

                </form>

            </div>

        </div>

    );

}

export default Register;
