import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoading : {
        loading : false
    },
    authToken : {
        token : ""
    },
    chats : {
        chats : []
    },
    content : {
        content : ""
    }
}

export const storeSlice = createSlice({
    name : "store",
    initialState,
    reducers : {
        setAuthToken : (state, action) => {
            state.authToken.token = action.payload
        },
        setIsLoading : (state, action) => {
            state.isLoading.loading = action.payload
        },
        addChatsToStore : (state, action) => {
            state.chats.chats.push(action.payload)
        },
        setChatsEmpty : (state, action) => {
            state.chats.chats = []
        },
        setContent : (state, action) => {
            state.content.content = action.payload 
        },
        removeLastChat : (state, action) => {
            state.chats.chats.pop()
        }
    }
})

export const { setIsLoading, setAuthToken, addChats, addChatsToStore, setChatsEmpty, setContent, removeLastChat} = storeSlice.actions

export default storeSlice.reducer