import ActivityTemplate from "@/app/activities/_components/ActivityTemplate";

export const metadata = {
  title: "Walking Safaris | Eve On Safari",
  description: "Guided walking safaris in select areas of northern Tanzania.",
};

export default function WalkingSafarisPage() {
  return (
    <ActivityTemplate
      category="Activity"
      title="Walking Safaris"
      description="Guided bush walks for a closer look at tracks, flora, and the smaller details you miss on a game drive."
      typeLabel="Safari add-on"
      duration="Half day (2 to 4 hours)"
      location="Select areas in northern Tanzania"
      whoItSuits="Active travelers, repeat safari guests, and photographers"
      price="Price on request"
      highlights={[
        "Led by certified guides and an armed ranger.",
        "Track reading and plant knowledge with local experts.",
        "Available in private concessions and selected parks.",
      ]}
    />
  );
}
