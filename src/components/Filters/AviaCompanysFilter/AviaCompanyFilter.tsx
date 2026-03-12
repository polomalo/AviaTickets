import '../TransfersCountFilter/TransfersCountFilter.scss';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Skeleton } from '@mui/material';
import type { AppDispatch, RootState } from '../../../redux/store';
import { setAllAirlines, toggleAirline, selectOnlyAirline } from '../../../redux/slices/airlinesFilterSlice';
import { selectAirlinesFilterView } from '../../../redux/selectors/airlinesSelectors';

const checkIconUrl = `${import.meta.env.BASE_URL}Check.svg`;

function AirlineCheckboxRow({
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

const AviaCompanyFilterInner = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { airlineOptions, allAirlines, selectedAirlines } = useSelector(
        selectAirlinesFilterView,
        shallowEqual
    );
    const ticketsLoading = useSelector((state: RootState) => state.tickets.loading);

    const handleAllChange = useCallback(() => dispatch(setAllAirlines()), [dispatch]);
    const handleAirlineChange = useCallback(
        (code: string) => () => {
            if (allAirlines) {
                dispatch(selectOnlyAirline(code));
            } else {
                dispatch(toggleAirline({ code, totalOptions: airlineOptions.length }));
            }
        },
        [dispatch, allAirlines, airlineOptions]
    );

    return (
        <div className="transfers-count-filter">
            <div className="transfers-count-filter-title">авиакомпании</div>
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
                        <AirlineCheckboxRow checked={allAirlines} onChange={handleAllChange} label="Все" />
                        {airlineOptions.map((option) => (
                            <AirlineCheckboxRow
                                key={option.code}
                                checked={allAirlines || selectedAirlines.includes(option.code)}
                                onChange={handleAirlineChange(option.code)}
                                label={option.name}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

const AviaCompanyFilter = memo(AviaCompanyFilterInner);
export default AviaCompanyFilter;
