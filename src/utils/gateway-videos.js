/**
 * 위시 입덕 영상 큐레이션
 *
 * 뮤직비디오는 디스코그래피에서 이미 볼 수 있어서 제외하고, 예능/리액션/
 * 감동 모먼트처럼 무대 밖 매력을 보여주는 영상 위주로 큐레이션합니다.
 *
 * memberId가 없으면(null) 그룹 전체를 위한 영상으로 메인 입덕 영상 페이지에서
 * 보여준다. memberId가 있으면 해당 멤버 전용 페이지에서만 보여주고, 다른
 * 멤버 페이지나 메인 목록에는 섞이지 않는다.
 */
export const gatewayVideos = [
  {
    id: 'funny-game',
    title: '개웃긴 복불복 게임',
    youtubeId: 'kzw-RTzpDTM',
    memberId: null,
    category: '예능',
  },
  {
    id: 'riku-tears-nasa',
    title: '리쿠 눈물의 NASA',
    youtubeId: '3cunglJwn1E',
    memberId: 'riku',
    category: '무대',
  },
  {
    id: 'yushi-wensu-nomchin',
    title: '웬수놈친',
    youtubeId: 'W8j-J2YRi1E',
    memberId: 'yushi',
    category: '예능',
  },
  {
    id: 'yushi-steady-fancam',
    title: "유우시 직캠 'Steady'",
    youtubeId: 'n3FM40NaPAg',
    memberId: 'yushi',
    category: '무대',
  },
  {
    id: 'yushi-poppop-fancam',
    title: "유우시 직캠 'poppop'",
    youtubeId: 'prUVi_tGa0s',
    memberId: 'yushi',
    category: '무대',
  },
  {
    id: 'yushi-ode-to-love-fancam',
    title: "유우시 직캠 'Ode to Love'",
    youtubeId: 'pvgraLWBJ9Q',
    memberId: 'yushi',
    category: '무대',
    featured: true,
  },
  {
    id: 'mikan-jamgi',
    title: '말할 때 빼고 미간 잡기',
    youtubeId: 'qjjt0pPBeHs',
    memberId: 'yushi',
    category: '예능',
  },
  {
    id: 'sion-surf-facecam',
    title: "시온 페이스캠 'Surf'",
    youtubeId: '7_yaB5jPM2c',
    memberId: 'sion',
    category: '무대',
  },
];
