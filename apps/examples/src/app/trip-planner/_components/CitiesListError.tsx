export const CitiesListError = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <p className="text-destructive mb-2">
          Erreur lors du chargement des villes
        </p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    </div>
  );
};
