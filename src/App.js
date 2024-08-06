
function App() {
  const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
  const nyTimesApiKey = process.env.REACT_APP_NY_TIMES_API_KEY;

  console.log(`API Key: ${guardianApiKey}`);
  console.log(`API URL: ${nyTimesApiKey}`);
  return (
    <div className="App">
      News Aggregator App
    </div>
  );
}

export default App;
