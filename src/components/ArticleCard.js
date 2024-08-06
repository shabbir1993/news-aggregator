import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import PropTypes from "prop-types";

const ArticleCard = ({ title, description, url }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" href={url} target="_blank" rel="noopener noreferrer">
        Read more
      </Button>
    </CardActions>
  </Card>
);

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default ArticleCard;
