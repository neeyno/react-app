import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { ECategories, ESortBy } from "../utils/helper";

import { fetchBooks } from "./bookItemsAPI";

export interface IQuery {
    input: string;
    category: string;
    sortBy: string;
}

export interface IBooksItems {
    query: IQuery;
    items: IBook[];
    totalItems: number;
    startIndex: number;
    isLoading: boolean;
}

export const initialState: IBooksItems = {
    query: {
        input: "JS",
        category: ECategories.Any,
        sortBy: ESortBy.relevance,
    },
    items: [], // mockBooks,
    totalItems: 0,
    startIndex: 0,
    isLoading: true,
};

//
export const getBookItems = createAsyncThunk(
    "bookItems/getBookItems",
    async (/* bookQuery: QueryAction */) => {
        // const { query, category, sortBy } = bookQuery;
        const books = await fetchBooks(initialState.query.input);

        return books;
    }
);

// call api on user's search request
export const getBookItemsOnQuery =
    (inputQuery: IQuery): AppThunk =>
    async (dispatch, getState) => {
        const { input, category, sortBy } = inputQuery;
        console.log(inputQuery);
        try {
            dispatch(setLoading(true));
            dispatch(setBookItems(initialState));
            const books = await fetchBooks(input, category, sortBy);

            dispatch(setBookItems({ ...books, startIndex: 0 }));
            dispatch(setQuery(inputQuery));
        } catch (error) {
            dispatch(setLoading(false));
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

// fetching more books
export const loadMoreBooks =
    (/* bookQuery: IQuery */): AppThunk => async (dispatch, getState) => {
        const { query, startIndex, totalItems } = getState().bookItems;

        let index = startIndex + 30;

        //<to do> check that request will not overflow the `totalItems`
        // if(index+30>totalItems) {
        //     index = startIndex
        // }

        try {
            dispatch(setLoading(true));
            const books = await fetchBooks(
                query.input,
                query.category,
                query.sortBy,
                index
            );

            dispatch(loadMore({ ...books, startIndex: index }));
        } catch (error) {
            dispatch(setLoading(false));
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

const bookItemsSlice = createSlice({
    name: "bookItems",
    initialState,
    reducers: {
        setBookItems: (state, action: PayloadAction<IBooksItems>) => {
            const { items, totalItems, startIndex } = action.payload;

            state.items = items;
            state.totalItems = totalItems;
            state.startIndex = startIndex;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setQuery: (state, action: PayloadAction<IQuery>) => {
            state.query = action.payload;
        },
        loadMore: (state, action: PayloadAction<IBooksItems>) => {
            const { items, startIndex } = action.payload;

            // state.items = [...state.items, newArray];
            // state.items = state.items.concat(newArray);
            state.items.push(...items);
            state.startIndex = startIndex;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getBookItems.fulfilled,
                (state, action: PayloadAction<IBooksItems>) => {
                    state.items = action.payload.items;
                    state.totalItems = action.payload.totalItems;

                    state.isLoading = false;
                }
            )
            .addCase(getBookItems.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { loadMore, setLoading, setBookItems, setQuery } =
    bookItemsSlice.actions;

export default bookItemsSlice.reducer;

export interface IBook {
    //accessInfo: {country: 'SE', viewability: 'PARTIAL', embeddable: true, publicDomain: false, textToSpeechPermission: 'ALLOWED', …}
    etag: string;
    id: string;
    kind: string; //"books#volume"
    searchInfo?: { textSnippet: string };
    selfLink: string;
    volumeInfo: {
        title: string;
        authors: string[]; //['Colin J. Ihrig']
        // allowAnonLogging: false;
        publisher?: string;
        publishedDate?: string;
        description?: string;
        categories?: string[]; //['Computers']
        // contentVersion: string;
        imageLinks?: {
            smallThumbnail: string;
            thumbnail: string;
        };
        // industryIdentifiers:
        // infoLink: string;
        language?: string;
        // maturityRating: "NOT_MATURE"
        pageCount?: number;
        // panelizationSummary:
        // previewLink: string;
        printType?: string;
        canonicalVolumeLink?: string;
    };
}
