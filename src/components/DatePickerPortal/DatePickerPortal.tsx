import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Popper, Paper, ClickAwayListener, useMediaQuery, useTheme } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'

const ALLOWED_DATES = ['2026-02-20', '2026-02-26'];
const FEBRUARY_2026 = { min: dayjs('2026-02-01'), max: dayjs('2026-02-28') }

export type DatePickerPortalHandle = {
    open: (anchorEl: HTMLElement | null, initialDate: string, onSelect: (iso: string) => void) => void
}

const DatePickerPortal = forwardRef<DatePickerPortalHandle>(function DatePickerPortal(_, ref) {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [value, setValue] = useState<string>('')
    const onSelectRef = useRef<(iso: string) => void>(() => {})
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        if (!open) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [open])

    useImperativeHandle(ref, () => ({
        open(anchor: HTMLElement | null, initialDate: string, onSelect: (iso: string) => void) {
            setAnchorEl(anchor)
            setValue(initialDate)
            onSelectRef.current = onSelect
            setOpen(true)
        },
    }), [])

    const handleClose = () => setOpen(false)

    const handleChange = (date: Dayjs | null) => {
    if (!date) return
    const iso = date.format('YYYY-MM-DD')
    if (ALLOWED_DATES.includes(iso as (typeof ALLOWED_DATES)[number])) {
        onSelectRef.current(iso)
        setOpen(false)
    }
    }

  if (!open || !anchorEl) return null

  const calendar = (
    <DateCalendar
        value={value ? (dayjs(value) as Dayjs) : null}
        referenceDate={FEBRUARY_2026.min}
        minDate={FEBRUARY_2026.min}
        maxDate={FEBRUARY_2026.max}
        disableHighlightToday
        onChange={handleChange}
        shouldDisableDate={(d) => {
            const iso = d.format('YYYY-MM-DD')
            return !ALLOWED_DATES.includes(iso as (typeof ALLOWED_DATES)[number])
        }}
    />
  )

  if (isMobile) {
    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Выбор даты вылета"
            onClick={handleClose}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300,
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    overflow: 'hidden',
                    width: '100%',
                    mx: 2,
                }}
                onClick={(event) => event.stopPropagation()}
            >
                {calendar}
            </Paper>
        </div>,
        document.body
    )
  }

  const content = (
    <ClickAwayListener onClickAway={handleClose}>
        <div style={{ outline: 'none' }}>
            <Paper elevation={8} sx={{ overflow: 'hidden' }}>
                {calendar}
            </Paper>
        </div>
    </ClickAwayListener>
  )

  const portalAnchor = (
    <div
        style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            overflow: 'visible',
            pointerEvents: 'none',
        }}
        aria-hidden
    >
        <div style={{ pointerEvents: 'auto' }}>
            <Popper
                open
                disablePortal
                anchorEl={anchorEl}
                placement="bottom-start"
                modifiers={[{ name: 'offset', options: { offset: [0, 4] } }]}
                sx={{
                    zIndex: 1300,
                    outline: 'none',
                    '& > div': { outline: 'none', border: 'none' },
                }}
            >
                {content}
            </Popper>
        </div>
    </div>
  )

  return createPortal(portalAnchor, document.body)
})

export default DatePickerPortal
