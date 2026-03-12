import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import type { TransferFilter } from '@/definitions/filters'

export function useTransferFilter(): TransferFilter {
    const { allTransfers, transferCounts } = useSelector((state: RootState) => state.transfersFilter)
    return useMemo<TransferFilter>(
        () => ({ allTransfers, transferCounts: new Set(transferCounts) }),
        [allTransfers, transferCounts]
    )
}
