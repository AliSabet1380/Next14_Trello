"use client";
import Sidebar from "@/components/other/Dashboard/organization/Sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 px-4 h-full">
      <div className="flex gap-x-7 h-full">
        <div className="w-64 shrink-0 hidden md:block h-full">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};
export default OrganizationLayout;
