import { memo, useState } from 'react'
import type { SortMode } from '../../definitions/filters'
import { useTransferFilter } from '../../hooks/useTransferFilter'
import { useAirlineFilter } from '../../hooks/useAirlineFilter'
import TicketsFilter from '../Filters/TicketsFilter/TicketsFilter'
import TicketsLayout from '../Layouts/TicketsLayout'

const TicketsColumn = memo(function TicketsColumn() {
    const [sortMode, setSortMode] = useState<SortMode>('cheapest')
    const transferFilter = useTransferFilter()
    const airlineFilter = useAirlineFilter()

    return (
        <div className="main__tickets-column">
            <section>
                <TicketsFilter sortMode={sortMode} onSortModeChange={setSortMode} />
            </section>
            <section>
                <TicketsLayout sortMode={sortMode} transferFilter={transferFilter} airlineFilter={airlineFilter} />
            </section>
        </div>
    )
})

export default TicketsColumn

