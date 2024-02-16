import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

type Props = {
  isActive: boolean;
  isExpended: boolean;
  organization: Organization;
  onExpend: (id: string) => void;
};

const NavItem = ({ isActive, onExpend, organization, isExpended }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = [
    {
      title: "Boards",
      icon: <Layout className="w-4 h-4" />,
      href: `/organization/${organization.id}`,
    },
    {
      title: "Activity",
      icon: <Activity className="w-4 h-4" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      title: "Settings",
      icon: <Settings className="w-4 h-4" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      title: "Belling",
      icon: <CreditCard className="w-4 h-4" />,
      href: `/organization/${organization.id}/belling`,
    },
  ];

  const clickHandler = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id}>
      <AccordionTrigger
        onClick={() => onExpend(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline1 hover:no-underline",
          isActive && !isExpended && "bg-sky-500/10 text-sky-800"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 relative">
            <Image
              src={organization.imageUrl}
              alt="organization image"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <span className="font-semibold text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            size={"sm"}
            onClick={() => clickHandler(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1 bg-white border border-sky-700 text-black hover:text-white hover:bg-black/70 flex items-center gap-2",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            key={route.href}
          >
            {route.icon}
            <span>{route.title}</span>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
export default NavItem;
