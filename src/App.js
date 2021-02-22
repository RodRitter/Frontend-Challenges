import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import InteractivePricing from './InteractivePricing';
import IPTracker from './IPTracker';

function App() {
  return (
    <Router basename='/projects/ui'>
      <Switch>
        <Route path="/interactive-pricing">
          <InteractivePricing />
        </Route>
        <Route path="/ip-tracker">
          <IPTracker />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
