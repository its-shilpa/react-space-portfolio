import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate real send logic
    await new Promise((res) => setTimeout(res, 1200));
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  const contactDetails = [
    { icon: FaEnvelope, title: "Email Me", value: "shilpa.mukherjee@example.com", link: "mailto:shilpa.mukherjee@example.com" },
    { icon: FaMapMarkerAlt, title: "Location", value: "Kolkata, West Bengal, India", link: null },
  ];

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com", name: "GitHub" },
    { icon: FaLinkedin, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: FaTwitter, url: "https://twitter.com", name: "Twitter" },
  ];

  return (
    <section id="contact" className="pt-8 pb-12 md:pt-10 md:pb-20 lg:pt-12 lg:pb-20">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Me"
          subtitle="Have a project in mind, looking for a frontend developer, or just want to connect? Drop me a message!"
        />

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Left Column: Contact details */}
          <div className="md:col-span-2 space-y-6" data-aos="fade-right">
            <h3 className="text-xl font-display font-semibold text-white">Let's build something out of this world</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              I am open to freelance work, full-time roles, and open-source collaborations. Drop me a line, and I will get back to you within 24 hours.
            </p>

            <div className="space-y-4 pt-4">
              {contactDetails.map((detail, idx) => (
                <div key={idx} className="flex gap-4 items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-nebula-blue/10 flex items-center justify-center text-nebula-blue shrink-0">
                    <detail.icon className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold uppercase">{detail.title}</h4>
                    {detail.link ? (
                      <a href={detail.link} className="text-sm text-slate-200 hover:text-nebula-blue transition duration-300">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-200">{detail.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="text-xs text-slate-500 font-semibold uppercase mb-3">Connect on Socials</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-nebula-purple/50 hover:bg-white/10 text-slate-400 hover:text-nebula-purple flex items-center justify-center transition duration-300"
                    title={social.name}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Message form */}
          <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md" data-aos="fade-left">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Shilpa Mukherjee"
                    className="w-full bg-white/5 border border-white/10 focus:border-nebula-blue focus:ring-1 focus:ring-nebula-blue/30 focus:bg-white/8 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="shilpa@example.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-nebula-blue focus:ring-1 focus:ring-nebula-blue/30 focus:bg-white/8 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5">Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Portfolio Project Inquiry"
                  className="w-full bg-white/5 border border-white/10 focus:border-nebula-blue focus:ring-1 focus:ring-nebula-blue/30 focus:bg-white/8 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me more about your requirements..."
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 focus:border-nebula-blue focus:ring-1 focus:ring-nebula-blue/30 focus:bg-white/8 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-nebula-purple to-nebula-blue text-white font-semibold text-sm hover:opacity-90 hover:shadow-[0_0_20px_var(--nebula-blue)] disabled:opacity-50 transition-all duration-300 cursor-pointer"
              >
                {status === 'sending' ? 'Sending Message…' : status === 'sent' ? 'Message Sent ✓' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}