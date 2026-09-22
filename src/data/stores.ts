export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  type: string;
}

export const STORES: StoreLocation[] = [
  {
    id: "store-atlanta-flagship",
    name: "World of Refreshment Flagship",
    address: "121 Baker Street NW",
    city: "Atlanta, GA 30313",
    lat: 33.7628,
    lng: -84.3929,
    phone: "(404) 676-5151",
    hours: "Mon - Sun: 9:00 AM – 9:00 PM",
    type: "Flagship Experience Store",
  },
  {
    id: "store-times-square",
    name: "Times Square Celebration Hub",
    address: "1540 Broadway Avenue",
    city: "New York, NY 10036",
    lat: 40.7589,
    lng: -73.9851,
    phone: "(212) 354-2653",
    hours: "Mon - Sun: 10:00 AM – 11:00 PM",
    type: "Urban Showcase Store",
  },
  {
    id: "store-las-vegas-strip",
    name: "Las Vegas Strip Oasis",
    address: "3785 S Las Vegas Blvd",
    city: "Las Vegas, NV 89109",
    lat: 36.1044,
    lng: -115.1728,
    phone: "(702) 270-5965",
    hours: "Mon - Sun: 10:00 AM – 10:00 PM",
    type: "Immersive Tasting Lounge",
  },
  {
    id: "store-chicago-magmile",
    name: "Magnificent Mile Experience",
    address: "600 N Michigan Avenue",
    city: "Chicago, IL 60611",
    lat: 41.8929,
    lng: -87.6244,
    phone: "(312) 867-1886",
    hours: "Mon - Sat: 10:00 AM – 8:00 PM, Sun: 11:00 AM – 6:00 PM",
    type: "Boutique & Merchandise",
  },
  {
    id: "store-orlando-springs",
    name: "Disney Springs Rooftop Pavilion",
    address: "1520 E Buena Vista Dr",
    city: "Lake Buena Vista, FL 32830",
    lat: 28.3708,
    lng: -81.5165,
    phone: "(407) 560-0100",
    hours: "Mon - Sun: 10:00 AM – 11:00 PM",
    type: "Rooftop Tasting Bar",
  },
];
