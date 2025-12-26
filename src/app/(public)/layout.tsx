import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // Import Footer baru

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      {/* Footer Component Baru */}
      <Footer />
    </div>
  );
}