
import { useState, useRef, useEffect } from "react";
import { Slider } from "@mui/material";
import styled from "styled-components";
import { theme } from "../../../utils";
import type { FlightFilters, CarrierDictionary } from "../../../interfaces";
import type { SortOption } from "../../../utils/flightSorting";
import { SORT_OPTIONS } from "../../../constants";
import { getAirlineName } from "../../../utils/flightUtils";

interface FilterBarProps {
  onSortByChange: (sortBy: SortOption) => void;
  sortBy: SortOption;
  filters: FlightFilters;
  onFiltersChange: (filters: FlightFilters) => void;
  availableAirlines: string[];
  priceRange: { min: number; max: number };
  carrierDictionary?: CarrierDictionary;
}

const FilterBar = ({
  onSortByChange,
  sortBy,
  filters,
  onFiltersChange,
  availableAirlines,
  priceRange,
  carrierDictionary,
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const filtersCardRef = useRef<HTMLDivElement>(null);

  const handleStopsChange = (stops: number | null) => {
    onFiltersChange({ ...filters, stops });
  };

  const [sliderValue, setSliderValue] = useState<number[]>([
    filters.priceRange.min ?? priceRange.min,
    filters.priceRange.max ?? priceRange.max,
  ]);

  useEffect(() => {
    setSliderValue([
      filters.priceRange.min ?? priceRange.min,
      filters.priceRange.max ?? priceRange.max,
    ]);
  }, [filters.priceRange, priceRange]);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  const handleSliderChangeCommitted = (
    _event: Event | React.SyntheticEvent | undefined,
    newValue: number | number[]
  ) => {
    const [min, max] = newValue as number[];
    onFiltersChange({
      ...filters,
      priceRange: { min, max },
    });
  };

  const handleAirlineToggle = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    onFiltersChange({ ...filters, airlines: newAirlines });
  };

  const clearFilters = () => {
    onFiltersChange({
      stops: null,
      priceRange: { min: null, max: null },
      airlines: [],
    });
  };

  const hasActiveFilters =
    filters.stops !== null ||
    filters.priceRange.min !== null ||
    filters.priceRange.max !== null ||
    filters.airlines.length > 0;

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    if (showFilters && filtersCardRef.current) {
      filtersCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showFilters]);

  return (
    <>
      <Card className="styled-card">
        <div className="filter-bar">
          <button
            onClick={() => onSortByChange(SORT_OPTIONS.BEST)}
            className={sortBy === SORT_OPTIONS.BEST ? "active" : ""}
          >
            Best
          </button>
          <button
            onClick={() => onSortByChange(SORT_OPTIONS.PRICE_HIGH)}
            className={sortBy === SORT_OPTIONS.PRICE_HIGH ? "active" : ""}
          >
            Cheapest
          </button>
          <button
            onClick={() => onSortByChange(SORT_OPTIONS.FASTEST)}
            className={sortBy === SORT_OPTIONS.FASTEST ? "active" : ""}
          >
            Fastest
          </button>
          <div className="spacer" />
          <button
            onClick={handleFilterToggle}
            className={`filter-toggle ${hasActiveFilters ? "has-filters" : ""}`}
          >
            Filters {hasActiveFilters && `(${filters.airlines.length + (filters.stops !== null ? 1 : 0) + (filters.priceRange.min !== null || filters.priceRange.max !== null ? 1 : 0)})`}
          </button>
        </div>
      </Card>

      {showFilters && (
        <FiltersCard ref={filtersCardRef}>
          <div className="filters-header">
            <h3>Filter Flights</h3>
            {hasActiveFilters && (
              <button className="clear-btn" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className="filters-content">
            {/* Stops Filter */}
            <FilterSection>
              <label>Stops</label>
              <div className="filter-options">
                <button
                  className={filters.stops === null ? "active" : ""}
                  onClick={() => handleStopsChange(null)}
                >
                  Any
                </button>
                <button
                  className={filters.stops === 0 ? "active" : ""}
                  onClick={() => handleStopsChange(0)}
                >
                  Non-stop
                </button>
                <button
                  className={filters.stops === 1 ? "active" : ""}
                  onClick={() => handleStopsChange(1)}
                >
                  1 Stop
                </button>
                <button
                  className={filters.stops === 2 ? "active" : ""}
                  onClick={() => handleStopsChange(2)}
                >
                  2+ Stops
                </button>
              </div>
            </FilterSection>

            {/* Price Range Filter */}
            <FilterSection>
              <label>Price Range</label>
              <div className="price-inputs">
                <div className="price-values">
                  <span>${sliderValue[0]}</span>
                  <span>${sliderValue[1]}</span>
                </div>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  onChangeCommitted={handleSliderChangeCommitted}
                  valueLabelDisplay="auto"
                  min={priceRange.min}
                  max={priceRange.max}
                  sx={{
                    color: theme.primary,
                    "& .MuiSlider-thumb": {
                      backgroundColor: theme.primary,
                    },
                  }}
                />
              </div>
            </FilterSection>

            {/* Airlines Filter */}
            {availableAirlines.length > 0 && (
              <FilterSection>
                <label>Airlines</label>
                <div className="airline-options">
                  {availableAirlines.map((airline) => (
                    <label key={airline} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.airlines.includes(airline)}
                        onChange={() => handleAirlineToggle(airline)}
                      />
                      <span>{getAirlineName(airline, carrierDictionary)}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            )}
          </div>
        </FiltersCard>
      )}
    </>
  );
};

export { FilterBar };

const Card = styled.div`
  margin-bottom: ${theme.space8};
  position: sticky;
  top: 0;
  background: ${theme.backgroundCard};
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  & .filter-bar {
    display: flex;
    gap: ${theme.space4};
    align-items: center;
    flex-wrap: wrap;

    & .spacer {
      flex: 1;
    }

    & button {
      background-color: transparent;
      cursor: pointer;
      border: none;
      padding: ${theme.space2} ${theme.space4};
      border-radius: ${theme.radiusMd};
      transition: all ${theme.transitionSlow};
      font-size: ${theme.fontBase};
      color: ${theme.text};

      &:hover {
        background: ${theme.primaryLight};
        color: ${theme.primary};
        transition: all ${theme.transitionSlow};
      }

      &.active {
        background-color: ${theme.primary};
        color: white;
      }

      &.filter-toggle {
        border: 1px solid ${theme.border};
        background: ${theme.backgroundCard};

        &.has-filters {
          background: ${theme.primary};
          color: white;
          border-color: ${theme.primary};
        }
      }
    }
  }

  @media (max-width: 768px) {
    & .filter-bar {
      & .spacer {
        display: none;
      }
    }
  }

  @media (max-width: 375px) {
    & .filter-bar {
      flex-direction: column;

      & button {
        width: 100%;
      }
    }
  }
`;

const FiltersCard = styled.div`
  background: ${theme.backgroundCard};
  border: 1px solid ${theme.borderLight};
  border-radius: ${theme.radius2xl};
  padding: ${theme.space6};
  margin-bottom: ${theme.space8};
  box-shadow: ${theme.shadowSm};

  & .filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.space6};

    & h3 {
      margin: 0;
      font-size: ${theme.fontLg};
      font-weight: ${theme.fontSemibold};
      color: ${theme.text};
    }

    & .clear-btn {
      background: transparent;
      border: 1px solid ${theme.border};
      color: ${theme.textSecondary};
      padding: ${theme.space2} ${theme.space4};
      border-radius: ${theme.radiusMd};
      cursor: pointer;
      font-size: ${theme.fontBase};
      transition: all ${theme.transitionSlow};

      &:hover {
        background: ${theme.borderLight};
        border-color: ${theme.primary};
        color: ${theme.primary};
      }
    }
  }

  & .filters-content {
    display: flex;
    flex-direction: column;
    gap: ${theme.space8};
  }

  @media (max-width: 768px) {
    padding: ${theme.space4};

    & .filters-content {
      gap: ${theme.space6};
    }
  }
`;

const FilterSection = styled.div`
  & > label {
    display: block;
    font-weight: ${theme.fontSemibold};
    color: ${theme.text};
    margin-bottom: ${theme.space3};
    font-size: ${theme.fontBase};
  }

  & .filter-options {
    display: flex;
    gap: ${theme.space2};
    flex-wrap: wrap;

    & button {
      background: ${theme.backgroundCard};
      border: 1px solid ${theme.border};
      padding: ${theme.space2} ${theme.space4};
      border-radius: ${theme.radiusMd};
      cursor: pointer;
      font-size: ${theme.fontBase};
      transition: all ${theme.transitionSlow};
      color: ${theme.text};

      &:hover {
        border-color: ${theme.primary};
        background: ${theme.primaryLight};
      }

      &.active {
        background-color: ${theme.primary};
        color: white;
        border-color: ${theme.primary};
      }
    }
  }

  & .price-inputs {
    display: flex;
    flex-direction: column;
    gap: ${theme.space2};
    padding: 0 ${theme.space2};

    & .price-values {
      display: flex;
      justify-content: space-between;
      color: ${theme.textSecondary};
      font-size: ${theme.fontSm};
      font-weight: ${theme.fontMedium};
    }
  }

  & .airline-options {
    display: flex;
    flex-direction: column;
    gap: ${theme.space3};
    max-height: 200px;
    overflow-y: auto;

    & .checkbox-label {
      display: flex;
      align-items: center;
      gap: ${theme.space2};
      cursor: pointer;
      font-size: ${theme.fontBase};
      color: ${theme.text};

      & input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: var(--primary);
      }

      &:hover {
        color: ${theme.primary};
      }
    }
  }

  @media (max-width: 768px) {
    & .price-inputs {
      flex-direction: column;
      align-items: stretch;

      & .separator {
        display: none;
      }
    }
  }
`;

