"use client";

import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import ActivityItem from "./ActivityItem";

type Props = {
  data: AuditLog[];
};

const Activity = ({ data }: Props) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 " />
      <div className="w-full ">
        <p className="text-sm font-semibold mb-2 text-neutral-700">Activity</p>
        <ol className="mt-2 space-y-4">
          {data.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Activity;
