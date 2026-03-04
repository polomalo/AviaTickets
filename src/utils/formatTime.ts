export function formatDuration(minutes: number): string {
    const total = Math.max(0, minutes)
    const h = Math.floor(total / 60)
    const m = total % 60
    return m ? `${h}ч ${m}м` : `${h}ч`
}
