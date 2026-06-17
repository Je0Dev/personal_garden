import { LightboxTrigger } from '@/components/Lightbox';

interface GalleryImage {
  src: string;
  title: string;
  year?: string;
}

interface ArticleGalleryProps {
  images: GalleryImage[];
}

const ArticleGallery = ({ images }: ArticleGalleryProps) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="mt-12 max-w-prose">
      <h3 className="font-serif text-xl font-bold text-cream mb-4">
        <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber">
          Gallery
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="illustration-container">
            <LightboxTrigger src={image.src} alt={image.title} caption={image.title}>
              <img
                src={image.src}
                alt={image.title}
                className="w-full rounded-lg shadow-md cursor-zoom-in"
                loading="lazy"
              />
            </LightboxTrigger>
            <p className="illustration-caption">{image.title}{image.year ? ` (${image.year})` : ''}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleGallery;
