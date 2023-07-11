const bettingLinks = (book) => {
  switch (book) {
    case "draftkings":
      return "https://www.draftkings.com";
    case "betonlineag":
      return "https://www.betonline.ag/";
    case "circasports":
      return "https://www.circasports.com/";
    case "lowvig":
      return "https://www.lowvig.ag/";
    case "betus":
      return "https://www.betus.com.pa/";
    case "bovada":
      return "https://www.bovada.lv/";
    case "williamhill_us":
      return "https://www.williamhill.com/us/nv/";
    case "mybookieag":
      return "https://www.mybookie.ag/sportsbook/";
    case "foxbet":
      return "https://www.foxbet.com/?no_redirect=1";
    case "pointsbetus":
      return "https://nj.pointsbet.com/";
    case "betmgm":
      return "https://promo.nj.betmgm.com/en/promo/geolocator?orh=sports.betmgm.com";
    case "ballybet":
      return "https://www.ballybet.com/";
    case "fanduel":
      return "https://www.fanduel.com/";
    case "superbook":
      return "https://www.superbook.com/";
    case "wynnbet":
      return "https://www.wynnbet.com/www.foxsportsbet.com";
    default:
      return "https://www.draftkings.com";
  }
};
module.exports = { bettingLinks };
