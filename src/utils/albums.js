/**
 * NCT WISH 디스코그래피
 *
 * 위키백과, kprofiles.com 등 공개된 정보를 종합해 자체적으로 정리한 데이터입니다.
 * coverUrl이 없으면 AlbumCard가 컬러 플레이스홀더로 대체 표시한다(추후 실제 커버
 * 이미지로 교체 가능하도록 구조화).
 * youtubeId는 타이틀곡 공식 뮤직비디오의 유튜브 영상 ID.
 * tracks의 각 곡은 { title, youtubeId } 형태. youtubeId는 공식 뮤직비디오 또는
 * SM/avex trax 공식 채널의 Official Audio 영상 ID이며, 확인되지 않은 일부 곡만
 * null로 남겨 클릭 시 유튜브 검색으로 연결한다.
 *
 * releaseDate 기준 최신순으로 정렬해서 사용한다.
 */

/**
 * 앨범 썸네일 이미지 URL을 반환한다.
 * coverUrl이 지정되어 있으면 그대로 사용하고, 없으면 타이틀곡 유튜브 영상의
 * 공식 썸네일(유튜브 자체 CDN에서 직접 참조, 다운로드/재호스팅 아님)을 대신 쓴다.
 */
export function getAlbumThumbnail(album) {
  if (album.coverUrl) return album.coverUrl;
  if (album.youtubeId) return `https://img.youtube.com/vi/${album.youtubeId}/hqdefault.jpg`;
  return null;
}

