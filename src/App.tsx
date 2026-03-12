import MainLayout from "./components/Layouts/MainLayout";
import TransfersCountFilter from "./components/Filters/TransfersCountFilter/TransfersCountFilter";
import AviaCompanyFilter from "./components/Filters/AviaCompanysFilter/AviaCompanyFilter";
import { useRef } from "react";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import DatePickerPortal from "./components/DatePickerPortal/DatePickerPortal";
import type { DatePickerPortalHandle } from "./components/DatePickerPortal/DatePickerPortal";
import { Box, Stack } from "@mui/material";
import TicketsColumn from "./components/TicketsColumn/TicketsColumn";

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
                    <Box sx={{ flexShrink: 0, width: { xs: "100%", md: 280 }, display: "flex", flexDirection: "column", gap: 2 }}>
                        <TransfersCountFilter />
                        <AviaCompanyFilter />
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
