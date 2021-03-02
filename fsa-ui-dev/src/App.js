import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TitleBar from "./components/titleBar";
import Clusters from "./components/clusters";
import Company from "./components/company";
import Home from "./components/home";

function App() {
    return (
        <Router>
            <div className="App">
                <TitleBar />
                <div className="mainContent my-5">
                    <Switch>
                        <Route path="/company/:ticker" component={Company} />
                        <Route path="/clusters" component={Clusters} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
