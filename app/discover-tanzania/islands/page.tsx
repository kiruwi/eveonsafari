import IslandsGallery from "./IslandsGallery";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/discover-tanzania/islands", {
  title: "Islands | Eve On Safari",
  description: "Guide to Tanzania's islands and coastal escapes.",
});

const islandCards = [
  {
    name: "Zanzibar Island",
    description: "White-sand beaches, Stone Town culture, and easy safari beach extensions.",
    coverImage: "/islands photos/zanzibar/zanzibar1.webp",
    galleryImages: [
      "/islands photos/zanzibar/zanzibar2.webp",
      "/islands photos/zanzibar/zanzibar3.webp",
      "/islands photos/zanzibar/zanzibar4.webp",
      "/islands photos/zanzibar/zanzibar5.webp",
      "/islands photos/zanzibar/zanzibar6.webp",
      "/islands photos/zanzibar/zanzibar7.webp",
    ],
  },
  {
    name: "Pemba Island",
    description: "Lush, quiet island known for diving, reefs, and spice farming.",
    coverImage: "/islands photos/pemba island/pemba1.webp",
    galleryImages: [
      "/islands photos/pemba island/pemba2.webp",
      "/islands photos/pemba island/pemba3.webp",
      "/islands photos/pemba island/pemba4.webp",
      "/islands photos/pemba island/pemba5.webp",
    ],
  },
  {
    name: "Mnemba Island",
    description: "Private island with world-class snorkeling and vibrant marine life.",
    coverImage: "/islands photos/mnemba island/mnemba1.webp",
    galleryImages: [
      "/islands photos/mnemba island/mnemba2.webp",
      "/islands photos/mnemba island/mnemba3.webp",
      "/islands photos/mnemba island/mnemba4.webp",
      "/islands photos/mnemba island/mnemba5.webp",
    ],
  },
  {
    name: "Mafia Island",
    description: "Marine park with whale sharks, diving, and laid-back coastal villages.",
    coverImage: "/islands photos/mafia island/mafia1.webp",
    galleryImages: [
      "/islands photos/mafia island/mafia2.webp",
      "/islands photos/mafia island/mafia3.webp",
      "/islands photos/mafia island/mafia4.webp",
    ],
  },
  {
    name: "Fanjove Private Island",
    description: "Remote private island with turquoise lagoons and total seclusion.",
    coverImage: "/islands photos/Fanjove island/fanjove1.webp",
    galleryImages: [
      "/islands photos/Fanjove island/fanjove2.webp",
      "/islands photos/Fanjove island/fanjove3.webp",
      "/islands photos/Fanjove island/fanjove4.webp",
      "/islands photos/Fanjove island/fanjove5.webp",
    ],
  },
  {
    name: "Chumbe Island Coral Park",
    description: "Protected coral sanctuary with eco-lodges and reef conservation.",
    coverImage: "/islands photos/Chumbe island/chumbe1.webp",
    galleryImages: [
      "/islands photos/Chumbe island/chumbe2.webp",
      "/islands photos/Chumbe island/chumbe3.webp",
      "/islands photos/Chumbe island/chumbe4.webp",
      "/islands photos/Chumbe island/chumbe5.webp",
      "/islands photos/Chumbe island/chumbe6.webp",
    ],
  },
];

export default function IslandsPage() {
  return <IslandsGallery islands={islandCards} />;
}
