export type ParkCardData = {
  name: string;
  slug: string;
  tag: string;
  shortDescription: string;
  fullDescription: string;
  displayImage?: string;
  detailImage?: string;
  galleryImages?: string[];
};

export const parkCards: ParkCardData[] = [
  {
    name: "Serengeti National Park",
    slug: "serengeti-national-park",
    tag: "Northern Circuit",
    shortDescription:
      "Africa's iconic endless plains, famous for the Great Migration and exceptional year-round wildlife.",
    fullDescription:
      "Serengeti National Park is widely recognized as Africa's most renowned wildlife reserve, largely because it hosts the continent's greatest concentration of wild animals and the spectacular migration of millions of wildebeest. Many of the world's most striking wildlife documentaries have been filmed within this remarkable landscape. The name \"Serengeti\" is derived from the Maasai language and translates to \"endless plains,\" an accurate reflection of its vast scenery. Covering nearly 15,000 square kilometers (6,000 square miles), it ranks as the second-largest national park in Tanzania.",
    displayImage: "/national%20parks%20photos/serengeti/beasts.webp",
    galleryImages: [
      "/national%20parks%20photos/serengeti/beasts.webp",
      "/national%20parks%20photos/serengeti/cheetah.webp",
      "/national%20parks%20photos/serengeti/lion.webp",
    ],
  },
  {
    name: "Ngorongoro Conservation Area",
    slug: "ngorongoro-conservation-area",
    tag: "Northern Circuit",
    shortDescription:
      "A vast conservation area with the world-famous crater, volcanic landscapes, and rich wildlife diversity.",
    fullDescription:
      "The Ngorongoro Conservation Area stretches from Serengeti National Park in the north to the Great Rift Valley in the east. Altogether, it encompasses more than 8,000 square kilometers (3,200 square miles). The area includes notable landmarks such as Ngorongoro Crater, Ndutu, Olduvai Gorge, Empakaai Crater, Olmoti Crater, and Oldonyo Lengai. Its varied landscapes, ranging from woodlands and valleys to open savannas, volcanic craters, lakes, and wetlands, support a rich diversity of wildlife.",
    displayImage: "/national%20parks%20photos/ngorongoro/elephants.webp",
    galleryImages: [
      "/national%20parks%20photos/ngorongoro/elephants.webp",
      "/national%20parks%20photos/ngorongoro/flamingos.webp",
      "/national%20parks%20photos/ngorongoro/monkeys.webp",
      "/national%20parks%20photos/ngorongoro/rhinos.webp",
      "/national%20parks%20photos/ngorongoro/zebra.webp",
    ],
  },
  {
    name: "Mount Kilimanjaro",
    slug: "mount-kilimanjaro",
    tag: "Highlands",
    shortDescription:
      "Africa's highest mountain, with dramatic ecological zones and world-famous summit trekking routes.",
    fullDescription:
      "Mount Kilimanjaro National Park protects Africa's highest peak at 5,895 meters (19,341 feet) and one of the world's most iconic free-standing volcanic massifs. The mountain's three volcanic cones, Kibo, Mawenzi, and Shira, rise in isolation above the surrounding plains and create one of Tanzania's most recognizable landscapes. UNESCO inscribed Kilimanjaro as a World Heritage Site in 1987, recognizing both its exceptional scenery and ecological importance. As you ascend the mountain, ecosystems shift dramatically from montane forest to heath and moorland, alpine desert, and the summit zone. In addition to climbing, the park is important for biodiversity and water catchment, making Kilimanjaro both an adventure destination and a vital conservation landscape.",
    displayImage: "/national%20parks%20photos/kilimanjaro/mountain.webp",
    galleryImages: [
      "/national%20parks%20photos/kilimanjaro/mountain.webp",
      "/national%20parks%20photos/kilimanjaro/kilimanaro.webp",
      "/national%20parks%20photos/kilimanjaro/kilimanaro%201.webp",
      "/national%20parks%20photos/kilimanjaro/shrubs.webp",
      "/national%20parks%20photos/kilimanjaro/elephant.webp",
    ],
  },
  {
    name: "Mikumi National Park",
    slug: "mikumi-national-park",
    tag: "Southern Circuit",
    shortDescription:
      "One of Tanzania's most accessible safari parks, known for open plains, baobabs, and diverse wildlife.",
    fullDescription:
      "Mikumi National Park lies about 300 kilometers west of Dar es Salaam along the Dar-Mbeya highway, making it one of the most accessible safari destinations in Tanzania. Its broad plains, scenic baobabs, and southern miombo woodlands create varied habitats for both mammals and birdlife. The park is known for strong wildlife viewing and for species that are less commonly seen in other northern parks, including sable antelope, African wild dog, and Lichtenstein's hartebeest. Lions, elephants, buffalo, zebra, and many other species are also regularly encountered across the park. Because of its location and easy logistics, Mikumi works especially well for short safaris, first-time visitors, and southern circuit combinations.",
    displayImage: "/national%20parks%20photos/mikumi/elephants.webp",
    galleryImages: [
      "/national%20parks%20photos/mikumi/elephants.webp",
      "/national%20parks%20photos/mikumi/lions.webp",
      "/national%20parks%20photos/mikumi/leopards.webp",
      "/national%20parks%20photos/mikumi/buffalo.webp",
      "/national%20parks%20photos/mikumi/birds.webp",
    ],
  },
  {
    name: "Tarangire National Park",
    slug: "tarangire-national-park",
    tag: "Northern Circuit",
    shortDescription:
      "Known for giant elephant herds, baobab-dotted savannas, and strong dry-season wildlife viewing.",
    fullDescription:
      "Tarangire National Park is located in northern Tanzania and is best known for its vast elephant herds and iconic baobab trees. The park is named after the Tarangire River, which serves as a vital water source for wildlife, especially during the dry season. As surrounding areas become dry, large numbers of animals migrate into the park in search of water. The landscape is characterized by rolling savannas, acacia woodlands, seasonal swamps, and scattered rocky hills. Tarangire supports a wide variety of wildlife, including lions, leopards, giraffes, zebras, wildebeest, and buffalo. It is also a haven for birdlife, with hundreds of recorded species. Compared to some of Tanzania's more famous parks, Tarangire is often less crowded, offering a quieter safari experience. Overall, it provides a striking combination of dramatic scenery, rich biodiversity, and impressive concentrations of elephants.",
    displayImage: "/national%20parks%20photos/tarangire/river.webp",
    galleryImages: [
      "/national%20parks%20photos/tarangire/river.webp",
      "/national%20parks%20photos/tarangire/river2.webp",
      "/national%20parks%20photos/tarangire/lioness.webp",
      "/national%20parks%20photos/tarangire/ostrich.webp",
    ],
  },
  {
    name: "Lake Manyara National Park",
    slug: "lake-manyara-national-park",
    tag: "Northern Circuit",
    shortDescription:
      "A compact park with diverse habitats, tree-climbing lions, and outstanding birdlife by the lake.",
    fullDescription:
      "Lake Manyara National Park is located in northern Tanzania between the Great Rift Valley escarpment and Lake Manyara. Despite its relatively small size, the park features a remarkable range of habitats within a compact area. Visitors can explore groundwater forests, open grasslands, acacia woodlands, swamps, and the shallow alkaline lake. The park is especially known for its unusual tree-climbing lions. Large troops of baboons and herds of elephants are commonly seen throughout the area. The lake attracts thousands of flamingos and many other bird species, making it a popular spot for birdwatching. Its scenery shifts dramatically from dense forest to open plains backed by the towering Rift Valley wall. Altogether, the park offers a rich combination of wildlife, birdlife, and striking landscapes.",
    displayImage: "/national%20parks%20photos/manyara/track.webp",
    galleryImages: [
      "/national%20parks%20photos/manyara/track.webp",
      "/national%20parks%20photos/manyara/elephant.webp",
      "/national%20parks%20photos/manyara/birds.webp",
      "/national%20parks%20photos/manyara/buffalo.webp",
      "/national%20parks%20photos/manyara/tourist.webp",
    ],
  },
  {
    name: "Makuyuni Wildlife Park",
    slug: "makuyuni-wildlife-park",
    tag: "Northern Circuit",
    shortDescription:
      "An emerging, easily accessible wildlife park near Arusha with strong game viewing and cultural add-ons.",
    fullDescription:
      "Makuyuni Wildlife Park is an emerging conservation destination in Monduli District, managed by the Tanzania Wildlife Management Authority (TAWA). Located about 40 kilometers from Arusha City, it is being developed as a strategic and easily accessible park where visitors can enjoy wildlife viewing even on shorter itineraries. The area supports species such as elephants, lions, giraffes, cheetahs, zebras, buffalo, and antelopes, while nearby Maasai communities provide opportunities for cultural tourism experiences. Recent investment in roads and water infrastructure has improved year-round access and wildlife support. As development continues, Makuyuni is becoming an increasingly practical add-on for northern circuit travelers.",
    displayImage: "/national%20parks%20photos/makuyuni/giraffe2.webp",
    galleryImages: [
      "/national%20parks%20photos/makuyuni/giraffe2.webp",
      "/national%20parks%20photos/makuyuni/hyena.webp",
      "/national%20parks%20photos/makuyuni/croc.webp",
      "/national%20parks%20photos/makuyuni/monkey.webp",
    ],
  },
  {
    name: "Lake Natron",
    slug: "lake-natron",
    tag: "Lakes & Rift Valley",
    shortDescription:
      "A dramatic Rift Valley soda lake and critical flamingo habitat with striking volcanic desert scenery.",
    fullDescription:
      "Lake Natron lies in northern Tanzania's Great Rift Valley near the Kenyan border and is one of East Africa's most distinctive soda-lake landscapes. The Lake Natron Basin was designated as a Ramsar Wetland of International Importance in 2001 and covers about 224,781 hectares, reflecting its high ecological value. Its shallow, highly alkaline waters, salt flats, and surrounding volcanic terrain create a rare environment that supports specially adapted life forms. The basin is globally recognized for lesser flamingos and is considered the only regular breeding site for the species in East Africa. Beyond birdlife, Natron offers an unforgettable sense of remoteness, stark beauty, and conservation significance.",
    displayImage: "/national%20parks%20photos/natron/natron.webp",
    galleryImages: [
      "/national%20parks%20photos/natron/natron.webp",
      "/national%20parks%20photos/natron/lake.webp",
    ],
  },
  {
    name: "Arusha National Park",
    slug: "arusha-national-park",
    tag: "Northern Circuit",
    shortDescription:
      "A compact, scenic park around Mount Meru with forests, crater landscapes, lakes, and active safaris.",
    fullDescription:
      "Arusha National Park is a compact but remarkably varied park centered on Mount Meru, which rises to 4,566 meters and dominates the skyline west of Arusha city. Within a relatively small area, the landscape shifts from montane forest and open grasslands to crater scenery and the Momella Lakes, which are important stopovers for many bird species. The park is especially well-suited to active experiences such as walking safaris and canoeing, offering a different rhythm from classic vehicle-only game drives. Wildlife commonly seen includes giraffes, buffalo, zebra, warthogs, and a range of primates and birds. Because of its proximity to Arusha, it works exceptionally well as a first safari stop, a final-day outing, or a shorter stand-alone wildlife experience.",
    displayImage: "/national%20parks%20photos/arusha/grassland.webp",
    galleryImages: [
      "/national%20parks%20photos/arusha/grassland.webp",
      "/national%20parks%20photos/arusha/elephant.webp",
      "/national%20parks%20photos/arusha/giraffe.webp",
      "/national%20parks%20photos/arusha/buffalo.webp",
    ],
  },
  {
    name: "Ndutu Region",
    slug: "ndutu-region",
    tag: "Migration Areas",
    shortDescription:
      "Southern migration stronghold known for calving season, predator action, and wide short-grass plains.",
    fullDescription:
      "The Ndutu Region sits on the southern edge of the Serengeti ecosystem, spanning plains around Lake Ndutu and Lake Masek within and around the Ngorongoro Conservation Area. It is one of the most important seasonal stages of the Great Migration, especially from December through April when large herds of wildebeest and zebra concentrate here. During this period, calving peaks and predator activity intensifies, with strong sightings of lion, cheetah, leopard, and hyena. Ndutu remains productive outside peak migration months as well, with resident game and open landscapes that are excellent for photography. Its mix of plains, marshes, woodland, and soda-lake scenery makes it one of northern Tanzania's most dynamic wildlife areas.",
    displayImage: "/national%20parks%20photos/ndutu/beast.webp",
    galleryImages: [
      "/national%20parks%20photos/ndutu/beast.webp",
      "/national%20parks%20photos/ndutu/cheetah.webp",
      "/national%20parks%20photos/ndutu/cheetahs.webp",
      "/national%20parks%20photos/ndutu/lion.webp",
      "/national%20parks%20photos/ndutu/lioness.webp",
    ],
  },
  {
    name: "Nyerere National Park",
    slug: "nyerere-national-park",
    tag: "Southern Circuit",
    shortDescription:
      "Africa's largest national park, offering big wilderness, Rufiji River safaris, and lower crowd levels.",
    fullDescription:
      "Nyerere National Park, established in 2019 from part of the former Selous ecosystem, is now the largest national park in Africa at over 30,000 square kilometers. Named after Tanzania's founding president Julius Nyerere, it protects one of the continent's most extensive wilderness landscapes and relatively undisturbed ecological processes. The Rufiji River and its channels are the heart of the park, supporting hippos, crocodiles, abundant birdlife, and excellent water-based wildlife viewing. Nyerere is also known for strong populations of elephant, buffalo, lion, and African wild dog within the wider ecosystem. Unlike many northern parks, it is famous for combining classic game drives with boat safaris, walking safaris, and fly-camping. The result is a remote, immersive safari experience with broad scenery and fewer vehicles.",
    displayImage: "/national%20parks%20photos/nyerere/elephant.webp",
    galleryImages: [
      "/national%20parks%20photos/nyerere/elephant.webp",
      "/national%20parks%20photos/nyerere/giraffe.webp",
      "/national%20parks%20photos/nyerere/lion.webp",
      "/national%20parks%20photos/nyerere/lioness.webp",
    ],
  },
];

export function getParkBySlug(slug: string) {
  return parkCards.find((park) => park.slug === slug);
}
