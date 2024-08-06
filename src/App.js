import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/material/styles";

const FullWidthDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    date: new Date(),
    category: "all",
    source: "all",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      let combinedArticles = [];
      if (
        !filters.source ||
        filters.source === "all" ||
        filters.source === "guardian"
      ) {
        const guardianArticles = await fetchGuardianArticles();
        combinedArticles = combinedArticles.concat(guardianArticles);
      }
      if (
        !filters.source ||
        filters.source === "all" ||
        filters.source === "new-york-times"
      ) {
        const nyTimesArticles = await fetchNYTimesArticles();
        combinedArticles = combinedArticles.concat(nyTimesArticles);
      }
      setArticles(combinedArticles);
      setLoading(false);
    };

    fetchArticles();
  }, [query, filters]);

  const fetchGuardianArticles = async () => {
    const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;

    try {
      const params = {
        "api-key": `${guardianApiKey}`,
      };

      if (query) params.q = query;
      if (filters.date)
        params["from-date"] = filters.date.toISOString().split("T")[0];
      if (filters.category && filters.category !== "all")
        params.section = filters.category;

      const response = await axios.get(
        "https://content.guardianapis.com/search",
        { params }
      );

      return response.data.response.results.map((article) => ({
        title: article.webTitle,
        description: article.fields?.trailText,
        url: article.webUrl,
      }));
    } catch (error) {
      console.error("Error fetching Guardian articles:", error.message);
      if (error.response) {
        console.error("Status code:", error.response.status);
        console.error("Response data:", error.response.data);
      }
      return [];
    }
  };

  const fetchNYTimesArticles = async () => {

    const nyTimesApiKey = process.env.REACT_APP_NY_TIMES_API_KEY;

    try {
      const params = {
        "api-key": `${nyTimesApiKey}`,
      };

      if (query) params.q = query;
      if (filters.date)
        params.begin_date = filters.date
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");
      if (filters.category && filters.category !== "all")
        params.fq = `section_name:("${filters.category}")`;

      const response = await axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        { params }
      );

      return response.data.response.docs.map((article) => ({
        title: article.headline.main,
        description: article.snippet,
        url: article.web_url,
      }));
    } catch (error) {
      console.error("Error fetching NYTimes articles:", error.message);
      if (error.response) {
        console.error("Status code:", error.response.status);
        console.error("Response data:", error.response.data);
      }
      return [];
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFilters((prevFilters) => ({ ...prevFilters, date }));
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search for articles..."
              value={query}
              onChange={handleSearch}
            />
          </Grid>
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
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Select Source"
              name="source"
              value={filters.source}
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="guardian">Guardian</MenuItem>
              <MenuItem value="new-york-times">New York Times</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {articles.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </LocalizationProvider>
  );
}

export default App;
