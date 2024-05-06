import React from 'react';

interface ContentProps {
  content: string;
}

const SpecialPage = ({ content }: ContentProps) => {
  const sections = content.split('\n');

  return (
    <section className="max-w-3xl mx-auto p-8">
      {sections.map((section, index) => {
        if (section.includes(':')) {
          const [heading, paragraph] = section.split(':');
          return (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{heading}:</h2>
              <p>{paragraph}</p>
            </div>
          );
        } else {
          return (
            <div key={index} className="mb-6">
              <p className="text-xl mb-2">{section}</p>
            </div>
          );
        }
      })}
    </section>
  );
};

export default SpecialPage;
