import { useState, useEffect, useCallback } from 'react'

export function usePagination<T>(list: T[], pageSize: number) {
    const [visibleCount, setVisibleCount] = useState(pageSize)

    useEffect(() => {
        setVisibleCount(pageSize)
    }, [list, pageSize])

    const visibleList = list.slice(0, visibleCount)
    const hasMore = visibleCount < list.length
    const loadMore = useCallback(() => {
        setVisibleCount((c) => c + pageSize)
    }, [pageSize])

    return { visibleList, hasMore, loadMore }
}
