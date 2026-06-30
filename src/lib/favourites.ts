export type Season = "spring" | "summer" | "autumn" | "winter";

export type Favourite = {
  season: Season;
  title: string;
  // Optional poster image for the photo well (replaces the title text).
  image?: string;
  // Absent on the future-season placeholder cards (Autumn, Winter).
  year?: number;
  category?: string;
  takeaway?: string;
};

// Fourteen cards, chronological, grouped by life-season.
export const favourites: Favourite[] = [
  { season: "spring", title: "Jurassic Park", image: "/jurassic-park-poster.webp", year: 1993, category: "Film series", takeaway: "Mosquitoes unlock imagination" },
  { season: "spring", title: "神雕侠侣", image: "/condor-heroes-book.jpg", year: 1996, category: "Novel comic", takeaway: "行侠仗义、爱恨情仇" },
  { season: "spring", title: "Pokémon", image: "/pokemon-poster.jpg", year: 1997, category: "Anime", takeaway: "Stay cute or Evolve?" },
  { season: "spring", title: "还珠格格", image: "/hzgg-poster.jpg", year: 1998, category: "Drama trilogy", takeaway: "活得潇潇洒洒、\n把握青春年华" },
  { season: "spring", title: "Championship Manager 3", year: 1999, category: "PC Game series", takeaway: "Play to win, endless 4-1-3-2" },
  { season: "summer", title: "叶问", year: 2008, category: "Film trilogy", takeaway: "没有怕老婆的男人，\n只有尊重老婆的男人" },
  { season: "summer", title: "3 Idiots", year: 2009, category: "Film", takeaway: "All izz well" },
  { season: "summer", title: "Suits", year: 2011, category: "Drama series", takeaway: "Bitter memories can become bittersweet" },
  { season: "summer", title: "The Last Dance", year: 2020, category: "Documentary", takeaway: "Collective pain, focus and sacrifice" },
  { season: "summer", title: "Letter to Grandson Jun: I found myself, hiking!", year: 2022, category: "Book", takeaway: "Two things can be true at once" },
  { season: "summer", title: "邓紫棋 I Am Gloria", year: 2025, category: "Live Concert", takeaway: "人生就是无数个美好奇妙的时刻组成的" },
  { season: "summer", title: "The Daily Dad", year: 2025, category: "Book", takeaway: "Teach by example" },
  { season: "autumn", title: "Autumn" },
  { season: "winter", title: "Winter" },
];
