import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const appSlice = createSlice({
    name: "appStore",
    initialState,
    reducers: {
        mergeStore: (state, action) => {
            Object.keys(action.payload).forEach((element) => {
                if (state[element]) {
                    console.log(action.payload[element]);
                    console.log(state[element]);
                    if (Array.isArray(state[element])) {
                        state[element].forEach((item, i) => {
                            action.payload[element].forEach((payloaditem) => {
                                if (item.id === payloaditem.id) {
                                    state[element][i] = payloaditem;
                                }
                            });
                        });
                        // state[element] = [...action.payload[element], ...state[element]]
                    } else {
                        state[element] = action.payload[element];
                    }
                } else {
                    state[element] = action.payload[element];
                }
            });
        },
        setStore: (state, action) => {
            Object.keys(action.payload).forEach((element) => {
                state[element] = action.payload[element];
            });
        },
    },
});
export const { mergeStore, setStore } = appSlice.actions;

export default appSlice.reducer;
