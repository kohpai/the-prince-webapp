import { createStore } from "redux";

type ActionType = 'AUTHMODAL_OPEN' | 'AUTHMODAL_CLOSE'

export interface State {
  isVisible: boolean;
}

export interface Action {
  type: ActionType;
}

const initialState: State = {
  isVisible: false,
};

const authModalReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "AUTHMODAL_OPEN":
      return { isVisible: true };
    case "AUTHMODAL_CLOSE":
      return { isVisible: false };
    default:
      return state;
  }
};

const store = createStore(authModalReducer);

export default store;
