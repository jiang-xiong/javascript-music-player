var bindPlay = function () {
  var playButton = e('#play-button')
  bindEvent(playButton, 'click', function () {
    var music = e('#id-audio-player')
    music.play()
    removeClassAll('hidden')
    toggleClass(playButton, 'hidden')
  })
}
var bindPause = function () {
  var pauseButton = e('#pause-button')
  bindEvent(pauseButton, 'click', function () {
    var music = e('#id-audio-player')
    music.pause()
    removeClassAll('hidden')
    toggleClass(pauseButton, 'hidden')
  })
}
var bindPrev = function () {
  var leftButton = e('#left-button')
  bindEvent(leftButton, 'click', function () {
    var music = e('#id-audio-player')
    var list = songList()
    var name = music.src.split('/')[9]
    // log(name)
    var index = currentSong(list, name)
    index = (index - 1 + list.length) % list.length
    var prevSong = list[index].english
    // log(music)
    music.src = './static/' + prevSong
    music.play()
    var playButton = e('#play-button')
    removeClassAll('hidden')
    toggleClass(playButton, 'hidden')
    changImg()
    removeClassAll('active')
  })
}
var bindNext = function () {
  var rightButton = e('#right-button')
  bindEvent(rightButton, 'click', function () {
    var music = e('#id-audio-player')
    var list = songList()
    var name = music.src.split('/')[9]
    var index = currentSong(list, name)
    index = (index + 1 + list.length) % list.length
    var nextSong = list[index].english
    // log(music)
    music.src = './static/' + nextSong
    music.play()

    var playButton = e('#play-button')
    removeClassAll('hidden')
    toggleClass(playButton, 'hidden')
    changImg()
    removeClassAll('active')

  })
}
var currentSong = function (list, name) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].english == name) {
      // log('i', i)
      var index = i
      break
    }
  }
  return index
}
var songList = function () {
  var t = [
    {
      chinese: '逃亡-吴青峰.mp3',
      english: 'taowang-wuqingfeng.mp3'
    }, {
      chinese: '燕窝-吴青峰.mp3',
      english: 'yanwo-wuqingfeng.mp3'
    },
  ]
  return t
}
var scrolBar = function () {
  var music = e('#id-audio-player')
  var range = e('#id-range-bar')
  var value = (music.currentTime / music.duration) * 100
  // if (Boolean(value) == true) {
    // log('bar')
          range.value = value
          var b = range.value
          range.style.background = `linear-gradient(${b}%)`
      // }
}
var updateBar = function () {
  // log('update bar')
  var music = e('#id-audio-player')
  music.addEventListener('timeupdate', scrolBar)
}
var bindRange = function () {
  var range = e('#id-range-bar')
  bindEvent(range, 'input', function () {
    var music = e('#id-audio-player')
    music.removeEventListener('timeupdate', scrolBar)
    var v = this.value
    music.currentTime = music.duration * (v / 100)
    var music = e('#id-audio-player')
    music.play()
    updateBar()
    var playButton = e('#play-button')
    var pauseButton = e('#pause-button')
    removeClassAll('hidden')
    toggleClass(playButton, 'hidden')

  })
}
var bindPlayTarget = function () {
  var list = e('.menu')
  bindEvent(list, 'click', function(event) {
    var self = event.target
    // log('self', self)
    if (self != list) {
      var src = self.dataset.src
      var music = e('#id-audio-player')
      music.src = './static/' + src
      music.play()
      var playButton = e('#play-button')
      removeClassAll('hidden')
      toggleClass(playButton, 'hidden')
      changImg()
      removeClassAll('active')
      toggleClass(self, 'active')
    }

  })
}
var changImg = function () {
  var music = e('#id-audio-player')
  var list = songList()
  var name = music.src.split('static/')[1]
  log(name)
  var index = currentSong(list, name)
  var src = list[index].english
  log(src)
  var img = e('#id-img')
  img.src = './static/' + src + '.jpg'
}
var template = function (name, src) {
  var n = name.split('.')[0]
  var t = `
  <div class="item" data-src=${src}>
    ${n}
  </div>
  `
  return t
}
var initList = function() {
  var list = songList()
  var container = e('.menu')
  for (var i = 0; i < list.length; i++) {
    var t = template(list[i].chinese, list[i].english)
    appendHtml(container, t)
  }
}
var bindEvents = function () {
  bindPlay()
  bindPause()
  bindPrev()
  bindNext()
  bindRange()
  bindPlayTarget()
}
var __main = function () {
  initList()
  updateBar()
  bindEvents()
}
__main()
