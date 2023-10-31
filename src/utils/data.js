
// follow imgs 
import abh from '../assets/follow/abh.png'
import im from '../assets/follow/im.png'
import imkir from '../assets/follow/imkir.png'
import org from '../assets/follow/org.png'
import sak from '../assets/follow/sakbrl.png'
import upvox from '../assets/follow/upvox.png'
// stories imgs 
import aur from '../assets/stories/aur.png'
import lowell from '../assets/stories/lowell.png'
import peter from '../assets/stories/peter.png'
import roy from '../assets/stories/roy.png'
import sara from '../assets/stories/sara.png'
import vella from '../assets/stories/vella.png'
// post imgs 
import nPost from '../assets/posts/nancy.png'
import nAvatar from '../assets/posts/nancyAvatar.png'
import gPost from '../assets/posts/gen.png'
import gAvatar from '../assets/posts/genAvatar.png'
import oPost from '../assets/posts/gate.png'
import oAvatar from '../assets/posts/gateAvatar.png'
// suggest imgs 
import fel from '../assets/suggest/fel.png'
import tyler from '../assets/suggest/tyler.png'

export const userData = [
    {
        key: 1,
        avatar: nAvatar,
        username: 'rafaelfigini',
        post: nAvatar,
        time: '3d',
        likes: '1 like',
        reply: 'Reply',
        lang: 'See translation',
        comment: 'O ano é 2073. Tatuadores e tatuados mudam a cor e aumentam o brilho de suas tatuagens através de dispositivos futuristas. ',
        hashtag: '#IA #nftbrazil #AI #DallE'
    },
    {   key: 2,
        avatar: nAvatar,
        username: 'salvadxrx',
        post: '',
        time: '1d',
        likes: '1 like',
        reply: 'Reply',
        lang: '',
        comment: "Server isn't working",
        hashtag: ''
    },
    {   key: 3,
        avatar: nAvatar,
        username: 'edubarros101',
        post: '',
        time: '1d',
        likes: '1 like',
        reply: 'Reply',
        lang: 'See translation',
        comment: "Ainda bem que não é 2077, ou essas tattoos iam ficar todas bugadas.",
        hashtag: ''
        
    },
    {   key: 4,
        avatar: nAvatar,
        username: 'theactornekhiataylor',
        post: '',
        time: '',
        likes: '',
        reply: '',
        lang: '',
        comment: "None of my prompts look a thing like",
        hashtag: ''
    },
    {   key: 5,
        avatar: open,
        username: 'openaidalle',
        post: '',
        time: '',
        likes: '',
        reply: '',
        lang: '',
        comment: '',
        hashtag: ''
    },
]


export const userPostData = [
  {
    id: 0,
    users: [
        {
           username: "upvox_",
           following: "Upvox",
           src: upvox, 
           status: 'Switch',
        },
        {
            username: "imkir",
            following: "Follows you",
            src: imkir,
            status: 'Follow', 
        },
        {
            username: "organic__al",
            following: "Followed by chirag_singla17",
            src: org, 
            status: 'Follow', 
        },
        {
            username: "im_gr",
            following: "Followed by chirag_singla17",
            src: im, 
            status: 'Follow',
        },
        {
            username: "abh952",
            following: "Follows you",
            src: abh, 
            status: 'Follow', 
        },
        {
            username: "sakbrl",
            following: "Follows you",
            src: sak, 
            status: 'Follow', 
        },
    ]
  },
  {
    id: 1,
    users: [
      {
        key: 4,
        username: "aurelio",
        src: aur, 
      },
      {
        key: 5,
        username: "saraali",
        src: sara, 
      },
      {
        key: 6,
        username: "vella",
        src: vella, 
      },
      {
        key: 7,
        username: "peter",
        src: peter, 
      },
      {
        key: 8,
        username: "lowell",
        src: lowell, 
      },
      {
        key: 9,
        username: "roy",
        src: roy, 
      },
    ]
  },
  {
    id: 2,
    users: [
      {
        key: 10,
        username: "Tyler Nix",
        following: "Follows you",
        src: tyler, 
      },
      {
        key: 11,
        username: "Fellipe Ditadi",
        following: "Followed by chirag_sin",
        src: fel, 
      },
    ]
  },
  {
    id: 3,
    users: [
      {
        username: 'Nancy',
        avatar: nAvatar,
        post: nPost,
      },
      {
        username: 'Genshinimpect',
        avatar: gAvatar,
        post: gPost,
      },
      {
        username: 'oceangate',
        avatar: oAvatar,
        post: oPost,
      },
    ]
  }
]