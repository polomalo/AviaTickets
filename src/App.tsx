import { useRef } from "react";
import { Box, Stack } from "@mui/material";
import {
    MainLayout,
    Header,
    SearchForm,
    DatePickerPortal,
    TransfersCountFilter,
    AviaCompanyFilter,
    TicketsColumn,
} from "@components";
import type { DatePickerPortalHandle } from "@components";

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
