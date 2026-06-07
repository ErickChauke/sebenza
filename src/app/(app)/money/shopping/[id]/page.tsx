import { notFound } from "next/navigation";
import { getShoppingList } from "@/actions/shopping";
import { ShoppingListDetailView } from "@/components/modules/money/shopping-list-detail";

// One shopping list, scoped.
export default async function ShoppingListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getShoppingList(id);
  if (!list) notFound();
  return <ShoppingListDetailView list={list} />;
}
