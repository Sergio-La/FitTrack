# 📱 FitTrack – Expo React Native App

## 🎯 Objetivo
Desarrollar una aplicación móvil en **Expo (React Native)** que permita a los usuarios de gimnasio **registrar, organizar y dar seguimiento a sus rutinas de entrenamiento**, integrando navegación clara, almacenamiento local con SQLite y validaciones basadas en el **Sistema Internacional de Unidades (SI)**.

---

## 🏗️ Arquitectura

### Frontend
- **Framework:** React Native con Expo.
- **Navegación:** React Navigation (Stack + Bottom Tabs).
- **UI/UX:** Componentes reutilizables, theming centralizado, safe-area-context para compatibilidad iOS/Android.

### Backend Local
- **Base de datos:** SQLite (expo-sqlite).
- **Persistencia:** Tablas relacionales con claves primarias y foráneas.
- **Validaciones:** Regex y lógica de negocio en JS/TS.

### Capas
1. **Presentación:** Pantallas y componentes UI.
2. **Lógica de negocio:** Validaciones, control de flujo, cálculos (ej. IMC).
3. **Persistencia:** SQLite con funciones CRUD.
4. **Navegación:** Stack Navigation para flujos jerárquicos + Bottom Tabs para módulos principales.

---

## 🗄️ Estructura de Base de Datos (SQLite)

### Tabla Usuarios
- `usuario_id` (PK)
- `nombre`
- `correo`
- `contraseña` (encriptada)
- `fecha_registro` (ISO 8601)
- `nivel_experiencia`

### Tabla Ejercicios
- `ejercicio_id` (PK)
- `usuario_id` (FK → Usuarios)
- `nombre_ejercicio`
- `grupo_muscular` (FK → GruposMusculares)
- `descripcion`
- `notas`

### Tabla GruposMusculares
- `grupo_id` (PK)
- `nombre_grupo`

### Tabla Rutinas
- `rutina_id` (PK)
- `usuario_id` (FK → Usuarios)
- `nombre_rutina`
- `fecha_creacion`
- `notas`

### Tabla RutinaEjercicios
- `rutina_ejercicio_id` (PK)
- `rutina_id` (FK → Rutinas)
- `ejercicio_id` (FK → Ejercicios)
- `repeticiones`
- `sensacion`
- `notas`

### Tabla PlanSemanal
- `plan_id` (PK)
- `usuario_id` (FK → Usuarios)
- `rutina_id` (FK → Rutinas)
- `dia_semana` (enum: Lunes–Domingo)

### Tabla EjecucionesRutina
- `ejecucion_id` (PK)
- `usuario_id` (FK → Usuarios)
- `rutina_id` (FK → Rutinas)
- `fecha_ejecucion`
- `estado`

### Tabla EjecucionDetalle
- `detalle_id` (PK)
- `ejecucion_id` (FK → EjecucionesRutina)
- `ejercicio_id` (FK → Ejercicios)
- `peso_usado` (kg, SI)
- `repeticiones_realizadas`
- `descanso_reps` (s, SI)
- `descanso_series` (s, SI)

### Tabla Progreso
- `progreso_id` (PK)
- `usuario_id` (FK → Usuarios)
- `fecha`
- `total_repeticiones`
- `peso_acumulado` (kg, SI)
- `series_completadas`

### Tabla DatosFisicos
- `datos_id` (PK)
- `usuario_id` (FK → Usuarios)
- `estatura` (m, SI)
- `peso` (kg, SI)
- `edad` (años)
- `genero` (enum)
- `fecha_registro` (ISO 8601)

---

## 🎨 Diseño

- **Pantallas principales (Bottom Tabs):**
  1. Dashboard
  2. Ejercicios
  3. Rutinas
  4. Plan semanal
  5. Iniciar rutina

- **Pantallas adicionales (Stack):**
  - Login / Registro
  - Perfil físico
  - Detalle de rutina
  - Ejecución de rutina

- **Estilo visual:**
  - Colores consistentes con branding fitness.
  - Tipografía clara y legible.
  - Uso de safe-area-context para compatibilidad.

---

## 🛠️ Tareas por módulo

### Módulo Usuarios
- Crear tabla `Usuarios` en SQLite.
- Implementar pantalla de Login/Registro.
- Validar correo único y contraseña encriptada.

### Módulo Ejercicios
- Crear tabla `Ejercicios`.
- Diseñar pantalla de registro de ejercicio.
- Validar campos obligatorios (nombre, repeticiones, peso).
- Mostrar lista de ejercicios.

### Módulo Rutinas
- Crear tablas `Rutinas` y `RutinaEjercicios`.
- Diseñar pantalla de creación de rutina.
- Validar que al menos un ejercicio esté asociado.
- Asociar rutina a días de la semana (tabla `PlanSemanal`).

### Módulo Plan Semanal
- Crear tabla `PlanSemanal`.
- Diseñar calendario semanal editable.
- Mostrar rutinas asignadas por día.

### Módulo Ejecución de Rutina
- Crear tablas `EjecucionesRutina` y `EjecucionDetalle`.
- Diseñar pantalla de ejecución con temporizadores.
- Registrar peso, repeticiones y descansos.
- Finalizar rutina y guardar datos.

### Módulo Progreso
- Crear tabla `Progreso`.
- Generar gráficas de evolución semanal/mensual.
- Mostrar estadísticas de fuerza y constancia.

### Módulo Datos Físicos
- Crear tabla `DatosFisicos`.
- Diseñar pantalla Perfil físico.
- Validar estatura, peso, edad y género.
- Integrar métricas personalizadas (ej. IMC).

---

## 🚀 Roadmap sugerido
- **Sprint 1:** Login + Usuarios + Ejercicios.  
- **Sprint 2:** Rutinas + RutinaEjercicios.  
- **Sprint 3:** Plan semanal.  
- **Sprint 4:** Ejecución de rutina.  
- **Sprint 5:** Progreso + Datos físicos.  

---

## ⚙️ Instalación y ejecución

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/FitTrack.git

# Instalar dependencias
cd FitTrack
npm install

# Iniciar proyecto en Expo
expo start
