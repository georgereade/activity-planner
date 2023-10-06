import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("eventScheduler");

    const events = await db
      .collection("events")
      .find({})
      //   .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    res.json(events);
  } catch (e) {
    console.error(e);
  }
};
