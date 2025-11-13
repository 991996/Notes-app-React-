import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddButton from "./AddButton";
import { useState, useContext } from "react";
import { NotesContext } from "@/contexts/NotesContext";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const { notes, setNotes } = useContext(NotesContext);
  const [filteredNotes] = useState(notes);

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);
    const filteredList = filteredNotes.filter((note) =>
      note.description.toLowerCase().includes(text.toLowerCase())
    );
    setNotes(filteredList);
  };
  return (
    <>
      <div className="flex w-full items-center gap-2">
        <AddButton />

        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-8"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
    </>
  );
}

export default SearchBar;
