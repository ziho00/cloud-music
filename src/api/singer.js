import {get} from './index'

export const getSingerSongs = (params) => get('/artists', params)

export const getSingerInfo = (params) => get('/artist/desc', params)

export const getArtistList = (params) => get('/artist/list', params)
