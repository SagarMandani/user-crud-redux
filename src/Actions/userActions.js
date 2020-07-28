import React from 'react';
import * as types from './types';
import UserData from '../UserData';

export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: types.GET_USER, payload: UserData });
    }
}

export const addUser = (payload, navigation) => {
    return async (dispatch) => {
        dispatch({ type: types.ADD_USER, payload });
        navigation.goBack();
    }
}

export const deleteUser = (id) => {
    return async (dispatch) => {
        dispatch({ type: types.REMOVE_USER, payload: id });
    }
}

export const updateUser = (payload, navigation) => {
    return async (dispatch) => {
        dispatch({ type: types.UPDATE_USER, payload });
        navigation.goBack();
    }
}