'use client';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  gradient?: string;
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonLink = '#contact',
  gradient = 'from-secondary-800 to-secondary-900'
}: CTASectionProps) {
  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 md:p-8 text-white text-center mt-8`}>
      <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
      <p className="text-primary-300 mb-6 text-sm md:text-base">{description}</p>
      <a
        href={buttonLink}
        target="_parent"
        className="inline-flex items-center gap-2 bg-primary-400 text-secondary-900 px-6 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-all shadow-lg hover:shadow-xl"
      >
        {buttonText}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}
