const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Login = () => import(/* webpackChunkName: "main" */ '@/views/login')
const Main = () => import(/* webpackChunkName: "main" */ '@/views/main')
const Home = () => import(/* webpackChunkName: "main" */ '@/views/home')
const LeaderBoard = () => import(/* webpackChunkName: "playlist" */ '@/views/leader-board-detail')
const Playlist = () => import(/* webpackChunkName: "playlist" */ '@/views/playlist-detail')
const PlayView = () => import(/* webpackChunkName: "play" */ '@/views/play')
const SearchHistory = () => import(/* webpackChunkName: "search" */ '@/views/search-history')
const SearchList = () => import(/* webpackChunkName: "search" */ '@/views/search-history/search-list')
const SearchDetail = () => import(/* webpackChunkName: "searchDetail" */ '@/views/search-detail')
const SearchComprehensive = () => import(/* webpackChunkName: "searchDetail" */ '@/views/search-detail/comprehensive')
const SearchPlaylist = () => import(/* webpackChunkName: "searchDetail" */ '@/views/search-detail/playlist')
const SearchSinger = () => import(/* webpackChunkName: "searchDetail" */ '@/views/search-detail/singer')
const SearchSongs = () => import(/* webpackChunkName: "searchDetail" */ '@/views/search-detail/song')
const Singers = () => import(/* webpackChunkName: "singer" */ '@/views/singer-list')
const SingerDetail = () => import(/* webpackChunkName: "singer" */ '@/views/singer-list/singer-detail')

export default new VueRouter({
  mode: 'history',
  base: '/player',
  routes: [
    {
      path: '/',
      component: Login
    }, {
      path: '/main',
      component: Main,
      meta: { showMusicIcon: true },
      children:[
        {
          path: '',
          component: Home,
          meta: { showMusicIcon: true },
        }, {
          path: 'searchHistory',
          component: SearchHistory,
          meta: {
            showSingerIcon: true
          }
        }, {
          path: 'searchList',
          component: SearchList,
          meta: {
            showSingerIcon: true
          }
        }
      ]
    }, {
      path: '/play',
      component: PlayView
    }, {
      path: '/leaderboard/:idx',
      component: LeaderBoard,
      meta: { showMusicIcon: true }
    }, {
      path: '/playlist/:id',
      component: Playlist,
      meta: { showMusicIcon: true }
    }, {
      path: '/search/:keywords',
      component: SearchDetail,
      meta: { showMusicIcon: true },
      children: [
        {
          path: '',
          component: SearchComprehensive,
          meta: { showMusicIcon: true }
        }, {
          path: 'comprehensive',
          component: SearchComprehensive,
          meta: { showMusicIcon: true }
        }, {
          path: 'playlists',
          component: SearchPlaylist,
          meta: { showMusicIcon: true }
        }, {
          path: 'singers',
          component: SearchSinger,
          meta: { showMusicIcon: true }
        }, {
          path: 'songs',
          component: SearchSongs,
          meta: { showMusicIcon: true }
        }
      ]
    }, {
      path: '/singers',
      component: Singers,
      meta: { showMusicIcon: true }
    }, {
      path: '/singer/:id',
      component: SingerDetail,
      meta: { showMusicIcon: true }
    }
  ]
})
