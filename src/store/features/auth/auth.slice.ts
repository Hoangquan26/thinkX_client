import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
    userId: string,
    authentication: string,
    roles: string[]
}

const initialState: IUserState = {
    userId: "",
    authentication: "",
    roles: []
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearState: (state) => {
            state.authentication = ''
            state.userId = ''
            state.roles = []
        },

        setAuth: (state) => {
            state
        }
    }
})



export const authReducers = authSlice.reducer