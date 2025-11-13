import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
// Dialog
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useContext, useState } from "react";
import { NotesContext } from "@/contexts/NotesContext";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { colors } from "@/constants/colors";

const initializeNote = {
  id: null,
  description: "",
  date: "",
  color: "#FEC971",
};

function AddButton() {
  const { notes, setNotes } = useContext(NotesContext);
  const [newNote, setNewNote] = useState(initializeNote);
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="rounded-full cursor-pointer text-gray-800"
              style={{ backgroundColor: colors[0] }}
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new note</DialogTitle>
              <DialogDescription>Add your new note here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Description</Label>
                <Textarea
                  className="min-h-[120px]"
                  value={newNote.description}
                  onChange={(event) => {
                    setNewNote({ ...newNote, description: event.target.value });
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
                        checked={newNote.color === color}
                        onChange={() => setNewNote({ ...newNote, color })}
                        className="sr-only"
                      />
                      <div
                        className={`w-8 h-8 rounded-full border-2 ${
                          newNote.color === color
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
                  disabled={newNote.description === ""}
                  onClick={() => {
                    const noteWithDate = {
                      ...newNote,
                      id: uuidv4(),
                      date: moment().format("MMMM Do, YYYY"),
                    };
                    const newList = [...notes, noteWithDate];
                    localStorage.setItem("notesList", JSON.stringify(newList));
                    setNotes(newList);
                    setNewNote(initializeNote);
                  }}
                >
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default AddButton;
