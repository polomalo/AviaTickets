import { useRef } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import type { DatePickerPortalHandle } from "../DatePickerPortal/DatePickerPortal";
import { useTicketSearch } from "../../hooks/useTicketSearch";
import AirportAutocomplete from "./AirportAutocomplete";
import {
    dividerAfterSx,
    inputBaseSx,
    outlinedRootSx,
    noOutlineSx,
    sectionSx,
    formSx,
} from "./styles";

const formatDateDisplay = (iso: string): string =>
    dayjs(iso).format("DD.MM.YYYY");

type SearchFormProps = {
    datePickerRef: React.RefObject<DatePickerPortalHandle | null>;
};

const SearchForm = ({ datePickerRef }: SearchFormProps) => {
    const { searchParams, setSearchParams, handleSearch } = useTicketSearch();
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleSearchClick = async () => {
        await handleSearch(searchParams);
    };

    const handleDateInputClick = () => {
        datePickerRef.current?.open(
            dateInputRef.current,
            searchParams.date,
            (iso) => {
                setSearchParams((prev) => ({ ...prev, date: iso }));
            },
        );
    };

    return (
        <Box component="section" sx={sectionSx}>
            <Box component="form" sx={formSx}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{ width: "100%", height: "100%" }}
                >
                    <AirportAutocomplete
                        value={searchParams.origin ?? ""}
                        onChange={(val) =>
                            setSearchParams((prev) => ({ ...prev, origin: val }))
                        }
                        placeholder="ОТКУДА"
                        textFieldSx={{ "&::after": dividerAfterSx }}
                        inputSx={inputBaseSx}
                        rootSx={{
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        }}
                    />
                    <AirportAutocomplete
                        value={searchParams.destination ?? ""}
                        onChange={(val) =>
                            setSearchParams((prev) => ({ ...prev, destination: val }))
                        }
                        placeholder="КУДА"
                        textFieldSx={{ "&::after": dividerAfterSx }}
                        inputSx={inputBaseSx}
                    />
                    <TextField
                        inputRef={dateInputRef}
                        id="date"
                        type="text"
                        placeholder="КОГДА"
                        value={searchParams.date ? formatDateDisplay(searchParams.date) : ""}
                        onClick={handleDateInputClick}
                        variant="outlined"
                        fullWidth
                        sx={{
                            height: "50px",
                            "& .MuiInputBase-input": {
                                ...inputBaseSx,
                                cursor: "pointer",
                            },
                            "& .MuiOutlinedInput-root": {
                                ...outlinedRootSx,
                                borderTopRightRadius: { xs: 0, sm: "10px" },
                                borderBottomLeftRadius: { xs: "10px", sm: 0 },
                                borderBottomRightRadius: "10px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": noOutlineSx,
                        }}
                        slotProps={{
                            input: { readOnly: true },
                        }}
                    />
                </Stack>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                    sx={{
                        width: { xs: "100%", sm: 300 },
                        height: { xs: 44, sm: "100%" },
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        borderRadius: 1,
                        ml: { xs: 0, sm: 2.5 },
                        mt: { xs: 1.5, sm: 0 },
                        "&:hover": { backgroundColor: "#6155F5" },
                    }}
                >
                    Найти
                </Button>
            </Box>
        </Box>
    );
};

export default SearchForm;
