export enum ESortBy {
    newest = "newest", // Most recently published.
    relevance = "relevance", // Relevance to search terms.
}

export enum ECategories {
    Any = "Any",
    Art = "Art",
    Business = "Business",
    Comics = "Comics",
    Computers = "Computers",
    Food = "Food",
    Education = "Education",
    Engineering = "Engineering",
    Entertainment = "Entertainment",
    Health = "Health",
    History = "History",
    Hobbies = "Hobbies",
    Medical = "Medical",
    Politics = "Politics",
    Religion = "Religion",
    Romance = "Romance",
    Science = "Science",
    Fiction = "Fiction",
    Sports = "Sports",
    Technology = "Technology",
    Travel = "Travel",
}

// export type Category = typeof ECategories[keyof typeof ECategories];
// export type SortBy = typeof ESortBy[keyof typeof ESortBy];

/* 
const categories: string[] = (
    Object.values(Categories) as Array<keyof typeof Categories>
).reduce((result: string[], value: string) => {
    result.push(value);
    return result;
}, []);
 */
