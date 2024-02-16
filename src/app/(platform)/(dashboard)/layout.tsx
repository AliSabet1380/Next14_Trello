import DashboardNavbar from "@/components/other/Dashboard/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <DashboardNavbar />
      {children}
    </div>
  );
};
export default DashboardLayout;
