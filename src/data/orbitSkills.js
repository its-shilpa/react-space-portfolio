import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiJquery,
  SiVuedotjs,
  SiHtml5,
  SiBootstrap,
  SiTailwindcss,
  SiGreensock,
  SiPhp,
  SiNodedotjs,
  SiWordpress,
  SiWoocommerce,
  SiMysql,
  SiElementor,
  SiGit,
  SiVite,
  SiFigma,
} from 'react-icons/si';
import { TbApi, TbLayoutGrid } from 'react-icons/tb';

export const categoryMeta = {
  frontend: { label: 'Frontend', color: '#22d3ee' },
  backend: { label: 'Backend', color: '#22c55e' },
  cms: { label: 'CMS & Data', color: '#3b82f6' },
  tools: { label: 'Tools', color: '#f97316' },
};

export const orbitSkills = [
  { name: 'React js', level: 93, color: '#22d3ee', Icon: SiReact, category: 'frontend' },
  { name: 'Javascript', level: 92, color: '#eab308', Icon: SiJavascript, category: 'frontend' },
  { name: 'Typescript', level: 85, color: '#3b82f6', Icon: SiTypescript, category: 'frontend' },
  { name: 'jquery', level: 82, color: '#0769ad', Icon: SiJquery, category: 'frontend' },
  { name: 'Vue js', level: 75, color: '#41b883', Icon: SiVuedotjs, category: 'frontend' },
  { name: 'HTML5 & CSS3', level: 95, color: '#f97316', Icon: SiHtml5, category: 'frontend' },
  { name: 'Bootstrap', level: 85, color: '#7952b3', Icon: SiBootstrap, category: 'frontend' },
  { name: 'Tailwind', level: 95, color: '#38bdf8', Icon: SiTailwindcss, category: 'frontend' },
  { name: 'Gsap', level: 80, color: '#88ce02', Icon: SiGreensock, category: 'frontend' },
  { name: 'Php', level: 80, color: '#777bb4', Icon: SiPhp, category: 'backend' },
  { name: 'Nodejs', level: 78, color: '#22c55e', Icon: SiNodedotjs, category: 'backend' },
  { name: 'Rest Api', level: 88, color: '#06b6d4', Icon: TbApi, category: 'backend' },
  { name: 'Wordpress', level: 85, color: '#21759b', Icon: SiWordpress, category: 'cms' },
  { name: 'Woocommerce', level: 82, color: '#96588a', Icon: SiWoocommerce, category: 'cms' },
  { name: 'Mysql', level: 78, color: '#F29111', Icon: SiMysql, category: 'cms' },
  { name: 'Divi', level: 78, color: '#6633cc', Icon: TbLayoutGrid, category: 'cms' }, // verify/swap icon
  { name: 'Elementor', level: 80, color: '#92003b', Icon: SiElementor, category: 'cms' },
  { name: 'Git & GitHub Workflow', level: 90, color: '#f05032', Icon: SiGit, category: 'tools' },
  { name: 'Vite', level: 85, color: '#646cff', Icon: SiVite, category: 'tools' },
  { name: 'Figma', level: 80, color: '#f24e1e', Icon: SiFigma, category: 'tools' },
];