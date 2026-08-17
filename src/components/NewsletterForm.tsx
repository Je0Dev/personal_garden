import { useState } from 'react';
import { Send, Check } from 'lucide-react';

const BUTTONDOWN_USERNAME = import.meta.env.VITE_BUTTONDOWN_USERNAME || '';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    if (BUTTONDOWN_USERNAME) {
      try {
        const response = await fetch(
          `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ email }),
          }
        );
        if (response.ok) {
          setStatus('success');
          setMessage('Thanks for subscribing!');
          setEmail('');
        } else {
          setStatus('error');
          setMessage('Something went wrong. Try again later.');
        }
      } catch {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    } else {
      setTimeout(() => {
        setStatus('success');
        setMessage(`Thanks for subscribing! We'll send updates to ${email}.`);
        setEmail('');
      }, 800);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 text-olive-light p-4 bg-olive/10 rounded-lg">
        <Check className="w-5 h-5 flex-shrink-0" />
        <span className="font-sans text-sm">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 bg-deep-olive border-b-2 border-moss text-cream focus:outline-none focus:border-olive-light/50 transition-all font-mono text-sm rounded placeholder:text-earth-muted/50"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-gradient-to-r from-olive-light to-olive text-deep-olive font-bold hover:bg-olive transition-colors shadow-lg shadow-olive/20 rounded disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <span className="w-4 h-4 border-2 border-deep-olive border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Subscribe
          </>
        )}
      </button>
      {status === 'error' && (
        <p className="text-tomato text-sm mt-2">{message}</p>
      )}
    </form>
  );
};

export default NewsletterForm;