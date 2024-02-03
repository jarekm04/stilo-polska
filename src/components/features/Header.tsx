import { Youtube, Facebook } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="flex justify-between">
      <Link to="/">STILO</Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/about" className={navigationMenuTriggerStyle()}>
              O nas
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/offer" className={navigationMenuTriggerStyle()}>
              Oferta
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/realizations" className={navigationMenuTriggerStyle()}>
              Nasze realizacje
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/video" className={navigationMenuTriggerStyle()}>
              Video
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/technology" className={navigationMenuTriggerStyle()}>
              Technologia
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/contact" className={navigationMenuTriggerStyle()}>
              Kontakt
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
              target="_blank"
              className={navigationMenuTriggerStyle()}
            >
              <Facebook />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank" className={navigationMenuTriggerStyle()}>
              <Youtube />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
