import { AuditLog } from "@prisma/client";

export const generateLog = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  let message;
  if (action === "COPY") {
    message = `Copy ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }
  if (action === "CREATE") {
    message = `Create ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }
  if (action === "DELETE") {
    message = `Delete ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }
  if (action === "UPDATE") {
    message = `Update ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }

  return message;
};
