import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TitleBar from "./components/titleBar";
import Clusters from "./components/clusters";
import Company from "./components/company";
import Home from "./components/home";
import AboutUs from "./components/aboutUs";
import { useState } from "react";
import Footer from "./components/footer";

function App({ history }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    return (
        <Router>
            <div className="App">
                <TitleBar
                    searchTerm={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="mx-5 mt-4 pb-4 mainContent">
                    <Switch>
                        <Route path="/company/:ticker" component={Company} />
                        <Route
                            path="/clusters"
                            render={(props) => (
                                <Clusters
                                    {...props}
                                    currentPage={currentPage}
                                    searchTerm={searchTerm}
                                    setCurrentPage={setCurrentPage}
                                />
                            )}
                        />
                        <Route path="/aboutus" component={AboutUs} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
