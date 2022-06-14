const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'NDK_PLAYER'

const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const menu_song = $('.menu_song')
const search_result = $('#search_result')
// hieu ung
const wave = $('.wave')
const wave_1 = $('.wave_1')
const toggle = $('.toggle')
const banner = $('.banner')

const app = {
    currentIdex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isDark: false,
    songs: [
        {
            name: 'Sky Hight',
            singer: 'Elektronomia',
            path: './assets/music/song7.mp3',
            Image: './assets/img/song7.jpg',
        },
        {
            name: 'Sign',
            singer: 'Deamn',
            path: './assets/music/song2.mp3',
            Image: './assets/img/song2.jpg',
        },
        {
            name: 'The Spectre',
            singer: 'Alan Walker',
            path: './assets/music/song3.mp3',
            Image: './assets/img/song3.jpg',
        },
        {
            name: 'Fly Away',
            singer: 'TheFatRat, Anjulie',
            path: './assets/music/song4.mp3',
            Image: './assets/img/song4.jpg',
        },
        {
            name: 'Jackpot',
            singer: 'TheFatRat',
            path: './assets/music/song5.mp3',
            Image: './assets/img/song5.jpg',
        },
        {
            name: 'Road So Far',
            singer: 'TonyZ',
            path: './assets/music/song6.mp3',
            Image: './assets/img/song6.jpg',
        },
        {
            name: 'Echoes - LFZ',
            singer: 'LFZ',
            path: './assets/music/song8.mp3',
            Image: './assets/img/song8.jpg',
        },
        {
            name: 'Monody',
            singer: 'TheFatRat, Laura Brehm',
            path: './assets/music/song9.mp3',
            Image: './assets/img/song9.jpg',
        },
        {
            name: 'Unity',
            singer: 'Alan Walker, Walkers; ',
            path: './assets/music/song10.mp3',
            Image: './assets/img/song10.jpg',
        },
        {
            name: 'Cloud 9',
            singer: 'Itro, Tobu',
            path: './assets/music/song11.mp3',
            Image: './assets/img/song11.jpg',
        },
        {
            name: 'Blank',
            singer: 'Disfigure',
            path: './assets/music/song12.mp3',
            Image: './assets/img/song12.jpg',
        },
        {
            name: 'The Guardian Of Angels',
            singer: 'Niviro',
            path: './assets/music/song13.mp3',
            Image: './assets/img/song13.jpg',
        },
        {
            name: 'Adventure',
            singer: 'JJD',
            path: './assets/music/song14.mp3',
            Image: './assets/img/song14.jpg',
        },
        {
            name: 'Symbolism',
            singer: 'Electro-Light',
            path: './assets/music/song15.mp3',
            Image: './assets/img/song15.jpg',
        },
        {
            name: 'Love U',
            singer: 'Razihel',
            path: './assets/music/song16.mp3',
            Image: './assets/img/song16.jpg',
        },
        {
            name: 'lily',
            singer: 'Alan Walker,K-391,Emelie Hollow',
            path: './assets/music/song17.mp3',
            Image: './assets/img/song17.jpg',
        },
        {
            name: 'On My Way',
            singer: 'Alan Walker,Sabrina Carpenter,Farruko',
            path: './assets/music/song18.mp3',
            Image: './assets/img/song18.jpg',
        },
        {
            name: 'PLay',
            singer: 'K-391,Alan Walker,Martin Tungevaag,Mangoo',
            path: './assets/music/song19.mp3',
            Image: './assets/img/song19.jpg',
        },
        {
            name: 'Alone',
            singer: 'Alan Walker',
            path: './assets/music/song20.mp3',
            Image: './assets/img/song20.jpg',
        },
        {
            name: 'Save Me',
            singer: 'Deamn',
            path: './assets/music/song1.mp3',
            Image: './assets/img/song1.jpg',
        }
    ],
    render: function() {
       const htmls = this.songs.map((song, index) => {
           return `
           <div  class="song ${index === this.currentIdex ? 'active' : ''}" data-index="${index}">
                <a id="${index}" href=""></a>
                <div class="thumb" style="background-image: url('${song.Image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option"><i class="fas fa-ellipsis-h"></i></div>
            </div>
           `
       })
       const html = this.songs.map((song, index) => {
           return `
           <a href="#${index}" class="card" > 
           <img src="${song.Image}" alt="" >
           <div class="content_search" >
           ${song.name}
           <div class="subtitle">${song.singer}</div>
           </div>
           </a>
           `
       })
        menu_song.innerHTML = htmls.join('')
        search_result.innerHTML = html.join('')

    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIdex]
            }
        })
    },
    handleEvents: function() {
        const _this = this

        // xu li CD quay  / dung
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, //10 giay
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        //xu li kh click play
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause()
            } else{       
                audio.play()
            }
        }

        //khi song dc play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')   
            cdThumbAnimate.play()
            //hieu ung thanh len xuong khi play
            wave.classList.add('active2')
            wave_1.classList.add('active_2')
        }

        //khi song bi pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')  
            cdThumbAnimate.pause() 
            wave.classList.remove('active2')
            wave_1.classList.remove('active_2')
        }

        //khi tien do bai hat thay doi
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        
        // xu ly khi tua bai hat
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // khi next song 
        nextBtn.onclick = function() {
            if (_this.isRandom){
                _this.playRandomSong()
            } else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // khi  prev song 
        prevBtn.onclick = function() {
            if (_this.isRandom){
                _this.playRandomSong()
            } else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }

        // xu li on/off random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        
        //xu li phat lai 1 song
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)

        }

        // xu li next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat){
                audio.play()
            } else{
                nextBtn.click()
            }
        }

        // lang nghe hanh vi click vao menu_song
        menu_song.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')

            if (songNode || e.target.closest('.option')) {
                // xu li khi click vao song
                if(songNode) {
                    _this.currentIdex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // xu li khi click vao song option
                if(e.target.closest('.option')) {

                }
            }
        }
        //search
        search_result.onclick = function() {
            const songSearch = e.target.closest('.song:not(.active)')
            
            if (songSearch) {
                _this.currentIdex = Number(Number(songNode.dataset.index))
                _this.loadCurrentSong()
                audio.play()
            }
        }
        let input = document.getElementsByTagName('input')[0];


        input.addEventListener('keyup' , () => {
            let input_value = input.value.toUpperCase();
            let items = search_result.getElementsByTagName('a')

            for (let i = 0; i < items.length; i++) {
                let as = items[i].getElementsByClassName('content_search')[0];
                let text_value = as.textContent || as.innerText;

                if (text_value.toUpperCase().indexOf(input_value) > -1) {
                    items[i].style.display = "flex"
                } else {
                    items[i].style.display = "none"
                }
                if(input.value == 0) {
                    search_result.style.display = "none";
                } else {
                    search_result.style.display = "";
                }
                
            }
        })
        // xu li hieu ung sang toi cua giao dien
        const bi_light = $('.bi_light')
        toggle.onclick = function() {
            if (_this.isDark) {
                _this.isDark = false
                banner.style.backgroundColor = "#131312"
                bi_light.style.background = "#fff"
                bi_light.style.color = "#000000"

            } else {
                _this.isDark = true
                banner.style.backgroundColor = "#d3d3d3"
                bi_light.style.background = "#000000"
                bi_light.style.color = "#fff"
            }
        } 
        // hieu ung user name 
        const list = document.querySelectorAll('span')
        var index = 0
        
        setInterval((e) => {
            list.forEach((e) => {
                e.classList.remove('change-properties')
            })
            list[index].classList.add('change-properties')
            index++
            if (index == list.length) {
                index = 0
            }
        }, 150)
        // hieu ung loader khi vao trang
        var loader = document.querySelector(".loader")

        window.addEventListener("load", vanish);
        function vanish() {
            loader.classList.add("disppear");
        }
        
    },
    
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.Image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIdex++
        if(this.currentIdex >= this.songs.length) {
            this.currentIdex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIdex--
        if  (this.currentIdex < 0) {
             this.currentIdex = this.songs.length -1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIdex)

        this.currentIdex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe / xử lí sự kiện (DOM events)
        this.handleEvents()

        // tải thông tin bài hát đầu tiên vào UI khi chạy wed
        this.loadCurrentSong()

        // Render playlist
        this.render()
    }
}

app.start()




