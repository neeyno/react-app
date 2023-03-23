import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import bookItemsReducer from "../features/bookItemsSlice";

export const store = configureStore({
    reducer: {
        // query: queryReducer,
        bookItems: bookItemsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
