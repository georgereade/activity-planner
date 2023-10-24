import Head from "next/head";
import PlannedEvents from "./events";
import clientPromise from "../lib/mongodb";

export default function Home({ events }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PlannedEvents events={events} />
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
