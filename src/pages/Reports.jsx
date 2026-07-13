import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function Reports() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        const fetchReports = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/reports`
                );

                const data = await response.json();

                setReports(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchReports();

    }, []);

    return (

        <div className="admin-body">

            <div className="admin-eyebrow">Administración</div>
            <h1>Reportes de compras</h1>
            <p className="admin-subtitle">
                Historial de compras realizadas en Ecomarket.
            </p>

            <div className="panel">
                <div className="panel-header">
                    <h2>Compras</h2>
                    <span className="panel-count">{reports.length} compras</span>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Compra</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Total</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>#{report.id}</td>
                                <td>{report.name}</td>
                                <td>{report.email}</td>
                                <td>S/ {report.total}</td>
                                <td>{report.purchase_date}</td>
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

export default Reports;
