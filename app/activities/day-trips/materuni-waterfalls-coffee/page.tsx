import ActivityTemplate from "@/app/activities/_components/ActivityTemplate";

export const metadata = {
  title: "Materuni Waterfalls & Coffee Day Trip | Eve On Safari",
  description: "Waterfall hike and coffee experience in Materuni village near Moshi.",
};

export default function MateruniWaterfallsPage() {
  return (
    <ActivityTemplate
      category="Day Trip"
      title="Materuni Waterfalls & Coffee Tour"
      description="Hike to a lush waterfall and learn the full Chagga coffee process in Materuni village."
      typeLabel="Standalone activity or safari add-on"
      duration="Full day (6 to 8 hours)"
      location="Materuni village, near Moshi"
      whoItSuits="Active travelers, coffee lovers, and families"
      price="Price on request"
      highlights={[
        "Guided waterfall hike with local hosts.",
        "Hands-on coffee roasting and tasting.",
        "Short cultural visit with village insights.",
      ]}
    />
  );
}
