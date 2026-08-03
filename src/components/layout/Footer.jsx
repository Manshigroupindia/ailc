import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Scale, Facebook, Instagram, Twitter, ShieldCheck, Copyright as CopyrightIcon } from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

export const Footer = () => {
  const { contact, branding } = useCmsData();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Rules & Regulation', href: '/rules-regulation' },
    { name: 'Activity Report', href: '/activity-report' },
    { name: 'Launching Session', href: '/about/launching-session' },
    { name: 'AILC Convention', href: '/ailc-convention' },
    { name: 'AILC Official Booklet', href: '/ailc' },
    { name: 'Patrons', href: '/patrons' },
    { name: 'Pledge', href: '/about/pledge' },
    { name: 'National Conference 2023', href: '/national-conference-2023' },
    { name: 'Media & Gallery', href: '/media' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Copyright & IP', href: '/copyright' },
  ];

  return (
    <footer id="footer" className="bg-[#000d25] text-white pt-16 pb-24 md:pb-8 border-t border-white/10 font-body">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
        {/* Column 1 & 2: About Us (Wide Column) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2.5 font-display text-2xl font-bold text-white">
            {branding?.footerLogoUrl || branding?.logoUrl ? (
              <img src={branding.footerLogoUrl || branding.logoUrl} alt={branding.organizationTitle || "AILC"} className="h-9 w-auto object-contain" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#ffe08d] flex items-center justify-center text-[#000d25]">
                <Scale className="w-5 h-5" />
              </div>
            )}
            <span>{branding?.organizationTitle || "AILC"}</span>
          </div>

          <div className="space-y-3 text-xs text-white/70 max-w-lg leading-relaxed">
            <p>
              The Retired Judges, Former Bureaucrats, Ex Police Officers, Prominent Intellectuals, Academicians, Noted Social and Political Activists of India have also been subscribing and patronising.
            </p>
            <p>
              AILC is an autonomous, self-help and Pan India Organisation of lawyers. It has been registered in the year 2020 as NGO under the nomenclature of "All India Practising Lawyers Council" in Delhi.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#ffe08d] pt-2">
            <Link to="/privacy-policy" className="hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/copyright" className="hover:underline flex items-center gap-1">
              <CopyrightIcon className="w-3.5 h-3.5" /> Copyright Notice
            </Link>
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h4 className="font-display text-sm font-bold text-white mb-6 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="hover:text-[#ffe08d] transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us & Follow Us */}
        <div className="space-y-6">
          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
            Contact Us
          </h4>

          <div className="space-y-4 text-xs text-white/80">
            <a
              href={contact?.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:text-[#ffe08d] transition-colors group"
            >
              <MapPin className="w-4 h-4 text-[#ffe08d] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="leading-relaxed">
                {contact?.address}
              </span>
            </a>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#ffe08d] flex-shrink-0" />
              <span>{contact?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#ffe08d] flex-shrink-0" />
              <span className="break-all">{contact?.email}</span>
            </div>
          </div>

          {/* Social Media "Follow Us" Section */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h5 className="font-display text-xs font-bold text-[#ffe08d] uppercase tracking-wider">
              Follow Us
            </h5>
            <div className="flex items-center gap-3">
              {contact?.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AILC on Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffe08d] text-white hover:text-[#000d25] flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {contact?.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AILC on Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffe08d] text-white hover:text-[#000d25] flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {contact?.twitter ? (
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AILC on Twitter"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffe08d] text-white hover:text-[#000d25] flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              ) : (
                <button
                  disabled
                  aria-label="X Twitter (Coming Soon)"
                  title="X Twitter (Coming Soon)"
                  className="w-10 h-10 rounded-full bg-white/5 text-white/40 flex items-center justify-center cursor-not-allowed border border-white/10"
                >
                  <Twitter className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 pt-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center text-[11px] text-white/60 space-y-2">
          <p>
            Copyright © 2023–2024 All India Lawyers Council. All Rights Reserved.
          </p>
          <p>
            Design by{' '}
            <a
              href="https://manshigroup.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffe08d] font-semibold hover:underline"
            >
              Manshi Group India
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
