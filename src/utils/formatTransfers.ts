export function formatTransfers(count: number): string {
    if (count === 0) return 'Без пересадок';
    if (count === 1) return '1 пересадка';
    if (count >= 2 && count <= 4) return `${count} пересадки`;
    return `${count} пересадок`;
}

