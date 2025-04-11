import { configureStore } from '@reduxjs/toolkit';
import Slots from './reducers/slots';

export const store = configureStore({
    reducer: {
        slots : Slots
    },
});
