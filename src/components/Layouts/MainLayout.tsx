import { Container } from "@mui/material";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container
            maxWidth={false}
            sx={{
                width: '100%',
                px: { xs: 2, sm: 3 },
                maxWidth: 1280,
                mx: '0 auto',
                minHeight: '100vh',
            }}
        >
            {children}
        </Container>
    );
};

export default MainLayout;