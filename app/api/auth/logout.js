import { signOut } from "next-auth/react";

const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Перенаправление на главную после выхода
};