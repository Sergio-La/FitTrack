import * as SQLite from 'expo-sqlite';

// --- 1. INTERFACES ---
export interface Usuario {
    usuario_id?: number;
    nombre: string;
    correo: string;
    contraseña: string;
    fecha_registro: string;
    nivel_experiencia: 'principiante' | 'intermedio' | 'avanzado';
}

export interface Ejercicio {
    ejercicio_id?: number;
    nombre_ejercicio: string;
    descripcion_ejercicio: string;
    notas: string;
    usuario_id: number;
    grupo_muscular_id: number;
}

export interface GrupoMuscular {
    grupo_muscular_id?: number;
    nombre_grupo: string;
}

// --- 2. CONEXIÓN ---
const db = SQLite.openDatabaseSync('fittrack.db');

// --- 3. INICIALIZACIÓN (Setup) ---
export const setupDatabase = () => {
    try {
        // Habilitamos claves foráneas y creamos tablas
        db.execSync(`
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS usuarios (
                usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                correo TEXT NOT NULL UNIQUE,
                contraseña TEXT NOT NULL,
                fecha_registro TEXT NOT NULL,
                nivel_experiencia TEXT CHECK(nivel_experiencia IN ('principiante', 'intermedio', 'avanzado'))
            );

            CREATE TABLE IF NOT EXISTS grupos_musculares (
                grupo_muscular_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre_grupo TEXT NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS ejercicios (
                ejercicio_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre_ejercicio TEXT NOT NULL,
                descripcion_ejercicio TEXT,
                notas TEXT,
                usuario_id INTEGER,
                grupo_muscular_id INTEGER,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id),
                FOREIGN KEY (grupo_muscular_id) REFERENCES grupos_musculares (grupo_muscular_id)
            );
        `);
        console.log("Estructura de base de datos lista ✅");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
};

// --- 4. FUNCIONES DE CONSULTA (Retornan objeto o null) ---

export const consultarUsuario = (correo: string): Usuario | null => {
    try {
        return db.getFirstSync<Usuario>(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
    } catch (error) {
        return null;
    }
};

export const consultarGrupoMuscular = (nombre_grupo: string): GrupoMuscular | null => {
    try {
        return db.getFirstSync<GrupoMuscular>(`SELECT * FROM grupos_musculares WHERE nombre_grupo = ?`, [nombre_grupo]);
    } catch (error) {
        return null;
    }
};

// --- 5. LÓGICA DE AUTENTICACIÓN ---

export const loginUsuario = (correo: string, contrasenia: string) => {
    try {
        const user = consultarUsuario(correo);

        if (!user) {
            return { success: false, message: "El correo no está registrado ❌" };
        }

        if (user.contraseña !== contrasenia) {
            return { success: false, message: "Contraseña incorrecta 🔑" };
        }

        return { success: true, message: "Login exitoso", user: user };
    } catch (error) {
        console.error("Error en loginUsuario:", error);
        return { success: false, message: "Error técnico en el servidor" };
    }
};

// --- 6. INSERCIONES (Registros) ---

export const registrarUsuario = (user: Usuario) => {
    try {
        db.runSync(
            `INSERT INTO usuarios (nombre, correo, contraseña, fecha_registro, nivel_experiencia) VALUES (?, ?, ?, ?, ?);`,
            [user.nombre, user.correo, user.contraseña, user.fecha_registro, user.nivel_experiencia]
        );
        console.log(`Usuario ${user.nombre} registrado.`);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
    }
};

export const registrarGrupoMuscular = (nombre: string) => {
    try {
        db.runSync(`INSERT OR IGNORE INTO grupos_musculares (nombre_grupo) VALUES (?);`, [nombre]);
    } catch (error) {
        console.error("Error al registrar grupo muscular:", error);
    }
};

export const registrarEjercicio = (ejercicio: Ejercicio) => {
    try {
        db.runSync(
            `INSERT INTO ejercicios (nombre_ejercicio, descripcion_ejercicio, notas, usuario_id, grupo_muscular_id) VALUES (?, ?, ?, ?, ?);`,
            [ejercicio.nombre_ejercicio, ejercicio.descripcion_ejercicio, ejercicio.notas, ejercicio.usuario_id, ejercicio.grupo_muscular_id]
        );
        console.log("Ejercicio insertado.");
    } catch (error) {
        console.error("Error al insertar ejercicio:", error);
    }
};

// --- 7. FUNCIÓN DE TEST / SEEDING ---

export const ejecutarPruebaDB = () => {
    try {
        // 1. Insertar Grupos Musculares si no existen
        const grupos = ["Pecho", "Espalda", "Hombros", "Biceps", "Triceps", "Piernas"];
        grupos.forEach(nombre => {
            if (!consultarGrupoMuscular(nombre)) {
                registrarGrupoMuscular(nombre);
            }
        });

        // 2. Insertar Usuario de Prueba si no existe
        const emailTest = "test@example.com";
        if (!consultarUsuario(emailTest)) {
            registrarUsuario({
                nombre: "Test User",
                correo: emailTest,
                contraseña: "123",
                fecha_registro: new Date().toISOString(),
                nivel_experiencia: "principiante"
            });
            console.log("Usuario de prueba creado ✅");
        }
    } catch (error) {
        console.error("Error en ejecutarPruebaDB:", error);
    }
};