// src/app/template.tsx

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // Ganti class jadi 'animate-blur-in'
    <div className="animate-blur-in">
      {children}
    </div>
  );
}