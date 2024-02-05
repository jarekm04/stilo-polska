import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Facebook } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import logoImage from '@/assets/logo-edit2.png';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-30 flex h-16 w-full items-center justify-between overflow-hidden backdrop-blur-sm">
      <div
        className={`absolute inset-0 transform bg-[#dddddddd] transition-transform duration-500 ease-in-out ${isScrolled ? 'translate-x-0' : '-translate-x-full'}`}
      />
      <div className="relative z-10 flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="Logo" className="h-16" />
        </Link>
      </div>
      <NavigationMenu className="relative z-10">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/about" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}>
              O nas
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/offer" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}>
              Oferta
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/realizations" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}>
              Nasze realizacje
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/video" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}>
              Video
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/technology" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}>
              Technologia
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/contact" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}>
              Kontakt
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
              target="_blank"
              className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}
            >
              <Facebook />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA"
              target="_blank"
              className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-primary' : 'text-custom-primary'}`}
            >
              <Youtube />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
