import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiGreensock,
  SiNodedotjs,
  SiGraphql,
  SiWordpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiVite,
  SiFigma,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

export const categoryMeta = {
  frontend: { label: 'Frontend', color: '#22d3ee' },
  backend: { label: 'Backend', color: '#22c55e' },
  cms: { label: 'CMS & Data', color: '#3b82f6' },
  tools: { label: 'Tools', color: '#f97316' },
};

export const orbitSkills = [
  { name: 'React / Next.js', level: 93, color: '#22d3ee', Icon: SiReact, category: 'frontend' },
  { name: 'JavaScript (ES6+)', level: 92, color: '#eab308', Icon: SiJavascript, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, color: '#38bdf8', Icon: SiTailwindcss, category: 'frontend' },
  { name: 'HTML5 & CSS3', level: 95, color: '#f97316', Icon: SiHtml5, category: 'frontend' },
  { name: 'TypeScript', level: 85, color: '#3b82f6', Icon: SiTypescript, category: 'frontend' },
  { name: 'GSAP / Framer Motion', level: 80, color: '#88ce02', Icon: SiGreensock, category: 'frontend' },
  { name: 'REST APIs', level: 88, color: '#06b6d4', Icon: TbApi, category: 'backend' },
  { name: 'Node.js & Express', level: 78, color: '#22c55e', Icon: SiNodedotjs, category: 'backend' },
  { name: 'GraphQL', level: 70, color: '#e10098', Icon: SiGraphql, category: 'backend' },
  { name: 'WordPress & WooCommerce', level: 85, color: '#21759b', Icon: SiWordpress, category: 'cms' },
  { name: 'MySQL', level: 78, color: '#F29111', Icon: SiMysql, category: 'cms' },
  { name: 'MongoDB', level: 75, color: '#47a248', Icon: SiMongodb, category: 'cms' },
  { name: 'Git & GitHub Workflow', level: 90, color: '#f05032', Icon: SiGit, category: 'tools' },
  { name: 'Vite / Webpack', level: 85, color: '#646cff', Icon: SiVite, category: 'tools' },
  { name: 'Figma (UI/UX Design)', level: 80, color: '#f24e1e', Icon: SiFigma, category: 'tools' },
];