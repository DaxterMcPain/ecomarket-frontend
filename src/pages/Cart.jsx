import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL, categoryIcon, logout } from "../config";

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchCartData = async () => {
            try {
                const response = await fetch(`${API_URL}/cart`);

                if (response.status === 401 || response.status === 403) {
                    if (isMounted) navigate("/");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Error al cargar el carrito");
                }

                const data = await response.json();

                if (isMounted) {
                    if (Array.isArray(data)) {
                        setCart(data);
                    } else {
                        setCart([]);
                    }
                }
            } catch (error) {
                console.error("Error en la petición del carrito:", error);
                if (isMounted) setCart([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCartData();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const reloadCartOnly = async () => {
        try {
            const response = await fetch(`${API_URL}/cart`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCart(data);
                }
            }
        } catch (error) {
            console.error("Error al recargar carrito:", error);
        }
    };

    const total = Array.isArray(cart)
        ? cart.reduce((sum, product) => sum + Number(product.price), 0)
        : 0;

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`${API_URL}/cart/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                await reloadCartOnly();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const finishPurchase = async () => {
        try {
            const response = await fetch(`${API_URL}/purchase`, {
                method: "POST"
            });

            if (response.status === 401) {
                alert("Debes iniciar sesión para comprar.");
                navigate("/");
                return;
            }

            const data = await response.json();
            alert(data.message);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="catalog-container">
                <p className="loading-state">Cargando tu carrito...</p>
            </div>
        );
    }

    return (
        <div className="catalog-container">
            <nav className="store-navbar">
                <Link to="/">
                    <button type="button" className="btn btn-outline btn-sm">
                        ← Tienda
                    </button>
                </Link>

                <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => logout(navigate)}
                >
                    Salir
                </button>
            </nav>

            <div className="cart-page">
                <h1>Tu carrito</h1>

                {cart.length === 0 ? (
                    <p className="empty-state">No hay productos en el carrito.</p>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-list">
                            {cart.map((product) => (
                                <div className="cart-item" key={product.id}>
                                    <div className="cart-item-thumb">
                                        {categoryIcon(product.category)}
                                    </div>

                                    <div className="cart-item-info">
                                        <h3>{product.name}</h3>
                                        <p>{product.category}</p>
                                    </div>

                                    <div className="cart-item-qty">
                                        Cantidad: {product.quantity}
                                    </div>

                                    <div className="cart-item-price">
                                        <span className="price">S/ {product.price}</span>
                                        <button
                                            className="link-danger"
                                            onClick={() => removeProduct(product.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-card">
                            <h3>Resumen del pedido</h3>

                            <div className="summary-total">
                                <span>Total</span>
                                <span>S/ {total}</span>
                            </div>

                            <button className="btn btn-accent" onClick={finishPurchase}>
                                Finalizar compra
                            </button>

                            <p className="summary-note">🔒 Pago seguro</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;