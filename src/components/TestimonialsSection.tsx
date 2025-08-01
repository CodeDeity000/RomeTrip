import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Giuseppe Romano",
    location: "Milan, Italy",
    avatar: testimonial1,
    content: "Staying in these historic Roman apartments was like stepping back in time. The ancient architecture combined with modern comfort created an unforgettable experience in the eternal city.",
    rating: 5
  },
  {
    id: 2,
    name: "Isabella Benedetti",
    location: "Florence, Italy",
    avatar: testimonial2,
    content: "The vintage Roman atmosphere was absolutely magical. Walking through ancient stone corridors and enjoying views of the ruins from our terrace made this the perfect historical getaway.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Conti",
    location: "Naples, Italy",
    avatar: testimonial3,
    content: "An authentic Roman experience like no other. The aged architecture and traditional furnishings transported us to another era while still providing all modern amenities.",
    rating: 4
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="section bg-muted py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground">
            {t.testimonials.description}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 glass-card p-8 md:p-10 transition-all duration-500",
                  activeIndex === index 
                    ? "opacity-100 translate-x-0 z-10"
                    : index < activeIndex 
                      ? "opacity-0 -translate-x-full z-0" 
                      : "opacity-0 translate-x-full z-0"
                )}
              >
                <div className="flex flex-col md:flex-row gap-6 h-full">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="rounded-full overflow-hidden w-20 h-20 mb-4 border-2 border-primary">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} 
                        />
                      ))}
                    </div>
                    <h4 className="text-lg font-semibold text-center md:text-left">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground text-center md:text-left">{testimonial.location}</p>
                  </div>
                  
                  <div className="flex-1 flex items-center">
                    <blockquote className="italic text-muted-foreground">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-card hover:bg-muted border border-border transition-colors"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index 
                      ? "bg-primary w-6" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-card hover:bg-muted border border-border transition-colors"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
