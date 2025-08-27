import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <Building className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-secondary">Multi Business Corporation</h1>
              <p className="text-sm md:text-base text-gray-600">Excellence in Business Services</p>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            className="md:hidden text-secondary ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="text-xl" />
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-4 md:space-x-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className={`font-medium px-4 md:px-6 py-2 rounded-lg transition-all duration-300 ${location === '/' ? 'text-primary bg-gradient-to-r from-blue-100 to-blue-200 shadow-md' : 'text-secondary hover:text-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-lg'}`}
            >
              Home
            </Button>
          </Link>
          <Link href="/services">
            <Button 
              variant="ghost" 
              className={`font-medium px-4 md:px-6 py-2 rounded-lg transition-all duration-300 ${location === '/services' ? 'text-primary bg-gradient-to-r from-green-100 to-green-200 shadow-md' : 'text-secondary hover:text-primary hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:shadow-lg'}`}
            >
              Services
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className={`text-secondary font-medium px-4 md:px-6 py-2 rounded-lg transition-all duration-300 ${location === '/about' ? 'text-primary bg-gradient-to-r from-purple-100 to-purple-200 shadow-md' : 'hover:text-primary hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:shadow-lg'}`}>
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className={`text-secondary font-medium px-4 md:px-6 py-2 rounded-lg transition-all duration-300 ${location === '/contact' ? 'text-primary bg-gradient-to-r from-pink-100 to-pink-200 shadow-md' : 'hover:text-primary hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 hover:shadow-lg'}`}>
              Contact
            </Button>
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                  <Avatar>
                    <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem disabled className="opacity-70">
                  Signed in as {user.name || user.username}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <div className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 w-full">
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  Home
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  Services
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  About
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  Contact
                </Button>
              </Link>
              {user ? (
                <>
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                      Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary" onClick={logout}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
