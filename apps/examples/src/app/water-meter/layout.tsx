import { Navigation } from "./_components/Navigation";
import "./globals.css";

export default function WaterMeterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {children}
    </div>
  );
}
