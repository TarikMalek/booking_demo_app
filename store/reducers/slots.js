import { ADD_SLOT } from "../actions";



const slotsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_SLOT:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default slotsReducer;