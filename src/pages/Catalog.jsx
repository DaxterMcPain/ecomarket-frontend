import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL, CATEGORIES, categoryIcon, logout } from "../config";

function Catalog() {

    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );


    const [productsData, setProductsData] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {

        fetch(`${API_URL}/products`)
            .then((response) => response.json())
            .then((data) => {

                setProductsData(data);

            })
            .catch(console.error);

    }, []);

    const addToCart = async (product) => {

        try {

            const response = await fetch(
                `${API_URL}/cart`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                }
            );

            const data = await response.json();

            alert(data.message);

            if (response.status === 401) {
                navigate("/login");
            }

        } catch (error) {

            console.log(error);

        }

    };

    const filteredProducts = productsData.filter((product) => {

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "" || product.category === category;

        const matchesPrice =
            maxPrice === "" || product.price <= Number(maxPrice);

        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="catalog-container">

            <nav className="store-navbar">
                <Link to="/" className="brand">
                    <span className="brand-mark"></span>
                    <span className="brand-text">
                        Eco<span>market</span>
                    </span>
                </Link>

                <div className="store-nav-links">
                    <Link to="/cart">
                        <button type="button" className="btn btn-outline btn-sm">
                            🛒 Carrito
                        </button>
                    </Link>

                    {currentUser ? (
                        <>
                            <Link to="/perfil" state={currentUser} className="greeting">
                                Hola, <strong>{currentUser.name}</strong>
                            </Link>
                            <button
                                type="button"
                                className="btn btn-outline btn-sm"
                                onClick={() => logout(navigate)}
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="btn btn-outline btn-sm">
                                Iniciar sesión
                            </button>
                        </Link>
                    )}
                </div>
            </nav>

            <div className="hero">
                <div className="hero-eyebrow">Catálogo Ecomarket</div>
                <h1>Productos con propósito</h1>
                <p>
                    Selección curada de productos sostenibles para tu día a día.
                </p>
            </div>

            <div className="catalog-body">

                <div className="filters-row">

                    <div className="category-pills">
                        <button
                            type="button"
                            className={`pill ${category === "" ? "active" : ""}`}
                            onClick={() => setCategory("")}
                        >
                            Todos
                        </button>

                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`pill ${category === cat ? "active" : ""}`}
                                onClick={() => setCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="filter-inputs">
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Precio máximo"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                </div>

                {filteredProducts.length === 0 ? (
                    <p className="empty-state">No se encontraron productos.</p>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <div className="product-card" key={product.id}>
                                <div className="product-thumb">
                                    {categoryIcon(product.category)}
                                </div>
                                <div className="product-body">
                                    <span className="badge">{product.category}</span>
                                    <h3>{product.name}</h3>
                                    {product.description && (
                                        <p className="product-desc">{product.description}</p>
                                    )}
                                    <div className="product-footer">
                                        <span className="price">S/ {product.price}</span>
                                        <button
                                            className="btn btn-dark btn-sm"
                                            onClick={() => addToCart(product)}
                                        >
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>
    );
}

export default Catalog;
