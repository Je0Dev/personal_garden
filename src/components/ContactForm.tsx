import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useToast } from './Toast';

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    addToast('Message sent! (Demo — no backend connected)', 'success');
    setTimeout(() => setSent(false), 3000);
  };

  if (sent) {
    return (
      <div className="flex items-center gap-3 p-4 bg-olive/20 border border-olive-light/30 rounded-lg">
        <Check className="w-5 h-5 text-olive-light" />
        <p className="font-sans text-olive-light text-sm">Message sent! (This is a demo — no backend connected)</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full px-4 py-2 bg-surface border border-border rounded font-sans text-sm text-cream placeholder:text-earth-muted focus:outline-none focus:border-olive-light transition-colors"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 bg-surface border border-border rounded font-sans text-sm text-cream placeholder:text-earth-muted focus:outline-none focus:border-olive-light transition-colors"
        />
      </div>
      <textarea
        placeholder="Message"
        rows={4}
        required
        className="w-full px-4 py-2 bg-surface border border-border rounded font-sans text-sm text-cream placeholder:text-earth-muted focus:outline-none focus:border-olive-light transition-colors resize-none"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-4 py-2 bg-tomato text-cream rounded font-sans text-sm hover:bg-tomato-light transition-colors"
      >
        <Send className="w-4 h-4" /> Send Message
      </button>
    </form>
  );
};

export default ContactForm;
