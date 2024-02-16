import { auth } from "@clerk/nextjs";

import { db } from "./DB";

import { MAX_FREE_BOARDS } from "@/components/constant";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorzied!");

  try {
    const orgLimit = await db.orgLimit.findUnique({
      where: { orgId },
      select: { count: true },
    });

    if (orgLimit) {
      await db.orgLimit.update({
        where: {
          orgId,
        },
        data: {
          count: orgLimit.count + 1,
        },
      });
    } else {
      await db.orgLimit.create({
        data: {
          orgId,
          count: 1,
        },
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
};

export const decrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorzied!");

  try {
    const orgLimit = await db.orgLimit.findUnique({
      where: {
        orgId,
      },
    });

    if (orgLimit) {
      await db.orgLimit.update({
        where: {
          orgId,
        },
        data: {
          count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
        },
      });
    } else {
      await db.orgLimit.create({
        data: {
          orgId,
          count: 0,
        },
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorzied!");

  try {
    const orgLimit = await db.orgLimit.findUnique({
      where: {
        orgId,
      },
    });

    if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export const numberOfAvailbleCount = async () => {
  const { orgId } = auth();

  if (!orgId) return 0;

  try {
    const orgLimit = await db.orgLimit.findUnique({
      where: { orgId },
    });

    if (orgLimit) return orgLimit.count;
    else return 0;
  } catch (error) {
    throw new Error("Server Error");
  }
};
