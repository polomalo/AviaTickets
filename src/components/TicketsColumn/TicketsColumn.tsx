import { memo, useState } from 'react'
import type { SortMode, TransferFilter } from '../../definitions/filters'
import { useTransferFilter } from '../../hooks/useTransferFilter'
import TicketsFilter from '../Filters/TicketsFilter/TicketsFilter'
import TicketsLayout from '../Layouts/TicketsLayout'

const TicketsColumn = memo(function TicketsColumn() {
    const [sortMode, setSortMode] = useState<SortMode>('cheapest')
    const transferFilter: TransferFilter = useTransferFilter()

    return (
        <div className="main__tickets-column">
            <section>
                <TicketsFilter sortMode={sortMode} onSortModeChange={setSortMode} />
            </section>
            <section>
                <TicketsLayout sortMode={sortMode} transferFilter={transferFilter} />
            </section>
        </div>
    )
})

export default TicketsColumn

