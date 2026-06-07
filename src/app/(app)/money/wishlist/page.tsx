import { getCollections } from "@/actions/wishlist";
import { getGoals } from "@/actions/goals";
import { WishlistOverview } from "@/components/modules/money/wishlist-overview";

// Wishlist collections overview. Goals are passed so cards can flag how many of
// a collection's wishes are already being saved for.
export default async function WishlistPage() {
  const [collections, goals] = await Promise.all([getCollections(), getGoals()]);
  return <WishlistOverview collections={collections} goals={goals} />;
}
