import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Youtube, Facebook } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { navigation } from '@/lib/utils';
import logoImage from '@/assets/logo-removedbg.png';
import logoImageBg from '@/assets/logo-edit.png';

const linkClasses = (isScrolled: boolean, isHome: boolean) =>
  `${navigationMenuTriggerStyle()} ${
    isHome
      ? isScrolled
        ? 'text-custom-secondary hover:text-custom-tertiary'
        : 'text-slate-100 hover:text-custom-ninth'
      : 'text-custom-secondary hover:text-custom-tertiary'
  } pt-1 font-semibold`;

const spanClasses =
  'from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1.5 transition-all duration-500 ease-out hover:bg-[length:100%_2px]';

const spanClassesActive =
  'from-custom-tertiary to-custom-tertiary bg-gradient-to-r bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-1.5 transition-all duration-500 ease-out';

const iconClasses = (isScrolled: boolean, isHome: boolean) =>
  `${navigationMenuTriggerStyle()} ${
    isHome
      ? isScrolled
        ? 'text-custom-secondary hover:text-custom-tertiary'
        : 'text-slate-100 hover:text-custom-ninth'
      : 'text-custom-secondary hover:text-custom-tertiary'
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

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-30 flex h-20 w-full items-center justify-between overflow-hidden drop-shadow-lg transition-all duration-500 ${isHome ? 'bg-transparent' : 'bg-white'}`}
    >
      {isHome && (
        <div
          className={`absolute inset-0 transform bg-white transition-transform duration-500 ease-in-out ${isScrolled ? 'translate-x-0' : '-translate-x-full'}`}
        />
      )}
      <div className="relative z-10 flex items-center">
        <Link to="/" className="flex min-w-[190px] items-center transition-transform duration-200 hover:scale-105">
          <img
            src={logoImageBg}
            alt="Logo"
            className={`absolute left-0 top-0 h-16 w-[190px] transition-all duration-500 ease-in-out ${!isScrolled && isHome ? '' : '-translate-x-full'}`}
          />
          <img src={logoImage} alt="Logo" className={`h-16 pl-3 transition-all duration-500 ease-in-out ${!isScrolled && isHome ? '-translate-x-full' : ''}`} />
        </Link>
      </div>
      <NavigationMenu className="relative z-10 h-full">
        <NavigationMenuList className="h-20 gap-3 lg:gap-5">
          {navigation.map(({ path, title }) => (
            <NavigationMenuItem key={path} className="h-full">
              <Link to={path} className={linkClasses(isScrolled, isHome)} data-active={isActive(path)}>
                <span className={isActive(path) ? spanClassesActive : spanClasses}>{title}</span>
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
