import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: localStorage.getItem('userId') || null,
    longitude: localStorage.getItem('longitude') || null,
    latitude: localStorage.getItem('latitude') || null,
    isBusinessOwner: localStorage.getItem('isBusinessOwner') === 'true',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem('userId', action.payload);
        },
        clearUserId: (state) => {
            state.userId = null;
            localStorage.removeItem('userId');
        },
        setIsBusinessOwner: (state, action) => {
            state.isBusinessOwner = action.payload;
            localStorage.setItem('isBusinessOwner', action.payload);
        },
        clearIsBusinessOwner: (state) => {
            state.isBusinessOwner = false;
            localStorage.removeItem('isBusinessOwner');
        },
        setLocation: (state, action) => {
            const { latitude, longitude } = action.payload;
            state.latitude = latitude;
            state.longitude = longitude;
            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);
        },
        clearLocation: (state) => {
            state.latitude = null;
            state.longitude = null;
            localStorage.removeItem('latitude');
            localStorage.removeItem('longitude');
        },
    },
});

export const { setUserId, clearUserId, setLocation, clearLocation, setIsBusinessOwner, clearIsBusinessOwner } = userSlice.actions;

export default userSlice.reducer;