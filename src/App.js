import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import InteractivePricing from './InteractivePricing';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/interactive-pricing">
          <InteractivePricing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
