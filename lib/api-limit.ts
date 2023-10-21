import { MAX_FREE_COUNTS } from "@/constants";
import prismadb from "./prismadb";
import { auth } from "@clerk/nextjs";

export const IncreaseCount = async () => {
  const { userId } = auth();
  if (!userId) return;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId, count: 1 },
    });
  }
};

export const checkApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) return;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) return 0;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (userApiLimit) {
    return userApiLimit.count;
  } else {
    return 0;
  }
};
