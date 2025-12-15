
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { List } from 'lucide-react';

const TableOfContents = () => {
  const { t } = useLanguage();
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Parse h2 and h3 from the article content
    const elements = Array.from(document.querySelectorAll('article h2, article h3'));
    const items = elements.map((elem, index) => {
      const id = `heading-${index}`;
      elem.id = id;
      return {
        id,
        text: elem.innerText,
        level: elem.tagName.toLowerCase()
      };
    });
    setHeadings(items);

    // Scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 sticky top-32">
      <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
        <List size={18} className="text-[#BFA76A]" /> {t('blog.toc', 'Sommaire')}
      </h4>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`block text-sm py-1 transition-colors border-l-2 pl-3 ${
              activeId === heading.id
                ? 'text-[#BFA76A] border-[#BFA76A] font-medium'
                : 'text-gray-400 border-transparent hover:text-white hover:border-white/20'
            } ${heading.level === 'h3' ? 'ml-4' : ''}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
