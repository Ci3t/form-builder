import { eq } from "drizzle-orm";
import { FreeTierTracking } from "./schema";
import { checkSubscription } from "./subscription";

const { db } = require(".");

export const checkFormCreationLimit = async (userId) => {
  const userRecords = await db
    .select()
    .from(FreeTierTracking)
    .where(eq(FreeTierTracking.userId, userId))
    .limit(1); // Fetch only one record

  if (userRecords.length > 0) {
    const userRecord = userRecords[0];

    console.log(userRecord.formsCreated < 3);

    return userRecord.formsCreated < 3;
  }

  // If no record is found, consider it as within the limit
  return true;
};

export const incrementFormCount = async (userId) => {
  const userRecords = await db
    .select()
    .from(FreeTierTracking)
    .where(eq(FreeTierTracking.userId, userId))
    .limit(1);

  if (userRecords.length > 0) {
    const userRecord = userRecords[0];
    await db
      .update(FreeTierTracking)
      .set({ formsCreated: userRecord.formsCreated + 1 })
      .where(eq(FreeTierTracking.userId, userId));
  } else {
    // If no record exists, create a new one
    await db.insert(FreeTierTracking).values({
      userId: userId,
      formsCreated: 1,
    });
  }
};
