
import { useState, useRef, useEffect } from "react";
import { Slider } from "@mui/material";
import { styled, useTheme as useMuiTheme } from "@mui/material/styles";
import type { FlightFilters, CarrierDictionary } from "@/types";
import type { SortOption } from "@/utils/flightSorting";
import { SORT_OPTIONS } from "@/constants";
import { getAirlineName } from "@/utils/flightUtils";

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
  const muiTheme = useMuiTheme();

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
                    color: muiTheme.palette.primary.main,
                    "& .MuiSlider-thumb": {
                      backgroundColor: muiTheme.palette.primary.main,
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

const Card = styled("div")(({ theme }) => ({
  marginBottom: theme.customSpacing.space8,
  position: "sticky",
  top: 0,
  background: theme.palette.background.paper,
  zIndex: 10,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",

  "& .filter-bar": {
    display: "flex",
    gap: theme.customSpacing.space4,
    alignItems: "center",
    flexWrap: "wrap",

    "& .spacer": {
      flex: 1,
    },

    "& button": {
      backgroundColor: "transparent",
      cursor: "pointer",
      border: "none",
      padding: `${theme.customSpacing.space2} ${theme.customSpacing.space4}`,
      borderRadius: theme.borderRadius.md,
      transition: theme.customTransitions.slow,
      fontSize: "0.875rem",
      color: theme.palette.text.primary,

      "&:hover": {
        background: theme.palette.primary.light,
        color: theme.palette.primary.main,
        transition: theme.customTransitions.slow,
      },

      "&.active": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },

      "&.filter-toggle": {
        border: `1px solid ${theme.palette.border.main}`,
        background: theme.palette.background.paper,

        "&.has-filters": {
          background: theme.palette.primary.main,
          color: "white",
          borderColor: theme.palette.primary.main,
        },
      },
    },
  },

  "@media (max-width: 768px)": {
    "& .filter-bar": {
      "& .spacer": {
        display: "none",
      },
    },
  },

  "@media (max-width: 375px)": {
    "& .filter-bar": {
      flexDirection: "column",

      "& button": {
        width: "100%",
      },
    },
  },
}));

const FiltersCard = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.light}`,
  borderRadius: theme.borderRadius["2xl"],
  padding: theme.customSpacing.space6,
  marginBottom: theme.customSpacing.space8,
  boxShadow: theme.customShadows.sm,

  "& .filters-header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.customSpacing.space6,

    "& h3": {
      margin: 0,
      fontSize: "1.125rem",
      fontWeight: 600,
      color: theme.palette.text.primary,
    },

    "& .clear-btn": {
      background: "transparent",
      border: `1px solid ${theme.palette.border.main}`,
      color: theme.palette.text.secondary,
      padding: `${theme.customSpacing.space2} ${theme.customSpacing.space4}`,
      borderRadius: theme.borderRadius.md,
      cursor: "pointer",
      fontSize: "0.875rem",
      transition: theme.customTransitions.slow,

      "&:hover": {
        background: theme.palette.border.light,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },
    },
  },

  "& .filters-content": {
    display: "flex",
    flexDirection: "column",
    gap: theme.customSpacing.space8,
  },

  "@media (max-width: 768px)": {
    padding: theme.customSpacing.space4,

    "& .filters-content": {
      gap: theme.customSpacing.space6,
    },
  },
}));

const FilterSection = styled("div")(({ theme }) => ({
  "& > label": {
    display: "block",
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.customSpacing.space3,
    fontSize: "0.875rem",
  },

  "& .filter-options": {
    display: "flex",
    gap: theme.customSpacing.space2,
    flexWrap: "wrap",

    "& button": {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.border.main}`,
      padding: `${theme.customSpacing.space2} ${theme.customSpacing.space4}`,
      borderRadius: theme.borderRadius.md,
      cursor: "pointer",
      fontSize: "0.875rem",
      transition: theme.customTransitions.slow,
      color: theme.palette.text.primary,

      "&:hover": {
        borderColor: theme.palette.primary.main,
        background: theme.palette.primary.light,
      },

      "&.active": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        borderColor: theme.palette.primary.main,
      },
    },
  },

  "& .price-inputs": {
    display: "flex",
    flexDirection: "column",
    gap: theme.customSpacing.space2,
    padding: `0 ${theme.customSpacing.space2}`,

    "& .price-values": {
      display: "flex",
      justifyContent: "space-between",
      color: theme.palette.text.secondary,
      fontSize: "0.75rem",
      fontWeight: 500,
    },
  },

  "& .airline-options": {
    display: "flex",
    flexDirection: "column",
    gap: theme.customSpacing.space3,
    maxHeight: "200px",
    overflowY: "auto",

    "& .checkbox-label": {
      display: "flex",
      alignItems: "center",
      gap: theme.customSpacing.space2,
      cursor: "pointer",
      fontSize: "0.875rem",
      color: theme.palette.text.primary,

      "& input[type='checkbox']": {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        accentColor: theme.palette.primary.main,
      },

      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },

  "@media (max-width: 768px)": {
    "& .price-inputs": {
      flexDirection: "column",
      alignItems: "stretch",

      "& .separator": {
        display: "none",
      },
    },
  },
}));


