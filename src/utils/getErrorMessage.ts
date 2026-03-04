export function getErrorMessage(err: unknown): string {
    if (err == null) return 'Ошибка запроса'
    if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: string }).message === 'string') {
        return (err as { message: string }).message
    }
    if (err instanceof Error) return err.message
    return String(err)
}
