import ActivityTemplate from "@/app/activities/_components/ActivityTemplate";

export const metadata = {
  title: "Lake Manyara Day Trip | Eve On Safari",
  description: "Full-day safari to Lake Manyara National Park for birdlife and forest wildlife.",
};

export default function LakeManyaraDayTripPage() {
  return (
    <ActivityTemplate
      category="Day Trip"
      title="Lake Manyara Day Trip"
      description="A full-day safari to Lake Manyara for escarpment views, forest wildlife, and birdlife."
      typeLabel="Standalone activity or safari add-on"
      duration="Full day (8 to 10 hours, early start)"
      location="Lake Manyara National Park"
      whoItSuits="Birders, photographers, and families"
      price="Price on request"
      highlights={[
        "Rift Valley escarpment views and lakeshore scenes.",
        "Chance to spot tree-climbing lions.",
        "Rich birdlife including flamingos in season.",
      ]}
    />
  );
}
