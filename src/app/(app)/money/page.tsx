import { getTransactions } from "@/actions/money";
import { getGoals } from "@/actions/goals";
import { getShoppingLists } from "@/actions/shopping";
import { getCollections } from "@/actions/wishlist";
import { DashboardBoard } from "@/components/modules/money/dashboard-board";

// Money dashboard. Fetches everything the overview aggregates and hands it to
// the board, which owns the month/year scale.
export default async function MoneyPage() {
  const [transactions, goals, shoppingLists, collections] = await Promise.all([
    getTransactions(),
    getGoals(),
    getShoppingLists(),
    getCollections(),
  ]);
  return (
    <DashboardBoard
      transactions={transactions}
      goals={goals}
      shoppingLists={shoppingLists}
      collections={collections}
    />
  );
}
