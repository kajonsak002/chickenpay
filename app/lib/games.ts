export interface GameTopUp {
    name: string;
    category: string;
    img: string;
    img_icon: string;
    discount: string;
    packagesCount: number;
}

// Data from BYShop API /bypay?api=game
// Priority order: FF, RoV, MLBB, Delta Force, Valorant, HoK, COD first
export const GAMES: GameTopUp[] = [
    { name: "Free Fire", category: "FREEFIRE", img: "https://byshop.me/buy/img/new/FREEFIRE.png", img_icon: "https://byshop.me/buy/img/item/FREEFIRE.png", discount: "3.25", packagesCount: 13 },
    { name: "RoV Mobile", category: "ROV-M", img: "https://byshop.me/buy/img/new/ROV-M.png", img_icon: "https://byshop.me/buy/img/item/ROV-M.png", discount: "3.25", packagesCount: 8 },
    { name: "Mobile Legends: Bang Bang", category: "MLBB", img: "https://byshop.me/buy/img/new/MLBB.png", img_icon: "https://byshop.me/buy/img/item/MLBB.png", discount: "2", packagesCount: 19 },
    { name: "Delta Force (Steam)", category: "DELTAFORCE", img: "https://byshop.me/buy/img/new/DELTAFORCE.png", img_icon: "https://byshop.me/buy/img/item/DELTAFORCE.png", discount: "22", packagesCount: 10 },
    { name: "Delta Force (Garena)", category: "GRN-DTF", img: "https://byshop.me/buy/img/new/GRN-DTF.png", img_icon: "https://byshop.me/buy/img/item/GRN-DTF.png", discount: "3.25", packagesCount: 14 },
    { name: "Valorant", category: "VALORANT-D", img: "https://byshop.me/buy/img/new/VALORANT-D.png", img_icon: "https://byshop.me/buy/img/item/VALORANT-D.png", discount: "3", packagesCount: 12 },
    { name: "Honor of Kings", category: "HOKINGS", img: "https://byshop.me/buy/img/new/HOKINGS.png", img_icon: "https://byshop.me/buy/img/item/HOKINGS.png", discount: "11", packagesCount: 9 },
    { name: "Call Of Duty Mobile", category: "COD-M", img: "https://byshop.me/buy/img/new/COD-M.png", img_icon: "https://byshop.me/buy/img/item/COD-M.png", discount: "3.25", packagesCount: 8 },
    // --- Rest ---
    { name: "Heartopia", category: "HEARTOPIA", img: "https://byshop.me/buy/img/new/HEARTOPIA.png", img_icon: "https://byshop.me/buy/img/item/HEARTOPIA.png", discount: "0", packagesCount: 8 },
    { name: "Rainbow Six Mobile", category: "RAINBOW6", img: "https://byshop.me/buy/img/new/RAINBOW6.png", img_icon: "https://byshop.me/buy/img/item/RAINBOW6.png", discount: "0", packagesCount: 8 },
    { name: "Sword of Justice", category: "SWOJTC", img: "https://byshop.me/buy/img/new/SWOJTC.png", img_icon: "https://byshop.me/buy/img/item/SWOJTC.png", discount: "0", packagesCount: 11 },
    { name: "Where Winds Meet", category: "WWM", img: "https://byshop.me/buy/img/new/WWM.png", img_icon: "https://byshop.me/buy/img/item/WWM.png", discount: "0", packagesCount: 12 },
    { name: "Wuthering Waves", category: "WUWAVEST", img: "https://byshop.me/buy/img/new/WUWAVEST.png", img_icon: "https://byshop.me/buy/img/item/WUWAVEST.png", discount: "0", packagesCount: 7 },
    { name: "Whiteout Survival", category: "WHITEOUTSV", img: "https://byshop.me/buy/img/new/WHITEOUTSV.png", img_icon: "https://byshop.me/buy/img/item/WHITEOUTSV.png", discount: "0", packagesCount: 9 },
    { name: "PUBG Mobile (Global)", category: "PUBGM", img: "https://byshop.me/buy/img/new/PUBGM.png", img_icon: "https://byshop.me/buy/img/item/PUBGM.png", discount: "0", packagesCount: 6 },
    { name: "PUBG Mobile (UC STATION)", category: "PUBGM-RAZER", img: "https://byshop.me/buy/img/new/PUBGM-RAZER.png", img_icon: "https://byshop.me/buy/img/item/PUBGM-RAZER.png", discount: "9", packagesCount: 1 },
    { name: "Seven Knights Re:BIRTH", category: "SKRE", img: "https://byshop.me/buy/img/new/SKRE.png", img_icon: "https://byshop.me/buy/img/item/SKRE.png", discount: "0", packagesCount: 1 },
    { name: "Bigo Live", category: "BIGOLIVE", img: "https://byshop.me/buy/img/new/BIGOLIVE.png", img_icon: "https://byshop.me/buy/img/item/BIGOLIVE.png", discount: "0", packagesCount: 14 },
    { name: "Dunk City Dynasty", category: "DUNKCITY", img: "https://byshop.me/buy/img/new/DUNKCITY.png", img_icon: "https://byshop.me/buy/img/item/DUNKCITY.png", discount: "14", packagesCount: 18 },
    { name: "Marvel Rivals", category: "MARVEL-RV", img: "https://byshop.me/buy/img/new/MARVEL-RV.png", img_icon: "https://byshop.me/buy/img/item/MARVEL-RV.png", discount: "25", packagesCount: 6 },
    { name: "Blood Strike", category: "BLOODSTRK", img: "https://byshop.me/buy/img/new/BLOODSTRK.png", img_icon: "https://byshop.me/buy/img/item/BLOODSTRK.png", discount: "31.5", packagesCount: 6 },
    { name: "Identity V", category: "IDENTITYV", img: "https://byshop.me/buy/img/new/IDENTITYV.png", img_icon: "https://byshop.me/buy/img/item/IDENTITYV.png", discount: "11", packagesCount: 7 },
    { name: "League of Legends", category: "LOL", img: "https://byshop.me/buy/img/new/LOL.png", img_icon: "https://byshop.me/buy/img/item/LOL.png", discount: "3", packagesCount: 12 },
    { name: "Magic Chess: Go Go", category: "MAGICCHESS", img: "https://byshop.me/buy/img/new/MAGICCHESS.png", img_icon: "https://byshop.me/buy/img/item/MAGICCHESS.png", discount: "16.5", packagesCount: 11 },
    { name: "HAIKYU!! FLY HIGH", category: "HAIKYUFH", img: "https://byshop.me/buy/img/new/HAIKYUFH.png", img_icon: "https://byshop.me/buy/img/item/HAIKYUFH.png", discount: "0", packagesCount: 6 },
    { name: "Ragnarok M: Classic", category: "RO-M-CSC", img: "https://byshop.me/buy/img/new/RO-M-CSC.png", img_icon: "https://byshop.me/buy/img/item/RO-M-CSC.png", discount: "9", packagesCount: 10 },
    { name: "Love and Deepspace", category: "LDSPACE", img: "https://byshop.me/buy/img/new/LDSPACE.png", img_icon: "https://byshop.me/buy/img/item/LDSPACE.png", discount: "7", packagesCount: 5 },
    { name: "AFK Journey", category: "AFKJOURNEY", img: "https://byshop.me/buy/img/new/AFKJOURNEY.png", img_icon: "https://byshop.me/buy/img/item/AFKJOURNEY.png", discount: "3", packagesCount: 8 },
    { name: "Metal Slug: Awakening", category: "METALSLUG", img: "https://byshop.me/buy/img/new/METALSLUG.png", img_icon: "https://byshop.me/buy/img/item/METALSLUG.png", discount: "3", packagesCount: 8 },
    { name: "Arena Breakout", category: "ARENABO", img: "https://byshop.me/buy/img/new/ARENABO.png", img_icon: "https://byshop.me/buy/img/item/ARENABO.png", discount: "16", packagesCount: 11 },
    { name: "Genshin Impact", category: "GENSHIN", img: "https://byshop.me/buy/img/new/GENSHIN.png", img_icon: "https://byshop.me/buy/img/item/GENSHIN.png", discount: "22", packagesCount: 13 },
    { name: "Zenless Zone Zero", category: "ZZZERO", img: "https://byshop.me/buy/img/new/ZZZERO.png", img_icon: "https://byshop.me/buy/img/item/ZZZERO.png", discount: "22", packagesCount: 5 },
    { name: "Honkai: Star Rail", category: "HONKAISR", img: "https://byshop.me/buy/img/new/HONKAISR.png", img_icon: "https://byshop.me/buy/img/item/HONKAISR.png", discount: "22", packagesCount: 7 },
    { name: "Dragon Nest M: Classic", category: "DRAGONN-MC", img: "https://byshop.me/buy/img/new/DRAGONN-MC.png", img_icon: "https://byshop.me/buy/img/item/DRAGONN-MC.png", discount: "8", packagesCount: 11 },
    { name: "MapleStory R: Evolution", category: "MPS-RE", img: "https://byshop.me/buy/img/new/MPS-RE.png", img_icon: "https://byshop.me/buy/img/item/MPS-RE.png", discount: "4", packagesCount: 8 },
    { name: "Garena Undawn", category: "UNDAWN", img: "https://byshop.me/buy/img/new/UNDAWN.png", img_icon: "https://byshop.me/buy/img/item/UNDAWN.png", discount: "3.25", packagesCount: 18 },
    { name: "FC Mobile (FIFA Mobile)", category: "FIFA-M", img: "https://byshop.me/buy/img/new/FIFA-M.png", img_icon: "https://byshop.me/buy/img/item/FIFA-M.png", discount: "5.5", packagesCount: 14 },
    { name: "ZEPETO", category: "ZEPETO", img: "https://byshop.me/buy/img/new/ZEPETO.png", img_icon: "https://byshop.me/buy/img/item/ZEPETO.png", discount: "31", packagesCount: 13 },
    { name: "Diablo IV", category: "DIABLO-IV", img: "https://byshop.me/buy/img/new/DIABLO-IV.png", img_icon: "https://byshop.me/buy/img/item/DIABLO-IV.png", discount: "9", packagesCount: 1 },
    { name: "Teamfight Tactics Mobile", category: "TFTACTICS", img: "https://byshop.me/buy/img/new/TFTACTICS.png", img_icon: "https://byshop.me/buy/img/item/TFTACTICS.png", discount: "3", packagesCount: 6 },
    { name: "Ragnarok Original", category: "ROO", img: "https://byshop.me/buy/img/new/ROO.png", img_icon: "https://byshop.me/buy/img/item/ROO.png", discount: "11", packagesCount: 8 },
    { name: "Seal M", category: "SEAL-M", img: "https://byshop.me/buy/img/new/SEAL-M.png", img_icon: "https://byshop.me/buy/img/item/SEAL-M.png", discount: "16.5", packagesCount: 8 },
    { name: "Ragnarok X: Next Generation", category: "ROX", img: "https://byshop.me/buy/img/new/ROX.png", img_icon: "https://byshop.me/buy/img/item/ROX.png", discount: "16.5", packagesCount: 8 },
    { name: "Harry Potter: Magic Awakened", category: "HARRYPAWK", img: "https://byshop.me/buy/img/new/HARRYPAWK.png", img_icon: "https://byshop.me/buy/img/item/HARRYPAWK.png", discount: "21.5", packagesCount: 11 },
    { name: "Ace Racer", category: "ACERACER", img: "https://byshop.me/buy/img/new/ACERACER.png", img_icon: "https://byshop.me/buy/img/item/ACERACER.png", discount: "17", packagesCount: 6 },
    { name: "MU Origin 3", category: "MU3-M", img: "https://byshop.me/buy/img/new/MU3-M.png", img_icon: "https://byshop.me/buy/img/item/MU3-M.png", discount: "7", packagesCount: 8 },
    { name: "Diablo: Immortal", category: "DIABLO-IMM", img: "https://byshop.me/buy/img/new/DIABLO-IMM.png", img_icon: "https://byshop.me/buy/img/item/DIABLO-IMM.png", discount: "12.5", packagesCount: 6 },
    { name: "Sausage Man", category: "SAUSAGE", img: "https://byshop.me/buy/img/new/SAUSAGE.png", img_icon: "https://byshop.me/buy/img/item/SAUSAGE.png", discount: "16.5", packagesCount: 7 },
    { name: "Super Sus", category: "SUPERSUS", img: "https://byshop.me/buy/img/new/SUPERSUS.png", img_icon: "https://byshop.me/buy/img/item/SUPERSUS.png", discount: "5", packagesCount: 11 },
    { name: "MARVEL SNAP", category: "MARVELSNAP", img: "https://byshop.me/buy/img/new/MARVELSNAP.png", img_icon: "https://byshop.me/buy/img/item/MARVELSNAP.png", discount: "11", packagesCount: 11 },
    { name: "X-HERO", category: "XHERO", img: "https://byshop.me/buy/img/new/XHERO.png", img_icon: "https://byshop.me/buy/img/item/XHERO.png", discount: "16.5", packagesCount: 9 },
    { name: "GODDESS OF VICTORY: NIKKE", category: "NIKKE", img: "https://byshop.me/buy/img/new/NIKKE.png", img_icon: "https://byshop.me/buy/img/item/NIKKE.png", discount: "16.5", packagesCount: 9 },
    { name: "Overwatch 2", category: "OVERWATCH2", img: "https://byshop.me/buy/img/new/OVERWATCH2.png", img_icon: "https://byshop.me/buy/img/item/OVERWATCH2.png", discount: "9", packagesCount: 1 },
    { name: "Ragnarok M: Eternal Love", category: "RO-M", img: "https://byshop.me/buy/img/new/RO-M.png", img_icon: "https://byshop.me/buy/img/item/RO-M.png", discount: "11", packagesCount: 12 },
    { name: "MU Archangel", category: "MUAA", img: "https://byshop.me/buy/img/new/MUAA.png", img_icon: "https://byshop.me/buy/img/item/MUAA.png", discount: "6.5", packagesCount: 5 },
    { name: "Onmyoji Arena", category: "G78NAGB", img: "https://byshop.me/buy/img/new/G78NAGB.png", img_icon: "https://byshop.me/buy/img/item/G78NAGB.png", discount: "14", packagesCount: 6 },
    { name: "Legends of Runeterra", category: "LOR", img: "https://byshop.me/buy/img/new/LOR.png", img_icon: "https://byshop.me/buy/img/item/LOR.png", discount: "3", packagesCount: 6 },
    { name: "League of Legends: Wild Rift", category: "WILDRIFT", img: "https://byshop.me/buy/img/new/WILDRIFT.png", img_icon: "https://byshop.me/buy/img/item/WILDRIFT.png", discount: "3", packagesCount: 6 },
    { name: "Dragon Raja", category: "DRAGONRAJA", img: "https://byshop.me/buy/img/new/DRAGONRAJA.png", img_icon: "https://byshop.me/buy/img/item/DRAGONRAJA.png", discount: "16.5", packagesCount: 9 },
    { name: "Counter:Side", category: "CTSIDE", img: "https://byshop.me/buy/img/new/CTSIDE.png", img_icon: "https://byshop.me/buy/img/item/CTSIDE.png", discount: "6.5", packagesCount: 6 },
    { name: "EOS RED", category: "EOSRED", img: "https://byshop.me/buy/img/new/EOSRED.png", img_icon: "https://byshop.me/buy/img/item/EOSRED.png", discount: "6.5", packagesCount: 4 },
];

// Games with discounts > 0, sorted by discount (highest first)
export function getHotGames(): GameTopUp[] {
    return GAMES
        .filter((g) => parseFloat(g.discount) > 0)
        .sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount));
}

export function getGameByCategory(category: string): GameTopUp | undefined {
    return GAMES.find((g) => g.category === category);
}
