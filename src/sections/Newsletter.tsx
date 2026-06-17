import { useState } from 'react';
import { useToast } from '../components/Toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    addToast('Thanks for subscribing!', 'success');
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="pt-16 pb-12">
      <div className="max-w-prose mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-cream mb-4">
          Stay Updated
        </h2>
        <p className="font-sans text-earth-tan mb-8">
          Occasional thoughts on building, technology, and craftsmanship.
          No spam. Ever.
        </p>
        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 px-4 py-3 bg-deep-forest border border-moss rounded text-cream placeholder:text-earth-muted focus:outline-none focus:border-olive-light focus:ring-2 focus:ring-olive-light/20 font-sans"
            disabled={isSubmitted}
          />
          <button
            type="submit"
            disabled={isSubmitted || !email}
            className="px-6 py-3 bg-olive-light text-deep-olive font-sans font-medium rounded hover:bg-olive transition-colors disabled:opacity-50"
          >
            {isSubmitted ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
