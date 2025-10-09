import { AlertTriangle, BarChart3, Droplets, Table } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function HomePage() {
  return (
    <>
      <header className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Droplets className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Gestion Consommation Eau
              </h1>
              <p className="text-muted-foreground mt-1">
                Surveillance et analyse intelligente de la consommation d'eau du
                bâtiment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Link href="/water-meter/meters">
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Table className="h-5 w-5 text-primary" />
                  </div>
                  Compteurs d'Eau
                </CardTitle>
                <CardDescription>
                  Visualisez et gérez tous les compteurs d'eau du bâtiment avec
                  tri et filtrage avancés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    24 compteurs • 2 fuites détectées
                  </div>
                  <Button
                    size="sm"
                    className="group-hover:bg-primary/90 cursor-pointer"
                  >
                    Accéder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/water-meter/graph">
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  Graphiques de Consommation
                </CardTitle>
                <CardDescription>
                  Analysez les tendances de consommation avec des graphiques
                  interactifs et des filtres temporels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Analyse temps réel • Historique complet
                  </div>
                  <Button
                    size="sm"
                    className="group-hover:bg-primary/90 cursor-pointer"
                  >
                    Analyser
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                Compteurs Actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dans tout le bâtiment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Fuites Détectées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Nécessitent une attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Économies Réalisées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12%</div>
              <p className="text-xs text-muted-foreground mt-1">
                vs mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Alertes Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-red-800">
                    Fuite détectée - Compteur C002
                  </p>
                  <p className="text-sm text-red-600">
                    Étage 1 • Appartement Martin Pierre
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-red-800">
                    Consommation anormale - Compteur C005
                  </p>
                  <p className="text-sm text-red-600">
                    Étage 3 • Appartement Garcia Carlos
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
