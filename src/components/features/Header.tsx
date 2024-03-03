import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Youtube, Facebook, Menu, X } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
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
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
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

  const handleMobileNav = () => {
    setIsMobileNavOpened((prev) => !prev);
  };

  return (
    <>
      <>
        <header
          className={`fixed left-0 top-0 z-30 hidden h-20 w-full items-center justify-between overflow-hidden drop-shadow-lg transition-all duration-500 lg:flex ${isHome ? 'bg-transparent' : 'bg-white'}`}
          data-title="desktop-nav"
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
              <img
                src={logoImage}
                alt="Logo"
                className={`h-16 pl-3 transition-all duration-500 ease-in-out ${!isScrolled && isHome ? '-translate-x-full' : ''}`}
              />
            </Link>
          </div>
          <NavigationMenu className="relative z-10 h-full">
            <NavigationMenuList className="h-20 gap-5 2xl:gap-8">
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
      </>
      <>
        <header className="fixed left-0 top-0 z-30 w-full drop-shadow-lg lg:hidden" data-title="mobile-nav">
          <nav className="relative flex items-center justify-between bg-white pr-4 py-2">
            <Link to="/" className="transition-transform duration-200 hover:scale-105">
              <img src={logoImageBg} alt="Logo" className="h-14" />
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="transition-all bg-custom-secondary text-white hover:border-custom-tertiary hover:bg-orange-50 hover:text-custom-tertiary"
              onClick={handleMobileNav}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </nav>
          <div className={`relative z-50 h-screen ${isMobileNavOpened ? 'block' : 'hidden'}`}>
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-75" onClick={handleMobileNav} />
            <nav className={`animate-slideIn fixed bg-white bottom-0 left-0 top-0 flex w-5/6 max-w-sm flex-col overflow-y-auto border-r px-6 py-6`}>
              <div className="mb-8 flex items-center justify-between">
                <Link to="/" className="transition-transform duration-200 hover:scale-105">
                  <img src={logoImage} alt="Logo" className="h-16" />
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none transition-all hover:bg-orange-50 hover:text-custom-tertiary"
                  onClick={handleMobileNav}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div>
                <ul>
                  {navigation.map(({ title, path }) => (
                    <li key={path} className="mb-1">
                      <Link
                        to={path}
                        className={`block rounded p-4 text-sm font-semibold ${isActive(path) ? 'bg-slate-100 text-custom-fifth' : 'text-custom-secondary'} hover:bg-orange-50 hover:text-custom-tertiary`}
                        onClick={handleMobileNav}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <p className="my-4 text-center text-xs text-gray-400">
                  <span>Stilo © 2024</span>
                </p>
              </div>
            </nav>
          </div>
        </header>
      </>
    </>
  );
};
