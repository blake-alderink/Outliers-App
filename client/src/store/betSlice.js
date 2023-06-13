import { createSlice} from "@reduxjs/toolkit";

const betSlice = createSlice({
    name: 'bets',
    initialState: [],
    reducers: {

        addBet(state, action) {
            return [...state, action.payload]
        }


    }

})

export const betActions = betSlice.actions;

export default betSlice;
