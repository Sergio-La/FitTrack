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

export interface AboutYou {
    usuario_id: number;
    estatura: number;
    peso: number;
    edad: number;
    genero: 'masculino' | 'femenino' | 'otro';
}

export interface Rutina {
    rutina_id?: number;
    nombre_rutina: string;
    dias: string;
    usuario_id: number;
    id_grupo_muscular: number;
}

export interface RutinaEjercicio {
    rutina_ejercicio_id?: number;
    rutina_id: number;
    ejercicio_id: number;
}

export interface DiaSemana {
    dia_semana_id?: number;
    nombre_dia: 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo';
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

            CREATE TABLE IF NOT EXISTS about_you (
                about_you_id INTEGER PRIMARY KEY AUTOINCREMENT,
                estatura INTEGER NOT NULL,
                peso INTEGER NOT NULL,
                edad INTEGER NOT NULL,
                genero TEXT NOT NULL CHECK(genero IN ('masculino', 'femenino', 'otro')),
                usuario_id INTEGER,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id)
            );

            CREATE TABLE IF NOT EXISTS dias_semana (
                dia_semana_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre_dia TEXT NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS rutinas (
                rutina_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre_rutina TEXT NOT NULL,    
                usuario_id INTEGER,
                id_grupo_muscular INTEGER,
                FOREIGN KEY (id_grupo_muscular) REFERENCES grupos_musculares (grupo_muscular_id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id)
            );

            CREATE TABLE IF NOT EXISTS rutina_dias (
                rutina_dia_id INTEGER PRIMARY KEY AUTOINCREMENT,
                rutina_id INTEGER,
                dia_semana_id INTEGER,
                FOREIGN KEY (rutina_id) REFERENCES rutinas (rutina_id),
                FOREIGN KEY (dia_semana_id) REFERENCES dias_semana (dia_semana_id)
            );

            CREATE TABLE IF NOT EXISTS rutina_ejercicios (
                rutina_ejercicio_id INTEGER PRIMARY KEY AUTOINCREMENT,
                rutina_id INTEGER,
                ejercicio_id INTEGER,
                FOREIGN KEY (rutina_id) REFERENCES rutinas (rutina_id),
                FOREIGN KEY (ejercicio_id) REFERENCES ejercicios (ejercicio_id)
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

export const consultarDiasSemana = (dia: string): DiaSemana | null => {
    try {
        return db.getFirstSync<DiaSemana>(`SELECT * FROM dias_semana WHERE nombre_dia = ?`, [dia]);
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

export const consultarGruposMusculares = (): GrupoMuscular[] => {
    try {
        return db.getAllSync<GrupoMuscular>(`SELECT * FROM grupos_musculares`);
    } catch (error) {
        return [];
    }
};


export const consultarDiaSemana = (nombre_dia: string): DiaSemana | null => {
    try {
        return db.getFirstSync<DiaSemana>(`SELECT * FROM dias_semana WHERE nombre_dia = ?`, [nombre_dia]);
    } catch (error) {
        return null;
    }
};

export const registrarDiaSemana = (dia: string) => {
    try {
        db.runSync(`INSERT OR IGNORE INTO dias_semana (nombre_dia) VALUES (?);`, [dia]);
    } catch (error) {
        console.error("Error al registrar dia semanal:", error);
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

        console.log("Grupos musculares insertados ✅");

        // 2. Insertar Dias Semana si no existen
        const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        dias.forEach(nombre => {
            if (!consultarDiaSemana(nombre)) {
                registrarDiaSemana(nombre);
            }
        });

        console.log("Dias semana insertados ✅");


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

// --- 8. INSERCIONES (Registros) ---

export const registrarAboutYou = (aboutYou: AboutYou) => {
    try {
        db.runSync(
            `INSERT INTO about_you (estatura, peso, edad, genero, usuario_id) VALUES (?, ?, ?, ?, ?);`,
            [aboutYou.estatura, aboutYou.peso, aboutYou.edad, aboutYou.genero, aboutYou.usuario_id]
        );
        console.log("About You insertado.");
    } catch (error) {
        console.error("Error al insertar about you:", error);
    }
};

export const registrarRutina = (rutina: Rutina) => {
    try {
        db.runSync(
            `INSERT INTO rutinas (nombre_rutina, dias, usuario_id, id_grupo_muscular) VALUES (?, ?, ?, ?);`,
            [rutina.nombre_rutina, rutina.dias, rutina.usuario_id, rutina.id_grupo_muscular]
        );
        console.log("Rutina insertada.");
    } catch (error) {
        console.error("Error al insertar rutina:", error);
    }
};

export const registrarRutinaEjercicio = (rutinaEjercicio: RutinaEjercicio) => {
    try {
        db.runSync(
            `INSERT INTO rutina_ejercicios (rutina_id, ejercicio_id) VALUES (?, ?);`,
            [rutinaEjercicio.rutina_id, rutinaEjercicio.ejercicio_id]
        );
        console.log("Rutina Ejercicio insertado.");
    } catch (error) {
        console.error("Error al insertar rutina ejercicio:", error);
    }
};

