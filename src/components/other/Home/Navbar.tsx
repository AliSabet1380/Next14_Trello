import Link from "next/link";
import Logo from "./Logo";
import { Button } from "../../ui/button";

const Navbar = () => {
  return (
    <div className="fixed  z-50 top-0 w-full h-20 px-4 border-b shadow-md bg-white flex items-center justify-between">
      <div className="">
        <Link
          className="flex items-center gap-2 hover:opacity-75 transition"
          href={"/"}
        >
          <Logo />
          <span className="font-semibold text-lg">Taskify</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button asChild variant={"lime"}>
          <Link href={"/sign-in"}>Login</Link>
        </Button>
        <Button asChild>
          <Link href={"/sign-up"}>Start For Free</Link>
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
