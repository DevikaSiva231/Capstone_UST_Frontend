import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        longitude: null,
        latitude: null,
        isBusinessOwner: false,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        clearUserId: (state) => {
            state.userId = null;
        },
        setIsBusinessOwner: (state, action) => {
            state.isBusinessOwner = action.payload;
        },
        clearIsBusinessOwner: (state) => {
            state.isBusinessOwner = false;
        },
        setLocation: (state, action) => {
            const { latitude, longitude } = action.payload;
            state.latitude = latitude;
            state.longitude = longitude;
        },
        clearLocation: (state) => {
            state.latitude = null;
            state.longitude = null;
        },
    },
});

export const { setUserId, clearUserId, setLocation, clearLocation, setIsBusinessOwner, clearIsBusinessOwner } = userSlice.actions;

export default userSlice.reducer;