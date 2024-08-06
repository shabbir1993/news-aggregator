import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles }) => (
  <Grid container spacing={2}>
    {articles.map((article, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <ArticleCard
          title={article.title}
          description={article.description}
          url={article.url}
        />
      </Grid>
    ))}
  </Grid>
);

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticleList;
