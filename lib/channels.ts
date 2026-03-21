export interface Channel {
  id: number
  name: string
  url: string
  type: "dash" | "m3u8"
  logo?: string
  group: string
}

export const channels: Channel[] = [
  {
    id: 1,
    name: "One PH",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/oneph_sd/default/index.mpd",
    type: "dash",
    logo: "https://i.imgur.com/gkluDe9.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "b1c7e9d24f8a4d6c9e337a2f1c5b8d60", key: "8ff2e524cc1e028f2a4d4925e860c796" } }
  },
  {
    id: 2,
    name: "TV5",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/tv5_hd/default1/index.mpd",
    type: "dash",
    logo: "https://static.wikia.nocookie.net/russel/images/7/7a/TV5_HD_Logo_2024.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "2615129ef2c846a9bbd43a641c7303ef", key: "07c7f996b1734ea288641a68e1cfdc4d" } }
  },
  {
    id: 3,
    name: "RPTV",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cnn_rptv_prod_hd/default/index.mpd",
    type: "dash",
    logo: "https://static.wikia.nocookie.net/russel/images/f/fb/RPTV_Alternative_Logo_2024.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "1917f4caf2364e6d9b1507326a85ead6", key: "a1340a251a5aa63a9b0ea5d9d7f67595" } }
  },
  {
    id: 4,
    name: "A2Z",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_a2z/default/index.mpd",
    type: "dash",
    logo: "https://static.wikia.nocookie.net/russel/images/8/85/A2Z_Channel_11_without_Channel_11_3D_Logo_2020.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "3f6d8a2c1b7e4c9f8d52a7e1b0c6f93d", key: "4019f9269b9054a2b9e257b114ebbaf2" } }
  },
  {
    id: 5,
    name: "HBO",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_hbohd/default/index.mpd",
    type: "dash",
    logo: "https://images.now-tv.com/shares/channelPreview/img/en_hk/color/ch115_170_122",
    group: "Cignal",
    drm: { clearkey: { keyId: "c2b7a1e95d4f4c3a8e617f9d0a2b6c18", key: "27fca1ab042998b0c2f058b0764d7ed4" } }
  },
  {
    id: 6,
    name: "One News",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/onenews_hd1/default/index.mpd",
    type: "dash",
    logo: "https://i.imgur.com/bpRiu54.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "2e6a9d7c1f4b4c8a8d33c7b1f0a5e924", key: "4c71e178d090332fbfe72e023b59f6d2" } }
  },
  {
    id: 7,
    name: "BuKO",
    url: "https://qp-pldt-live-bpk-01-prod.akamaized.net/bpk-tv/cg_buko_sd/default/index.mpd",
    type: "dash",
    logo: "https://i.imgur.com/Wv0K5Yc.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "d273c085f2ab4a248e7bfc375229007d", key: "7932354c3a84f7fc1b80efa6bcea0615" } }
  },
  {
    id: 8,
    name: "Sari-Sari",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_sarisari/default/index.mpd",
    type: "dash",
    logo: "https://static.wikia.nocookie.net/russel/images/e/ec/Sari-Sari_Channel_2D_Logo_2016.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "0a7ab3612f434335aa6e895016d8cd2d", key: "b21654621230ae21714a5cab52daeb9d" } }
  },
  {
    id: 9,
    name: "PBO",
    url: "https://qp-pldt-live-bpk-01-prod.akamaized.net/bpk-tv/pbo_sd/default/index.mpd",
    type: "dash",
    logo: "https://i.imgur.com/61fHpnW.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "dcbdaaa6662d4188bdf97f9f0ca5e830", key: "31e752b441bd2972f2b98a4b1bc1c7a1" } }
  },
  {
    id: 10,
    name: "Tap Movies",
    url: "https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_tapmovies_hd1/default/index.mpd",
    type: "dash",
    logo: "https://i.imgur.com/3RVA5mV.png",
    group: "Cignal",
    drm: { clearkey: { keyId: "71cbdf02b595468bb77398222e1ade09", key: "c3f2aa420b8908ab8761571c01899460" } }
  }
]
