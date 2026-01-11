import ActivityTemplate from "@/app/activities/_components/ActivityTemplate";

export const metadata = {
  title: "Tarangire Day Trip | Eve On Safari",
  description: "Full-day safari to Tarangire National Park for elephant herds and baobabs.",
};

export default function TarangireDayTripPage() {
  return (
    <ActivityTemplate
      category="Day Trip"
      title="Tarangire Day Trip"
      description="Spend the day among Tarangire's elephants, baobabs, and river wildlife."
      typeLabel="Standalone activity or safari add-on"
      duration="Full day (8 to 10 hours, early start)"
      location="Tarangire National Park"
      whoItSuits="Elephant lovers, families, and classic wildlife fans"
      price="Price on request"
      highlights={[
        "Large elephant herds and iconic baobab landscapes.",
        "Game drives along the Tarangire River.",
        "Strong chances for lions, giraffes, and zebra.",
      ]}
    />
  );
}
