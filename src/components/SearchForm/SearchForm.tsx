import { useRef } from "react";
import { Button } from "@mui/material";
import type { DatePickerPortalHandle } from "../DatePickerPortal/DatePickerPortal";
import { useTicketSearch } from "../../hooks/useTicketSearch";
import "./SearchForm.scss";

function formatDateDisplay(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

type SearchFormProps = {
  datePickerRef: React.RefObject<DatePickerPortalHandle | null>;
};

export default function SearchForm({ datePickerRef }: SearchFormProps) {
    const { searchParams, setSearchParams, handleSearch } = useTicketSearch();
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleSearchClick = () => {
        void handleSearch(searchParams);
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
        <section className="search">
            <div className="search-form">
                <div className="search-form-wrapper">
                    <input
                    id="from"
                    type="text"
                    placeholder="ОТКУДА"
                    className="search-form-wrapper-input"
                    autoComplete="off"
                    value={searchParams.origin}
                    onChange={(e) =>
                        setSearchParams((prev) => ({ ...prev, origin: e.target.value }))
                    }
                    />
                </div>
                <div className="search-form-wrapper">
                    <input
                    id="to"
                    type="text"
                    placeholder="КУДА"
                    autoComplete="off"
                    className="search-form-wrapper-input"
                    value={searchParams.destination}
                    onChange={(e) =>
                        setSearchParams((prev) => ({ ...prev, destination: e.target.value }))
                    }
                    />
                </div>
                <div className="search-form-wrapper search-form-wrapper-date">
                    <input
                    ref={dateInputRef}
                    id="date"
                    type="text"
                    placeholder="КОГДА"
                    readOnly
                    value={searchParams.date ? formatDateDisplay(searchParams.date) : ""}
                    onClick={handleDateInputClick}
                    className="search-form-wrapper-input"
                    />
                </div>
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearchClick}
                sx={{
                    width: { xs: '100%', sm: 300 },
                    height: '100%',
                    backgroundColor: '#2196F3',
                    color: '#fff',
                    borderRadius: 1,
                    ml: { xs: 0, sm: 2.5 },
                    mt: { xs: 1.5, sm: 0 },
                    '&:hover': {
                    backgroundColor: '#6155F5',
                    },
                }}
                className="search-form-button"
            >
                Найти
            </Button>
        </section>
    );
}

