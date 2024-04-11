import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteManager from "./routes/RouteManager";
import { routeConfig } from "./routes/routeConfig";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <RouteManager routes={routeConfig} />
            </BrowserRouter>
        </div>
    );
}

export default App;
