"use client";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen bg-[rgb(246,255,255)]">
      <Sidebar />
      <div className="flex-1 h-full overflow-auto">
        {children}
      </div>
    </main>
  );
}