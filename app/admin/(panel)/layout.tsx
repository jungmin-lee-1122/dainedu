import AdminSidebar from "../../components/admin/AdminSidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ad-shell">
      <AdminSidebar />
      <main className="ad-main">
        <div className="ad-main-in">{children}</div>
      </main>
    </div>
  );
}
