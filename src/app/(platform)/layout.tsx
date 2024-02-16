import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import CardModalProvider from "@/components/modal/provider/CardModalProvider";
import QueryProvider from "@/components/modal/provider/QueryProvider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <CardModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};
export default PlatformLayout;
