import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { AIRPORTS } from "../../constants/airports";
import { outlinedRootSx, noOutlineSx } from "./styles";

const airportOptions = Object.values(AIRPORTS).map((data) => data.city);
const filterOptions = createFilterOptions<string>();

const autocompleteSlotProps = {
    popper: {
        modifiers: [
            { name: "offset" as const, options: { offset: [0, -5] } },
        ],
    },
    paper: {
        sx: {
            boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
            "& .MuiAutocomplete-option:hover": {
                backgroundColor: "#F0F4F8",
            },
            "& .MuiAutocomplete-option[aria-selected='true']": {
                backgroundColor: "#E3EDFB",
            },
        },
    },
};

type AirportAutocompleteProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    inputSx?: SxProps<Theme>;
    rootSx?: Record<string, unknown>;
    textFieldSx?: SxProps<Theme>;
};

const AirportAutocomplete = ({
    value,
    onChange,
    placeholder,
    inputSx,
    rootSx,
    textFieldSx,
}: AirportAutocompleteProps) => {
    const isOpen =
        value.length > 0 && !airportOptions.includes(value);

    return (
        <Autocomplete
            disableClearable
            freeSolo
            options={airportOptions}
            filterOptions={(options, state) =>
                filterOptions(options, state).filter((opt) =>
                    opt.toLowerCase().startsWith(value.toLowerCase())
                )
            }
            open={isOpen}
            onOpen={() => {}}
            onClose={() => {}}
            value={value}
            onChange={(_, newValue) => onChange(newValue ?? "")}
            inputValue={value}
            onInputChange={(_, newInput) => onChange(newInput)}
            fullWidth
            slotProps={autocompleteSlotProps}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    sx={[
                        {
                            height: "50px",
                            position: "relative",
                            "& .MuiOutlinedInput-root": { ...outlinedRootSx, ...rootSx },
                            "& .MuiOutlinedInput-notchedOutline": noOutlineSx,
                        },
                        inputSx && { "& .MuiInputBase-input": inputSx },
                        ...(Array.isArray(textFieldSx) ? textFieldSx : [textFieldSx]),
                    ]}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                        },
                    }}
                />
            )}
        />
    );
};

export default AirportAutocomplete;
