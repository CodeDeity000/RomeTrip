import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface GalleryItem {
  image: string;
  title: string;
}

interface customCarouselProps {
  items: GalleryItem[];
}

export const customCarousel: React.FC<customCarouselProps> = ({ items }) => {
  const autoplay = Autoplay({ delay: 2500, stopOnInteraction: false });
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
    },
    [autoplay]
  );

  return (
    <div className="embla overflow-hidden relative w-full" ref={emblaRef}>
      <div className="embla__container flex">
        {items.map((galleryItem, index) => (
          <div
            key={index}
            className="embla__slide px-2"
            style={{
              flex: "0 0 100%",
              maxWidth: "100%",
            }}
          >
            <div
              className="aspect-[4/3] max-h-56 rounded-lg overflow-hidden shadow-md group relative transition-all duration-300 hover:shadow-xl animate-fade-in"
              style={{ width: "100%" }}
            >
              <img
                src={galleryItem.image}
                alt={galleryItem.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-xs md:text-sm font-medium text-center px-2 md:px-4">
                  {galleryItem.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .embla__slide { flex: 0 0 33.3333% !important; max-width: 33.3333% !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .embla__slide { flex: 0 0 50% !important; max-width: 50% !important; }
        }
        @media (max-width: 639px) {
          .embla__slide { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default customCarousel;
