import Link from "next/link";
import "./trip-planner/globals.css";

export default function Home() {
  const pages = [
    {
      href: "/trip-planner",
      title: "Planificateur de Voyage",
      description:
        "Découvrez des destinations et planifiez votre voyage parfait.",
    },
    {
      href: "/nantes-shop",
      title: "Shop de Nantes",
      description: "Découvrez les spécialités de Nantes et commandez en ligne.",
    },
    {
      href: "water-meter",
      title: "Gestion de compteur d'eau",
      description: "Gérez votre compteur d'eau et suivez votre consommation.",
    },
    {
      href: "/itinerant-healthcare",
      title: "Le Docteur Itinérant",
      description: "Gérez vos rendez-vous avec vos patients.",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-2xl">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="block rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <h2 className="text-2xl font-semibold mb-2">{page.title}</h2>
            <p className="text-gray-600">{page.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
