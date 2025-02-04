import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Center, Spinner, Text, useToast } from "@chakra-ui/react";
import { useSlots } from "../../../api/useSlots";
import apiClient from "../../../api";

export default function BookingCalendar() {
    const { slots, isLoading, error } = useSlots();
    const [events, setEvents] = useState<EventInput[]>([]);
    const toast = useToast();

    useEffect(() => {
        const mappedEvents = slots.map((slot) => ({
            id: String(slot.id),
            title: "Disponível",
            start: slot.start_time,
            end: slot.end_time,
            backgroundColor: "#28a745",
            borderColor: "#28a745",
        }));
        setEvents(mappedEvents);
    }, [slots]);

    const handleSelect = async (info: DateSelectArg) => {
        const newEvent: EventInput = {
            title: "Reservado",
            start: info.startStr,
            end: info.endStr,
            backgroundColor: "#ff6347", // Cor para indicar reserva (laranja)
            borderColor: "#ff6347",
        };

        const isAlreadyReserved = events.some(
            (event) =>
                event.start === info.startStr && event.end === info.endStr
        );

        if (isAlreadyReserved) {
            toast({
                title: "Horário já reservado.",
                description: "Por favor, selecione outro horário.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            // Envia a reserva para o backend
            const response = await apiClient.post("/bookings/", {
                start_time: info.startStr,
                end_time: info.endStr,
            });
            setEvents((prev) => [...prev, newEvent]);

            toast({
                title: "Reserva adicionada com sucesso.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Erro ao adicionar reserva:", error);

            toast({
                title: "Erro ao adicionar reserva.",
                description: "Não foi possível adicionar a reserva. Tente novamente.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box w="80%" h="100%" p="2rem" color='gray.10'>
            {isLoading ? (
                <Center pt='5rem'>
                    <Spinner size="xl" color="blue.500" />
                </Center>
            ) : error ? (
                <Text color="red.500">{error}</Text>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridDay"
                    events={events}
                    eventDidMount={(info) => {
                        info.el.style.cursor = "pointer";
                    }}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    editable={false}
                    selectable={true} // Permite selecionar horários
                    select={(info) => handleSelect(info)} // Lida com a seleção do usuário
                    eventClick={(info) => alert(`Slot selecionado: ${info.event.title}`)}
                />
            )}
        </Box>
    );
}
