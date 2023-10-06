import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const id = req.query.eventId;
    const client = await clientPromise;
    const db = client.db("eventScheduler");

    const events = db.collection("events");
    const event = await events.findOne({ _id: ObjectId(id) });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
