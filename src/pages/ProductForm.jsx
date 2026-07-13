import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL, CATEGORIES, categoryIcon } from "../config";

function ProductForm() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {

        try {

            const response = await fetch(
                `${API_URL}/products`
            );

            const data = await response.json();

            setProducts(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/products`
                );

                const data = await response.json();

                setProducts(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchProducts();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            category,
            price: Number(price)
        };

        try {
            const response = await fetch(
                `${API_URL}/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newProduct)
                }
            );

            const data = await response.json();


            alert(data.message);

            loadProducts();

            setName("");

            setCategory("");

            setPrice("");

        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id) => {

        if (!window.confirm("¿Eliminar este producto?")) {

            return;

        }

        try {

            await fetch(
                `${API_URL}/products/${id}`,
                {
                    method: "DELETE"
                }
            );

            loadProducts();

        } catch (error) {

            console.log(error);

        }

    };


    return (
        <div className="admin-body">

            <div className="admin-eyebrow">Administración</div>
            <h1>Gestión de productos</h1>
            <p className="admin-subtitle">
                Agrega, edita o elimina los productos del catálogo.
            </p>

            <div className="panel" style={{ maxWidth: 480 }}>
                <div className="panel-header">
                    <h2>Nuevo producto</h2>
                </div>

                <form className="stack" onSubmit={handleSubmit}>

                    <div className="field">
                        <label>Nombre del producto</label>
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label>Categoría</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">
                                Seleccione una categoría
                            </option>

                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label>Precio</label>
                        <input
                            type="number"
                            placeholder="Precio"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark">
                        Guardar producto
                    </button>

                </form>
            </div>

            <div className="panel">
                <div className="panel-header">
                    <h2>Productos registrados</h2>
                    <span className="panel-count">{products.length} productos</span>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Acciones</th>
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
                                <td>
                                    <button
                                        className="link-danger"
                                        onClick={() => deleteProduct(product.id)}
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

export default ProductForm;
