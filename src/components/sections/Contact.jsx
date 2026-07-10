import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Replace with your real send logic (EmailJS, an API route, Formspree, etc.)
    await new Promise((res) => setTimeout(res, 1000));
    setStatus('sent');
  };

  return (
    <section id="contact" className="py-24">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-6 space-y-4">
        {['name', 'email', 'subject'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500"
            required
          />
        ))}
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500"
          required
        />
        <button
          disabled={status === 'sending'}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-nebula-purple to-nebula-blue text-white font-medium disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}