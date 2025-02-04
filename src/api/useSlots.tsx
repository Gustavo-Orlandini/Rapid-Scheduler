import { useEffect, useState } from "react";
import apiClient from ".";

interface Slot {
    id: number;
    start_time: string;
    end_time: string;
    reserved: boolean;
}

export function useSlots() {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSlots() {
            try {
                setIsLoading(true);
                const response = await apiClient.get<Slot[]>("/slots/");
                setSlots(response.data);
            } catch (err) {
                console.error("Error fetching slots:", err);
                setError("Unable to load slots.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchSlots();
    }, []);

    return { slots, isLoading, error };
}
