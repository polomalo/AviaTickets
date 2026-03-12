import { Box, Button, ButtonGroup } from '@mui/material';
import type { SortMode } from '@/definitions/filters';

export interface TicketsFilterProps {
    sortMode: SortMode;
    onSortModeChange: (mode: SortMode) => void;
}

const baseButtonSx = {
    fontSize: { xs: 10, sm: 12, md: 14 },
    transition: 'none',
    whiteSpace: 'nowrap',
    px: { xs: 1, sm: 2, md: 3 },
};

const getButtonSx = (active: boolean) => ({
    ...baseButtonSx,
    background: active ? '#2196F3' : '#FFFFFF',
    borderColor: active ? '#2196F3' : '#DFE5EC',
    color: active ? '#FFFFFF' : '#4A4A4A',
    '&:hover': {
        background: active ? '#2196F3' : '#F1FCFF',
    },
});

const TicketsFilter = ({ sortMode, onSortModeChange }: TicketsFilterProps) => {
    return (
        <Box
            sx={{
                height: '50px',
                width: '100%',
            }}
        >
            <ButtonGroup
                aria-label="sort tickets"
                fullWidth
                sx={{ height: '100%' }}
            >
                <Button
                    sx={getButtonSx(sortMode === 'cheapest')}
                    variant="outlined"
                    disableRipple
                    onClick={() => onSortModeChange('cheapest')}
                >
                    cамый дешевый
                </Button>
                <Button
                    sx={getButtonSx(sortMode === 'fastest')}
                    variant="outlined"
                    disableRipple
                    onClick={() => onSortModeChange('fastest')}
                >
                    cамый быстрый
                </Button>
                <Button
                    sx={getButtonSx(sortMode === 'optimal')}
                    variant="outlined"
                    disableRipple
                    onClick={() => onSortModeChange('optimal')}
                >
                    оптимальный
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default TicketsFilter;

