import { AuditLog } from "@prisma/client";

import { generateLog } from "@/lib/loger";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  data: AuditLog;
};

const ActivityItem = ({ data }: Props) => {
  const formatedDate = new Date(data.createAt).toLocaleString();

  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-neutral-700 text-muted-foreground">
          <span className="font-semibold lowercase">
            {data.userName}
            {"  "}
          </span>
          {generateLog(data)}
        </p>
        <p className="text-xs text-muted-foreground">{formatedDate}</p>
      </div>
    </li>
  );
};
export default ActivityItem;
