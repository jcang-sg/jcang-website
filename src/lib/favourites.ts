export type Favourite = {
  year: number;
  category: string;
  title: string;
  // Short personal takeaway. Empty for now — JC fills these in after launch.
  takeaway: string;
};

// Static, chronological. Text-only — no external images or cover art.
export const favourites: Favourite[] = [
  { year: 1993, category: "Film Series", title: "Jurassic Park", takeaway: "" },
  { year: 1997, category: "Anime", title: "Pokémon", takeaway: "" },
  { year: 1998, category: "Comic-novel", title: "神雕侠侣", takeaway: "" },
  {
    year: 2001,
    category: "Computer game",
    title: "Championship Manager 3",
    takeaway: "",
  },
  { year: 2008, category: "Film Series", title: "叶问", takeaway: "" },
  { year: 2020, category: "Documentary", title: "The Last Dance", takeaway: "" },
  {
    year: 2022,
    category: "Book",
    title: "Letter to Grandson Jun: I found myself, hiking!",
    takeaway: "",
  },
  {
    year: 2024,
    category: "TV Series",
    title: "Avatar: The Last Airbender",
    takeaway: "",
  },
  {
    year: 2025,
    category: "Live concert",
    title: "邓紫棋 I Am Gloria",
    takeaway: "",
  },
  { year: 2025, category: "Book", title: "The Daily Dad", takeaway: "" },
];
