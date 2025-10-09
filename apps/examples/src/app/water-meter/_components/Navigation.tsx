"use client";

import { BarChart3, Droplets, Home, Table } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../../components/ui/button";

export function Navigation() {
  const pathname = usePathname();

  const page = pathname.split("/")[2] ?? "";

  const navItems = [
    { path: "", label: "Accueil", icon: Home },
    { path: "meters", label: "Compteurs", icon: Table },
    { path: "graph", label: "Graphiques", icon: BarChart3 },
  ];

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">Gestion Eau</span>
          </div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link href={`/water-meter/${item.path}`} key={item.path}>
                  <Button
                    key={item.path}
                    variant={page === item.path ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
