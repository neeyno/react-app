import { Link } from "react-router-dom";

import { UserModel } from "../models/user";

import Loading from "../components/Loading";
import HomePageLoggedOut from "../components/HomePageLoggedOut";
import HomePageLoggedIn from "../components/HomePageLoggedIn";

interface HomePageProps {
    loggedInUser: UserModel | null;
}

function Home({ loggedInUser }: HomePageProps) {
    return (
        <div>{loggedInUser ? <HomePageLoggedIn /> : <HomePageLoggedOut />}</div>
    );
}

export default Home;
