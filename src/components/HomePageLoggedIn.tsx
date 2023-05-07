import { useEffect, useState } from "react";
import { UserModel } from "../models/user";
import * as callApi from "../api";
// import AddNoteEditModal from "./AddNoteEditModal";
import Loading from "./Loading";

const styles = {};

const NotesPageLoggedIn = () => {
    //
    // const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesIsLoading, setNotesIsLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
    //
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    // const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
        async function loadNotes() {
            try {
                setShowNotesLoadingError(false);
                setNotesIsLoading(true);

                // const notes = await callApi.fetchNotes();
                // setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            } finally {
                setNotesIsLoading(false);
            }
        }
        loadNotes();
    }, []);

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

    return (
        <>
            {notesIsLoading && <Loading />}
            {showNotesLoadingError && <p>Something went wrong...</p>}
        </>
    );
};

export default NotesPageLoggedIn;
