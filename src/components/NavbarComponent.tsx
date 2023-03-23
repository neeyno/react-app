import Form from "react-bootstrap/Form";

import { ECategories, ESortBy } from "../utils/helper";
import { getBookItemsOnQuery, initialState } from "../features/bookItemsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useState } from "react";

function NavbarComponent() {
    const dispatch: AppDispatch = useDispatch();

    const [searchInput, setSearchInput] = useState(initialState.query.input);
    const [category, setCategory] = useState<string>(
        initialState.query.category
    );
    const [sortBy, setSortBy] = useState<string>(initialState.query.sortBy);

    function handleSearchClicked() {
        if (searchInput === "") return;

        dispatch(
            getBookItemsOnQuery({
                input: searchInput,
                category: category,
                sortBy: sortBy,
            })
        );
    }

    return (
        <>
            <nav className="container2xl container navbar navbar-expand navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">
                        <a className="nav-link" href="/">
                            Book Search App
                        </a>
                    </span>
                </div>
            </nav>
            <nav className="containerNav shadow border-bottom border-primary navbar navbar-expand navbar-light sticky-top">
                <div className="container justify-content-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="input-group">
                                <Form.Control
                                    type="text"
                                    aria-label="Search"
                                    placeholder="type something"
                                    className="code"
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                />
                                <button
                                    id="basic-addon1"
                                    onClick={() => handleSearchClicked()}
                                    className="btn btn-primary input-group-text"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-6">
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label className="mb-0">
                                    Category
                                </Form.Label>
                                <Form.Select
                                    size="sm"
                                    aria-label="selectCategory"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            ECategories[
                                                e.target
                                                    .value as keyof typeof ECategories
                                            ]
                                        )
                                    }
                                >
                                    {(Object.values(ECategories) as string[]) // Array<keyof typeof ECategories>
                                        .map((enumKey, index) => {
                                            return (
                                                <option
                                                    value={enumKey}
                                                    key={index}
                                                >
                                                    {enumKey}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label className="mb-0">
                                    Sort by
                                </Form.Label>
                                <Form.Select
                                    size="sm"
                                    aria-label="selectSort"
                                    value={sortBy}
                                    onChange={(e) =>
                                        setSortBy(
                                            ESortBy[
                                                e.target
                                                    .value as keyof typeof ESortBy
                                            ]
                                        )
                                    }
                                >
                                    {(Object.keys(ESortBy) as string[]) //Array<keyof typeof ESortBy>
                                        .map((enumKey, index) => {
                                            return (
                                                <option
                                                    value={enumKey}
                                                    key={index}
                                                >
                                                    {enumKey}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default NavbarComponent;
