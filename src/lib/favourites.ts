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
  // Country of origin as ISO 3166-1 alpha-2 code(s); rendered as flag pin(s).
  // More than one when a work has mixed origins (e.g. 神雕侠侣: HK author, SG artist).
  origins?: string[];
};

// Seventeen cards, chronological, grouped by life-season.
export const favourites: Favourite[] = [
  { season: "spring", title: "Jurassic Park", year: 1993, category: "Film series", takeaway: "Mosquitoes unlock imagination", origins: ["US"] },
  { season: "spring", title: "神雕侠侣", image: "/condor-heroes-book.jpg", year: 1996, category: "Novel comic", takeaway: "行侠仗义、爱恨情仇", origins: ["HK", "SG"] },
  { season: "spring", title: "Pokémon", year: 1997, category: "Anime", takeaway: "Stay cute or Evolve?", origins: ["JP"] },
  { season: "spring", title: "还珠格格", year: 1998, category: "Drama trilogy", takeaway: "活得潇潇洒洒、\n把握青春年华", origins: ["CN"] },
  { season: "spring", title: "Championship Manager 3", year: 1999, category: "PC Game series", takeaway: "Play to win,\nendless 4-1-3-2", origins: ["GB"] },
  { season: "spring", title: "无间道", year: 2002, category: "Film trilogy", takeaway: "出来混，\n迟早要还的。", origins: ["HK"] },
  { season: "summer", title: "叶问", year: 2008, category: "Film trilogy", takeaway: "没有怕老婆的男人，\n只有尊重老婆的男人", origins: ["HK"] },
  { season: "summer", title: "3 Idiots", year: 2009, category: "Film", takeaway: "All izz well", origins: ["IN"] },
  { season: "summer", title: "Suits", year: 2011, category: "Drama series", takeaway: "A buddy makes bitter bittersweet", origins: ["US"] },
  { season: "summer", title: "SKY Castle", year: 2019, category: "Drama series", takeaway: "I know what mother likes,\nnot what I like", origins: ["KR"] },
  { season: "summer", title: "The Last Dance", year: 2020, category: "Documentary", takeaway: "Collective pain to champions", origins: ["US"] },
  { season: "summer", title: "Itaewon Class", year: 2021, category: "Drama series", takeaway: "Non-linear paths,\none shared hunger", origins: ["KR"] },
  { season: "summer", title: "Letter to Grandson Jun: I found myself, hiking!", image: "/letter-grandson-jun.jpg", year: 2022, category: "Book", takeaway: "Two things can be true at once", origins: ["SG"] },
  { season: "summer", title: "邓紫棋 I Am Gloria", image: "/gem-i-am-gloria.png", year: 2025, category: "Live Concert", takeaway: "人生就是无数个美好、\n奇妙的时刻组成的", origins: ["HK"] },
  { season: "summer", title: "The Daily Dad", image: "/the-daily-dad.jpg", year: 2025, category: "Book", takeaway: "Teach by example", origins: ["US"] },
  { season: "autumn", title: "Autumn" },
  { season: "winter", title: "Winter" },
];
