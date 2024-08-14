import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    signInService,
} from '../../services/apis/auth.service'
// import { UserRole } from '../../constants/user.constant'
// import { ERROR_TRANS_KEYS } from '../../constants/error.constant'
import { STORAGE_KEYS } from '../../constants/storage.constant'
import { load, remove, save } from '../../utils/local-storage'

const createInitialState = () => {
    const initialState = {
        user: '',
        token: '',
        loading: false,
        error: null,
        success: false,
    }
    return initialState
}
export const initialState = createInitialState()

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (input, { rejectWithValue }) => {
        try {
            const response = await signInService(input)
            // const role = await response.role
            // if (role === UserRole.STUDENT || role === UserRole.TUTOR) {
            //   throw ERROR_TRANS_KEYS.LIMIT_ROLES
            // }
            await save(STORAGE_KEYS.AUTH, response)
            return { ...response }
        } catch (error) {
            console.warn('🚀 ~ file: auth.slice. signIn ~ error:', error)
            return rejectWithValue(error)
        }
    }
)

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            remove(STORAGE_KEYS.AUTH)
        } catch (error) {
            console.warn('🚀 ~ file: auth.slice. signOut ~ error:', error)
            return rejectWithValue(error)
        }
    }
)

export const initState = createAsyncThunk(
    'auth/initState',
    async (_, { rejectWithValue }) => {
        try {
            const localAuth = load(STORAGE_KEYS.AUTH)
            const states = {
                ...initialState,
                ...localAuth,
            }
            return states
        } catch (error) {
            console.warn('🚀 ~ file: auth.slice. initState ~ error:', error)
            return rejectWithValue(error)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        },
        clearSuccess(state) {
            state.success = false
        },
    },
    extraReducers(builder) {
        builder.addCase(initState.pending, (state) => ({
            ...state,
            success: false,
            loading: true,
        }))
        builder.addCase(initState.fulfilled, (state, { payload }) => ({
            ...state,
            user: payload,
            token: payload.token,
            role: payload.role,
            loading: false,
        }))
        builder.addCase(initState.rejected, (state, { payload }) => ({
            ...state,
            loading: false,
            success: false,
            error: payload,
        }))
        builder.addCase(signIn.pending, (state) => ({
            ...state,
            loading: true,
            success: false,
        }))
        builder.addCase(signIn.fulfilled, (state, { payload }) => ({
            ...state,
            user: payload,
            token: payload.token,
            role: payload.role,
            loading: false,
            success: true,
        }))
        builder.addCase(signIn.rejected, (state, { payload }) => ({
            ...state,
            loading: false,
            success: false,
            error: payload,
        }))
        builder.addCase(signOut.pending, (state) => ({
            ...state,
            success: false,
            loading: true,
        }))
        builder.addCase(signOut.fulfilled, (state) => ({
            ...state,
            ...initialState,
            success: true,
            loading: false,
        }))
        builder.addCase(signOut.rejected, (state, { payload }) => ({
            ...state,
            loading: false,
            success: false,
            error: payload,
        }))
    },
})

const { actions, reducer } = authSlice
export const authReducer = reducer
export const authActions = actions

export const useAuthSlice = () => {
    const actions = {
        ...authSlice.actions,
        signIn,
        initState,
        signOut,
    }
    return { actions }
}