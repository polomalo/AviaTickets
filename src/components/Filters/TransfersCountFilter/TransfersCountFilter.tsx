import './TransfersCountFilter.scss';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Skeleton } from '@mui/material';
import type { AppDispatch, RootState } from '../../../redux/store';
import { setAllTransfers, toggleTransferCount, selectOnlyTransferCount } from '../../../redux/slices/transfersFilterSlice';
import { selectTransfersFilterView } from '../../../redux/selectors/transfersSelectors';
import { formatTransfers } from '../../../utils/formatTransfers';

const checkIconUrl = `${import.meta.env.BASE_URL}Check.svg`;

function TransfersCheckboxRow({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: () => void;
    label: string;
}) {
    return (
        <label className="transfers-count-filter-row">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="transfers-count-filter-row-input"
            />
            <span
                className="transfers-count-filter-row-box"
                aria-hidden
                style={checked ? {
                    borderColor: 'var(--color-primary)',
                    backgroundImage: `url(${checkIconUrl})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '12px 8px',
                } : undefined}
            />
            <span className="transfers-count-filter-row-label">{label}</span>
        </label>
    );
}

const TransfersCountFilterInner = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { transferOptions, allTransfers, transferCounts } = useSelector(
        selectTransfersFilterView,
        shallowEqual
    );
    const ticketsLoading = useSelector((state: RootState) => state.tickets.loading);

    const handleAllChange = useCallback(() => dispatch(setAllTransfers()), [dispatch]);
    const handleTransferCountChange = useCallback(
        (count: number) => () => {
            if (allTransfers) {
                dispatch(selectOnlyTransferCount(count));
            } else {
                dispatch(toggleTransferCount({ count, totalOptions: transferOptions.length }));
            }
        },
        [dispatch, allTransfers, transferOptions]
    );

    return (
        <div className="transfers-count-filter">
            <div className="transfers-count-filter-title">количество пересадок</div>
            <div className="transfers-count-filter-list">
                {ticketsLoading ? (
                    <>
                        {[0, 1, 2, 3].map((i) => (
                            <Skeleton
                                key={i}
                                variant="rectangular"
                                height={24}
                                sx={{ mb: 1, borderRadius: '4px' }}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <TransfersCheckboxRow checked={allTransfers} onChange={handleAllChange} label="Все" />
                        {transferOptions.map((count) => (
                            <TransfersCheckboxRow
                                key={count}
                                checked={allTransfers || transferCounts.includes(count)}
                                onChange={handleTransferCountChange(count)}
                                label={formatTransfers(count)}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

const TransfersCountFilter = memo(TransfersCountFilterInner);
export default TransfersCountFilter;
