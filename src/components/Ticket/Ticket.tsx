import { memo } from 'react';
import './Ticket.scss';
import { Box, Grid, Stack, Typography } from '@mui/material';
import type { TicketItem } from '../../definitions/ticket';
import { useCurrencyCode, useConvertFromRub } from '../../hooks/useCurrency';
import { CURRENCY_SYMBOL } from '../../constants/currency';
import { formatTransfers } from '../../utils/formatTransfers';
import { formatDuration } from '../../utils/formatTime';

const routeTextSx = {
    fontSize: { xs: 11, sm: 13, md: 14 },
    lineHeight: '18px',
    letterSpacing: '0.5px',
    fontWeight: 400,
    color: '#A0B0B9',
    textTransform: 'uppercase',
};

const timeTextSx = {
    fontSize: { xs: 13, sm: 15, md: 16 },
    lineHeight: '21px',
    fontWeight: 600,
    color: '#4A4A4A',
};

function TicketPrice({ priceRub }: { priceRub: number }) {
    const currency = useCurrencyCode();
    const converted = useConvertFromRub(priceRub);
    const displayPrice = converted.toLocaleString('ru-RU', { maximumFractionDigits: 0 });
    const symbol = CURRENCY_SYMBOL[currency];
    return (
        <Typography
            className="ticket-price"
            sx={{
                fontSize: { xs: 16, sm: 20, md: 22 },
            }}
        >
            {displayPrice} {symbol}
        </Typography>
    );
}

const Ticket = memo(function Ticket({ ticket, displayTag }: { ticket: TicketItem; displayTag?: string }) {
    const segment0 = ticket.segment?.[0];
    const flights = segment0?.flight ?? [];
    const carriers = ticket.carriers;
    const airlinesLogo = carriers.map((carrier) => {
        return (
            <img className='ticket-airlines-logo' key={carrier} src={`https://img.avs.io/pics/al_square/${carrier}@png?rs=fit:30:30`} alt={carrier} />
        );
    });

    const transfersCount = Math.max(0, flights.length - 1);
    const transferAirports = transfersCount > 0
        ? flights.slice(0, -1).map((f) => f.arrival)
        : [];

    return (
        <Box className='ticket'>
            <Grid container spacing={3}>
                <Grid size={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TicketPrice priceRub={ticket.priceRub ?? 0} />
                </Grid>
                <Grid size={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    {displayTag && (
                        <Typography
                            className='ticket-tag'
                            sx={{
                                fontSize: { xs: 10, sm: 11, md: 12 },
                                textAlign: 'center',
                            }}
                        >
                            <span className='ticket-tag-dot'></span>
                            {displayTag}
                        </Typography>
                    )}
                </Grid>
                <Grid size={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography className='ticket-airlines-container'>
                        {airlinesLogo}
                    </Typography>
                </Grid>
                <Grid size={4}>
                    <Stack direction="column" spacing={1.5}>
                        {flights.map((flight, index) => (
                            <Box key={`${flight.departure}-${flight.arrival}-${flight.departure_time}-${index}`}>
                                <Typography sx={routeTextSx}>
                                    {flight.departure} - {flight.arrival}
                                </Typography>
                                <Typography
                                    sx={timeTextSx}
                                >
                                    {flight.departure_time} – {flight.arrival_time}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Grid>
                <Grid size={4}>
                    <Stack direction="column" spacing={1.5}>
                        {flights.map((flight, index) => {
                            return (
                                <Box key={`${flight.departure}-${flight.arrival}-${flight.departure_time}-${index}`}>
                                    <Typography
                                        sx={routeTextSx}
                                    >
                                        В пути
                                    </Typography>
                                    <Typography
                                        sx={timeTextSx}
                                    >
                                        {formatDuration(flight.duration ?? 0)}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </Grid>
                <Grid size={4}>
                    <Stack direction="column" spacing={0.5}>
                        <Typography
                            sx={routeTextSx}
                        >
                            {formatTransfers(transfersCount)}
                        </Typography>
                        {transferAirports.length > 0 && (
                            <Typography
                                sx={timeTextSx}
                            >
                                {transferAirports.join(', ')}
                            </Typography>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
});

export default Ticket;
