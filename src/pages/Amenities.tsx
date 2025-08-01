import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Dumbbell, Waves, Activity, Utensils, Wine, Coffee, Clock, Car, Plane, Car as CarIcon, MapPin, Users, Music, BookOpen, ArrowRight, Calendar, Phone, Sparkles, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import romanArchitecture1 from "@/assets/roman-architecture-1.jpg";
import romanArchitecture2 from "@/assets/roman-architecture-2.jpg";
import romanArchitecture3 from "@/assets/roman-architecture-3.jpg";
import romanArchitecture4 from "@/assets/roman-architecture-4.jpg";
import romanArchitecture5 from "@/assets/roman-architecture-5.jpg";
import romanArchitecture6 from "@/assets/roman-architecture-6.jpg";
import wellnessSpa from "@/assets/wellness-spa.jpg";
import wellnessFitness from "@/assets/wellness-fitness.jpg";
import diningRestaurant from "@/assets/dining-restaurant.jpg";
import diningCoffee from "@/assets/dining-coffee.jpg";
import servicesConcierge from "@/assets/services-concierge.jpg";
import entertainmentLounge from "@/assets/entertainment-lounge.jpg";

export default function Amenities() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Category data with images and enhanced content
  const categoryData = {
    wellness: {
      title: t.amenitiesPage.categories.wellness.title,
      description: t.amenitiesPage.categories.wellness.description,
      image: wellnessSpa,
      secondaryImage: wellnessFitness,
      icon: <Heart className="h-8 w-8" />,
      color: "bg-emerald-500/10 text-emerald-600",
      items: t.amenitiesPage.categories.wellness.items,
      actions: [
        { label: "Book Spa Treatment", icon: <Calendar className="h-4 w-4" />, link: "/booking" },
        { label: "View Schedule", icon: <Clock className="h-4 w-4" />, link: "#" }
      ]
    },
    dining: {
      title: t.amenitiesPage.categories.dining.title,
      description: t.amenitiesPage.categories.dining.description,
      image: diningRestaurant,
      secondaryImage: diningCoffee,
      icon: <Utensils className="h-8 w-8" />,
      color: "bg-orange-500/10 text-orange-600",
      items: t.amenitiesPage.categories.dining.items,
      actions: [
        { label: "Make Reservation", icon: <Phone className="h-4 w-4" />, link: "/contact" },
        { label: "View Menu", icon: <BookOpen className="h-4 w-4" />, link: "#" }
      ]
    },
    services: {
      title: t.amenitiesPage.categories.services.title,
      description: t.amenitiesPage.categories.services.description,
      image: servicesConcierge,
      secondaryImage: romanArchitecture1,
      icon: <MapPin className="h-8 w-8" />,
      color: "bg-blue-500/10 text-blue-600",
      items: t.amenitiesPage.categories.services.items,
      actions: [
        { label: "Contact Concierge", icon: <Phone className="h-4 w-4" />, link: "/contact" },
        { label: "Request Service", icon: <ArrowRight className="h-4 w-4" />, link: "#" }
      ]
    },
    entertainment: {
      title: t.amenitiesPage.categories.entertainment.title,
      description: t.amenitiesPage.categories.entertainment.description,
      image: entertainmentLounge,
      secondaryImage: romanArchitecture2,
      icon: <Music className="h-8 w-8" />,
      color: "bg-purple-500/10 text-purple-600",
      items: t.amenitiesPage.categories.entertainment.items,
      actions: [
        { label: "Check Events", icon: <Calendar className="h-4 w-4" />, link: "#" },
        { label: "Book Activity", icon: <Users className="h-4 w-4" />, link: "/booking" }
      ]
    }
  };
  
  // Helper function to get the appropriate icon for each amenity
  const getIcon = (categoryName: string, index: number) => {
    const icons = {
      wellness: [<Heart key={0} />, <Dumbbell key={1} />, <Waves key={2} />, <Activity key={3} />],
      dining: [<Utensils key={0} />, <Coffee key={1} />, <Wine key={2} />, <Clock key={3} />],
      services: [<Clock key={0} />, <Plane key={1} />, <CarIcon key={2} />, <MapPin key={3} />],
      entertainment: [<Waves key={0} />, <Users key={1} />, <Music key={2} />, <BookOpen key={3} />]
    };
    
    return icons[categoryName as keyof typeof icons]?.[index] || <Coffee />;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container relative z-10 pt-20">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                MareSereno Experience
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                {t.amenitiesPage.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.amenitiesPage.subtitle}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Description Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <p className="text-lg text-muted-foreground">
                {t.amenitiesPage.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Enhanced Categories Sections */}
        {Object.entries(categoryData).map(([categoryKey, category], categoryIndex) => {
          const isEven = categoryIndex % 2 === 0;
          const isActive = activeCategory === categoryKey;
          
          return (
            <section 
              key={categoryKey} 
              className={`py-20 ${isEven ? 'bg-card/50' : ''} transition-all duration-500`}
              onMouseEnter={() => setActiveCategory(categoryKey)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="container">
                {/* Category Header with Images */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className={`animate-fade-in ${isEven ? 'lg:order-2' : ''}`}>
                    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${category.color} mb-4`}>
                      {category.icon}
                      <span className="font-semibold">{category.title}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                      {category.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {category.actions.map((action, index) => (
                        <Button 
                          key={index}
                          asChild 
                          variant={index === 0 ? "default" : "outline"}
                          className="hover-scale"
                        >
                          <Link to={action.link} className="flex items-center gap-2">
                            {action.icon}
                            {action.label}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Images Grid */}
                  <div className={`relative animate-fade-in ${isEven ? 'lg:order-1' : ''}`} style={{ animationDelay: '200ms' }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                          <img 
                            src={category.image}
                            alt={`${category.title} main`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                          <img 
                            src={category.secondaryImage}
                            alt={`${category.title} secondary`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                          <img 
                            src={romanArchitecture3}
                            alt={`${category.title} architecture`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Badge */}
                    <div className="absolute -top-4 -right-4 z-10">
                      <Badge variant="secondary" className="shadow-lg animate-bounce">
                        Premium Service
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Category Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((item, index) => (
                    <Card 
                      key={index} 
                      className={`group hover:shadow-xl transition-all duration-300 animate-fade-in hover-scale ${
                        isActive ? 'border-primary/50 shadow-lg' : ''
                      }`}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <CardHeader className="text-center">
                        <div className={`mx-auto mb-3 p-3 rounded-full ${category.color} w-fit transition-transform group-hover:scale-110`}>
                          {getIcon(categoryKey, index)}
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
        
        {/* Enhanced Gallery Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <Badge variant="outline" className="mb-4">
                <Camera className="h-4 w-4 mr-2" />
                Photo Gallery
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.gallery.title}
              </h2>
              <p className="text-muted-foreground">
                {t.gallery.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { image: romanArchitecture1, title: "Ancient Roman Colosseum" },
                { image: romanArchitecture2, title: "Majestic Roman Architecture" },
                { image: romanArchitecture3, title: "Classical Roman Design" },
                { image: romanArchitecture4, title: "Roman Villa Courtyard" },
                { image: romanArchitecture5, title: "Timeless Roman Beauty" },
                { image: romanArchitecture6, title: "Historic Roman Structure" },
                { image: wellnessSpa, title: "Luxury Spa Experience" },
                { image: diningRestaurant, title: "Fine Dining Restaurant" }
              ].map((galleryItem, index) => (
                <div 
                  key={index} 
                  className="group aspect-square rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img 
                    src={galleryItem.image}
                    alt={galleryItem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium text-center px-4">
                      {galleryItem.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="hover-scale">
                <Link to="/gallery">
                  View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Luxury?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Book your stay today and enjoy all our premium amenities in a setting inspired by ancient Roman grandeur.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="hover-scale">
                  <Link to="/booking">
                    Book Your Stay <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover-scale">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}