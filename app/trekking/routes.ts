export type Difficulty = "Easy" | "Moderate" | "Hard";
export type Crowds = "Low" | "Medium" | "High";
export type Acclimatisation = "Weak" | "Medium" | "Strong";
export type Accommodation = "Huts" | "Camping" | "Mixed";

export type RouteData = {
  slug: string;
  label: string;
  days: number;
  nights: number;
  difficulty: Difficulty;
  crowds: Crowds;
  acclimatisation: Acclimatisation;
  accommodation: Accommodation;
  successRate: number;
  summary: string;
};

export const routes: RouteData[] = [
  {
    slug: "kilimanjaro-marangu-route",
    label: "7-Day Marangu Route",
    days: 7,
    nights: 6,
    difficulty: "Moderate",
    crowds: "High",
    acclimatisation: "Medium",
    accommodation: "Huts",
    successRate: 0.75,
    summary:
      "Hut-based Marangu ascent with summit push via Gilman's Point; ideal for climbers who prefer structured overnights.",
  },
  {
    slug: "6-day-umbwe-route-kilimanjaro-trek",
    label: "6-Day Umbwe Route",
    days: 6,
    nights: 5,
    difficulty: "Hard",
    crowds: "Low",
    acclimatisation: "Weak",
    accommodation: "Camping",
    successRate: 0.65,
    summary:
      "Direct, steep ascent via Umbwe ridge to Barafu for summit via Stella Point; best for experienced, fit climbers seeking a short route.",
  },
  {
    slug: "kilimanjaro-machame-route",
    label: "8-Day Machame Route",
    days: 8,
    nights: 7,
    difficulty: "Moderate",
    crowds: "High",
    acclimatisation: "Strong",
    accommodation: "Camping",
    successRate: 0.85,
    summary:
      "Scenic 'Whiskey Route' camping ascent via Shira, Barranco, and Barafu with varied terrain and strong acclimatization.",
  },
  {
    slug: "7-day-rongai-route-kilimanjaro-trek",
    label: "7-Day Rongai Route",
    days: 7,
    nights: 6,
    difficulty: "Moderate",
    crowds: "Medium",
    acclimatisation: "Strong",
    accommodation: "Mixed",
    successRate: 0.8,
    summary:
      "Northern approach through quiet forests and saddle to Kibo with descent via Marangu; great for fewer crowds and steady gradients.",
  },
  {
    slug: "kilimanjaro-lemosho-route",
    label: "9-Day Lemosho Route",
    days: 9,
    nights: 8,
    difficulty: "Moderate",
    crowds: "Medium",
    acclimatisation: "Strong",
    accommodation: "Camping",
    successRate: 0.9,
    summary:
      "Secluded western approach via Londorossi with rainforest start, Shira Plateau traverse, Barranco, and Barafu for a well-acclimatized summit.",
  },
  {
    slug: "kilimanjaro-machame-route-9-day",
    label: "9-Day Machame Route",
    days: 9,
    nights: 8,
    difficulty: "Moderate",
    crowds: "High",
    acclimatisation: "Strong",
    accommodation: "Camping",
    successRate: 0.88,
    summary:
      "Extended Whiskey Route adding Karanga camp and extra acclimatization before Barafu, with summit via Stella Point and descent to Mweka.",
  },
  {
    slug: "9-days-northern-circuit-route-kilimanjaro-trek",
    label: "9-Day Northern Circuit Route",
    days: 9,
    nights: 8,
    difficulty: "Moderate",
    crowds: "Low",
    acclimatisation: "Strong",
    accommodation: "Camping",
    successRate: 0.92,
    summary:
      "Wide western approach circling the northern flank for maximum acclimatization and remote camps before summiting via Gilman's or Stella Point.",
  },
];
