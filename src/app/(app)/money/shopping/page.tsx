import { getShoppingLists } from "@/actions/shopping";
import { ShoppingOverview } from "@/components/modules/money/shopping-overview";

// Shopping lists overview.
export default async function ShoppingPage() {
  const lists = await getShoppingLists();
  return <ShoppingOverview lists={lists} />;
}
