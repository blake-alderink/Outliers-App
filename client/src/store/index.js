import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import betSlice from './betSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        bets: betSlice.reducer
    }
})

export default store;