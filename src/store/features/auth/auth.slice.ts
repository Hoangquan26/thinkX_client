import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store"; // Adjust the import path as necessary

export interface IUserState {
    userId: string | null,
    authentication: string | null,
    roles: string[],
    email?: string | null
}

const initialState: IUserState = {
    userId: "",
    authentication: "",
    roles: [],
    email: ""
}

// create Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearState: (state) => {
            state.authentication = null
            state.userId = null
            state.roles = []
            state.email = null
        },

        setAuth: (state, action: PayloadAction<IUserState>) => {
            state.authentication = action.payload.authentication
            state.roles = action.payload.roles
            state.userId = action.payload.userId
            state.email = action.payload.email
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