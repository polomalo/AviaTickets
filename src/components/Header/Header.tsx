import { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { CurrencySelect } from "@components";

const HeaderTitle = memo(() => {
    const logoSrc = `${import.meta.env.BASE_URL}Avia_Logo.png`;
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 56,
            }}
        >
            <Box
                component="img"
                src={logoSrc}
                alt="Avia Logo"
                sx={{ width: 80, height: 80, flexShrink: 0, display: 'block' }}
            />
            <Typography
                component="h1"
                sx={{
                    ml: { xs: 2, md: 5 },
                    textTransform: 'uppercase',
                    fontSize: { xs: 20, sm: 24, md: 32 },
                    fontWeight: 500,
                    lineHeight: 1.2,
                    color: '#4A4A4A',
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                поиск авиабилетов
            </Typography>
        </Stack>
    );
});

const Header = () => {
    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                paddingTop: { xs: 2, md: 4 },
                marginBottom: { xs: 2, md: 4 },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'flex-end',
                }}
            >
                <CurrencySelect />
            </Box>
            <HeaderTitle />
        </Stack>
    );
}

export default Header;