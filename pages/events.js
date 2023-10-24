import clientPromise from "../lib/mongodb";
import moment from "moment";

export default function PlannedEvents({ events }) {
  return (
    <div>
      <h1>Current Events</h1>
      <ul>
        {events.map((event) => (
          <li>
            <h2>{event.eventType}</h2>
            <h3>{moment(event.eventDate).format("Do MMM YYYY")}</h3>
            {event.attendees.map((attendee) => (
              <ul>
                <li>{attendee}</li>
              </ul>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("eventScheduler");

    const events = await db.collection("events").find({}).limit(20).toArray();

    return {
      props: { events: JSON.parse(JSON.stringify(events)) },
    };
  } catch (e) {
    console.error(e);
  }
}
