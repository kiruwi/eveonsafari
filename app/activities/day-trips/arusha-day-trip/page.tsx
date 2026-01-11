import ActivityTemplate from "@/app/activities/_components/ActivityTemplate";

export const metadata = {
  title: "Arusha National Park Day Trip | Eve On Safari",
  description: "Full-day safari in Arusha National Park with game viewing and scenic lakes.",
};

export default function ArushaDayTripPage() {
  return (
    <ActivityTemplate
      category="Day Trip"
      title="Arusha National Park Day Trip"
      description="A compact safari close to Arusha with giraffes, buffalo, and scenic lake views."
      typeLabel="Standalone activity or safari add-on"
      duration="Full day (6 to 8 hours)"
      location="Arusha National Park"
      whoItSuits="First-time safari visitors, families, and short stays"
      price="Price on request"
      highlights={[
        "Game drives with giraffes, buffalo, and colobus monkeys.",
        "Views of Mount Meru and Momella lakes.",
        "Optional walking or canoeing when available.",
      ]}
    />
  );
}
