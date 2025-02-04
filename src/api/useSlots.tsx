import { useEffect, useState } from "react";
import apiClient from ".";

// Tipagem para os slots
interface Slot {
    id: number;
    start_time: string; // Formato "HH:mm"
    end_time: string;   // Formato "HH:mm"
}

export function useSlots() {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSlots() {
            try {
                setIsLoading(true);
                const response = await apiClient.get<Slot[]>("/slots/"); // Chama o endpoint
                setSlots(response.data);
            } catch (err) {
                console.error("Erro ao buscar slots:", err);
                setError("Não foi possível carregar os slots.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchSlots();
    }, []);

    return { slots, isLoading, error };
}
