/*
  Add games here.

  Each game only needs:
    title: the name shown below its image
    image: optional thumbnail
    url: where the game is hosted
    tags: optional categories, e.g. ["platformer", "action"]
*/

const games = [
  {
    title: "1 on 1 Soccer",
    image: "images/1 on 1 Soccer.jpg",
    url: "games/1 on 1 Soccer/index.html",
    tags: ["sports", "multiplayer"]
  },
  {
    title: "2 Minute Football",
    image: "images/2 Minute Football.jpg",
    url: "games/2 Minute Football/index.html",
    tags: ["sports"]
  },
  {
    title: "10 Minutes Till Dawn",
    image: "images/10 Minutes Till Dawn.jpg",
    url: "games/10 Minutes Till Dawn/index.html",
    tags: ["shooter"]
  },
  {
    title: "40xEscape",
    image: "images/40xEscape.jpg",
    url: "games/40xEscape/index.html",
    tags: ["puzzle"]
  },
  {
    title: "60 Second Burger Run",
    image: "images/60 Second Burger Run.jpg",
    url: "games/60 Second Burger Run/index.html",
    tags: ["platformer"]
  },
  {
    title: "2048",
    image: "images/2048.jpg",
    url: "games/2048/index.html",
    tags: ["puzzle"]
  },
  {
    title: "A Dance Of Fire And Ice",
    image: "images/A Dance Of Fire And Ice.jpg",
    url: "games/A Dance Of Fire And Ice/index.html",
    tags: ["rythm"]
  },
  {
    title: "Achievement Unlocked",
    image: "images/Achievement Unlocked.jpg",
    url: "games/Achievement Unlocked/index.html",
    tags: ["platformer"]
  },
  {
    title: "Achievement Unlocked 2",
    image: "images/Achievement Unlocked 2.jpg",
    url: "games/Achievement Unlocked 2/index.html",
    tags: ["platformer"]
  },
  {
    title: "Achievement Unlocked 3",
    image: "images/Achievement Unlocked 3.jpg",
    url: "games/Achievement Unlocked 3/index.html",
    tags: ["platformer"]
  },
  {
    title: "Adventure capitalist",
    image: "images/Adventure Capitalist.jpg",
    url: "games/Adventure Capitalist/index.html",
    tags: ["clicker"]
  },
  {
    title: "Adventure Drivers",
    image: "images/Adventure Drivers.jpg",
    url: "games/Adventure Drivers/index.html",
    tags: ["driving"]
  },
  {
    title: "Bacon May Die",
    image: "images/Bacon May Die.jpg",
    url: "games/Bacon May Die/index.html",
    tags: ["platformer"]
  },
  {
    title: "Bad Piggies",
    image: "images/Bad Piggies.jpg",
    url: "games/Bad Piggies/index.html",
    tags: ["platformer"]
  },
  {
    title: "Baldis Basics",
    image: "images/Baldis Basics.jpg",
    url: "games/Baldis Basics/index.html",
    tags: ["simulation"]
  },
  {
    title: "Basketball Stars",
    image: "images/Basketball Stars.jpg",
    url: "games/Basketball Stars/index.html",
    tags: ["sports"]
  },
  {
    title: "Bitplanes",
    image: "images/Bitplanes.jpg",
    url: "games/Bitplanes/index.html",
    tags: ["simulation"]
  },
  {
    title: "Block Blast",
    image: "images/Block Blast.jpg",
    url: "games/Block Blast/index.html",
    tags: ["puzzle"]
  },
  {
    title: "Blocky Snakes",
    image: "images/Blocky Snakes.jpg",
    url: "games/Blocky Snakes/index.html",
    tags: ["multiplayer"]
  },
  {
    title: "Bloons Tower Defense",
    image: "images/Bloons Tower Defense.jpg",
    url: "games/Bloons Tower Defense/index.html",
    tags: ["strategy"]
  },
  {
    title: "Bloons Tower Defense 2",
    image: "images/Bloons Tower Defense 2.jpg",
    url: "games/Bloons Tower Defense 2/index.html",
    tags: ["strategy"]
  },
  {
    title: "Bloons Tower Defense 3",
    image: "images/Bloons Tower Defense 3.jpg",
    url: "games/Bloons Tower Defense 3/index.html",
    tags: ["strategy"]
  },
  {
    title: "Bloons Tower Defense 4",
    image: "images/Bloons Tower Defense 4.jpg",
    url: "games/Bloons Tower Defense 4/index.html",
    tags: ["strategy"]
  },
  {
    title: "Bloons Tower Defense 5",
    image: "images/Bloons Tower Defense 5.jpg",
    url: "games/Bloons Tower Defense 5/index.html",
    tags: ["strategy"]
  },
  {
    title: "Bloxorz",
    image: "images/Bloxorz.jpg",
    url: "games/Bloxorz/index.html",
    tags: ["puzzle"]
  },
  {
    title: "Bob The Robber 2",
    image: "images/Bob The Robber 2.jpg",
    url: "games/Bob The Robber 2/index.html",
    tags: ["puzzle"]
  },
  {
    title: "Bouncy Motors",
    image: "images/Bouncy Motors.jpg",
    url: "games/Bouncy Motors/index.html",
    tags: ["driving"]
  },
  {
    title: "Boxing random",
    image: "images/Boxing random.jpg",
    url: "games/Boxing Random/index.html",
    tags: ["sports", "multiplayer"]
  },
  {
    title: "Capybara Clicker",
    image: "images/Capybara Clicker.jpg",
    url: "games/Capybara Clicker/index.html",
    tags: ["clicker"]
  },
  {
    title: "Choppy Orc",
    image: "images/Choppy Orc.jpg",
    url: "games/Choppy Orc/index.html",
    tags: ["platformer"]
  },
  {
    title: "Cluster Rush",
    image: "images/Cluster Rush.jpg",
    url: "games/Cluster Rush/index.html",
    tags: ["platformer"]
  },
  {
    title: "Cookie Clicker",
    image: "images/Cookie Clicker.jpg",
    url: "games/Cookie Clicker/index.html",
    tags: ["clicker"]
  },
  {
    title: "Core Ball",
    image: "images/Core Ball.jpg",
    url: "games/Core Ball/index.html",
    tags: ["clicker"]
  },
  {
    title: "Crazy Cars",
    image: "images/Crazy Cars.jpg",
    url: "games/Crazy Cars/index.html",
    tags: ["driving"]
  },
  {
    title: "Crazy Cattle 3D",
    image: "images/Crazy Cattle 3D.jpg",
    url: "games/Crazy Cattle 3D/index.html",
    tags: ["simulation"]
  },
  {
    title: "Crazy Motorcycle",
    image: "images/Crazy Motorcycle.jpg",
    url: "games/Crazy Motorcycle/index.html",
    tags: ["driving"]
  },
  {
    title: "Crossy Road",
    image: "images/Crossy Road.jpg",
    url: "games/Crossy Road/index.html",
    tags: ["platformer"]
  },
  {
    title: "Cyber Cars Punk Racing",
    image: "images/Cyber Cars Punk Racing.jpg",
    url: "games/Cyber Cars Punk Racing/index.html",
    tags: ["driving"]
  },
  {
    title: "Death Run 3D",
    image: "images/Death Run 3D.jpg",
    url: "games/Death Run 3D/index.html",
    tags: ["platformer"]
  },
  {
    title: "Deltarune",
    image: "images/Deltarune.jpg",
    url: "games/Deltarune/index.html",
    tags: ["platformer", "puzzle"]
  },
  {
    title: "Drift Boss",
    image: "images/Drift Boss.jpg",
    url: "games/Drift Boss/index.html",
    tags: ["driving"]
  },
  {
    title: "Drive Mad",
    image: "images/Drive Mad.jpg",
    url: "games/Drive Mad/index.html",
    tags: ["driving"]
  },
  {
    title: "Duck Life",
    image: "images/Duck Life.jpg",
    url: "games/Duck Life/index.html",
    tags: ["simulation"]
  },
  {
    title: "Duck Life 2",
    image: "images/Duck Life 2.jpg",
    url: "games/Duck Life 2/index.html",
    tags: ["simulation"]
  },
  {
    title: "Duck Life 3",
    image: "images/Duck Life 3.jpg",
    url: "games/Duck Life 3/index.html",
    tags: ["simulation"]
  },
  {
    title: "Duck Life 4",
    image: "images/Duck Life 4.jpg",
    url: "games/Duck Life 4/index.html",
    tags: ["simulation"]
  },
  {
    title: "Duck Life 5",
    image: "images/Duck Life 5.jpg",
    url: "games/Duck Life 5/index.html",
    tags: ["simulation"]
  },
  {
    title: "Eggy Car",
    image: "images/Eggy Car.jpg",
    url: "games/Eggy Car/index.html",
    tags: ["driving"]
  },
  {
    title: "Escape Road",
    image: "images/Escape Road.jpg",
    url: "games/Escape Road/index.html",
    tags: ["driving"]
  },
  {
    title: "Football Legends",
    image: "images/Football Legends.jpg",
    url: "games/Football Legends/index.html",
    tags: ["sports"]
  },
  {
    title: "Fruit Ninja",
    image: "images/Fruit Ninja.jpg",
    url: "games/Fruit Ninja/index.html",
    tags: ["clicker"]
  },
  {
    title: "Geometry Dash",
    image: "images/Geometry Dash.jpg",
    url: "games/Geometry Dash/index.html",
    tags: ["clicker","platformer"]
  },
  {
    title: "Getaway Shootout",
    image: "images/Getaway Shootout.jpg",
    url: "games/Getaway Shootout/index.html",
    tags: ["platformer", "shooter", "multiplayer"]
  },
  {
    title: "Idle Breakout",
    image: "images/Idle Breakout.jpg",
    url: "games/Idle Breakout/index.html",
    tags: ["clicker"]
  },
  {
    title: "Learn To Fly 3",
    image: "images/Learn To Fly 3.jpg",
    url: "games/Learn To Fly 3/index.html",
    tags: ["platformer"]
  },
  {
    title: "Minecraft",
    image: "images/Minecraft.jpg",
    url: "games/Minecraft/index.html",
    tags: ["sandbox", "multiplayer"]
  },
  {
    title: "Monkey Mart",
    image: "images/Monkey Mart.jpg",
    url: "games/Monkey Mart/index.html",
    tags: ["tycoon"]
  },
  {
    title: "Moto X3M",
    image: "images/Moto X3M.jpg",
    url: "games/Moto X3M/index.html",
    tags: ["driving"]
  },
  {
    title: "Moto X3M 2",
    image: "images/Moto X3M 2.jpg",
    url: "games/Moto X3M 2/index.html",
    tags: ["driving"]
  },
  {
    title: "Moto X3M Pool Party",
    image: "images/Moto X3M Pool Party.jpg",
    url: "games/Moto X3M Pool Party/index.html",
    tags: ["driving"]
  },
  {
    title: "Moto X3M Spooky Land",
    image: "images/Moto X3M Spooky Land.jpg",
    url: "games/Moto X3M Spooky Land/index.html",
    tags: ["driving"]
  },
  {
    title: "Moto X3M Winter",
    image: "images/Moto X3M Winter.jpg",
    url: "games/Moto X3M Winter/index.html",
    tags: ["driving"]
  },
  {
    title: "OvO",
    image: "images/OvO.jpg",
    url: "games/OvO/index.html",
    tags: ["platformer"]
  },
  {
    title: "OvO Dimensions",
    image: "images/OvO Dimensions.jpg",
    url: "games/OvO Dimensions/index.html",
    tags: ["platformer"]
  },
  {
    title: "Papas Bakeria",
    image: "images/Papas Bakeria.jpg",
    url: "games/Papas Bakeria/index.html",
    tags: ["simulation"]
  },
  {
    title: "Papas Burgeria",
    image: "images/Papas Burgeria.jpg",
    url: "games/Papas Burgeria/index.html",
    tags: ["simulation"]
  },
  {
    title: "Parking Fury",
    image: "images/Parking Fury.jpg",
    url: "games/Parking Fury/index.html",
    tags: ["driving"]
  },
  {
    title: "Parking Fury 2",
    image: "images/Parking Fury 2.jpg",
    url: "games/Parking Fury 2/index.html",
    tags: ["driving"]
  },
  {
    title: "Peak",
    image: "images/Peak.jpg",
    url: "games/Peak/index.html",
    tags: ["platformer","sports"]
  },
  {
    title: "Plants VS Zombies",
    image: "images/Plants VS Zombies.jpg",
    url: "games/Plants VS Zombies/index.html",
    tags: ["strategy"]
  },
  {
    title: "Polytrack",
    image: "images/polytrack.jpg",
    url: "games/polytrack/index.html",
    tags: ["driving"]
  },
  {
    title: "Ragdoll Archers",
    image: "images/Ragdoll Archers.jpg",
    url: "games/Ragdoll Archers/index.html",
    tags: ["puzzle"]
  },
  {
    title: "Ragdoll Hit",
    image: "images/Ragdoll Hit.jpg",
    url: "games/Ragdoll Hit/index.html",
    tags: ["puzzle"]
  },
  {
    title: "Retro Bowl",
    image: "images/Retro Bowl.jpg",
    url: "games/Retro Bowl/index.html",
    tags: ["sports"]
  },
  {
    title: "Rooftop Snipers",
    image: "images/Rooftop Snipers.jpg",
    url: "games/Rooftop Snipers/index.html",
    tags: ["shooter","platformer","multiplayer"]
  },
  {
    title: "Run",
    image: "images/Run.jpg",
    url: "games/Run/index.html",
    tags: ["platformer"]
  },
  {
    title: "Run 2",
    image: "images/Run 2.jpg",
    url: "games/Run 2/index.html",
    tags: ["platformer"]
  },
  {
    title: "Run 3",
    image: "images/Run 3.jpg",
    url: "games/Run 3/index.html",
    tags: ["platformer"]
  },  
  {
    title: "Slope",
    image: "images/Slope.jpg",
    url: "games/Slope/index.html",
    tags: ["platformer"]
  },
  {
    title: "Slow Roads",
    image: "images/Slow Roads.jpg",
    url: "games/Slow Roads/index.html",
    tags: ["driving"]
  },
  {
    title: "Space Waves",
    image: "images/Space Waves.jpg",
    url: "games/Space Waves/index.html",
    tags: ["platformer"]
  },
  {
    title: "Speed Stars",
    image: "images/Speed Stars.jpg",
    url: "games/Speed Stars/index.html",
    tags: ["sports"]
  },
  {
    title: "Stickman Hook",
    image: "images/Stickman Hook.jpg",
    url: "games/Stickman Hook/index.html",
    tags: ["platformer"]
  },
  {
    title: "Subway Surfers Beijing",
    image: "images/Subway Surfers Beijing.jpg",
    url: "games/Subway Surfers Beijing/index.html",
    tags: ["platformer"]
  },
  {
    title: "Super Mario 64",
    image: "images/Super Mario 64.jpg",
    url: "games/Super Mario 64/index.html",
    tags: ["platformer"]
  },
  {
    title: "Table Tennis World Tour",
    image: "images/Table Tennis World Tour.jpg",
    url: "games/Table Tennis World Tour/index.html",
    tags: ["sports"]
  },
  {
    title: "This Is The Only Level",
    image: "images/This Is The Only Level.jpg",
    url: "games/thisistheonlylevel/index.html",
    tags: ["platformer"]
  },
  {
    title: "Time Shooter 2",
    image: "images/Time Shooter 2.jpg",
    url: "games/Time Shooter 2/index.html",
    tags: ["shooter"]
  },
  {
    title: "Time Shooter 3 S.W.A.T",
    image: "images/Time Shooter 3 S.W.A.T.jpg",
    url: "games/Time Shooter 3 S.W.A.T/index.html",
    tags: ["shooter"]
  },
  {
    title: "Tiny Fishing",
    image: "images/Tiny Fishing.jpg",
    url: "games/Tiny Fishing/index.html",
    tags: ["simulation"]
  },
  {
    title: "Tomb Of The Mask",
    image: "images/Tomb Of The Mask.jpg",
    url: "games/Tomb Of The Mask/index.html",
    tags: ["simulation"]
  },
  {
    title: "Vex 4",
    image: "images/Vex 4.jpg",
    url: "games/Vex 4/index.html",
    tags: ["platformer"]
  },
  {
    title: "Vex 7",
    image: "images/Vex 7.jpg",
    url: "games/Vex 7/index.html",
    tags: ["platformer"]
  },
  {
    title: "Vex 8",
    image: "images/Vex 8.jpg",
    url: "games/Vex 8/index.html",
    tags: ["platformer"]
  },
  {
    title: "War The Knights",
    image: "images/War The Knights.jpg",
    url: "games/War The Knights/index.html",
    tags: ["simulation"]
  },
  {
    title: "We Become What We Behold",
    image: "images/We Become What We Behold.jpg",
    url: "games/We Become What We Behold/index.html",
    tags: ["simulation"]
  }
];
