import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

import thunk from "redux-thunk";
import reducers from "./reducers";

const bindMiddleware = (middleware: any) => {
  return composeWithDevTools(applyMiddleware(...middleware));
};

const initStore = () => {
  return createStore(reducers, bindMiddleware([thunk]));
};

export const wrapper = createWrapper(initStore, { debug: true });
