export const MetersTableError = ({ error }: { error: string }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-destructive mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
  );
};