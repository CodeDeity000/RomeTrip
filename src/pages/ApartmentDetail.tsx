import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Users, Maximize, MapPin, Star, Wifi, Coffee, Bath, Car, Tv, Utensils, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ApartmentProps } from "@/components/ApartmentCard";
import apartment1Rome from "@/assets/apartment-1-rome.jpg";
import apartment2Rome from "@/assets/apartment-2-rome.jpg";
import apartment3Rome from "@/assets/apartment-3-rome.jpg";
import apartment4Rome from "@/assets/apartment-4-rome.jpg";
import apartment5Rome from "@/assets/apartment-5-rome.jpg";
import apartment6Rome from "@/assets/apartment-6-rome.jpg";

// Extended apartment data with additional details
const apartmentDetails: Record<string, ApartmentProps & {
  longDescription: string;
  amenities: string[];
  images: string[];
  rating: number;
  reviews: number;
}> = {
  "1": {
    id: "1",
    name: "Ancient Roman Villa Suite",
    description: "Luxurious villa with authentic Roman architecture, stone walls, and panoramic views of ancient ruins.",
    longDescription: "Step into history with this magnificent villa suite that perfectly captures the grandeur of ancient Rome. The accommodation features authentic stone walls, marble accents, and panoramic views of the surrounding ancient ruins. The spacious interior combines historical charm with modern luxury amenities, creating an unforgettable experience for guests seeking both comfort and cultural immersion.",
    price: 280,
    capacity: 2,
    size: 65,
    image: apartment1Rome,
    location: "Historic Center",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Heating", "TV", "Terrace"],
    amenities: ["Free Wi-Fi", "Full Kitchen", "Private Bathroom", "Central Heating", "Smart TV", "Private Terrace", "Air Conditioning", "Minibar"],
    images: [apartment1Rome, apartment2Rome, apartment3Rome],
    rating: 4.8,
    reviews: 127
  },
  "2": {
    id: "2",
    name: "Imperial Family Residence",
    description: "Spacious Roman residence perfect for families, featuring original frescoes and marble columns.",
    longDescription: "Experience royal treatment in this spacious Imperial residence designed for families. Marvel at the original frescoes adorning the walls and the impressive marble columns that speak to Rome's imperial heritage. This accommodation offers ample space for families while maintaining the authentic atmosphere of ancient Roman luxury living.",
    price: 350,
    capacity: 4,
    size: 95,
    image: apartment2Rome,
    location: "Palatine Hill",
    features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Heating", "TV", "Courtyard"],
    amenities: ["Free Wi-Fi", "Full Kitchen", "2 Private Bathrooms", "Central Heating", "Smart TV", "Private Courtyard", "Air Conditioning", "Washing Machine", "Dishwasher"],
    images: [apartment2Rome, apartment3Rome, apartment4Rome],
    rating: 4.9,
    reviews: 89
  },
  "3": {
    id: "3",
    name: "Vintage Roman Studio",
    description: "Charming studio in historic Roman building with aged stone walls and traditional furnishings.",
    longDescription: "Discover the intimate charm of ancient Rome in this beautifully appointed studio apartment. The aged stone walls tell stories of centuries past, while traditional furnishings create a cozy atmosphere perfect for couples or solo travelers seeking an authentic Roman experience in the heart of historic Trastevere.",
    price: 220,
    capacity: 2,
    size: 45,
    image: apartment3Rome,
    location: "Trastevere",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Heating", "TV"],
    amenities: ["Free Wi-Fi", "Kitchenette", "Private Bathroom", "Central Heating", "Smart TV", "Air Conditioning", "Coffee Machine"],
    images: [apartment3Rome, apartment4Rome, apartment5Rome],
    rating: 4.7,
    reviews: 156
  },
  "4": {
    id: "4",
    name: "Luxury Roman Penthouse",
    description: "Exclusive penthouse with rooftop terrace overlooking the Colosseum and ancient Roman architecture.",
    longDescription: "Indulge in ultimate luxury at this exclusive penthouse featuring breathtaking views of the Colosseum and ancient Roman architecture. The rooftop terrace provides an unparalleled vantage point to witness Rome's timeless beauty, while the interior combines modern luxury with classical Roman design elements for an extraordinary stay.",
    price: 480,
    capacity: 4,
    size: 120,
    image: apartment4Rome,
    location: "Historic Center",
    features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Heating", "TV", "Rooftop Terrace", "Ancient Views"],
    amenities: ["Free Wi-Fi", "Gourmet Kitchen", "2 Luxury Bathrooms", "Central Heating", "Smart TV", "Rooftop Terrace", "Air Conditioning", "Jacuzzi", "Wine Cellar", "Concierge Service"],
    images: [apartment4Rome, apartment5Rome, apartment6Rome],
    rating: 5.0,
    reviews: 73
  },
  "5": {
    id: "5",
    name: "Traditional Roman Chamber",
    description: "Authentic Roman chamber with original stone architecture and vintage Mediterranean decor.",
    longDescription: "Experience authentic Roman living in this traditional chamber featuring original stone architecture and carefully curated vintage Mediterranean decor. The intimate space offers a genuine glimpse into Rome's architectural heritage while providing modern comfort for discerning travelers who appreciate historical authenticity.",
    price: 180,
    capacity: 2,
    size: 38,
    image: apartment5Rome,
    location: "Roman Forum Area",
    features: ["Wi-Fi", "Bathroom", "Heating", "TV", "Stone Fireplace"],
    amenities: ["Free Wi-Fi", "Private Bathroom", "Central Heating", "Smart TV", "Stone Fireplace", "Air Conditioning", "Mini Kitchen"],
    images: [apartment5Rome, apartment6Rome, apartment1Rome],
    rating: 4.6,
    reviews: 198
  },
  "6": {
    id: "6",
    name: "Garden Villa Romana",
    description: "Peaceful villa surrounded by ancient Roman gardens with views of historic ruins and monuments.",
    longDescription: "Find tranquility in this peaceful villa surrounded by beautifully maintained ancient Roman gardens. The property offers stunning views of historic ruins and monuments while providing a serene escape from the bustling city. Perfect for guests seeking a harmonious blend of nature, history, and luxury in the heart of Villa Borghese.",
    price: 260,
    capacity: 3,
    size: 75,
    image: apartment6Rome,
    location: "Villa Borghese",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Heating", "TV", "Garden Access"],
    amenities: ["Free Wi-Fi", "Full Kitchen", "Private Bathroom", "Central Heating", "Smart TV", "Garden Access", "Air Conditioning", "Outdoor Dining", "Barbecue"],
    images: [apartment6Rome, apartment1Rome, apartment2Rome],
    rating: 4.8,
    reviews: 112
  }
};

