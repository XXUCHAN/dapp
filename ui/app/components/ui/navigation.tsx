import { Link } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { Button } from './button';
export default function Navigation() {
  return (
    <nav className="fixed top-0 right-0 left-0">
      <div className="flex w-screen items-center justify-between py-5 px-5">
        <Link to="/" className="text-lg font-bold">
          DESTAT
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>Dashboard</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Survey</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b no-underline outline-hidden select-none focus:shadow-md"
                        href="/"
                      >
                        <p className="text-muted-foreground text-sm leading-tight">
                          Beautifully designed components built with Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/survey/all">
                        <div className="text-sm leading-none font-medium">All Surveys</div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          List all surveys
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/">
                        <div className="text-sm leading-none font-medium">Create Survey</div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          Create Survey
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Archive</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b no-underline outline-hidden select-none focus:shadow-md"
                        href="/"
                      >
                        <p className="text-muted-foreground text-sm leading-tight">
                          Beautifully designed components built with Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/">
                        <div className="text-sm leading-none font-medium">Finished Survey</div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          Finished Survey
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b no-underline outline-hidden select-none focus:shadow-md"
                        href="/"
                      >
                        <p className="text-muted-foreground text-sm leading-tight">
                          Beautifully designed components built with Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/">
                        <div className="text-sm leading-none font-medium">My Surveys</div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          My Surveys
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/">
                        <div className="text-sm leading-none font-medium">My Responses</div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          My Responses
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button>Connect</Button>
      </div>
    </nav>
  );
}
