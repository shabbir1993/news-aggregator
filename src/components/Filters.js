import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { CATEGORIES, SOURCES } from "../constants";

const FullWidthDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Filters = ({ filters, onFilterChange }) => {
  const handleDateChange = (date) => {
    onFilterChange("date", date);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <FullWidthDatePicker
          label="Select Date"
          value={filters.date}
          onChange={handleDateChange}
          disableFuture
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          select
          label="Select Category"
          name="category"
          value={filters.category}
          onChange={(e) => onFilterChange(e.target.name, e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          select
          label="Select Source"
          name="source"
          value={filters.source}
          onChange={(e) => onFilterChange(e.target.name, e.target.value)}
        >
          {SOURCES.map((source) => (
            <MenuItem key={source.value} value={source.value}>
              {source.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
