 import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import avatar from '../../assets/MyPic.jpg';

export default function Hero() {
  const nameRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(nameRef.current, { y: 30, opacity: 0, duration: 0.8 })
      .from(imgRef.current, { scale: 0.8, opacity: 0, duration: 0.8 }, '-=0.5');
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-24">
      <div className="max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 items-center">
        <div ref={nameRef}>
          <p className="text-nebula-blue">Hello, I'm</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">
            Shilpa Mukherjee
          </h1>
          <h2 className="text-xl text-slate-300 mt-2">Frontend Developer</h2>
          <p className="text-slate-400 mt-4 max-w-md">
            A passionate Frontend Developer with 2+ years of experience crafting
            immersive, high-performance web applications.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-sm">
              View Projects
            </button>
            <button className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm">
              Resume
            </button>
          </div>
        </div>

        <div ref={imgRef} className="justify-self-center">
          <div className="w-64 h-64 rounded-full p-1 bg-gradient-to-tr from-nebula-purple via-nebula-blue to-nebula-pink">
            <img src={avatar} alt="Shilpa Mukherjee" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}