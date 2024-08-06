import { useState } from "react";

function App() {
  const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
  const nyTimesApiKey = process.env.REACT_APP_NY_TIMES_API_KEY;

  const [articles, setArticles] = useState([]);
  
  return (
    <div className="App">
      News Aggregator App
    </div>
  );
}

export default App;
