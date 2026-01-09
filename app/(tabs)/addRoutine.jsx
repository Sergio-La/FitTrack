import { useRouter } from "expo-router";
import { useState } from "react";

const AddRoutine = () => {
    const router = useRouter();
    const [nombreRutina, setNombreRutina] = useState('');
    const [dia, setDia] = useState('');
    const [dias, setDias] = useState([]);
    const [gruposMusculares, setGruposMusculares] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
}