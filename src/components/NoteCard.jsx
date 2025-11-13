import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash2, Pencil } from "lucide-react";

function NoteCard({ note, onClickDelete, onClickUpdate }) {
  return (
    <>
      <div>
        <Card style={{ backgroundColor: note.color }}>
          <CardContent>
            <div className="flex justify-between gap-5">
              <p className="wrap-break-words overflow-hidden text-ellipsis line-clamp-5 pt-2">
                {note.description}
              </p>
              <Button
                size="icon"
                className="bg-gray-900 rounded-full cursor-pointer"
                onClick={onClickDelete}
              >
                <Trash2 />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardDescription className="text-gray-800">
              {note.date}
            </CardDescription>
            <Button
              size="icon"
              className="bg-gray-900 rounded-full cursor-pointer"
              onClick={onClickUpdate}
            >
              <Pencil />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default NoteCard;
