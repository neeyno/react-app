import { Link } from "react-router-dom";

import { UserModel } from "../models/models";

import Loading from "../components/Loading";
import HomePageLoggedOut from "../components/HomePageLoggedOut";
import HomePageLoggedIn from "../components/HomePageLoggedIn";

interface HomePageProps {
    loggedInUser: UserModel | null;
}

// : <Loading />}</div>/>

function Home({ loggedInUser }: HomePageProps) {
    return (
        <div>
            {loggedInUser ? (
                <HomePageLoggedIn loggedInUser={loggedInUser} />
            ) : (
                <HomePageLoggedOut />
            )}
        </div>
    );
}

export default Home;
