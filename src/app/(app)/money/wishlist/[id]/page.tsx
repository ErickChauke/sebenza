import { notFound } from "next/navigation";
import { getCollection } from "@/actions/wishlist";
import { getGoals } from "@/actions/goals";
import { CollectionDetailView } from "@/components/modules/money/collection-detail";

// One wishlist collection, scoped.
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [collection, goals] = await Promise.all([getCollection(id), getGoals()]);
  if (!collection) notFound();
  return <CollectionDetailView collection={collection} goals={goals} />;
}
