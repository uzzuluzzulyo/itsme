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
    blurb: '무대 위 모습과는 다른 6명의 케미와 리액션 부자 매력을 볼 수 있는 예능 영상.',
  },
  {
    id: 'riku-tears-nasa',
    title: '리쿠 눈물의 NASA',
    youtubeId: '3cunglJwn1E',
    memberId: 'riku',
    category: '무대',
    blurb: '많은 팬들을 입덕시킨 그 영상. 리쿠의 진심이 담긴 무대를 보면 왜 다들 위시에 빠지는지 알 수 있어요.',
  },
  {
    id: 'yushi-wensu-nomchin',
    title: '웬수놈친',
    youtubeId: 'W8j-J2YRi1E',
    memberId: 'yushi',
    category: '예능',
    blurb: '유우시의 티키타카 매력이 담긴 영상. 보다 보면 저절로 웃음이 나요.',
  },
  {
    id: 'yushi-steady-fancam',
    title: "유우시 직캠 'Steady'",
    youtubeId: 'n3FM40NaPAg',
    memberId: 'yushi',
    category: '무대',
    blurb: "엠카운트다운 무대 직캠. 'Steady' 무대에서 유우시만의 분위기를 온전히 느낄 수 있어요.",
  },
  {
    id: 'yushi-poppop-fancam',
    title: "유우시 직캠 'poppop'",
    youtubeId: 'prUVi_tGa0s',
    memberId: 'yushi',
    category: '무대',
    blurb: "엠카운트다운 무대 직캠. 'poppop' 무대에서 유우시의 에너지를 가득 느낄 수 있어요.",
  },
  {
    id: 'yushi-ode-to-love-fancam',
    title: "유우시 직캠 'Ode to Love'",
    youtubeId: 'pvgraLWBJ9Q',
    memberId: 'yushi',
    category: '무대',
    featured: true,
    blurb: '주인장 최애 직캠. Ode to Love 무대의 유우시, 이 영상 하나면 다 설명돼요.',
  },
];
