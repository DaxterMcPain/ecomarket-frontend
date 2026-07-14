export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
