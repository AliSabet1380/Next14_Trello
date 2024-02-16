import { Separator } from "@/components/ui/separator";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full gap-3">
      <span>404</span>
      <div className=" h-7 border-r-2 border-slate-400"></div>
      <span>Page Not Found</span>
    </div>
  );
};
export default NotFound;
