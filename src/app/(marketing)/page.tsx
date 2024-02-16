// NEXTJS
import Link from "next/link";

// LUCIDE-REACT
import { Medal } from "lucide-react";

// REACT-ICONS
import { IoIosArrowDropright } from "react-icons/io";

// SHADCN
import { Button } from "@/components/ui/button";

//Home Component
const Homepage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 border border-orange-600 rounded-md text-amber-900 shadow-md p-4">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task managment
        </div>
        <h2 className="text-2xl  md:text-4xl text-center text-gray-700 mb-6">
          Taskify help team move
        </h2>
        <div className="text-2xl md:text-4xl bg-gradient-to-r from-violet-500 to-pink-400 px-4 p-2 rounded-md pb-2 w-fit text-slate-100">
          work forward
        </div>
      </div>
      <div className="text-sm md:text-base text-gray-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto pb-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique a
        ratione voluptatibus. Nisi nemo, voluptates accusantium autem, ab
        obcaecati exercitationem odit consequatur unde magnam ipsa esse eveniet
        ex tenetur quam.
      </div>
      <Button asChild className="">
        <Link href={"/sign-up"} className="flex items-center gap-2">
          Get Start Free <IoIosArrowDropright size={20} />
        </Link>
      </Button>
    </div>
  );
};
export default Homepage;
