import React from 'react';
import cls from './Video.module.css'

export const ResponsiveVideo: React.FC<{ src: string; title?: string }> = ({ src, title }) => {
  return (
    <div 
    className={cls.video} >
      <iframe
        className={cls.frame}
        src={src}
        title={title || 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

