import { Outlet, Route, Routes as ReactRouterRoutes, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Home } from "../pages/Home";
import { useEffect } from "react";

export function Routes() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (['/'].includes(location.pathname)) {
            navigate('/home');
        }
    }, [location.pathname, navigate]);

    return (
        <ReactRouterRoutes>
            <Route path="/" element={<Layout />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </ReactRouterRoutes>
    );
}

function Layout() {
    return (
        <Box as="main" w="100vw" h="100vh">
            <Outlet />
        </Box>
    );
}