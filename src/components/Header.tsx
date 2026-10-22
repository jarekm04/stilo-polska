import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Youtube, Facebook, Menu, X, Phone } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { navigation, cn } from '@/lib/utils';
import { setScrollLocked } from '@/lib/smoothScroll';
import logoImage from '@/assets/logo-removedbg.png';

/**
 * Nad zdjęciem hero logo pokazujemy w wersji monochromatycznej (białej) – granatowy
 * znak nie miałby kontrastu, a wariant z białą podkładką odcinał się od tła jako obcy kafelek.
 */
const logoClasses = (isTransparent: boolean) =>
  cn('w-auto transition-all duration-500 ease-smooth', isTransparent && 'brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]');

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  /** Na stronie głównej pasek jest przezroczysty aż do przewinięcia hero. */
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    /* pasek zostaje widoczny przez cały czas – kurczy się dopiero po opuszczeniu hero */
    const handleScroll = () => setIsScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Blokada przewijania tła przy otwartym menu mobilnym. */
  useEffect(() => {
    document.body.style.overflow = isMobileNavOpened ? 'hidden' : '';
    setScrollLocked(isMobileNavOpened);

    return () => {
      document.body.style.overflow = '';
      setScrollLocked(false);
    };
  }, [isMobileNavOpened]);

  useEffect(() => {
    setIsMobileNavOpened(false);
  }, [pathname]);

  const isActive = (path: string) => (path === '/' ? pathname === path : pathname.startsWith(path));

  const navLinkClasses = cn(
    'link-underline relative px-1 py-1 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
    isTransparent ? 'text-white/85 hover:text-white' : 'text-ink/70 hover:text-brand',
  );

  const iconLinkClasses = cn(
    'flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5',
    isTransparent
      ? 'border-white/25 text-white/85 hover:border-white/60 hover:text-white'
      : 'border-ink/10 text-ink/60 hover:border-brand/40 hover:bg-brand-soft hover:text-brand',
  );

  return (
    <>
      <header
        data-title="desktop-nav"
        className={cn(
          'fixed left-0 top-0 z-40 hidden w-full transition-[height,background-color,box-shadow] duration-500 ease-smooth lg:block',
          isTransparent ? 'h-24 bg-gradient-to-b from-black/45 to-transparent' : 'glass h-[4.5rem] border-b border-ink/[0.07] shadow-soft',
        )}
      >
        <div className="shell flex h-full items-center justify-between gap-8 px-6 xl:px-10">
          <Link to="/" className="group flex items-center" aria-label="Stilo Polska – strona główna">
            <img src={logoImage} alt="Stilo Polska" className={cn(logoClasses(isTransparent), isTransparent ? 'h-14' : 'h-12', 'group-hover:scale-[1.04]')} />
          </Link>

          <NavigationMenu className="flex-none">
            <NavigationMenuList className="gap-7 xl:gap-9">
              {navigation.map(({ path, title }) => (
                <NavigationMenuItem key={path}>
                  <Link to={path} className={navLinkClasses} data-active={isActive(path)}>
                    {title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <Link
              to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
              target="_blank"
              aria-label="Facebook"
              className={iconLinkClasses}
            >
              <Facebook className="h-[18px] w-[18px]" />
            </Link>
            <Link to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank" aria-label="YouTube" className={iconLinkClasses}>
              <Youtube className="h-[18px] w-[18px]" />
            </Link>
            <a
              href="tel:+48585126999"
              className={cn(
                'ml-2 inline-flex h-10 items-center gap-2 rounded-full px-5 text-[0.8rem] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5',
                isTransparent ? 'bg-white/95 text-ink hover:bg-white' : 'bg-brand text-white shadow-brand hover:bg-brand-dark',
              )}
            >
              <Phone className="h-4 w-4" />
              58 512-69-99
            </a>
          </div>
        </div>
      </header>

      <header data-title="mobile-nav" className="fixed left-0 top-0 z-40 w-full lg:hidden">
        <nav
          className={cn(
            'flex items-center justify-between px-4 py-2 transition-colors duration-500 ease-smooth',
            isTransparent ? 'bg-gradient-to-b from-black/50 to-transparent' : 'glass border-b border-ink/[0.07] shadow-soft',
          )}
        >
          <Link to="/" aria-label="Stilo Polska – strona główna">
            <img src={logoImage} alt="Stilo Polska" className={cn(logoClasses(isTransparent), 'h-12')} />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Otwórz menu"
            className={cn(
              'rounded-full border transition-all',
              isTransparent ? 'border-white/25 bg-white/10 text-white hover:bg-white/20' : 'border-ink/10 bg-white text-ink hover:bg-brand-soft hover:text-brand',
            )}
            onClick={() => setIsMobileNavOpened(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </nav>

        <div className={cn('fixed inset-0 z-50', isMobileNavOpened ? 'visible' : 'invisible')}>
          <div
            className={cn('absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500', isMobileNavOpened ? 'opacity-100' : 'opacity-0')}
            onClick={() => setIsMobileNavOpened(false)}
          />
          <nav
            className={cn(
              'absolute bottom-0 right-0 top-0 flex w-[85%] max-w-sm flex-col bg-cream px-7 py-6 shadow-lift transition-transform duration-500 ease-smooth',
              isMobileNavOpened ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            <div className="mb-10 flex items-center justify-between">
              <Link to="/" onClick={() => setIsMobileNavOpened(false)}>
                <img src={logoImage} alt="Stilo Polska" className="h-14 w-auto" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Zamknij menu"
                className="rounded-full text-ink/50 hover:bg-brand-soft hover:text-brand"
                onClick={() => setIsMobileNavOpened(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ul className="flex flex-col">
              {navigation.map(({ title, path }, index) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setIsMobileNavOpened(false)}
                    className={cn(
                      'flex items-baseline gap-4 border-b border-ink/[0.07] py-4 font-display text-2xl transition-colors duration-300',
                      isActive(path) ? 'text-brand' : 'text-ink hover:text-brand',
                    )}
                  >
                    <span className="font-montserrat text-[0.65rem] font-semibold tracking-[0.2em] text-brand/50">0{index + 1}</span>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-5 pt-8">
              <a href="tel:+48585126999" className="inline-flex items-center gap-3 text-sm font-semibold text-ink">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Phone className="h-4 w-4" />
                </span>
                58 512-69-99
              </a>
              <div className="flex gap-3">
                <Link
                  to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
                  target="_blank"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <Facebook className="h-[18px] w-[18px]" />
                </Link>
                <Link
                  to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA"
                  target="_blank"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <Youtube className="h-[18px] w-[18px]" />
                </Link>
              </div>
              <p className="text-[0.7rem] tracking-wide text-ink/40">Stilo Polska © 2024</p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
