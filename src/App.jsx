import { useState } from "react";
import "./App.css";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import { NotesContext } from "./contexts/NotesContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import { colors } from "@/constants/colors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "./components/ui/textarea";

const initializeNote = {
  description: "",
  color: "",
};

function App() {
  const notesList = JSON.parse(localStorage.getItem("notesList")) || [];
  const [notes, setNotes] = useState(notesList);
  // states for dialog
  const [selectedNote, setSelectedNote] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(initializeNote);

  function handleOpenDialog(id, type) {
    //alert("delete");
    setOpenDialog(true);
    setDialogType(type);
    setSelectedNote(id);
  }

  return (
    <>
      <NotesContext.Provider value={{ notes, setNotes }}>
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col gap-12 w-[90%] p-5 min-h-[90vh]">
            <SearchBar />
            <h1 className="text-gray-900 font-bold text-4xl">Notes</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[70%]">
              {notes
                .slice()
                .reverse()
                .map((n) => {
                  return (
                    <NoteCard
                      key={n.id}
                      note={n}
                      onClickDelete={() => handleOpenDialog(n.id, "delete")}
                      onClickUpdate={() => {
                        setUpdatedNote(n);
                        handleOpenDialog(n.id, "edit");
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </NotesContext.Provider>
      {/* Delete Dialog */}
      <Dialog
        open={openDialog && dialogType === "delete"}
        onOpenChange={setOpenDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              note.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-red-600"
              type="submit"
              onClick={() => {
                const newList = notes.filter((n) => n.id != selectedNote);
                localStorage.setItem("notesList", JSON.stringify(newList));
                setNotes(newList);
                setOpenDialog(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog && dialogType === "edit"}
        onOpenChange={setOpenDialog}
      >
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update note</DialogTitle>
              <DialogDescription>Update your new note here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Description</Label>
                <Textarea
                  className="min-h-[120px]"
                  value={updatedNote.description}
                  onChange={(event) => {
                    setUpdatedNote({
                      ...updatedNote,
                      description: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label>Color</Label>
                <div className="flex gap-3 mb-4">
                  {colors.map((color) => (
                    <Label key={color} className="relative cursor-pointer">
                      <Input
                        type="radio"
                        name="noteColor"
                        value={color}
                        checked={updatedNote.color === color}
                        onChange={() =>
                          setUpdatedNote({ ...updatedNote, color })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-8 h-8 rounded-full border-2 ${
                          updatedNote.color === color
                            ? "border-gray-500 scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      ></div>
                    </Label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={updatedNote.description === ""}
                  onClick={() => {
                    const updatedNotesList = notes.map((n) =>
                      n.id === selectedNote
                        ? {
                            ...n,
                            description: updatedNote.description,
                            color: updatedNote.color,
                          }
                        : n
                    );
                    console.log(updatedNotesList);
                    localStorage.setItem(
                      "notesList",
                      JSON.stringify(updatedNotesList)
                    );
                    setNotes(updatedNotesList);
                  }}
                >
                  update
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default App;
