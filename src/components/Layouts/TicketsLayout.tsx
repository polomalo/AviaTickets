import { Box, Grid, Typography } from '@mui/material';
import type { TicketItem } from '@/definitions/ticket';
import type { SortMode, TransferFilter, AirlineFilter } from '@/definitions/filters';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { selectFilteredAndSortedTickets, selectTicketLabels } from '@/redux/selectors/ticketsSelectors';
import { PAGE_SIZE } from '@/constants/search';
import { usePagination } from '@/hooks/usePagination';
import { Button, CircularProgress } from '@mui/material';
import { Ticket } from '@components';

function getTicketKey(ticket: TicketItem, index: number): string {
    const seg = ticket.segment?.[0];
    const flights = seg?.flight ?? [];
    const route = flights.map((f) => `${f.departure}-${f.arrival}-${f.departure_time}`).join('|');
    return `${ticket.priceRub ?? 0}-${ticket.carriers.join(',')}-${route}-${index}`;
}

const TicketsLayout = ({ sortMode, transferFilter, airlineFilter }: { sortMode: SortMode; transferFilter: TransferFilter; airlineFilter: AirlineFilter }) => {
    const { tickets: ticketsState, loading, error, hasSearched } = useSelector((state: RootState) => state.tickets);
    const sortedTickets = useSelector((state: RootState) =>
        selectFilteredAndSortedTickets(state, sortMode, transferFilter, airlineFilter)
    );
    const ticketLabels = useSelector((state: RootState) =>
        selectTicketLabels(state, transferFilter, airlineFilter)
    );
    const { visibleList, hasMore, loadMore } = usePagination(sortedTickets, PAGE_SIZE);

    if (loading) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) return <Typography color="error" sx={{ p: 2 }}>{error}</Typography>;
    if (!loading && !error && !hasSearched) {
        return (
            <Typography sx={{ pt: 2 }}>
                Введите параметры и нажмите «Найти», чтобы увидеть доступные билеты.
            </Typography>
        );
    }
    if (!loading && !error && hasSearched && ticketsState.length === 0) {
        return (
            <Typography sx={{ pt: 2 }}>
                По вашему запросу билетов не найдено.
            </Typography>
        );
    }

    return (
        <Box sx={{ p: 2, paddingLeft: 0, paddingRight: 0 }}>
            <Grid container spacing={2}>
                {visibleList.map((ticket, index) => (
                    <Grid key={getTicketKey(ticket, index)} size={{ xs: 12 }}>
                        <Ticket ticket={ticket} labels={ticketLabels.get(ticket)} />
                    </Grid>
                ))}
            </Grid>
            {hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={loadMore}
                        sx={{
                            backgroundColor: '#2196F3',
                            color: '#fff',
                            width: '100%',
                            '&:hover': {
                                backgroundColor: '#6155F5',
                            },
                        }}
                    >
                        Показать ещё 5 билетов!
                    </Button>
                </Box>
            )}
        </Box>
    );
};
export default TicketsLayout;
