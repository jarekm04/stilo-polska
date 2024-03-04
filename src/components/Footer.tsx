import { Building2, Copyright, Facebook, Home, Mail, MapPin, Phone, Smartphone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-slate-500">
      <div className="grid grid-cols-1 gap-10 bg-slate-500 px-6 pb-6 pt-10 text-xs sm:text-sm font-normal text-white lg:grid-cols-3 lg:gap-6">
        <div className="grid grid-cols-1 items-center gap-x-10 gap-y-3 md:grid-cols-2 lg:mx-auto lg:flex lg:flex-col lg:items-start lg:gap-3">
          <p className="flex gap-3">
            <MapPin />
            Biuro: ul. Kołobrzeska 28, 80-001 Gdańsk Przymorze
          </p>
          <a className="flex gap-3" href="mailto:biuro@stilopolska.pl">
            <Mail />
            biuro@stilopolska.pl
          </a>
          <p className="flex gap-3">
            <Building2 />
            NIP: 584-10-22-801, REGON: 190047741
          </p>
          <div className="flex gap-5 lg:mt-4">
            <Link className="flex gap-3" to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs" target="_blank">
              <Facebook /> Facebook
            </Link>
            <Link className="flex gap-3" to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank">
              <Youtube /> Youtube
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center gap-x-10 gap-y-3 md:grid-cols-2 lg:mx-auto lg:flex lg:flex-col lg:items-start lg:gap-3">
          <a className="flex gap-3" href="tel:+48585126999">
            <Phone />
            58 512-69-99
          </a>
          <a className="flex gap-3" href="tel:+48609540763">
            <Smartphone />
            Jerzy Kruczkowski: (+48) 609-540-763
          </a>
          <a className="flex gap-3" href="tel:+48693463207">
            <Smartphone />
            Konrad Przechlewski: (+48) 693-463-207
          </a>
          <a className="flex gap-3" href="tel:+48601613525">
            <Smartphone />
            Cezariusz Przechlewski: (+48) 601-613-525
          </a>
        </div>
        <div className="flex flex-col gap-3 md:mx-auto">
          <p className="flex gap-3 font-semibold">
            <Home />
            Godziny otwarcia:
          </p>
          <p>
            <strong>Poniedziałek - czwartek: </strong>8.00 - 16.30
          </p>
          <p>
            <strong>Piątek: </strong>8.00 - 15.00
          </p>
          <p>
            <strong>Weekendy: </strong>Zamknięte
          </p>
        </div>
      </div>
      <p className="my-3 flex gap-1 bg-slate-500 text-xs text-white">
        <Copyright className="h-4" />
        2024 STILO POLSKA
      </p>
    </footer>
  );
};
