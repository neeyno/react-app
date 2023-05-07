import { useState } from "react";

const styles = {
    animation: `ease-in-out duration-150 hover:text-blue-600`,
};

const Navbar = () => {
    const [menuOpen, SetMenuOpen] = useState(false);

    const closeMenu = () => {
        if (!menuOpen) {
            SetMenuOpen(menuOpen);
            // menuOpen = true;
        } else {
            SetMenuOpen(!menuOpen);
            // menuOpen = false;
        }
    };

    return (
        <header
            className={`max-w-6xl borber border-b border-gray-800 m-auto text-1xs sm:text-xl  py-4 px-4 flex justify-between items-center flex-wrap ${
                menuOpen ? `open` : ""
            }`}
        >
            <div className="z-50">
                <h2 className={`sm:text-2xl font-semibold ` + styles.animation}>
                    <a href="/">{"Main"}</a>
                </h2>
            </div>
            <nav className="">
                <ul
                    className={`menu hidden absolute left-0 top-0 m-0 py-20 pt-16 px-2 bg-neutral-300/70 backdrop-blur-xl z-40 w-full h-52 sm:w-unset sm:h-auto sm:bg-transparent sm:flex sm:py-2 sm:static sm:left-unset sm:top-unset ${
                        menuOpen ? `open` : ""
                    }`}
                >
                    <li className="mb-4 mx-0 sm:mb-0 sm:mx-3" title="Projects">
                        <a
                            href="#projects"
                            className={`` + styles.animation}
                            onClick={() => closeMenu()}
                        >
                            {"Pulls"}
                        </a>
                    </li>

                    <li
                        className="mb-4 mt-2 mx-0 sm:mb-0 sm:mt-0 sm:mx-3"
                        title="Experience"
                    >
                        <a
                            href="#experiences"
                            className={`` + styles.animation}
                            onClick={() => closeMenu()}
                        >
                            {"Profile"}
                        </a>
                    </li>
                </ul>
            </nav>
            <div
                className={`hamburger z-50 flex flex-col justify-center items-center sm:hidden ${
                    menuOpen ? `open` : ""
                }`}
                onClick={() => SetMenuOpen(!menuOpen)}
            >
                <span className="h-0.5 w-7 mb-1.5 bg-neutral-800"></span>
                <span className="h-0.5 w-7 mb-1.5 bg-neutral-800"></span>
                <span className="h-0.5 w-7 mb-1.5 bg-neutral-800"></span>
            </div>
        </header>
    );
};

export default Navbar;
