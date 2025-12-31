import users from "../data/users/users.json";

export const login = (email: string, password: string) => {
    const userFound = users.find(user => user.correo === email && user.contrasena === password);
    if (userFound) {
        return { success: true, user: userFound };
    }
    return { success: false, error: 'Usuario no encontrado' };
}