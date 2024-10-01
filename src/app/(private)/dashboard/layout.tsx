import AdminLayoutProvider from "@/providers/dashboard-sidebar-provider";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminLayoutProvider>{children}</AdminLayoutProvider>
    </div>
  );
}
