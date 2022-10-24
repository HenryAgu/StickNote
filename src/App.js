import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
const App = () => {
  const [notes, setNotes] = useLocalStorage('notes',[]);
  const [texts, setTexts] = useState("");
  const [error, setError] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    setTexts("");
  };
  // Handling Change
  const handleChange = (e) => {
    if (e.target.value.length > 150) {
      setError("character limit exceded");
    } else {
      setTexts(e.target.value);
      setError(null);
    }
  };
  // To add Notes
  const addNotesHandler = () => {
    if (texts.length == "") {
      // alert("Please enter a message");
    } else {
      const note = {
        id: notes.length === 0 ? 1 : notes[notes.length - 1].id + 1,
        noteName: texts,
      };
      const newNotes = [...notes, note];
      setNotes(newNotes);
      setError(null);
    }
  };

  // To Delete Note
  const deleteNoteHandler = (id) => {
    const newNotes = notes.filter((note) => {
      if (note.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setNotes(newNotes);
  };

  // To Edit Note
  const editNoteHandler = (id) =>{
    const chosenNote = notes.filter((note) =>{
      if(note.id === id){
        setTexts(note.noteName)
      }
    })
  }
  return (
    <div className="container">
      <div className="input-section">
        <div className="notes-header">
          <h1>Sticky Notes</h1>
        </div>
        <div className="error">
          <span>{error}</span>
        </div>
        <form onSubmit={formHandler}>
          <textarea
            type="text"
            placeholder="Enter a Note to stick"
            value={texts}
            onChange={handleChange}
            required
          />
          <button onClick={addNotesHandler}>Add Sticky Note</button>
        </form>
      </div>
      <div className="notes-section">
        {notes.map((note) => {
          return (
            <div className="inner-notes" key={note.id}>
              <p>{note.noteName}</p>
              <div className="notes-control">
                <i
                  class="fa-solid fa-trash-can delete"
                  onClick={() => deleteNoteHandler(note.id)}
                ></i>
                <i class="fa-solid fa-pencil edit"
                onClick={() => editNoteHandler(note.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

