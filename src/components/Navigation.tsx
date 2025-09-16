import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpen, Code, Home, Moon, Sun, Users, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'হোম', icon: Home },
    { path: '/read', label: 'হাদিস পড়ুন', icon: BookOpen },
    { path: '/favorites', label: 'পছন্দের তালিকা', icon: Star },
    { path: '/api', label: 'API', icon: Code },
    { path: '/about', label: 'সম্পর্কে', icon: Users },
  ];

  const NavLink = ({ path, children, className }: { path: string, children: React.ReactNode, className?: string }) => {
    const isActive = location.pathname === path;
    return (
      <Link to={path} onClick={() => setIsOpen(false)}>
        <Button variant={isActive ? "default" : "ghost"} className={cn("w-full", className)}>
          {children}
        </Button>
      </Link>
    );
  };

  return (
    <nav className="bg-card border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
            <div className="bg-gradient-primary p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary font-bengali">
                হাদিস বাংলা
              </h1>
              <p className="text-xs text-muted-foreground font-bengali">
                ৬টি প্রধান হাদিস গ্রন্থ
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.path} path={item.path} className="font-bengali transition-smooth">
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </NavLink>
              );
            })}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-2 mt-8">
                  <div className="text-center pb-4 border-b mb-4">
                    <h2 className="text-xl font-bold text-gradient-primary font-bengali">
                      হাদিস বাংলা
                    </h2>
                    <p className="text-sm text-muted-foreground font-bengali">
                      ৬টি প্রধান হাদিস গ্রন্থ
                    </p>
                  </div>
                  
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink key={item.path} path={item.path} className="justify-start font-bengali text-lg py-6">
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </NavLink>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};