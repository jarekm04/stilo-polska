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
    <header className="fixed left-0 top-0 z-30 flex h-16 w-full items-center justify-between overflow-hidden backdrop-blur-md">
      <div
        className={`absolute inset-0 transform bg-[#dddddddd] transition-transform duration-500 ease-in-out ${isScrolled ? 'translate-x-0' : '-translate-x-full'}`}
      />
      <div className="relative z-10 flex items-center">
        <Link to="/" className="flex items-center transition-transform duration-200 hover:scale-105">
          <img src={logoImage} alt="Logo" className="h-16" />
        </Link>
      </div>
      <NavigationMenu className="relative z-10">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/about" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} mt-1.5`}>
              <span className="from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px] pb-1.5">
                O nas
              </span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/offer" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} mt-1.5`}>
              <span className="from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px] pb-1.5">
                Oferta
              </span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/realizations" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} mt-1.5`}>
              <span className="from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px] pb-1.5">
                Nasze realizacje
              </span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/video" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} mt-1.5`}>
              <span className="from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px] pb-1.5">
                Video
              </span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/technology" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} mt-1.5`}>
              <span className="from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px] pb-1.5">
                Technologia
              </span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/contact" className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} mt-1.5`}>
              <span className="from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px] pb-1.5">
                Kontakt
              </span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
              target="_blank"
              className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} hover:text-custom-tertiary`}
            >
              <Facebook />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA"
              target="_blank"
              className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-custom-secondary' : 'text-custom-primary'} hover:text-custom-tertiary`}
            >
              <Youtube />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
