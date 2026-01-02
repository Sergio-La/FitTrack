import * as SQLite from 'expo-sqlite';

// 1. interface para el usuario
interface Usuario {
    usuario_id?: number;
    nombre: string;
    correo: string;
    contraseña: string;
    fecha_registro: string;
    nivel_experiencia: 'principiante' | 'intermedio' | 'avanzado';
}

// 2. interface para el ejercicio
interface Ejercicio {
    ejercicio_id?: number;
    nombre_ejercicio: string;
    grupo_muscular: string;
    descripcion_ejercicio: string;
    notas: string;
}

// interface para el grupo muscular
interface GrupoMuscular {
    grupo_muscular_id?: number;
    nombre_grupo: string;
}

// 2. Abrimos la conexión de forma síncrona
const db = SQLite.openDatabaseSync('fittrack.db');

export const setupDatabase = () => {
    try {
        // Ejecutamos el comando para crear la tabla si no existe
        db.execSync(`
        CREATE TABLE IF NOT EXISTS usuarios (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        contraseña TEXT NOT NULL,
        fecha_registro TEXT NOT NULL,
        nivel_experiencia TEXT CHECK(nivel_experiencia IN ('principiante', 'intermedio', 'avanzado'))
        );
        `);

        // Ejecutamos el comando para crear la tabla ejercicios si no existe
        db.execSync(`
        CREATE TABLE IF NOT EXISTS ejercicios (
        ejercicio_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_ejercicio TEXT NOT NULL,
        descripcion_ejercicio TEXT,
        notas TEXT,
        );
        `);

        // consulta para crear un grupo muscular
        db.execSync(`
        CREATE TABLE IF NOT EXISTS grupos_musculares (
        grupo_muscular_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_grupo TEXT NOT NULL
        );
        `);

        // Ejecutamos el comando para para agregar columna foranea del id del usuario
        db.execSync(`
        ALTER TABLE ejercicios ADD COLUMN usuario_id INTEGER NOT NULL;
        `);

        // consulta para agregar columna foranea del id del grupo muscular
        db.execSync(`
        ALTER TABLE ejercicios ADD COLUMN grupo_muscular_id INTEGER NOT NULL;
        `);

        console.log("Base de datos lista.");
    } catch (error) {
        console.error("Error al inicializar la base de datos.", error);
    }
};

// 3. Insertar un usuario
export const registrarUsuario = (user: Usuario) => {
    try {
        db.runSync(`
        INSERT INTO usuarios (nombre, correo, contraseña, fecha_registro, nivel_experiencia)
        VALUES (?, ?, ?, ?, ?);
      `,
            [user.nombre, user.correo, user.contraseña, user.fecha_registro, user.nivel_experiencia]
        );
        console.log("Usuario insertado correctamente.");
    } catch (error) {
        console.error("Error al insertar el usuario.", error);
    }
};

export const loginUsuario = (correo: string, contraseña: string) => {
    try {
        const row = db.getFirstSync(`SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?`, [correo, contraseña]) as Usuario || null;

        if (!row) {
            return {
                success: false,
                message: "Usuario no encontrado o contraseña incorrecta"
            };
        }

        if (row.contraseña !== contraseña) {
            return {
                success: false,
                message: "Contraseña incorrecta"
            };
        }

        return {
            success: true,
            message: "Login exitoso",
            user: row
        };
    } catch (error) {
        console.error("Error al consultar el usuario.", error);
        return null;
    }
};

// 4. función de test
export const ejecutarPruebaDB = () => {
    try {
        //array con grupos musculares
        const gruposMusculares = [
            { nombre_grupo: "Pecho" },
            { nombre_grupo: "Espalda" },
            { nombre_grupo: "Hombros" },
            { nombre_grupo: "Biceps" },
            { nombre_grupo: "Triceps" },
            { nombre_grupo: "Cuádriceps" },
            { nombre_grupo: "Isquiotibiales" },
            { nombre_grupo: "Glúteos" },
            { nombre_grupo: "Abdominales" },
            { nombre_grupo: "Lumbares" },
            { nombre_grupo: "Pantorrillas" },
            { nombre_grupo: "Trapecios" },
            { nombre_grupo: "Antebrazos" }
        ];

        // Insertamos los grupos musculares
        gruposMusculares.forEach((grupoMuscular) => {
            registrarGrupoMuscular(grupoMuscular);
        });

        // Insertamos un usuario de prueba
        const usuarioDePrueba: Usuario = {
            nombre: "Test User",
            correo: "test@example.com",
            contraseña: "test123",
            fecha_registro: new Date().toISOString(),
            nivel_experiencia: "principiante"
        };
        registrarUsuario(usuarioDePrueba);
        console.log("Usuario de prueba insertado correctamente.");
    } catch (error) {
        console.error("Error al insertar el usuario de prueba.", error);
    }
};

// insertar un ejercicio
export const registrarEjercicio = (ejercicio: Ejercicio) => {
    try {
        db.runSync(`
        INSERT INTO ejercicios (nombre_ejercicio, grupo_muscular, descripcion_ejercicio, notas)
        VALUES (?, ?, ?, ?);
      `,
            [ejercicio.nombre_ejercicio, ejercicio.grupo_muscular, ejercicio.descripcion_ejercicio, ejercicio.notas]
        );
        console.log("Ejercicio insertado correctamente.");
    } catch (error) {
        console.error("Error al insertar el ejercicio.", error);
    }
};


// registrar un grupo muscular

export const registrarGrupoMuscular = (grupoMuscular: GrupoMuscular) => {
    try {
        db.runSync(`
        INSERT INTO grupos_musculares (nombre_grupo)
        VALUES (?);
      `,
            [grupoMuscular.nombre_grupo]
        );
        console.log("Grupo muscular insertado correctamente.");
    } catch (error) {
        console.error("Error al insertar el grupo muscular.", error);
    }
};  
