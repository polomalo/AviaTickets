import { memo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box, Typography } from '@mui/material'
import { useCurrency, useCurrencyCode } from '../../hooks/useCurrency'
import { CURRENCY_OPTIONS } from '../../constants/currency'
import type { CurrencyCode } from '../../constants/currency'

export type CurrencySelectProps = {
  portalContainer?: HTMLElement | null
}

const boxSx = {
    bgcolor: '#fff',
    color: '#4A4A4A!important',
    borderRadius: '10px',
    overflow: 'hidden',
    minWidth: 80,
}

const rowSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2,
    py: 1.25,
    cursor: 'pointer',
    '&:hover': { background: '#F1FCFF' },
}

function CurrencySelect({ portalContainer = null }: CurrencySelectProps) {
    const currency = useCurrencyCode()
    const { setCurrency } = useCurrency()
    const [open, setOpen] = useState(false)

    const handleSelect = (code: CurrencyCode) => {
        setCurrency(code)
        setOpen(false)
    }

    const otherOptions = CURRENCY_OPTIONS.filter((c) => c !== currency)

    const content = (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
        {open && (
            <Box
                sx={{ position: 'fixed', inset: 0, zIndex: 1 }}
                onClick={() => setOpen(false)}
                aria-hidden
            />
        )}

        <Box
            sx={{
                ...boxSx,
                position: 'relative',
                zIndex: 2,
                ...(open && {
                borderBottom: 'none',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                }),
            }}
        >
        <Box sx={rowSx} onClick={() => setOpen((v) => !v)}>
            <Typography component="span" sx={{ color: '#4A4A4A' }}>
                {currency}
            </Typography>
            <Box
                component="span"
                aria-hidden
                sx={{
                    marginLeft: '10px',
                    width: 15,
                    height: 15,
                    flexShrink: 0,
                    backgroundImage: 'url(/Arrow.svg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    transition: 'transform 0.2s',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
            />
            </Box>
        </Box>

        {open && (
        <Box
            sx={{
            ...boxSx,
            position: 'absolute',
            zIndex: 3,
            top: '100%',
            left: 0,
            width: '100%',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            }}
        >
            {otherOptions.map((code) => (
            <Box
                key={code}
                sx={rowSx}
                onClick={() => handleSelect(code)}
            >
                <Typography component="span" sx={{ color: '#4A4A4A' }}>
                {code}
                </Typography>
            </Box>
            ))}
        </Box>
        )}
    </Box>
    )

    if (portalContainer) {
        return createPortal(content, portalContainer)
    }
    return content
}

export default memo(CurrencySelect)
