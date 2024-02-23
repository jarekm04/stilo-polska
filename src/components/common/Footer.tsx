import { Building2, Copyright, Facebook, Home, Mail, MapPin, Phone, Smartphone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <div className="flex justify-around gap-4 bg-slate-500 px-10 pt-10 pb-6 text-sm font-light text-white">
        <div className="flex flex-col gap-2">
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
          <div className="mt-4 flex gap-5">
            <Link className="flex gap-3" to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs" target="_blank">
              <Facebook /> Facebook
            </Link>
            <Link className="flex gap-3" to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank">
              <Youtube /> Youtube
            </Link>
          </div>
          <p className="mt-10 flex gap-1 text-xs">
            <Copyright className="h-4" />
            2024 STILO POLSKA
          </p>
        </div>
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
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
    </footer>
  );

// export const Footer = () => {
//   return (
//     <footer>
//       <div className="bg-orange-50">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="-mb-16">
//           <path
//             fill="#64748b"
//             fillOpacity="1"
//             d="M0,192L48,186.7C96,181,192,171,288,154.7C384,139,480,117,576,117.3C672,117,768,139,864,170.7C960,203,1056,245,1152,245.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           />
//         </svg>
//       </div>
//       <div className="flex justify-around gap-4 bg-slate-500 px-5 pb-6 text-sm font-light text-white">
//         <div className="flex flex-col gap-2">
//           <p className="flex gap-3">
//             <MapPin />
//             Biuro: ul. Kołobrzeska 28, 80-001 Gdańsk Przymorze
//           </p>
//           <a className="flex gap-3" href="mailto:biuro@stilopolska.pl">
//             <Mail />
//             biuro@stilopolska.pl
//           </a>
//           <p className="flex gap-3">
//             <Building2 />
//             NIP: 584-10-22-801, REGON: 190047741
//           </p>
//           <div className="mt-4 flex gap-5">
//             <Link className="flex gap-3" to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs" target="_blank">
//               <Facebook /> Facebook
//             </Link>
//             <Link className="flex gap-3" to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank">
//               <Youtube /> Youtube
//             </Link>
//           </div>
//           <p className="mt-10 flex gap-1 text-xs">
//             <Copyright className="h-4" />
//             2024 STILO POLSKA
//           </p>
//         </div>
//         <div className="flex flex-col gap-2 self-center">
//           <a className="flex gap-3" href="tel:+48585126999">
//             <Phone />
//             58 512-69-99
//           </a>
//           <a className="flex gap-3" href="tel:+48609540763">
//             <Smartphone />
//             Jerzy Kruczkowski: (+48) 609-540-763
//           </a>
//           <a className="flex gap-3" href="tel:+48693463207">
//             <Smartphone />
//             Konrad Przechlewski: (+48) 693-463-207
//           </a>
//           <a className="flex gap-3" href="tel:+48601613525">
//             <Smartphone />
//             Cezariusz Przechlewski: (+48) 601-613-525
//           </a>
//         </div>
//         <div className="flex flex-col justify-center gap-2">
//           <p className="flex gap-3 font-semibold">
//             <Home />
//             Godziny otwarcia:
//           </p>
//           <p>
//             <strong>Poniedziałek - czwartek: </strong>8.00 - 16.30
//           </p>
//           <p>
//             <strong>Piątek: </strong>8.00 - 15.00
//           </p>
//           <p>
//             <strong>Weekendy: </strong>Zamknięte
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
};
