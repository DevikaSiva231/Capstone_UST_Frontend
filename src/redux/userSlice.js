import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        longitude: null,
        latitude: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        clearUserId: (state) => {
            state.userId = null;
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

export const { setUserId, clearUserId, setLocation, clearLocation } = userSlice.actions;

export default userSlice.reducer;