import { useState, useEffect } from "react";
import axios from "axios";

const useArticles = (query, filters) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const combinedArticles = await Promise.all([
          fetchGuardianArticles(query, filters),
          fetchNYTimesArticles(query, filters),
        ]).then(([guardianArticles, nyTimesArticles]) => [
          ...guardianArticles,
          ...nyTimesArticles,
        ]);
        setArticles(combinedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, filters]);

  const fetchGuardianArticles = async (query, filters) => {
    const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    try {
      const params = {
        "api-key": guardianApiKey,
        q: query || undefined,
        "from-date": filters.date?.toISOString().split("T")[0],
        section: filters.category !== "all" ? filters.category : undefined,
      };
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
      console.error("Error fetching Guardian articles:", error);
      return [];
    }
  };

  const fetchNYTimesArticles = async (query, filters) => {
    const nyTimesApiKey = process.env.REACT_APP_NY_TIMES_API_KEY;
    try {
      const params = {
        "api-key": nyTimesApiKey,
        q: query || undefined,
        begin_date: filters.date?.toISOString().split("T")[0].replace(/-/g, ""),
        fq: filters.category !== "all" ? `section_name:("${filters.category}")` : undefined,
      };
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
      console.error("Error fetching NYTimes articles:", error);
      return [];
    }
  };

  return { articles, loading };
};

export default useArticles;
