import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Center, Spinner, Text, useToast } from "@chakra-ui/react";
import { useSlots } from "../../../api/useSlots";
import apiClient from "../../../api";
import { convertDateFormat } from "../../../utils/functions";
import ConfirmModal from "./confirmModal";

export default function BookingCalendar() {
    const { slots, isLoading, error } = useSlots();
    const [events, setEvents] = useState<EventInput[]>([]);
    const toast = useToast();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const mapSlotsToEvents = (slots: any[]): EventInput[] =>
        slots.map((slot) => ({
            id: String(slot.id),
            title: slot.reserved ? "Reserved" : "Available",
            start: slot.start_time,
            end: slot.end_time,
            backgroundColor: slot.reserved ? "#ff6347" : "#28a745",
            borderColor: slot.reserved ? "#ff6347" : "#28a745",
        }));

    useEffect(() => {
        setEvents(mapSlotsToEvents(slots));
    }, [slots]);

    const handleEventClick = (info: any) => {
        setSelectedEvent(info);
        setIsModalOpen(true);
    };

    const handleConfirmReservation = async () => {
        if (!selectedEvent) return;

        const start_time = new Date(selectedEvent.event.startStr).toISOString();
        const end_time = new Date(selectedEvent.event.endStr).toISOString();

        setIsUpdating(true);
        setIsModalOpen(false);

        try {
            await apiClient.post("/bookings/", {
                id: parseInt(selectedEvent.event.id),
                start_time,
                end_time,
            });

            toast({
                title: "Reservation successful.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            const response = await apiClient.get("/slots/");
            setEvents(mapSlotsToEvents(response.data));
        } catch (error) {
            console.error("Error while making reservation:", error);

            toast({
                title: "Error making reservation.",
                description: (error as any).response?.data?.detail || "Unknown error",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Box w="80%" h="100%" p="2rem" color="gray.10">
            {isLoading || isUpdating ? (
                <Center pt="5rem">
                    <Spinner size="xl" color="blue.500" />
                </Center>
            ) : error ? (
                <Text color="red.500">{error}</Text>
            ) : (
                <>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
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
                        selectable={false}
                        eventClick={handleEventClick}
                    />

                    <ConfirmModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleConfirmReservation}
                        title="Confirm Reservation"
                        description={`Do you want to reserve the time slot from ${convertDateFormat(
                            selectedEvent?.event.startStr
                        )} to ${convertDateFormat(selectedEvent?.event.endStr)}?`}
                    />
                </>
            )}
        </Box>
    );
}
