import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { getBookItems } from "./features/bookItemsSlice";

import NavbarComponent from "./components/NavbarComponent";
import Loading from "./components/Loading";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";

function App() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookItems());
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <NavbarComponent />
            <div className="container2xl">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id/:bookId" element={<BookPage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Suspense>
    );
}

export default App;
