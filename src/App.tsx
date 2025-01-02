import "./App.css";
import { scheduleTokenRefresh } from "./redux/api/http-common";
import Router from "./routes";
import ThemeProvider from "./theme";

function App() {
  // Call this function at app initialization
  scheduleTokenRefresh();
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
