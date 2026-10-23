import { Link } from 'react-router-dom';
import { Building2, Clock, Facebook, Mail, MapPin, Phone, Smartphone, Youtube } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import logoImage from '@/assets/logo-removedbg.png';
import contactImage from '@/assets/contact.webp';

const people = [
  { name: 'Jerzy Kruczkowski', phone: '(+48) 609-540-763', href: 'tel:+48609540763' },
  { name: 'Konrad Przechlewski', phone: '(+48) 693-463-207', href: 'tel:+48693463207' },
  { name: 'Cezariusz Przechlewski', phone: '(+48) 601-613-525', href: 'tel:+48601613525' },
];

const hours = [
  { days: 'Poniedziałek – czwartek', time: '8.00 – 16.30' },
  { days: 'Piątek', time: '8.00 – 15.00' },
  { days: 'Weekendy', time: 'Zamknięte' },
];

const socialClasses =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white';

export const Contact = () => {
  return (
    <section className="flex min-h-screen flex-col bg-cream">
      <PageHero eyebrow="Kontakt" title="Porozmawiajmy o Twoim domu" image={contactImage}>
        <p className="text-sm font-light leading-relaxed sm:text-base">
          Przyślij nam projekt lub po prostu zadzwoń – przygotujemy projekt technologiczny i wycenę.
        </p>
      </PageHero>

      <div className="shell grid gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:px-12 lg:py-20">
        {/* dane kontaktowe zostają na widoku, kiedy obok przewija się mapa i zdjęcie */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-8 rounded-2xl border border-ink/[0.07] bg-white p-7 shadow-soft sm:p-9">
            <img src={logoImage} alt="Stilo Polska" className="h-16 w-auto self-start" />

            <div className="flex flex-col gap-4">
              <p className="flex gap-4 text-sm text-ink/75">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                <span>ul. Kołobrzeska 28, 80-001 Gdańsk Przymorze</span>
              </p>
              <a href="mailto:biuro@stilopolska.pl" className="flex gap-4 text-sm text-ink/75 transition-colors hover:text-brand">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                biuro@stilopolska.pl
              </a>
              <a href="tel:+48585126999" className="flex gap-4 text-sm font-semibold text-ink transition-colors hover:text-brand">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                58 512-69-99
              </a>
              <p className="flex gap-4 text-sm text-ink/75">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                <span>NIP: 584-10-22-801, REGON: 190047741</span>
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-ink/[0.07] pt-7">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">Zadzwoń bezpośrednio</h2>
              {people.map(({ name, phone, href }) => (
                <a key={href} href={href} className="group flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-soft">
                  <span className="flex items-center gap-3 text-sm text-ink/75">
                    <Smartphone className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                    {name}
                  </span>
                  <span className="text-sm font-semibold text-ink transition-colors group-hover:text-brand">{phone}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-ink/[0.07] pt-7">
              <h2 className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">
                <Clock className="h-3.5 w-3.5" />
                Godziny otwarcia
              </h2>
              {hours.map(({ days, time }) => (
                <p key={days} className="flex items-center justify-between text-sm">
                  <span className="font-light text-ink/60">{days}</span>
                  <span className="font-medium text-ink">{time}</span>
                </p>
              ))}
            </div>

            <div className="mt-auto flex gap-3 pt-2">
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
        </Reveal>

        <div className="flex flex-col gap-8">
          {/* mapa w ciemnej ramce – kolorowy kafelek Google przestaje wypadać z palety */}
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl bg-ink p-2.5 shadow-soft">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cream/70">Znajdź nas</span>
                <span className="text-[0.65rem] font-light text-cream/55">Gdańsk Przymorze</span>
              </div>
              <iframe
                title="Lokalizacja Stilo Polska"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2322.43922086986!2d18.58132261587419!3d54.40221948021385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd752a03e0754d%3A0x8792e0b75e4d17fc!2sSTILO+POLSKA!5e0!3m2!1spl!2spl!4v1531332049002"
                width="100%"
                height="380"
                loading="lazy"
                allowFullScreen
                className="block rounded-xl"
              />
            </div>
          </Reveal>

          {/* zwykły <img> zamiast tła CSS – dzięki temu przeglądarka pobiera zdjęcie od razu */}
          <Reveal delay={180} className="flex-1">
            <div className="h-full overflow-hidden rounded-2xl shadow-soft">
              <img src={contactImage} alt="Biuro Stilo Polska" className="h-full min-h-[300px] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
