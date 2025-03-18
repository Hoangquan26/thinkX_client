import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store"; // Adjust the import path as necessary

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

// create Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearState: (state) => {
            state.authentication = ''
            state.userId = ''
            state.roles = []
        },

        setAuth: (state, action: PayloadAction<IUserState>) => {
            state.authentication = action.payload.authentication
            state.roles = action.payload.roles
            state.userId = action.payload.userId
        }
    }
})

// create Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUserId = createSelector(selectAuth, (auth) => auth.userId);
export const selectAuthentication = createSelector(selectAuth, (auth) => auth.authentication);
export const selectRoles = createSelector(selectAuth, (auth) => auth.roles);

// export actions
export const { clearState, setAuth } = authSlice.actions;
// export reducer
export const authReducers = authSlice.reducer;