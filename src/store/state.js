const state = {
  account: {},
  profile: {},
  token: '',
  isAnonymous: false, 
  playList: [], // 当前播放歌单
  randomPlayList: [], // 选择随机播放时使用的歌单
  isPlaying: false, // 播放状态 true | 正在播放  false | 暂停
  mode: 0, // 播放模式 0 列表顺序   1 单曲循环    2 随机播放
  musicUrl: null, // 当前播放歌曲 .mp3 url
  musicInfo: {}, // 当前播放歌曲详细信息
  currentIndex: null, // 当前播放歌曲下标
  currentTime: 0, // 当前播放的时间
  lyrics: [], // 歌词
  changeCurrentTime: 0, //
  totalTime: 0, // 当前播放歌曲时长
}
export default state
