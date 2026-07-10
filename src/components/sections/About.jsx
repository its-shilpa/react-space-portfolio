import { useState } from 'react';

export default function About() {
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
       
    </section>
  );
}