import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const Timeline = ({ events, onRsvp }) => {
  return (
    <div className="max-w-4xl mx-auto relative px-2 sm:px-margin-mobile">
      {/* Central Line: Left-4 on Mobile (<768px), Center on Desktop (md:left-1/2) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2"></div>
      
      <div className="space-y-10 md:space-y-16">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } md:items-center`}
            >
              {/* Event Card Side */}
              <div
                className={`w-full md:w-1/2 pl-10 md:pl-0 ${
                  isEven
                    ? 'md:pr-16 text-left md:text-right'
                    : 'md:pl-16 text-left'
                }`}
              >
                <div
                  className={`bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-md border-l-4 ${
                    isEven ? 'md:border-l-0 md:border-r-4' : 'border-l-4'
                  } border-secondary block w-full border border-surface-variant`}
                >
                  {/* Mobile Date Tag */}
                  <span className="md:hidden inline-block px-2.5 py-0.5 bg-surface-container rounded-full text-xs font-bold text-secondary tracking-wider uppercase mb-2">
                    {event.date}
                  </span>

                  <h4 className="font-display font-bold text-lg text-primary mb-1 leading-snug break-words">
                    {event.title}
                  </h4>
                  <p className="text-on-surface-variant text-xs mb-4 leading-relaxed">
                    {event.venue} • {event.time}
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full sm:w-auto text-xs py-2.5 px-6 rounded-full uppercase tracking-wider font-semibold"
                    onClick={() => onRsvp && onRsvp(event)}
                  >
                    RSVP NOW
                  </Button>
                </div>
              </div>

              {/* Central Gold Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-auto w-5 h-5 rounded-full bg-white border-4 border-secondary z-10 shadow-sm"></div>

              {/* Desktop Date Display Side */}
              <div
                className={`hidden md:block md:w-1/2 ${
                  isEven ? 'pl-16 text-left' : 'pr-16 text-right'
                }`}
              >
                <span className="font-display text-4xl text-primary/30 font-bold">
                  {event.date}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
