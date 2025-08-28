export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  weather: {
    temperature: number;
    condition: string;
    icon: string;
  };
  attractions: string[];
  bestTimeToVisit: string;
}

export interface Trip {
  id: string;
  name: string;
  cities: City[];
  createdAt: Date;
}

export const mockCities: City[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    description:
      "La Ville Lumière, célèbre pour son art, sa mode, sa gastronomie et sa culture.",
    image: "/paris-eiffel-cityscape.png",
    weather: {
      temperature: 18,
      condition: "Partiellement nuageux",
      icon: "⛅",
    },
    attractions: [
      "Tour Eiffel",
      "Musée du Louvre",
      "Cathédrale Notre-Dame",
      "Champs-Élysées",
    ],
    bestTimeToVisit: "Avril à juin, septembre à octobre",
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japon",
    description:
      "Une métropole animée mêlant culture traditionnelle et technologie de pointe.",
    image: "/tokyo-fuji-skyline.png",
    weather: {
      temperature: 22,
      condition: "Ensoleillé",
      icon: "☀️",
    },
    attractions: [
      "Temple Senso-ji",
      "Tokyo Skytree",
      "Carrefour de Shibuya",
      "Palais Impérial",
    ],
    bestTimeToVisit: "Mars à mai, septembre à novembre",
  },
  {
    id: "3",
    name: "New York",
    country: "États-Unis",
    description:
      "La Grande Pomme, centre mondial de la finance, des arts, de la mode et de la culture.",
    image: "/new-york-manhattan-skyline-central-park.png",
    weather: {
      temperature: 15,
      condition: "Pluvieux",
      icon: "🌧️",
    },
    attractions: [
      "Statue de la Liberté",
      "Central Park",
      "Times Square",
      "Pont de Brooklyn",
    ],
    bestTimeToVisit: "Avril à juin, septembre à novembre",
  },
  {
    id: "4",
    name: "Barcelone",
    country: "Espagne",
    description:
      "Une ville vibrante connue pour son art, son architecture et ses plages méditerranéennes.",
    image: "/barcelona-sagrada-familia-gothic-quarter.png",
    weather: {
      temperature: 24,
      condition: "Ensoleillé",
      icon: "☀️",
    },
    attractions: [
      "Sagrada Familia",
      "Parc Güell",
      "Las Ramblas",
      "Quartier Gothique",
    ],
    bestTimeToVisit: "Mai à septembre",
  },
  {
    id: "5",
    name: "Sydney",
    country: "Australie",
    description:
      "Ville portuaire célèbre pour son Opéra, ses plages et son style de vie décontracté.",
    image: "/sydney-opera-house-harbour-bridge.png",
    weather: {
      temperature: 20,
      condition: "Partiellement nuageux",
      icon: "⛅",
    },
    attractions: [
      "Opéra de Sydney",
      "Harbour Bridge",
      "Bondi Beach",
      "Jardins Botaniques Royaux",
    ],
    bestTimeToVisit: "Septembre à novembre, mars à mai",
  },
  {
    id: "6",
    name: "Londres",
    country: "Royaume-Uni",
    description:
      "Capitale historique avec des palais royaux, des musées de classe mondiale et des monuments emblématiques.",
    image: "/london-big-ben-thames-river-red-buses.png",
    weather: {
      temperature: 12,
      condition: "Nuageux",
      icon: "☁️",
    },
    attractions: [
      "Big Ben",
      "Tour de Londres",
      "British Museum",
      "Palais de Buckingham",
    ],
    bestTimeToVisit: "Mars à mai, septembre à novembre",
  },
];

export const mockTrips: Trip[] = [
  {
    id: "1",
    name: "Aventure Européenne",
    cities: [mockCities[0], mockCities[3]], // Paris and Barcelona
    createdAt: new Date("2024-01-15"),
  },
];
