const packages = [
  {
    id: "mysore-ooty",
    name: "Mysore & Ooty",
    location: "Karnataka & Tamil Nadu",
    image: "/images/tour-mysore.jpg",
    route: "Mysore → Ooty",
    type: "Cities & hill stations",
    categories: ["family", "school-college"],
    duration: { days: 4, nights: 3 },
    overview:
      "A journey combining Mysore's royal heritage with the scenic hill landscapes of Ooty.",
    highlights: [
      "Explore Mysore's royal heritage",
      "Discover the Nilgiri hill landscapes",
      "Visit Ooty's gardens and lake",
      "Enjoy a mix of culture and nature",
    ],
    itinerary: [
      {
        day: 1,
        title: "Discover royal Mysore",
        description:
          "Arrive in Mysore and explore its historic landmarks and royal architecture.",
        stops: ["Mysore Palace", "Mysore city exploration"],
      },
      {
        day: 2,
        title: "Journey to the hills",
        description:
          "Travel towards Ooty and enjoy the changing landscapes along the route.",
        stops: ["Road journey to Ooty", "Ooty town"],
      },
      {
        day: 3,
        title: "A day in Ooty",
        description:
          "Explore the hill station's gardens, lake and scenic viewpoints.",
        stops: ["Ooty Lake", "Government Botanical Garden", "Doddabetta viewpoint"],
      },
      {
        day: 4,
        title: "Departure",
        description:
          "Enjoy breakfast and depart according to your onward travel arrangements.",
        stops: ["Hotel checkout", "Departure"],
      },
    ],
    accommodation: {
      type: "Hotel stay",
      locations: ["Mysore", "Ooty"],
      description:
        "Hotel accommodation can be arranged in both destinations according to the selected package and group requirements.",
    },
    transport: {
      type: "Road transport",
      description:
        "Intercity transfers and local sightseeing transport can be arranged according to the final itinerary.",
    },
    experiences: [
      "Heritage sightseeing",
      "Hill-station exploration",
      "Garden visits",
      "Scenic viewpoints",
    ],
    inclusions: [
      "Accommodation arrangements",
      "Transportation arrangements",
      "Sightseeing as per the confirmed itinerary",
    ],
    exclusions: [
      "Personal expenses",
      "Meals not specified in the final quote",
      "Entry tickets unless specifically included",
      "Travel insurance",
    ],
    pricing: {
      status: "quote-required",
      currency: "INR",
      startingPrice: null,
      note:
        "The final quote depends on travel dates, group size, accommodation and transport arrangements.",
    },
    booking: {
      mode: "request",
      confirmation:
        "A trip request is not a confirmed reservation. Dates, arrangements and availability must be verified.",
    },
  },

  {
    id: "munnar-alleppey-kochi",
    name: "Munnar, Alleppey & Kochi",
    location: "Kerala",
    image: "/images/tour-alleppey.jpg",
    route: "Munnar → Alleppey → Kochi",
    type: "Kerala getaway",
    categories: ["family", "honeymoon"],
    duration: { days: 5, nights: 4 },
    overview:
      "A varied Kerala journey through tea-covered hills, peaceful backwaters and the historic coastal city of Kochi.",
    highlights: [
      "Explore Munnar's tea country",
      "Experience Kerala's backwater landscapes",
      "Discover Kochi's historic streets",
      "Combine hills, water and culture",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Munnar",
        description:
          "Arrive in Munnar and explore the surrounding hill landscapes.",
        stops: ["Arrival and transfer", "Munnar town"],
      },
      {
        day: 2,
        title: "Munnar tea country",
        description:
          "Spend the day exploring tea-growing landscapes and scenic viewpoints.",
        stops: ["Tea plantation viewpoints", "Tea Museum area", "Scenic viewpoints"],
      },
      {
        day: 3,
        title: "Journey to Alleppey",
        description:
          "Travel towards Alleppey and discover the region's famous backwater setting.",
        stops: ["Transfer to Alleppey", "Backwater experience"],
      },
      {
        day: 4,
        title: "Explore Kochi",
        description:
          "Continue to Kochi for a day of coastal heritage and local exploration.",
        stops: ["Fort Kochi", "Chinese fishing nets area", "Historic streets"],
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Complete checkout and depart according to your onward travel plan.",
        stops: ["Checkout", "Departure"],
      },
    ],
    accommodation: {
      type: "Hotel and optional backwater stay",
      locations: ["Munnar", "Alleppey", "Kochi"],
      description:
        "Accommodation can be arranged across the route. A houseboat stay may be considered as an optional upgrade, subject to availability and final quote.",
    },
    transport: {
      type: "Private road transfers",
      description:
        "Road transfers between destinations and local sightseeing transport can be arranged as part of the final plan.",
    },
    experiences: [
      "Tea plantation exploration",
      "Hill viewpoints",
      "Backwater experience",
      "Fort Kochi heritage walk",
    ],
    inclusions: [
      "Accommodation arrangements",
      "Intercity transport arrangements",
      "Sightseeing as per confirmed itinerary",
    ],
    exclusions: [
      "Personal expenses",
      "Optional houseboat upgrades unless included",
      "Meals not specified in the final quote",
      "Entry tickets unless specifically included",
    ],
    pricing: {
      status: "quote-required",
      currency: "INR",
      startingPrice: null,
      note:
        "Pricing depends on the accommodation category, travel season, group size and selected backwater experience.",
    },
    booking: {
      mode: "request",
      confirmation:
        "A trip request is not a confirmed reservation. Accommodation and activity availability must be verified.",
    },
  },

  {
    id: "raj-se-taj-tak",
    name: "Raj se Taj Tak",
    location: "North India",
    image: "/images/tour-jaipur.jpg",
    route: "Jaipur → Agra",
    type: "Heritage tour",
    categories: ["family", "school-college"],
    duration: { days: 4, nights: 3 },
    overview:
      "A proposed North Indian heritage journey connecting Jaipur's royal landmarks with Agra's celebrated Mughal architecture.",
    highlights: [
      "Discover Jaipur's historic forts and palaces",
      "Explore the Pink City's architecture",
      "Visit the Taj Mahal",
      "Experience two distinctive heritage cities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Jaipur",
        description:
          "Arrive in Jaipur and explore the city's historic centre.",
        stops: ["Arrival", "Hawa Mahal area", "Local market exploration"],
      },
      {
        day: 2,
        title: "The royal side of Jaipur",
        description:
          "Explore Jaipur's fort and palace heritage.",
        stops: ["Amber Fort", "City Palace area", "Jantar Mantar"],
      },
      {
        day: 3,
        title: "Journey to Agra",
        description:
          "Travel to Agra and explore its Mughal-era heritage.",
        stops: ["Transfer to Agra", "Agra Fort"],
      },
      {
        day: 4,
        title: "The Taj Mahal and departure",
        description:
          "Visit the Taj Mahal according to opening hours and travel arrangements, then depart.",
        stops: ["Taj Mahal", "Departure"],
      },
    ],
    accommodation: {
      type: "Hotel stay",
      locations: ["Jaipur", "Agra"],
      description:
        "Hotel stays can be arranged in both cities based on the selected accommodation category.",
    },
    transport: {
      type: "Intercity road transport",
      description:
        "Jaipur–Agra transfers and local sightseeing transport can be arranged in the final itinerary.",
    },
    experiences: [
      "Fort and palace sightseeing",
      "Historic city exploration",
      "Mughal architecture",
      "Local market visits",
    ],
    inclusions: [
      "Accommodation arrangements",
      "Intercity transport arrangements",
      "Sightseeing as per confirmed itinerary",
    ],
    exclusions: [
      "Personal expenses",
      "Monument entry tickets unless included",
      "Meals not specified in the final quote",
      "Travel insurance",
    ],
    pricing: {
      status: "quote-required",
      currency: "INR",
      startingPrice: null,
      note:
        "The proposed route and pricing must be finalised according to travel dates, group size and transport requirements.",
    },
    booking: {
      mode: "request",
      confirmation:
        "This is a proposed route based on the package name. The final route and arrangements require confirmation.",
    },
  },

  {
    id: "goa-dandeli",
    name: "Goa & Dandeli",
    location: "Goa & Karnataka",
    image: "/images/tour-goa.jpg",
    route: "Goa → Dandeli",
    type: "Coast & nature",
    categories: ["family", "corporate-group"],
    duration: { days: 5, nights: 4 },
    overview:
      "A proposed combination of Goa's coastal atmosphere and Dandeli's forest and river landscapes.",
    highlights: [
      "Explore Goa's beaches",
      "Discover coastal heritage",
      "Experience Dandeli's forest surroundings",
      "Choose optional outdoor activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Goa",
        description:
          "Arrive in Goa and settle into your accommodation before exploring nearby areas.",
        stops: ["Arrival", "Beachside exploration"],
      },
      {
        day: 2,
        title: "Discover Goa",
        description:
          "Explore selected beaches and heritage landmarks.",
        stops: ["Beach visit", "Old Goa heritage area"],
      },
      {
        day: 3,
        title: "Journey to Dandeli",
        description:
          "Travel inland towards Dandeli and enjoy the forest surroundings.",
        stops: ["Transfer to Dandeli", "Local exploration"],
      },
      {
        day: 4,
        title: "Dandeli nature day",
        description:
          "Explore the natural landscape and choose activities according to availability and suitability.",
        stops: ["Kali River surroundings", "Optional guided nature activities"],
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Complete checkout and depart according to your onward travel plan.",
        stops: ["Checkout", "Departure"],
      },
    ],
    accommodation: {
      type: "Hotel and nature stay",
      locations: ["Goa", "Dandeli"],
      description:
        "Accommodation options can be arranged in both destinations according to the group and selected package.",
    },
    transport: {
      type: "Road transport",
      description:
        "Intercity transfers and local sightseeing transport can be arranged according to the confirmed route.",
    },
    experiences: [
      "Beach exploration",
      "Coastal heritage sightseeing",
      "Forest surroundings",
      "Optional guided outdoor activities",
    ],
    inclusions: [
      "Accommodation arrangements",
      "Transportation arrangements",
      "Sightseeing as per confirmed itinerary",
    ],
    exclusions: [
      "Personal expenses",
      "Optional adventure activities unless included",
      "Meals not specified in the final quote",
      "Travel insurance",
    ],
    pricing: {
      status: "quote-required",
      currency: "INR",
      startingPrice: null,
      note:
        "Pricing depends on travel dates, group size, accommodation and selected activities.",
    },
    booking: {
      mode: "request",
      confirmation:
        "Outdoor activities and accommodation require availability and suitability checks before confirmation.",
    },
  },

  {
    id: "nandi-hills-isha-temple",
    name: "Nandi Hills & Isha Temple",
    location: "Karnataka",
    image: "/images/package-nandi-hills.jpg",
    route: "Nandi Hills → Isha Temple",
    type: "Day outing",
    categories: ["weekend", "school-college", "corporate-group"],
    duration: { days: 1, nights: 0 },
    overview:
      "A proposed day outing combining a hill-country visit with a spiritual and cultural destination.",
    highlights: [
      "Explore Nandi Hills",
      "Enjoy scenic hill views",
      "Visit the Isha Yoga Center area",
      "A compact outing for groups",
    ],
    itinerary: [
      {
        day: 1,
        title: "A day of exploration",
        description:
          "Begin with the Nandi Hills visit, followed by onward travel towards the Isha Yoga Center area.",
        stops: ["Nandi Hills", "Travel towards Coimbatore", "Isha Yoga Center area"],
      },
    ],
    accommodation: {
      type: "No overnight stay",
      locations: [],
      description:
        "This is structured as a day outing. Overnight accommodation is not included in the proposed plan.",
    },
    transport: {
      type: "Group road transport",
      description:
        "A suitable vehicle and route would need to be arranged after confirming the departure city. The proposed destinations involve substantial intercity travel.",
    },
    experiences: [
      "Hill sightseeing",
      "Scenic viewpoints",
      "Cultural and spiritual destination visit",
    ],
    inclusions: [
      "Group transport arrangements",
      "Sightseeing as per confirmed itinerary",
    ],
    exclusions: [
      "Personal expenses",
      "Meals unless specified",
      "Entry or activity fees unless included",
    ],
    pricing: {
      status: "quote-required",
      currency: "INR",
      startingPrice: null,
      note:
        "The departure city and feasibility of this route must be confirmed before a final price can be quoted.",
    },
    booking: {
      mode: "request",
      confirmation:
        "The route and travel duration require verification before this outing can be offered as a confirmed trip.",
    },
  },

  {
    id: "hampi-pattadakal",
    name: "Hampi & Pattadakal",
    location: "Karnataka",
    image: "/images/tour-hampi.jpg",
    route: "Hampi → Pattadakal",
    type: "Heritage tour",
    categories: ["family", "school-college"],
    duration: { days: 4, nights: 3 },
    overview:
      "A heritage-focused journey through the remarkable temple architecture and historic landscapes of Hampi and Pattadakal.",
    highlights: [
      "Explore Hampi's historic monuments",
      "Discover the stone chariot and temple complexes",
      "Visit Pattadakal's heritage monuments",
      "Experience Karnataka's architectural history",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Hampi",
        description:
          "Arrive in the Hampi region and explore the surrounding heritage landscape.",
        stops: ["Arrival", "Local exploration"],
      },
      {
        day: 2,
        title: "Explore Hampi",
        description:
          "Spend the day discovering Hampi's historic monuments and temple complexes.",
        stops: ["Virupaksha Temple area", "Stone Chariot", "Vijaya Vittala Temple complex"],
      },
      {
        day: 3,
        title: "Pattadakal heritage",
        description:
          "Travel towards Pattadakal and explore its celebrated temple architecture.",
        stops: ["Pattadakal monuments", "Aihole area, if included in final route"],
      },
      {
        day: 4,
        title: "Departure",
        description:
          "Complete checkout and depart according to the onward travel arrangements.",
        stops: ["Checkout", "Departure"],
      },
    ],
    accommodation: {
      type: "Hotel stay",
      locations: ["Hampi region"],
      description:
        "Accommodation can be arranged near the selected sightseeing route according to the final itinerary.",
    },
    transport: {
      type: "Road transport",
      description:
        "Intercity and local sightseeing transfers can be arranged based on the final route and group size.",
    },
    experiences: [
      "Temple architecture",
      "Historic monument exploration",
      "Heritage sightseeing",
      "Cultural exploration",
    ],
    inclusions: [
      "Accommodation arrangements",
      "Transportation arrangements",
      "Sightseeing as per confirmed itinerary",
    ],
    exclusions: [
      "Personal expenses",
      "Monument entry tickets unless included",
      "Meals not specified in the final quote",
      "Travel insurance",
    ],
    pricing: {
      status: "quote-required",
      currency: "INR",
      startingPrice: null,
      note:
        "The final quote depends on the travel dates, group size, accommodation and transport arrangements.",
    },
    booking: {
      mode: "request",
      confirmation:
        "A trip request is not a confirmed reservation. The final route and arrangements must be verified.",
    },
  },
];

export { packages };