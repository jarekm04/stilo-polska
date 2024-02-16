import { Link } from 'react-router-dom';
import { Building2, Copyright, Facebook, Home, Mail, MapPin, Phone, Smartphone, Youtube } from 'lucide-react';

export const Contact = () => {
  return (
    <section className="flex flex-col bg-slate-500">
      <div className="bg-contact h-[300px] w-full bg-cover bg-center sm:h-[450px] xl:h-[600px]" />
      <article className="grid grid-rows-2 gap-4 bg-slate-500 px-0 py-6 text-sm font-normal text-white md:grid-cols-2 md:grid-rows-1 md:px-10">
        <div className="flex flex-col gap-7 place-self-center px-4 md:place-self-center">
          <div className="flex flex-col gap-2">
            <p className="flex gap-3">
              <MapPin className="text-custom-tertiary" />
              Biuro: ul. Kołobrzeska 28, 80-001 Gdańsk Przymorze
            </p>
            <a className="flex gap-3" href="mailto:biuro@stilopolska.pl">
              <Mail className="text-custom-tertiary" />
              biuro@stilopolska.pl
            </a>
            <p className="flex gap-3">
              <Building2 className="text-custom-tertiary" />
              NIP: 584-10-22-801, REGON: 190047741
            </p>
            <a className="flex gap-3" href="tel:+48585126999">
              <Phone className="text-custom-tertiary" />
              58 512-69-99
            </a>
            <a className="flex gap-3" href="tel:+48609540763">
              <Smartphone className="text-custom-tertiary" />
              Jerzy Kruczkowski: (+48) 609-540-763
            </a>
            <a className="flex gap-3" href="tel:+48693463207">
              <Smartphone className="text-custom-tertiary" />
              Konrad Przechlewski: (+48) 693-463-207
            </a>
            <a className="flex gap-3" href="tel:+48601613525">
              <Smartphone className="text-custom-tertiary" />
              Cezariusz Przechlewski: (+48) 601-613-525
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex gap-3 font-semibold">
              <Home className="text-custom-tertiary" />
              Godziny otwarcia:
            </p>
            <p className="pl-9">
              <strong>Poniedziałek - czwartek: </strong>8.00 - 16.30
            </p>
            <p className="pl-9">
              <strong>Piątek: </strong>8.00 - 15.00
            </p>
            <p className="pl-9">
              <strong>Weekendy: </strong>Zamknięte
            </p>
          </div>
          <div className="flex gap-6">
            <Link className="flex gap-3" to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs" target="_blank">
              <Facebook className="text-custom-tertiary" /> Facebook
            </Link>
            <Link className="flex gap-3" to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank">
              <Youtube className="text-custom-tertiary" /> Youtube
            </Link>
          </div>
          <p className="flex items-center gap-1 text-xs">
            <Copyright className="h-4" />
            2024 STILO POLSKA
          </p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2322.43922086986!2d18.58132261587419!3d54.40221948021385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd752a03e0754d%3A0x8792e0b75e4d17fc!2sSTILO+POLSKA!5e0!3m2!1spl!2spl!4v1531332049002"
          width="100%"
          height="110%"
          allowFullScreen
          className="mt-0 md:-mt-16"
        />
      </article>
    </section>
  );
};
