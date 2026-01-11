import ActivityTemplate from "@/app/activities/_components/ActivityTemplate";

export const metadata = {
  title: "Chemka Hot Spring Day Trip | Eve On Safari",
  description: "Relaxing day trip to Chemka Hot Spring (Kikuletwa) for swimming and a picnic.",
};

export default function ChemkaHotSpringPage() {
  return (
    <ActivityTemplate
      category="Day Trip"
      title="Chemka Hot Spring Day Trip"
      description="A relaxed escape to a crystal-clear geothermal spring outside Arusha. Ideal for swimming and a slow afternoon."
      typeLabel="Standalone activity or safari add-on"
      duration="Half day to full day (4 to 6 hours from Arusha)"
      location="Chemka (Kikuletwa), Arusha region"
      whoItSuits="Families, swimmers, and travelers who want a low-impact day"
      price="Price on request"
      highlights={[
        "Crystal-clear spring with shaded areas for relaxing.",
        "Easy walking paths and picnic spots.",
        "Flexible timing for a morning or afternoon visit.",
      ]}
    />
  );
}
