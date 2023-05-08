import { useEffect, useState } from "react";
import { UserModel } from "../models/models";
import * as callApi from "../api";
// import AddNoteEditModal from "./AddNoteEditModal";
import Loading from "./Loading";

const styles = {};

interface HomePageProps {
    loggedInUser: UserModel | null;
}

const NotesPageLoggedIn = ({ loggedInUser }: HomePageProps) => {
    //
    // const [notes, setNotes] = useState<NoteModel[]>([]);
    // const [notesIsLoading, setNotesIsLoading] = useState(true);
    // const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
    // //
    // const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    // const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    // useEffect(() => {
    //     async function loadNotes() {
    //         try {
    //             setShowNotesLoadingError(false);
    //             setNotesIsLoading(true);

    //             // const notes = await callApi.fetchNotes();
    //             // setNotes(notes);
    //         } catch (error) {
    //             console.error(error);
    //             setShowNotesLoadingError(true);
    //         } finally {
    //             setNotesIsLoading(false);
    //         }
    //     }
    //     loadNotes();
    // }, []);

    /* async function deleteNote(note: NoteModel) {
        try {
            await callApi.deleteNote(note._id);
            // setNotes((prevNotes) => {
            //     const index = prevNotes.indexOf(note);
            //     return [...prevNotes].splice(index, 1);
            // });

            setNotes((prevNotes) => {
                return prevNotes.filter((elem) => elem._id !== note._id);
            });
        } catch (error) {
            console.error(error);
            alert(error);
        }
    } */

    async function handlePullReqest(type: string) {
        const username = "User1337";
        const address = "0x42e3Ba6a7f52d99c60Fa7A7C3ce4a5ea89649896";
        let jwt =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg0MmUzQmE2YTdmNTJkOTljNjBGYTdBN0MzY2U0YTVlYTg5NjQ5ODk2IiwiZXhwIjoxNjgzNjEyMzY2LCJ1c2VybmFtZSI6IlVzZXIxMzM3In0.TrWGMORPVnGTlNCNQejFGxUPEfGMKOqDLVPtpSlHfOw";

        try {
            if (type === "singlePull") {
                const response = await callApi.createSinglePull({
                    username,
                    address,
                    jwt,
                });
                console.log(response.items);
            } else {
                const response = await callApi.createMultiPull({
                    username,
                    address,
                    jwt,
                });
                console.log(response.items);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* {notesIsLoading && <Loading />} */}
            {/* {showNotesLoadingError && <p>Something went wrong...</p>} */}
            {loggedInUser && (
                <div>
                    <p>Welcome {loggedInUser.username}</p>
                    <button onClick={() => handlePullReqest("singlePull")}>
                        Single Pull
                    </button>
                    <button onClick={() => handlePullReqest("multiPull")}>
                        Multi Pull
                    </button>
                </div>
            )}
        </>
    );
};

export default NotesPageLoggedIn;
