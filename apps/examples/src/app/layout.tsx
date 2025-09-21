import { Providers } from "./_components/Providers";
import { RedirectToHome } from "./_components/RedirectToHome";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
        <RedirectToHome />
      </body>
    </html>
  );
}
