const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const API_URL = isLocalhost
    ? "http://localhost:3000"
    : "https://ecomarket-api-s3qc.onrender.com";

export const CATEGORIES = ["Accesorios", "Hogar", "Higiene"];

const CATEGORY_ICONS = {
    Accesorios: "🎒",
    Hogar: "🏠",
    Higiene: "🧴",
};

export function categoryIcon(category) {
    return CATEGORY_ICONS[category] || "📦";
}

export async function logout(navigate) {
    try {
        await fetch(`${API_URL}/logout`, { method: "POST" });
    } catch (error) {
        console.log(error);
    }

    localStorage.removeItem("currentUser");
    navigate("/");
}
