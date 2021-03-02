import { createStore } from "redux"
import jobReducer from './reducers/jobReducer'

export default createStore(
    jobReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

