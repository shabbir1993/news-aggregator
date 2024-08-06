import React, { useState } from "react";
import { Container, Grid, Box, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import ArticleList from "./components/ArticleList";
import useArticles from "./hooks/useArticles";

function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    date: new Date(),
    category: "all",
    source: "all",
  });
  const { articles, loading } = useArticles(query, filters);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12}>
            <SearchBar query={query} onSearch={handleSearch} />
          </Grid>
          <Grid item xs={12}>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </Grid>
        </Grid>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <ArticleList articles={articles} />
        )}
      </Container>
    </LocalizationProvider>
  );
}

export default App;
