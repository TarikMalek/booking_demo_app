import { ADD_SLOT } from "../actions";



const slotReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_SLOT:
            return action.payload;
        default:
            return state;
    }
};

export default slotReducer;