import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Youtube, Facebook } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { navigation } from '@/lib/utils';
import logoImage from '@/assets/logo-edit2.png';

const linkClasses = (isScrolled: boolean, isHome: boolean) =>
  `${navigationMenuTriggerStyle()} ${
    isHome
      ? isScrolled
        ? 'text-custom-ninth hover:text-custom-tertiary'
        : 'text-slate-100 hover:text-custom-ninth'
      : 'text-custom-ninth hover:text-custom-tertiary'
  } mt-1.5 font-semibold`;

const spanClasses =
  'from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1.5 transition-all duration-500 ease-out hover:bg-[length:100%_2px]';

const iconClasses = (isScrolled: boolean, isHome: boolean) =>
  `${navigationMenuTriggerStyle()} ${
    isHome
      ? isScrolled
        ? 'text-custom-ninth hover:text-custom-tertiary'
        : 'text-slate-100 hover:text-custom-ninth'
      : 'text-custom-ninth hover:text-custom-tertiary'
  }`;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === '/';

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
    <header
      className={`${isHome ? 'fixed' : 'block'}left-0 top-0 z-30 flex h-16 w-full items-center justify-between overflow-hidden transition-all duration-500 ${isHome ? 'bg-transparent' : 'bg-slate-500'}`}
    >
      <div
        className={`absolute inset-0 transform bg-slate-500 opacity-95 transition-transform duration-500 ease-in-out ${isScrolled ? 'translate-x-0' : '-translate-x-full'}`}
      />
      <div className="relative z-10 flex items-center">
        <Link to="/" className="flex items-center transition-transform duration-200 hover:scale-105">
          <img src={logoImage} alt="Logo" className="h-16" />
        </Link>
      </div>
      <NavigationMenu className="relative z-10 h-full">
        <NavigationMenuList>
          {navigation.map(({ path, title }) => (
            <NavigationMenuItem key={path}>
              <Link to={path} className={linkClasses(isScrolled, isHome)} data-active={pathname === path ? true : false}>
                <span className={spanClasses}>{title}</span>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <Link
              to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
              target="_blank"
              className={iconClasses(isScrolled, isHome)}
            >
              <Facebook />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank" className={iconClasses(isScrolled, isHome)}>
              <Youtube />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
