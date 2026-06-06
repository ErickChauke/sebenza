import { getEntries } from "@/actions/journal";
import { JournalBoard } from "@/components/modules/journal/journal-board";

// Journal page. Fetches the user's entries and hands them to the board.
export default async function JournalPage() {
  const entries = await getEntries();
  return <JournalBoard entries={entries} />;
}
