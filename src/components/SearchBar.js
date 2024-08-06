import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const SearchBar = ({ query, onSearch }) => (
  <TextField
    fullWidth
    label="Search for articles..."
    value={query}
    onChange={onSearch}
  />
);

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
