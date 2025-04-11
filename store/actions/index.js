export const ADD_SLOT = 'ADD_SLOT';



export const addSlot=  (slot)=>{
    return {
        type: ADD_SLOT,
        payload: slot
    }
};