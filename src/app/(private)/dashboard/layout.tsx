import AdminLayoutProvider from "@/providers/dashboard-sidebar-provider";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-mockstox-primary min-h-screen text-mockstox-foreground">
      <AdminLayoutProvider>{children}</AdminLayoutProvider>
    </div>
  );
}
