import { configureStore } from '@reduxjs/toolkit';
import Slot from './reducers/slots';

export const store = configureStore({
    reducer: {
        Slot : Slot
    },
});