const getFeatureIcon = (feature: string) => {
  const iconMap: Record<string, JSX.Element> = {
    "Wi-Fi": <Wifi className="h-4 w-4" />,
    "Free Wi-Fi": <Wifi className="h-4 w-4" />,
    "Kitchen": <Utensils className="h-4 w-4" />,
    "Full Kitchen": <Utensils className="h-4 w-4" />,
    "Gourmet Kitchen": <Utensils className="h-4 w-4" />,
    "Kitchenette": <Utensils className="h-4 w-4" />,
    "Mini Kitchen": <Utensils className="h-4 w-4" />,
    "Bathroom": <Bath className="h-4 w-4" />,
    "Private Bathroom": <Bath className="h-4 w-4" />,
    "2 Bathrooms": <Bath className="h-4 w-4" />,
    "2 Private Bathrooms": <Bath className="h-4 w-4" />,
    "2 Luxury Bathrooms": <Bath className="h-4 w-4" />,
    "TV": <Tv className="h-4 w-4" />,
    "Smart TV": <Tv className="h-4 w-4" />,
    "Parking": <Car className="h-4 w-4" />,
    "Coffee Machine": <Coffee className="h-4 w-4" />
  };
  
  return iconMap[feature] || <Clock className="h-4 w-4" />;
};

export default function ApartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const apartment = id ? apartmentDetails[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!apartment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Apartment not found</h1>
            <Button asChild>
              <Link to="/apartments">Back to Apartments</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Back Navigation */}
        <div className="container py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Image Gallery */}
        <section className="container mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={apartment.images[currentImageIndex]}
                alt={apartment.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {apartment.images.slice(1, 3).map((image, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setCurrentImageIndex(index + 1)}
                >
                  <img
                    src={image}
                    alt={`${apartment.name} ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Image thumbnails */}
          <div className="flex gap-2 mt-4">
            {apartment.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded overflow-hidden border-2 ${
                  currentImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Apartment Details */}
        <section className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(apartment.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {apartment.rating} ({apartment.reviews} reviews)
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{apartment.name}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{apartment.location}</span>
                </div>
                
                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{apartment.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4 text-muted-foreground" />
                    <span>{apartment.size} m²</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">About this place</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {apartment.longDescription}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {apartment.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-primary">
                        {getFeatureIcon(amenity)}
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {apartment.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">${apartment.price}</span>
                    <span className="text-muted-foreground">/ night</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild className="w-full btn-primary">
                    <Link to={`/booking?apartment=${apartment.id}`}>
                      Book Now
                    </Link>
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Free cancellation until 24h before arrival
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex justify-between">
                    <span>Price per night</span>
                    <span>${apartment.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$25</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 border-t">
                    <span>Total</span>
                    <span>${apartment.price + 25}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="bg-muted rounded-lg p-8 text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{apartment.location}</h3>
            <p className="text-muted-foreground">
              Located in the heart of Rome's historic district, this apartment provides easy access to major attractions and authentic Roman experiences.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}