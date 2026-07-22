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
    blurb: '무대 위 모습과는 다른 6명의 케미와 리액션 부자 매력을 볼 수 있는 예능 영상.',
  },
  {
    id: 'riku-tears-nasa',
    title: '리쿠 눈물의 NASA',
    youtubeId: '3cunglJwn1E',
    memberId: 'riku',
    blurb: '많은 팬들을 입덕시킨 그 영상. 리쿠의 진심이 담긴 무대를 보면 왜 다들 위시에 빠지는지 알 수 있어요.',
  },
];
