import { useParams, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import NotFoundPage from "./NotFoundPage";

function BookPage() {
    const { items } = useSelector((store: RootState) => store.bookItems);
    const { id, bookId } = useParams();

    if (typeof id === "undefined" || !bookId) {
        // redirect("/");
        return <NotFoundPage />;
    }
    const { volumeInfo: book } = items[+id];
    if (!book) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Link
                to=".."
                preventScrollReset={true}
                className="mb-4 py-2 d-block w-50 xl:w-25 mx-auto text-center btn btn-light border border-secondary-subtle"
            >
                {"< Back"}
            </Link>
            <div className=" p-2 row g-2 mx-auto">
                <div className="col-sm">
                    <img
                        alt={"./favicon.ico"}
                        src={book.imageLinks?.thumbnail}
                        className="shadow d-block mx-auto "
                    />
                </div>

                <div className="col-sm-8">
                    <h4 className="">{book.title}</h4>
                    <h6 className="mb-0">{book.authors}</h6>
                    <p className="mb-2 text-muted">{book.categories}</p>
                    <p className="mb-0">{book.description}</p>
                </div>
            </div>
        </>
    );
}
export default BookPage;
