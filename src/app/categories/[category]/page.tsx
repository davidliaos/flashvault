import { Metadata } from "next";
import { getGamesByCategory, getAllCategories } from "@/lib/games";
import GameGrid from "@/components/GameGrid";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const prettyCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const description = `Browse ${category} Flash games on FlashVault.`;

  return {
    title: `${prettyCategory} Games — FlashVault`,
    description,
    openGraph: {
      title: `${prettyCategory} Games — FlashVault`,
      description,
      type: "website",
      siteName: "FlashVault",
      images: [
        {
          url: "/flashvault-og.png",
          width: 1200,
          height: 630,
          alt: `${prettyCategory} Games on FlashVault`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${prettyCategory} Games — FlashVault`,
      description,
      images: ["/flashvault-og.png"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const games = getGamesByCategory(category);
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-400 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-300 capitalize">{category}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-100 mb-2 capitalize">
        {category} Games
      </h1>
      <p className="text-gray-400 mb-8">
        {games.length} {games.length === 1 ? "game" : "games"} in this category
      </p>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${cat}`}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors capitalize ${
              cat === category
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                : "bg-gray-900 border border-gray-700 text-gray-300 hover:border-emerald-500/50"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <GameGrid games={games} />
    </div>
  );
}
