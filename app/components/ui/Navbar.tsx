import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

export default async function Navbar() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let isLoggedIn = false;
    let isAdmin = false;

    if (token) {
        try {
            const payload = jwtDecode<JwtPayload>(token);
            isLoggedIn = true;
            isAdmin = payload.role === "ADMIN" || payload.role === "SUPER_ADMIN";
        } catch {
            // Invalid token
        }
    }

    return <NavbarClient isLoggedIn={isLoggedIn} isAdmin={isAdmin} />;
}