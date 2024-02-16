//NEXTJS
import Link from "next/link";

// CLERK
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

// LUCIDE_REACT
import { Plus } from "lucide-react";

// SHADCN
import { Button } from "@/components/ui/button";

// COMPONENTS
import FormPopover from "@/components/Form/FormPopover";
import Logo from "../Home/Logo";
import MobileSidebar from "./organization/MobileSidebar";

// DASHBOARDNAVBAR
const DashboardNavbar = () => {
  return (
    <nav className="fixed z-50 top-0 border-b shadow-md h-20 w-full flex items-center justify-between bg-white px-4">
      <div className="flex items-center gap-x-4">
        <MobileSidebar />
        <Link href={"/"} className="flex items-center gap-2 hover:opacity-75">
          <Logo />
          <span className="text-lg font-semibold">Taskify</span>
        </Link>
      </div>
      <div className="flex gap-2 sm:gap-6">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/select-org"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton afterSignOutUrl="/" />
        <FormPopover side="left" sideOffset={10} align="start">
          <Button variant={"secondary"} size={"sm"} className="hidden md:block">
            Create
          </Button>
        </FormPopover>
        <FormPopover side="left" sideOffset={10} align="start">
          <Button variant={"secondary"} size={"sm"} className="block md:hidden">
            <Plus />
          </Button>
        </FormPopover>
      </div>
    </nav>
  );
};
export default DashboardNavbar;
