import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Gamepad2, Users, Clock, Trophy } from "lucide-react";

export default function Gaming() {
  const games = [
    {
      category: "Console Gaming",
      items: [
        { 
          name: "PlayStation 5 Gaming", 
          price: "₹200/hour", 
          image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.8, 
          players: "1-4 players",
          games: ["FIFA 24", "Call of Duty", "Spider-Man", "God of War"],
          available: true 
        },
        { 
          name: "Xbox Series X Gaming", 
          price: "₹180/hour", 
          image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.7, 
          players: "1-4 players",
          games: ["Halo Infinite", "Forza", "Gears 5", "Minecraft"],
          available: true 
        },
        { 
          name: "Nintendo Switch Gaming", 
          price: "₹150/hour", 
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.5, 
          players: "1-8 players",
          games: ["Mario Kart", "Super Smash Bros", "Zelda", "Pokemon"],
          available: false 
        }
      ]
    },
    {
      category: "PC Gaming",
      items: [
        { 
          name: "High-End Gaming PC", 
          price: "₹250/hour", 
          image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.9, 
          players: "1 player",
          games: ["Valorant", "CS:GO", "League of Legends", "Fortnite"],
          available: true 
        },
        { 
          name: "VR Gaming Station", 
          price: "₹300/hour", 
          image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.6, 
          players: "1 player",
          games: ["Beat Saber", "Half-Life Alyx", "VR Chat", "Superhot VR"],
          available: true 
        }
      ]
    },
    {
      category: "Arcade Games",
      items: [
        { 
          name: "Classic Arcade", 
          price: "₹50/game", 
          image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.4, 
          players: "1-2 players",
          games: ["Street Fighter", "Pac-Man", "Tekken", "Racing Games"],
          available: true 
        },
        { 
          name: "Air Hockey Table", 
          price: "₹100/game", 
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.3, 
          players: "2 players",
          games: ["Air Hockey"],
          available: true 
        }
      ]
    }
  ];

  const packages = [
    {
      name: "Casual Gaming",
      price: "₹500",
      duration: "3 hours",
      includes: ["Any console/PC", "Free snacks", "Game selection"],
      popular: false
    },
    {
      name: "Gaming Party",
      price: "₹1,500",
      duration: "6 hours",
      includes: ["Multiple stations", "Tournament setup", "Food & drinks", "Private area"],
      popular: true
    },
    {
      name: "VIP Gaming",
      price: "₹2,500",
      duration: "Full day",
      includes: ["Premium setup", "Personal assistant", "Unlimited snacks", "Private room"],
      popular: false
    }
  ];

  const tournaments = [
    {
      game: "FIFA 24 Tournament",
      date: "Every Saturday",
      entry: "₹200",
      prize: "₹5,000",
      participants: "16 players max"
    },
    {
      game: "Valorant Competition",
      date: "Monthly",
      entry: "₹500/team",
      prize: "₹15,000",
      participants: "8 teams max"
    }
  ];

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/services/smart-mall">
            <Button variant="ghost" className="mb-4 text-primary hover:text-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />Back to Smart Mall
            </Button>
          </Link>
          
          <div className="relative h-64 rounded-xl overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Gaming zone with consoles" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Game Arena</h1>
                <p className="text-xl">Ultimate gaming experience with latest consoles & PCs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Gaming Stations */}
            {games.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.items.map((item, index) => (
                      <Card key={index} className="border border-gray-200 overflow-hidden">
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-48 object-cover"
                          />
                          {!item.available && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Badge variant="destructive">Currently Occupied</Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg text-secondary mb-2">{item.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({item.rating})</span>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-bold text-primary">{item.price}</span>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="mr-1 h-4 w-4" />
                              {item.players}
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Popular Games:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.games.slice(0, 3).map((game, gameIndex) => (
                                <Badge key={gameIndex} variant="outline" className="text-xs">
                                  {game}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-primary hover:bg-blue-700" 
                            disabled={!item.available}
                          >
                            <Gamepad2 className="mr-2 h-4 w-4" />
                            {item.available ? 'Book Now' : 'Currently Busy'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Gaming Packages */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Gaming Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {packages.map((pkg, index) => (
                    <Card key={index} className={`border ${pkg.popular ? 'border-primary bg-blue-50' : 'border-gray-200'} relative`}>
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-white">Most Popular</Badge>
                        </div>
                      )}
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-lg text-secondary mb-2">{pkg.name}</h3>
                        <div className="mb-4">
                          <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                          <p className="text-sm text-gray-600">{pkg.duration}</p>
                        </div>
                        <div className="space-y-2 mb-4">
                          {pkg.includes.map((feature, idx) => (
                            <p key={idx} className="text-sm text-gray-600">• {feature}</p>
                          ))}
                        </div>
                        <Button className={`w-full ${pkg.popular ? 'bg-primary hover:bg-blue-700' : 'bg-accent hover:bg-green-600'}`}>
                          Choose Package
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tournaments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Gaming Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tournaments.map((tournament, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Trophy className="mr-3 h-5 w-5 text-yellow-500" />
                            <div>
                              <h3 className="font-semibold text-secondary">{tournament.game}</h3>
                              <p className="text-sm text-gray-600">{tournament.date} • {tournament.participants}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">Prize: {tournament.prize}</p>
                            <p className="text-sm text-gray-600">Entry: {tournament.entry}</p>
                          </div>
                        </div>
                        <Button className="w-full mt-3 bg-accent hover:bg-green-600 text-white">
                          Register for Tournament
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gaming Zone Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Zone Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-sm text-gray-600">10:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-sm text-gray-600">50+ gaming stations</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Trophy className="mr-3 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Tournaments</p>
                    <p className="text-sm text-gray-600">Weekly competitions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Membership */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Gaming Membership</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-secondary">Monthly Pass</p>
                  <p className="text-2xl font-bold text-primary">₹2,999</p>
                  <p className="text-sm text-gray-600">Unlimited gaming + 20% off food</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-secondary">Annual Pass</p>
                  <p className="text-2xl font-bold text-accent">₹29,999</p>
                  <p className="text-sm text-gray-600">Best value + tournament entry</p>
                </div>
              </CardContent>
            </Card>

            {/* Store Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Visit Gaming Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Third Floor, Smart Mall Complex</p>
                <Button className="w-full bg-primary hover:bg-blue-700 text-white mb-2">
                  Book Gaming Session
                </Button>
                <Button variant="outline" className="w-full">
                  Call Gaming Zone
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}