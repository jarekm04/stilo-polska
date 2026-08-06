import { Building2, Clock, Facebook, Mail, MapPin, Phone, Smartphone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navigation } from '@/lib/utils';
import logoImage from '@/assets/logo-removedbg.png';

const contacts = [
  { icon: Smartphone, label: 'Jerzy Kruczkowski', value: '(+48) 609-540-763', href: 'tel:+48609540763' },
  { icon: Smartphone, label: 'Konrad Przechlewski', value: '(+48) 693-463-207', href: 'tel:+48693463207' },
  { icon: Smartphone, label: 'Cezariusz Przechlewski', value: '(+48) 601-613-525', href: 'tel:+48601613525' },
];

const hours = [
  { days: 'Poniedziałek – czwartek', time: '8.00 – 16.30' },
  { days: 'Piątek', time: '8.00 – 15.00' },
  { days: 'Weekendy', time: 'Zamknięte' },
];

const socialClasses =
  'flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-[110px]" />

      <div className="shell relative px-5 pb-8 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* marka */}
          <div className="flex flex-col gap-5">
            {/* na ciemnym tle logo w wersji monochromatycznej – bez białej podkładki */}
            <img src={logoImage} alt="Stilo Polska" className="h-14 w-auto self-start brightness-0 invert" />
            <p className="max-w-xs text-sm font-light leading-relaxed text-cream/55">
              Producent domów z bala od 2004 roku. Realizujemy technologicznie skomplikowane projekty w całej Polsce i Europie.
            </p>
            <div className="mt-1 flex gap-3">
              <Link
                to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
                target="_blank"
                aria-label="Facebook"
                className={socialClasses}
              >
                <Facebook className="h-[18px] w-[18px]" />
              </Link>
              <Link to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank" aria-label="YouTube" className={socialClasses}>
                <Youtube className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </div>

          {/* kontakt */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">Kontakt</h3>
            <p className="flex gap-3 text-sm font-light text-cream/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand/70" />
              <span>ul. Kołobrzeska 28, 80-001 Gdańsk Przymorze</span>
            </p>
            <a href="mailto:biuro@stilopolska.pl" className="flex gap-3 text-sm font-light text-cream/70 transition-colors hover:text-brand">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand/70" />
              biuro@stilopolska.pl
            </a>
            <a href="tel:+48585126999" className="flex gap-3 text-sm font-light text-cream/70 transition-colors hover:text-brand">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand/70" />
              58 512-69-99
            </a>
            <p className="flex gap-3 text-sm font-light text-cream/70">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-brand/70" />
              <span>
                NIP: 584-10-22-801
                <br />
                REGON: 190047741
              </span>
            </p>
          </div>

          {/* zespół */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">Zadzwoń do nas</h3>
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <a key={href} href={href} className="group flex gap-3 text-sm transition-colors">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand/70" />
                <span className="flex flex-col">
                  <span className="font-light text-cream/50">{label}</span>
                  <span className="font-medium text-cream/80 transition-colors group-hover:text-brand">{value}</span>
                </span>
              </a>
            ))}
          </div>

          {/* godziny + nawigacja */}
          <div className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">
              <Clock className="h-3.5 w-3.5" />
              Godziny otwarcia
            </h3>
            {hours.map(({ days, time }) => (
              <p key={days} className="flex flex-col text-sm">
                <span className="font-light text-cream/50">{days}</span>
                <span className="font-medium text-cream/80">{time}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-5 border-t border-cream/10 pt-6 sm:flex-row">
          <p className="text-xs font-light text-cream/40">© 2024 Stilo Polska. Wszelkie prawa zastrzeżone.</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigation.map(({ path, title }) => (
              <Link key={path} to={path} className="text-xs font-light text-cream/50 transition-colors hover:text-brand">
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
