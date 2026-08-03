import React from 'react';
import { MapPin, Phone, Mail, Map, ExternalLink, Navigation } from 'lucide-react';
import { contactInfoData, OFFICIAL_GOOGLE_MAP_URL } from '@/data/mockData';
import { ContactForm } from '../ui/ContactForm';

export const ContactSection = () => {
  const { phone, email } = contactInfoData;

  const mapBgUrl =
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200';

  return (
    <section id="contact" className="py-10 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Side: Secretariat Details */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3 sm:mb-4">
                Contact Us
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-xl">
                Have queries regarding membership or council activities? Our national secretariat is here to assist you.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Premium Map-Styled National Secretariat Address Card */}
              <a
                href={OFFICIAL_GOOGLE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden rounded-2xl p-5 sm:p-7 border border-surface-variant shadow-premium group cursor-pointer block transition-all hover:border-primary"
              >
                {/* Background Map Image with Hover Zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-[1px] group-hover:scale-105 transition-transform duration-700 z-0"
                  style={{ backgroundImage: `url('${mapBgUrl}')` }}
                />

                {/* Dark Glass / Gradient Overlay for High Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/85 z-0" />

                {/* Card Content & Icon above overlay */}
                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="space-y-1.5 flex-1 w-full min-w-0">
                    <h4 className="font-display font-bold text-base sm:text-lg text-primary flex items-center gap-2 group-hover:text-secondary transition-colors">
                      National Secretariat
                      <ExternalLink className="w-4 h-4 text-outline flex-shrink-0" />
                    </h4>
                    <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed font-body font-medium break-words">
                      A-15 (Back Side, Ground Floor)
                      <br />
                      Hazrat Nizamuddin West
                      <br />
                      New Delhi
                    </p>
                  </div>
                </div>
              </a>

              {/* Phone & Fax Card */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-variant">
                <div className="w-10 h-10 rounded-xl bg-[#000d25]/5 text-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="font-display font-bold text-sm sm:text-base text-primary">
                    Phone & Fax
                  </h4>
                  <p className="text-on-surface-variant text-xs sm:text-sm break-all sm:break-normal font-medium">{phone}</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-variant">
                <div className="w-10 h-10 rounded-xl bg-[#000d25]/5 text-secondary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="font-display font-bold text-sm sm:text-base text-primary">Email</h4>
                  <p className="text-on-surface-variant text-xs sm:text-sm break-all font-medium">{email}</p>
                </div>
              </div>
            </div>

            {/* Premium Interactive Map Card */}
            <a
              href={OFFICIAL_GOOGLE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[220px] sm:min-h-[240px] rounded-2xl overflow-hidden shadow-premium border border-surface-variant relative group cursor-pointer hover:border-primary transition-all p-6 text-center flex flex-col items-center justify-center"
            >
              {/* Background Map Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px] group-hover:scale-105 transition-transform duration-700 z-0"
                style={{ backgroundImage: `url('${mapBgUrl}')` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d25]/95 via-[#000d25]/80 to-[#000d25]/65 z-0" />

              {/* Foreground Content */}
              <div className="relative z-10 space-y-3 text-white max-w-md mx-auto">
                <Map className="w-10 h-10 sm:w-12 sm:h-12 text-[#ffe08d] mx-auto group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-display font-bold text-white text-sm sm:text-base block">
                    AILC National Secretariat Map
                  </span>
                  <span className="text-xs text-white/80 block mt-1 leading-normal px-2">
                    A-15 (Back Side, Ground Floor), Hazrat Nizamuddin West, New Delhi
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ffe08d] text-[#000d25] text-xs font-bold rounded-full uppercase tracking-wider transition-all shadow-md group-hover:scale-105">
                  <Navigation className="w-3.5 h-3.5" /> GET DIRECTIONS
                </span>
              </div>
            </a>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full min-w-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
