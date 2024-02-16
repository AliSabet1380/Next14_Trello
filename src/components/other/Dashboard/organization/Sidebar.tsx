"use client";
// NEXTJS
import Link from "next/link";

// REACT_ICONS
import { AiOutlineSelect } from "react-icons/ai";

// CLERK
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

// SHADCN
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

// USEHOOKS_TS
import { useLocalStorage } from "usehooks-ts";
import NavItem, { Organization } from "./NavItem";
import NavItemSkeleton from "./NavItemSkeleton";

// TYPES
type Props = {
  storageKey?: string;
};

// SIDEBAR COMPONENT
const Sidebar = ({ storageKey = "t-sidebar-props" }: Props) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  const defaultAccordionValue = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((pervState) => ({ ...pervState, [id]: !pervState[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading)
    return (
      <>
        <div className="flex items-center justify-between mt-4 p-2">
          <Skeleton className="h-10 w-1/2 bg-slate-200" />
          <Skeleton className="h-10 w-10 bg-slate-200" />
        </div>
        <NavItemSkeleton />
        <NavItemSkeleton />
        <NavItemSkeleton />
      </>
    );

  return (
    <div className="md:border-r-2 border-sky-800 h-full pr-4 pt-4">
      <div className="font-medium text-sm flex items-center mb-1 justify-between p-2 border-b border-slate-200">
        <span>Workspace</span>
        <Button
          size={"icon"}
          className="border-sky-800 w-8 h-8"
          variant={"outline"}
          asChild
        >
          <Link href={"/select-org"}>
            <AiOutlineSelect size={18} />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-3"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpended={expanded[organization.id]}
            organization={organization as Organization}
            onExpend={onExpand}
          />
        ))}
      </Accordion>
    </div>
  );
};
export default Sidebar;
