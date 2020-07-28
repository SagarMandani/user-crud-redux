import React from 'react';
import * as types from '../Actions/types';

const initialState = {
    userList: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_USER:
            return { ...state, userList: action.payload };
        case types.ADD_USER:
            return { ...state, userList: [...state.userList, action.payload] };
        case types.REMOVE_USER: {}
            const users = state.userList.filter((user) => user.id != action.payload);
            return { ...state, userList: users };
        case types.UPDATE_USER:
            const updateUsers = state.userList.map((user) => {
                if(user.id == action.payload.id) {
                    return action.payload;
                }
                return user;
            });
            return { ...state, userList: updateUsers };
        default:
            return state;
    }
}


export default reducer;