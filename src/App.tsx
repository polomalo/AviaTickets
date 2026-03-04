import MainLayout from "./components/Layouts/MainLayout";
import TicketsColumn from "./components/TicketsColumn/TicketsColumn";
import TransfersCountFilter from "./components/Filters/TransfersCountFilter/TransfersCountFilter";
import { useRef } from "react";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import DatePickerPortal from "./components/DatePickerPortal/DatePickerPortal";
import type { DatePickerPortalHandle } from "./components/DatePickerPortal/DatePickerPortal";
import { Box, Stack } from "@mui/material";

export default function App() {
    const datePickerRef = useRef<DatePickerPortalHandle>(null);

    return (
        <>
            <MainLayout>
                <Header />
                    <SearchForm datePickerRef={datePickerRef} />
                    <main className="main">
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 2, md: 3 }}
                            sx={{
                                alignItems: { xs: "stretch", md: "flex-start" },
                            }}
                        >
                            <Box sx={{ flexShrink: 0, width: { xs: "100%", md: 280 } }}>
                                <TransfersCountFilter />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <TicketsColumn />
                            </Box>
                        </Stack>
                    </main>
            </MainLayout>
            <DatePickerPortal ref={datePickerRef} />
        </>
    );
}
