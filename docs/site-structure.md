1. Structure Overview

This file defines all content types, categories, subcategories, names, and slugs for Eve On Safari.
Use it for routing, menu generation, breadcrumbs, filters, and dynamic page creation.

2. Content Types

destination

package

trekking

day_trip

zanzibar

travel_style

guide

company

3. Taxonomy (CSV-Style Table in Markdown)
Destinations
type,category,subcategory,name,slug
destination,Northern,,Arusha National Park,arusha-national-park
destination,Northern,,Ngorongoro Crater,ngorongoro-crater
destination,Northern,,Serengeti National Park,serengeti-national-park
destination,Northern,,Kilimanjaro National Park,kilimanjaro-national-park
destination,Northern,,Tarangire National Park,tarangire-national-park
destination,Northern,,Mkomazi National Park,mkomazi-national-park
destination,Northern,,Mount Meru,mount-meru
destination,Northern,,Lake Manyara National Park,lake-manyara-national-park
destination,Northern,,Lake Natron,lake-natron
destination,Northern,,Lake Eyasi,lake-eyasi

destination,Southern,,Udzungwa Mountains,udzungwa-mountains
destination,Southern,,Rubondo Island,rubondo-island
destination,Southern,,Mikumi National Park,mikumi-national-park
destination,Southern,,Ruaha National Park,ruaha-national-park
destination,Southern,,Nyerere National Park,nyerere-national-park

destination,Western,,Mahale Mountains,mahale-mountains
destination,Western,,Gombe Stream,gombe-stream

destination,Eastern,,Bagamoyo,bagamoyo
destination,Eastern,,Zanzibar,zanzibar
destination,Eastern,,Saadani National Park,saadani-national-park

Safari Packages
type,category,subcategory,name,slug
package,Safari,2-3 Days,2 Days Ngorongoro Crater Adventure,2-day-ngorongoro-crater-adventure
package,Safari,3 Days,3 Days Manyara-Ngorongoro-Tarangire,3-day-manyara-ngorongoro-tarangire
package,Safari,3 Days,3 Days Quick Serengeti Escape,3-day-serengeti-escape
package,Safari,4 Days,4 Days Nyerere Safari,4-day-nyerere-safari
package,Safari,5 Days,5 Days Iconic Wildlife Adventure,5-day-iconic-wildlife-adventure
package,Safari,6 Days,6 Days Best of Northern Parks,6-day-best-northern-parks
package,Safari,7 Days,7 Days Northern Highlights,7-day-northern-highlights
package,Safari,8 Days,8 Days Migration & Cultural Wonders,8-day-migration-cultural-wonders
package,Safari,9 Days,9 Days Grand Tanzania Safari,9-day-grand-tanzania
package,Safari,10 Days,10 Days Best of Tanzania,10-day-best-of-tanzania

Trekking Packages
type,category,subcategory,name,slug
trekking,Kilimanjaro,Marangu Route,Marangu 6 Days,6-day-kilimanjaro-marangu
trekking,Kilimanjaro,Umbwe Route,Umbwe 6 Days,6-day-kilimanjaro-umbwe
trekking,Kilimanjaro,Machame Route,Machame 7 Days,7-day-kilimanjaro-machame
trekking,Kilimanjaro,Rongai Route,Rongai 7 Days,7-day-kilimanjaro-rongai
trekking,Kilimanjaro,Lemosho Route,Lemosho 8 Days,8-day-kilimanjaro-lemosho
trekking,Kilimanjaro,Northern Circuit,Northern Circuit 9 Days,9-day-kilimanjaro-northern-circuit
trekking,Mount Meru,,Meru 3 Days,3-day-mount-meru
trekking,Mount Meru,,Meru 4 Days,4-day-mount-meru

Day Trips
type,category,subcategory,name,slug
day_trip,Arusha Region,,Chemka Hot Spring,chemka-hot-spring
day_trip,Arusha Region,,Materuni Waterfalls & Coffee,materuni-waterfalls-coffee
day_trip,Arusha Region,,Arusha National Park Day Trip,arusha-day-trip
day_trip,Manyara Region,,Lake Manyara Day Trip,lake-manyara-day-trip
day_trip,Ngorongoro Region,,Ngorongoro Crater Day Trip,ngorongoro-crater-day-trip
day_trip,Tarangire Region,,Tarangire National Park Day Trip,tarangire-day-trip

Zanzibar Tours
type,category,subcategory,name,slug
zanzibar,Multi-Day,2 Days,Zanzibar 2 Days,zanzibar-2-days
zanzibar,Multi-Day,3 Days,Zanzibar 3 Days,zanzibar-3-days
zanzibar,Multi-Day,4 Days,Zanzibar 4 Days,zanzibar-4-days
zanzibar,Multi-Day,5 Days,Zanzibar 5 Days,zanzibar-5-days
zanzibar,Multi-Day,6 Days,Zanzibar 6 Days,zanzibar-6-days

Travel Style
type,category,subcategory,name,slug
travel_style,Interest,,Family Safaris,family-safaris
travel_style,Interest,,Big Five Safaris,big-five-safaris
travel_style,Interest,,Honeymoon Safaris,honeymoon-safaris
travel_style,Interest,,Migration Safaris,migration-safaris
travel_style,Interest,,Bird Watching Safaris,bird-watching-safaris
travel_style,Interest,,Walking Safaris,walking-safaris
travel_style,Interest,,Fly-in Safaris,fly-in-safaris
travel_style,Interest,,Photographic Safaris,photographic-safaris
travel_style,Interest,,Gorilla Trekking,gorilla-trekking
travel_style,Interest,,Beach Holidays,beach-holidays
travel_style,Interest,,Birthday & Party Experiences,birthday-party-trips

Guides
type,category,subcategory,name,slug
guide,Planning,,Safari Planning Guide,safari-planning-guide
guide,Planning,,Best Time to Visit,best-time-to-visit
guide,Planning,,Entry Requirements,entry-requirements
guide,Planning,,Tipping in Tanzania,tipping-guide
guide,Planning,,Safari FAQs,safari-faq
guide,Planning,,Gear Checklist,gear-checklist
guide,Planning,,Kilimanjaro Preparation,kilimanjaro-preparation

Company & Legal
type,category,subcategory,name,slug
company,About,,About Us,about
company,About,,Contact,contact
company,About,,Reviews,reviews
company,About,,Partners,partners
company,Legal,,Booking Conditions,booking-conditions
company,Legal,,Cancellation Policy,cancellation-policy
company,Legal,,Terms of Use,terms
company,Legal,,Privacy Policy,privacy-policy
company,Utility,,Blog,blog
company,Utility,,Sustainability,sustainability
company,Utility,,HTML Sitemap,sitemap

4. Suggested Folder / Route Structure

You can use this pattern in Next.js, Laravel, or WordPress headless.

/destinations/[circuit]/[slug]
/safaris/[days]/[slug]
/trekking/kilimanjaro/[route]/[slug]
/day-trips/[region]/[slug]
/zanzibar/[days]/[slug]
/travel-style/[slug]
/guides/[slug]
/company/[slug]