import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from './redux/store'

import InteractivePricing from './InteractivePricing';
import IPTracker from './IPTracker';
import {Home, Detail} from './GithubJobs';

function App() {
  return (
    <Provider store={store}>
      <Router basename='/projects/ui'>
        <Switch>
          <Route path="/interactive-pricing">
            <InteractivePricing />
          </Route>
          <Route path="/ip-tracker">
            <IPTracker />
          </Route>
          <Route exact path="/github-jobs">
            <Home />
          </Route>
          <Route path="/github-jobs/details">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
