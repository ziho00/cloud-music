import {
	initDate,
  initArtists,
  classCreator,
	initPlayCount
} from "@utils"

export class Playlist {
	constructor(params) {
		this.id = params.id ? params.id : null
		this.name = params.name ? params.name : null
		this.picUrl = params.picUrl ? params.picUrl : null
		this.copywriter = params.copywriter ? params.copywriter : null
		this.playCount = params.playCount ? initPlayCount(params.playCount) : 0
		this.trackCount = params.trackCount ? params.trackCount : 0
	}
}

export class Creator {
	constructor(params) {
    this.userId = params.userId || 0
    this.userType = params.userType || 0
    this.nickname = params.nickname || ""
    this.signature = params.signature || ""
    this.avatarUrl = params.avatarUrl || null
    this.description = params.description || ""
    this.backgroundUrl = params.backgroundUrl || null
    this.detailDescription = params.detailDescription || ""
  }
}

export class PlayList {
  constructor(params) {
    this.id = params.id ? params.id : null
    this.name = params.name ? params.name : ""
    this.ToplistType = params.ToplistType ? params.ToplistType : ""
    this.coverImgUrl = params.coverImgUrl ? params.coverImgUrl : null
    this.coverImgId_str = params.coverImgId_str ?  params.coverImgId_str : ""
    this.playCount = params.playCount ? initPlayCount(params.playCount) : 0
    this.updateTime = params.updateTime ? initDate(params.updateTime) : null
		this.creator = params.creator ? new Creator(params.creator) : null
		this.songs = classCreator(params.tracks, PlaylistSong)
  }
}

export class PlaylistSong {
	constructor(params) {
    this.id = params.id || null
    this.name = params.name || ""
    this.artists = params.ar && initArtists(params.ar) || []
    this.album = params.al || null
  }
}

export class Music {
  constructor(params) {
    this.name = params.name || ""
    this.id = params.id || null
    this.artists = params.ar && initArtists(params.ar) || []
    this.album = params.al || null
  }
}

export class SearchHot {
  constructor(params) {
    this.searchWord = params.searchWord || ""
    this.score = params.score || 0
    this.content = params.content || ""
    this.source = params.source || 0
    this.iconType = params.iconType || 0
    this.iconUrl = params.iconUrl || null
    this.alg = params.alg || null
  }
}

export class SearchSong{
  constructor(params) {
    this.id = params.id ? params.id : null
    this.name = params.name ? params.name : null
    this.artists = params.artists ? initArtists(params.artists) : ""
    this.album = params.album ? params.album.name : null
  }
}

export class Song {
  constructor(params) {
    this.id = params.id ? params.id : null
    this.name = params.name ? params.name : ""
    this.album = params.al ? params.al.name : null
    this.artists = params.ar ? initArtists(params.ar) : ""
  }
}

export class SearchSinger {
  constructor(params) {
    this.id = params.id ? params.id : null
    this.name = params.name ? params.name : ""
    this.img1v1Url = params.img1v1Url ? params.img1v1Url : null
    this.picUrl = params.picUrl ? params.picUrl : null
    this.alia = params.alia ? `(${params.alia[0]})` : ""
  }
}

export class SearchPlayList{
  constructor(params) {
    this.id = params.id ? params.id : null
    this.name = params.name ? params.name : null
    this.creator = params.creator ? params.creator.nickname : ""
    this.picUrl = params.coverImgUrl ? params.coverImgUrl : null
    this.trackCount = params.trackCount ? params.trackCount : 0
    this.playCount = params.playCount ? initPlayCount(params.playCount) : 0
  }
}
