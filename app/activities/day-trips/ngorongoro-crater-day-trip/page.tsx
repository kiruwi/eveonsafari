import ActivityTemplate from "@/app/activities/_components/ActivityTemplate";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/activities/day-trips/ngorongoro-crater-day-trip", {
  title: "Ngorongoro Crater Day Trip | Eve On Safari",
  description: "Long day trip to the Ngorongoro Crater for Big Five wildlife viewing.",
});

export default function NgorongoroCraterDayTripPage() {
  return (
    <ActivityTemplate
      category="Day Trip"
      title="Ngorongoro Crater Day Trip"
      description="A full-day safari with crater descent for dense wildlife and Big Five viewing."
      typeLabel="Standalone activity or safari add-on"
      duration="Full day (10 to 12 hours, early start)"
      location="Ngorongoro Crater"
      whoItSuits="Wildlife enthusiasts, photographers, and tight schedules"
      price="Price on request"
      highlights={[
        "Crater floor game drives with high wildlife density.",
        "Picnic lunch inside the caldera.",
        "Excellent chances for rhino, lion, and elephant sightings.",
      ]}
    />
  );
}
