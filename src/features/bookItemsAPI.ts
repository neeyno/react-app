/* 
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

"v1/volumes?q=flowers+inauthor:keyes" 
"&maxResults=1"
start Index = "&startIndex=0&maxResults=1"
order by = "&orderBy=newest" 
*/

import { ECategories, ESortBy } from "../utils/helper";
import { IBooksItems } from "./bookItemsSlice";

const API_KEY = process.env.REACT_APP_API_KEY;

export async function fetchBooks(
    query: string,
    category: string = ECategories.Any,
    sortBy: string = ESortBy.relevance,
    startIndex = 0,
    maxResults = 30
): Promise<IBooksItems> {
    let queryRequest = query;

    if (category !== ECategories.Any) {
        queryRequest = query + "+subject:" + category;
    }

    const API = `https://www.googleapis.com/books/v1/volumes?q=${queryRequest}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sortBy}&key=${API_KEY}`;

    const response = await fetchData(API, {
        method: "GET",
    });

    return response.json();
}

async function fetchData(reqInput: RequestInfo, reqInit?: RequestInit) {
    const response = await fetch(reqInput, reqInit);

    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMsg = errorBody.error;

        throw Error(
            "Request failed with status: " +
                response.status +
                "\nMessage:" +
                errorMsg
        );
    }
}
