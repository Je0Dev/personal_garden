import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';

const Newsletter = () => {
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
    
    setTimeout(() => {
      setStatus('success');
      setMessage(`Thanks for subscribing! We'll send updates to ${email}`);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-deep-forest border border-moss rounded-lg p-6 max-w-prose mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-5 h-5 text-olive-light" />
        <h3 className="font-serif text-lg font-bold text-cream">Stay Updated</h3>
      </div>
      
      <p className="text-earth-tan text-sm mb-4">
        Get notified when new articles are published. No spam, unsubscribe anytime.
      </p>
      
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-olive-light">
          <Check className="w-5 h-5" />
          <span className="text-sm">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 bg-deep-olive border border-moss rounded text-cream placeholder:text-earth-muted/50 focus:outline-none focus:border-olive-light transition-colors"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-deep-forest border border-olive-light text-olive-light font-medium rounded hover:bg-deep-sage hover:border-tomato hover:text-tomato transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <span className="w-4 h-4 border-2 border-olive-light border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="underline underline-offset-4">Subscribe</span>
              </>
            )}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="text-tomato text-sm mt-2">{message}</p>
      )}
    </div>
  );
};

export default Newsletter;
