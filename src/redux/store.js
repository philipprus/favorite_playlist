import { applyMiddleware, createStore } from "redux";

import rootReducer from "./reducers";
import sagas from "./sagas";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";


const initStore = () => {

    const sagaMiddleware = createSagaMiddleware();

    const getMiddleware = () => {
        if (process.env.NODE_ENV === "development") {
          return applyMiddleware(sagaMiddleware, logger);
        }
        return applyMiddleware(sagaMiddleware);
      };
    
    const middleware = getMiddleware();

    const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {}

    const store = createStore(
        rootReducer,
        persistedState,
        middleware
    );

    store.subscribe(()=>{
      localStorage.setItem("reduxState", JSON.stringify(store.getState()))
    })

    sagaMiddleware.run(sagas);
    return store;
};

export default initStore;