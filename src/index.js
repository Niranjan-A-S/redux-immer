import produce from "immer";
import { createStore } from "redux";
import "./styles.css";

const intialState = {
  user: {
    name: "Niranjan A S",
    address: {
      city: "Bangalore",
      state: "Karnataka",
      country: "India"
    }
  }
};

const UPDATE_CITY = "update city";

const updateCity = (city) => {
  return {
    type: UPDATE_CITY,
    payload: city
  };
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_CITY:
      // return {
      //   ...state,
      //   user: {
      //     ...state.user,
      //     address: {
      //       ...state.user.address,
      //       city: action.payload
      //     }
      //   }
      // };
      //instead of writing nested object like this we can use immer
      return produce(state, (draft) => {
        draft.user.address.city = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(userReducer);

store.subscribe(() => console.log(store.getState()));
store.dispatch(updateCity("Mysore"));
store.dispatch(updateCity("Hosur"));

document.getElementById("app").innerHTML = `<strong>${
  store.getState().user.name
}</strong></br><strong>${
  store.getState().user.address.city
}</strong></br><strong>${
  store.getState().user.address.state
}</strong></br><strong>${store.getState().user.address.country}</strong>`;
