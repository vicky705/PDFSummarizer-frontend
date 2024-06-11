import { configureStore } from "@reduxjs/toolkit"

import storeSlice from "./StoreSlice"

export const store = configureStore({
    reducer : storeSlice
})