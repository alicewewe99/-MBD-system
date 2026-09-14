import React from 'react';

const DECOR_ITEMS = [
  { type: 'emoji', content: '☕', size: 'text-3xl', left: '8%', duration: '15s', delay: '0s' },
  { type: 'image', content: '/icon.svg', size: 'w-10 h-10', left: '24%', duration: '21s', delay: '2s' },
  { type: 'emoji', content: '🐢', size: 'text-3xl', left: '42%', duration: '22s', delay: '3s' },
  { type: 'emoji', content: '📖', size: 'text-3xl', left: '62%', duration: '18s', delay: '1s' },
  { type: 'image', content: '/icon.svg', size: 'w-8 h-8', left: '76%', duration: '24s', delay: '6s' },
  { type: 'emoji', content: '❤️', size: 'text-2xl', left: '88%', duration: '25s', delay: '5s' },
  { type: 'emoji', content: '☕', size: 'text-2xl', left: '16%', duration: '20s', delay: '7s' },
  { type: 'emoji', content: '🐢', size: 'text-2xl', left: '52%', duration: '17s', delay: '4s' },
];

export const BackgroundDecor: React.FC = () => {
  return (
    <div className="bg-decor" aria-hidden="true">
      {DECOR_ITEMS.map((item, idx) => (
        <div
          key={idx}
          className="floating-item"
          style={{
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
          }}
        >
          {item.type === 'image' ? (
            <img
              src={item.content}
              alt=""
              className={`${item.size} rounded-xl shadow-xs opacity-60`}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className={item.size}>{item.content}</span>
          )}
        </div>
      ))}
    </div>
  );
};
