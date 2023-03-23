import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { loadMoreBooks } from "../features/bookItemsSlice";
import { Link } from "react-router-dom";

import BookCard from "../components/BookCard";
import Loading from "../components/Loading";

// interface HomePageProps {
//     bookList: number[];
//     onClickLoadMore: () => void;
// }

function Home(/* { bookList, onClickLoadMore }: HomePageProps */) {
    const dispatch: AppDispatch = useDispatch();

    const { isLoading, totalItems, items } = useSelector(
        (store: RootState) => store.bookItems
    );

    return (
        <>
            {totalItems > 0 && (
                <label className="py-2 d-block w-50 xl:w-25 mx-auto text-center alert alert-light border border-secondary-subtle">
                    {totalItems
                        ? `Found ${totalItems} books`
                        : "start searching"}
                </label>
            )}
            <div className="container-fluid justify-content-center mx-0 g-4 row row-cols-auto">
                {items &&
                    items.map((item, index) => {
                        return (
                            <Link
                                to={`/${index}/${item.id}`}
                                key={index}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <BookCard
                                    title={item.volumeInfo.title}
                                    category={
                                        item.volumeInfo.categories
                                            ? item.volumeInfo.categories[0]
                                            : ""
                                    }
                                    authors={item.volumeInfo.authors}
                                    image={
                                        item.volumeInfo.imageLinks
                                            ? item.volumeInfo.imageLinks
                                                  .thumbnail
                                            : "./favicon.ico"
                                    }
                                />
                            </Link>
                        );
                    })}
            </div>
            <button
                onClick={() => dispatch(loadMoreBooks())}
                className="my-5 py-3 mx-auto btn btn-primary d-block w-50"
                disabled={isLoading}
            >
                {isLoading ? <Loading /> : "Load More"}
            </button>
        </>
    );
}
export default Home;
