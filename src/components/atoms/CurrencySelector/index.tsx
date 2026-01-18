import { useSearchParams } from "react-router-dom";
import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/material/styles";

const CURRENCIES = [
    { code: "USD", label: "USD ($)" },
    { code: "EUR", label: "EUR (€)" },
    { code: "GBP", label: "GBP (£)" },
    { code: "NGN", label: "NGN (₦)" },
];

const StyledFormControl = styled(FormControl)(() => ({
    minWidth: 100,
    "& .MuiOutlinedInput-root": {
        color: "var(--text-secondary)",
        "& fieldset": {
            borderColor: "var(--border)",
        },
        "&:hover fieldset": {
            borderColor: "var(--border-hover)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "var(--primary)",
        },
    },
    "& .MuiSelect-select": {
        padding: "8px 12px",
        fontSize: "14px",
        fontWeight: 500,
    },
}));

const CurrencySelector = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCurrency = searchParams.get("currency") || "USD";

    const handleChange = (e: SelectChangeEvent<string>) => {
        const newCurrency = e.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (newCurrency === "USD") {
            newParams.delete("currency");
        } else {
            newParams.set("currency", newCurrency);
        }

        setSearchParams(newParams);
    };

    return (
        <StyledFormControl size="small">
            <Select
                value={currentCurrency}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Select currency" }}
            >
                {CURRENCIES.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                        {currency.code}
                    </MenuItem>
                ))}
            </Select>
        </StyledFormControl>
    );
};

export { CurrencySelector };
