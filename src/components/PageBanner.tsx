import type { ReactNode } from 'react';

interface PageBannerProps {
  image: string;
  children: ReactNode;
  height?: string;
}

const PageBanner = ({ image, children, height = 'h-64 md:h-96' }: PageBannerProps) => {
  return (
    <div className={`relative w-full ${height} overflow-hidden mb-12`}>
      <div className="absolute inset-0 bg-gradient-to-t from-deep-olive via-deep-olive/60 to-transparent z-10" />
      <img src={image} alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center px-6">{children}</div>
      </div>
    </div>
  );
};

export default PageBanner;