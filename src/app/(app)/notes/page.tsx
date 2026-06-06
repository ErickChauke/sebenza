import { getNotes } from "@/actions/notes";
import { NotesBoard } from "@/components/modules/notes/notes-board";

// Notes page. Fetches the user's notes and hands them to the board.
export default async function NotesPage() {
  const notes = await getNotes();
  return <NotesBoard notes={notes} />;
}
