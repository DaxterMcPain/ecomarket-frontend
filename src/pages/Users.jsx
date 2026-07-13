import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function Users() {

    const [users, setUsers] = useState([]);

    const loadUsers = async () => {

        try {

            const response = await fetch(
                `${API_URL}/users`
            );

            const data = await response.json();

            setUsers(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/users`
                );

                const data = await response.json();

                setUsers(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchUsers();

    }, []);

    const deleteUser = async (id) => {

        if (!window.confirm("¿Eliminar este usuario?")) {

            return;

        }

        try {

            await fetch(
                `${API_URL}/users/${id}`,
                {
                    method: "DELETE"
                }
            );

            loadUsers();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="admin-body">

            <div className="admin-eyebrow">Administración</div>
            <h1>Gestionar usuarios</h1>
            <p className="admin-subtitle">
                Consulta y elimina cuentas registradas en Ecomarket.
            </p>

            <div className="panel">
                <div className="panel-header">
                    <h2>Usuarios</h2>
                    <span className="panel-count">{users.length} usuarios</span>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><span className="badge">{user.role}</span></td>
                                <td>
                                    <button
                                        className="link-danger"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to="/admin">
                <button className="btn btn-outline" style={{ width: "auto", padding: "10px 20px" }}>
                    ← Volver
                </button>
            </Link>

        </div>

    );

}

export default Users;
