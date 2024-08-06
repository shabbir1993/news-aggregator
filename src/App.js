import { useState } from "react";
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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
  const nyTimesApiKey = process.env.REACT_APP_NY_TIMES_API_KEY;

  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    date: new Date(),
    category: "all",
    source: "all",
  });

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
            <DatePicker
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
              {/* Populate category options */}
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
              {/* Populate source options */}
            </TextField>
          </Grid>
        </Grid>
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
      </Container>
    </LocalizationProvider>
  );
}

export default App;