export const albums = [
  {
    id: 'yoidon-bmg',
    title: 'YO-I-DON! / BOY MEETS GIRL',
    releaseDate: '2026-07-13',
    type: '싱글',
    language: '일본어',
    label: 'SM Entertainment · avex trax',
    coverUrl: null,
    color: '#4FD8B0',
    youtubeId: 'E1d8dVSs0Bg',
    description:
      '더블 타이틀 싱글. "YO-I-DON!"은 일본어 제목으로 발표한 첫 오리지널 신곡이며, "BOY MEETS GIRL"은 일본 헤이세이 시대 히트곡인 TRF의 동명 곡을 리메이크한 곡이다.',
    tracks: [
      { title: 'YO-I-DON!', youtubeId: 'E1d8dVSs0Bg' },
      { title: 'BOY MEETS GIRL', youtubeId: '2derLGPaliE' },
    ],
  },
  {
    id: 'ode-to-love',
    title: 'Ode to Love',
    releaseDate: '2026-04-20',
    type: '정규 1집',
    language: '한국어',
    label: 'SM Entertainment',
    coverUrl: null,
    color: '#F06292',
    youtubeId: '1o5O2YvV3HU',
    description:
      'NCT WISH의 첫 한국어 정규 앨범. 타이틀곡 "Ode to Love"는 UK 개러지풍 댄스팝으로, 더 크랜베리스(The Cranberries)의 1994년 곡 "Ode to My Family"를 샘플링했다.',
    tracks: [
      { title: '2.0 (TWO POINT O)', youtubeId: 'Hc7qH-MJds4' },
      { title: 'Ode to Love', youtubeId: '1o5O2YvV3HU' },
      { title: 'Sticky', youtubeId: 'Q120WlxVxdk' },
      { title: 'Feel The Beat', youtubeId: 'CUu2tw6SwYU' },
      { title: 'Crush', youtubeId: 'G3pUc2MqGOQ' },
      { title: 'Street (2AM)', youtubeId: 'm8djIOyVJcQ' },
      { title: 'Glow Up', youtubeId: 'pYG4dx5ZP7Q' },
      { title: 'Everglow', youtubeId: 'iEnV_KmIr8Y' },
      { title: "Don't Say You Love Me", youtubeId: 'SjZf91tqQNw' },
      { title: 'Voyage', youtubeId: 'N5sLnZFwTDM' },
    ],
  },
  {
    id: 'wishlist',
    title: 'WISHLIST',
    releaseDate: '2026-01-14',
    type: '미니 1집',
    language: '일본어',
    label: 'SM Entertainment · avex trax',
    coverUrl: null,
    color: '#7C4DFF',
    youtubeId: '8s23tBtQciU',
    description: 'NCT WISH의 첫 일본 미니 앨범. 타이틀곡은 "Hello Mellow".',
    tracks: [
      { title: 'Hello Mellow', youtubeId: '8s23tBtQciU' },
      { title: 'ZONE', youtubeId: 'sZ0bzafY1lY' },
      { title: 'BUBBLE GUM', youtubeId: 'zpjXvoqSft8' },
      { title: 'Dreamcatcher', youtubeId: 'huB0Tju2p5k' },
      { title: 'SOMEDAY', youtubeId: 'hR1EpLzfjmA' },
      { title: 'Good Morning', youtubeId: 'ioKx73D0KdI' },
      { title: 'poppop (Japanese Ver.)', youtubeId: 'hxsaZK8ptFg' },
    ],
  },
  {
    id: 'color',
    title: 'COLOR',
    releaseDate: '2025-09-01',
    type: '미니 3집',
    language: '한국어',
    label: 'SM Entertainment · Kakao Entertainment',
    coverUrl: null,
    color: '#FFCA28',
    youtubeId: '28dAfmIAlCo',
    description: '세 번째 한국 미니 앨범. "Surf"가 선공개곡으로 먼저 발매됐고, 타이틀곡은 "COLOR".',
    tracks: [
      { title: 'COLOR', youtubeId: '28dAfmIAlCo' },
      { title: 'Baby Blue', youtubeId: 'FBr4hA9L90s' },
      { title: 'Surf', youtubeId: '1pyO6oNmACs' },
      { title: 'Cheat Code', youtubeId: 'x71U5Jy8_Sg' },
      { title: 'Videohood', youtubeId: 'ayt-1vk0uZ8' },
      { title: 'WICHU', youtubeId: 'n2kx57mcjpM' },
      { title: '고양이 릴스 (Reel-ationship)', youtubeId: 'OKUaYhLHMMc' },
    ],
  },
  {
    id: 'poppop',
    title: 'poppop',
    releaseDate: '2025-04-14',
    type: '미니 2집',
    language: '한국어',
    label: 'SM Entertainment · Kakao Entertainment',
    coverUrl: null,
    color: '#66BB6A',
    youtubeId: 'LNETckymbzk',
    description: '첫 일본 정규 앨범 이후 4개월 만의 컴백으로, 4개월간 활동을 쉬었던 리쿠가 복귀한 앨범이기도 하다.',
    tracks: [
      { title: 'poppop', youtubeId: 'LNETckymbzk' },
      { title: 'Melt Inside My Pocket', youtubeId: 'u-AWYDoksD4' },
      { title: 'Design', youtubeId: null },
      { title: '1000', youtubeId: '8GCSIIzFEg8' },
      { title: 'Silly Dance', youtubeId: 'zWOw15v7rIE' },
      { title: 'Still 3PM', youtubeId: 'to6dnhwZb1E' },
    ],
  },
  {
    id: 'wishful',
    title: 'Wishful',
    releaseDate: '2024-11-27',
    type: '정규 1집',
    language: '일본어',
    label: 'SM Entertainment · avex trax',
    coverUrl: null,
    color: '#4FC3F7',
    youtubeId: 'NAhEwvI9TGE',
    description:
      'NCT WISH의 첫 일본 정규 앨범. 기존 발매곡 6곡과 신곡 7곡으로 구성됐다. 타이틀곡 "Wishful Winter"는 아르페지오 피아노와 현악, 종소리 같은 화음이 어우러진 팝 발라드로, "크리스마스에 소원을 들어준다"는 가사를 담고 있다.',
    tracks: [
      { title: 'Wishful Winter', youtubeId: 'NAhEwvI9TGE' },
      { title: 'Wish', youtubeId: 'ZgrEZmAgzM8' },
      { title: 'Songbird', youtubeId: 'C_qALZPuK8I' },
      { title: 'Far Away', youtubeId: 'FFunPGXHVXc' },
      { title: 'We Go!', youtubeId: 'nFZY0ZaMeik' },
      { title: 'Touchdown', youtubeId: 'npp-zrl56VE' },
      { title: 'Hands Up', youtubeId: 'u_Ll5hK72Jc' },
      { title: 'Sail Away', youtubeId: null },
      { title: 'Choo Choo', youtubeId: 'yPn1Qc55nQQ' },
      { title: 'NASA', youtubeId: 'RuNnDz6HiOE' },
      { title: 'P.O.V', youtubeId: '89b5nlmE3nc' },
      { title: 'Tears Are Falling', youtubeId: 'WqE208sMyTQ' },
      { title: 'Our Adventures', youtubeId: 'gZH4IqA9SQU' },
    ],
  },
  {
    id: 'steady',
    title: 'Steady',
    releaseDate: '2024-09-24',
    type: '미니 1집',
    language: '한국어',
    label: 'SM Entertainment · Kakao Entertainment',
    coverUrl: null,
    color: '#A78BFA',
    youtubeId: 'IKlkZZv76Ho',
    description:
      'NCT WISH의 첫 한국 미니 앨범. 선공개곡 "Dunk Shot"과 타이틀곡 "Steady"를 포함해 7곡이 수록됐으며, 사전 예약 판매량 80만 장을 돌파해 이전 기록(63만 장)을 넘어섰다.',
    tracks: [
      { title: 'Steady', youtubeId: 'IKlkZZv76Ho' },
      { title: '3 Minutes', youtubeId: 'GTFqQDZ6jec' },
      { title: 'Dunk Shot', youtubeId: '4vgac97VlCE' },
      { title: 'On & On', youtubeId: '5-gaJFxy5sA' },
      { title: 'Supercute', youtubeId: 'e3E_xD0BCRs' },
      { title: 'Skate', youtubeId: 'bMXpO3Q6WMo' },
      { title: 'Hands Up (Korean Ver.)', youtubeId: 'YC_MbYas3Hc' },
    ],
  },
  {
    id: 'songbird-kr',
    title: 'Songbird (한국반)',
    releaseDate: '2024-07-01',
    type: '싱글',
    language: '한국어',
    label: 'SM Entertainment',
    coverUrl: null,
    color: '#EF5350',
    youtubeId: '2XqVNFBtVo4',
    description: '일본반에 이은 한국어 버전 싱글. "Cupid Museum에서 사라진 새(Missing Bird in Cupid Museum)" 컨셉의 티저로 화제를 모았다.',
    tracks: [
      { title: 'Songbird (Korean Ver.)', youtubeId: '2XqVNFBtVo4' },
      { title: 'Tears Are Falling (Korean Ver.)', youtubeId: '1OQG1diC9i4' },
    ],
  },
  {
    id: 'songbird-jp',
    title: 'Songbird (일본반)',
    releaseDate: '2024-06-25',
    type: '싱글',
    language: '일본어',
    label: 'avex trax',
    coverUrl: null,
    color: '#FF7043',
    youtubeId: 'C_qALZPuK8I',
    description: 'NCT WISH의 두 번째 일본 싱글.',
    tracks: [
      { title: 'Songbird (Japanese Ver.)', youtubeId: 'C_qALZPuK8I' },
      { title: 'Tears Are Falling (Japanese Ver.)', youtubeId: 'pmeZQnemR8Y' },
    ],
  },
  {
    id: 'wish-kr',
    title: 'Wish (한국반)',
    releaseDate: '2024-03-04',
    type: '싱글',
    language: '한국어',
    label: 'SM Entertainment',
    coverUrl: null,
    color: '#26C6DA',
    youtubeId: 'hvQZs3k6Ytk',
    description: '데뷔 싱글 "Wish"의 한국반. 올드스쿨 힙합 장르로, 클래식 명곡의 샘플링이 포함됐다.',
    tracks: [
      { title: 'Wish (Korean Ver.)', youtubeId: 'hvQZs3k6Ytk' },
      { title: 'Sail Away (Korean Ver.)', youtubeId: null },
    ],
  },
  {
    id: 'wish-jp',
    title: 'Wish (일본반)',
    releaseDate: '2024-02-28',
    type: '싱글',
    language: '일본어',
    label: 'avex trax',
    coverUrl: null,
    color: '#8FEDD1',
    youtubeId: 'ZgrEZmAgzM8',
    description: '2024년 2월 21일 데뷔한 NCT WISH의 데뷔 싱글. 일본 정규 앨범 "Wishful"의 타이틀곡이기도 하다.',
    tracks: [{ title: 'Wish (Japanese Ver.)', youtubeId: 'ZgrEZmAgzM8' }],
  },
];
