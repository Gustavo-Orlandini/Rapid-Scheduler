# RapidScheduler

RapidScheduler is a scheduling application built with React, TypeScript, and Vite. It leverages several frameworks and libraries to provide a robust and efficient user experience.

## Frameworks and Libraries Used

- **React**: A JavaScript library for building user interfaces.
https://react.dev/

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
https://www.typescriptlang.org/

- **Vite**: A build tool that provides a fast development environment.
https://vite.dev/

- **Chakra UI**: A simple, modular, and accessible component library for React.
https://chakra-ui.com/

- **Axios**: A promise-based HTTP client for the browser and Node.js.
https://axios-http.com/ptbr/docs/intro

- **FullCalendar**: A full-sized drag-and-drop calendar.
https://fullcalendar.io/

- **React Router**: A collection of navigational components for React applications.
https://reactrouter.com/

### Key Features

- **React**: Provides a component-based architecture, making the application modular and easy to maintain.
- **TypeScript**: Adds static typing to JavaScript, helping to catch errors early and improve code quality.
- **Vite**: Offers a fast development server and optimized build process.
- **Chakra UI**: Simplifies the creation of responsive and accessible user interfaces.
- **Axios**: Facilitates communication with the backend API.
- **FullCalendar**: Enables users to view and interact with a calendar interface.

## Running the Project Locally

To run the project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd rapid-scheduler
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following variables:
    ```env
    VITE_API_URL=<your-api-url>
    VITE_API_BASE_URL=<your-api-base-url>
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. **Open the application**:
    Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- [src](http://_vscodecontentref_/2): Contains the source code of the application.
  - `api/`: Contains API-related code, including the [useSlots](http://_vscodecontentref_/3) hook and [apiClient](http://_vscodecontentref_/4).
  - `components/`: Contains reusable UI components like [HeaderBar](http://_vscodecontentref_/5).
  - `contexts/`: Contains context providers like [ApiContext](http://_vscodecontentref_/6).
  - `pages/`: Contains page components like [Home](http://_vscodecontentref_/7).
  - [Routes/](http://_vscodecontentref_/8): Contains the routing configuration.
  - [styles/](http://_vscodecontentref_/9): Contains styling-related files like [theme.ts](http://_vscodecontentref_/10).
  - [App.tsx](http://_vscodecontentref_/11): The main application component.
  - [main.tsx](http://_vscodecontentref_/12): The entry point of the application.

## BookingCalendar Component

The [BookingCalendar](http://_vscodecontentref_/13) component, located in [bookingCalendar.tsx](http://_vscodecontentref_/14), is responsible for displaying and managing the booking calendar. It uses the [FullCalendar](http://_vscodecontentref_/15) library to render the calendar and interact with the user.

### Key Features

- **Displays available and reserved time slots**.
- **Allows users to reserve time slots**.
- **Shows loading and error states**.

### Usage

The [BookingCalendar](http://_vscodecontentref_/16) component fetches time slots from the API using the [useSlots](http://_vscodecontentref_/17) hook and maps them to calendar events. Users can click on available time slots to reserve them.

```tsx
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Center, Spinner, Text, useToast } from "@chakra-ui/react";
import { useSlots } from "../../../api/useSlots";
import apiClient from "../../../api";

export default function BookingCalendar() {
    const { slots, isLoading, error } = useSlots();
    const [events, setEvents] = useState<EventInput[]>([]);
    const toast = useToast();
    const [isUpdating, setIsUpdating] = useState(false);

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

    const handleEventClick = async (info: any) => {
        const confirm = window.confirm(
            `Do you want to reserve the time slot from ${info.event.startStr} to ${info.event.endStr}?`
        );
        if (!confirm) return;

        const start_time = new Date(info.event.startStr).toISOString();
        const end_time = new Date(info.event.endStr).toISOString();

        setIsUpdating(true);

        try {
            await apiClient.post("/bookings/", {
                id: parseInt(info.event.id),
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
                    selectable={false}
                    eventClick={handleEventClick}
                />
            )}
        </Box>
    );
}