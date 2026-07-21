/**
 * NCT WISH 멤버 정보
 *
 * kprofiles.com, 나무위키, WISH DOLL 관련 기사 등 공개된 정보를 종합해 자체적으로
 * 요약/정리한 데이터입니다. (정보 출처: 나무위키, kprofiles.com, soojib.com 등 —
 * 비영리 팬 프로젝트 용도로 사실 정보를 재정리했습니다.)
 *
 * color/doll/symbol은 SM에서 공개한 공식 WISH DOLL 캐릭터 기준입니다.
 * imageUrl이 있으면 MemberAvatar가 사진을, 없으면 WISH DOLL 이모지를 보여준다.
 */
import rikuPhoto from '../assets/members/riku.jpg';

export const members = [
  {
    id: 'sion',
    stageName: '시온',
    stageNameEn: 'Sion',
    realName: '오시온',
    birthDate: '2002-05-11',
    nationality: '한국',
    hometown: '전남 목포',
    position: '리더, 리드보컬',
    trainingPeriod: '약 4년',
    color: '#A78BFA',
    doll: { name: '시오닝', symbol: '튤립', emoji: '🌷' },
    hobby: '독서, 애니메이션 감상, 드럼 연주',
    funFacts: [
      '팀의 리더이자 리드보컬을 맡고 있다.',
      '롤모델로 EXO 카이를 꼽은 적이 있다.',
      'WISH DOLL 캐릭터 "시오닝"은 보라색 튤립을 모티프로 한다.',
    ],
    bio: '전남 목포 출신으로 약 4년간 SM에서 연습생 생활을 거친 뒤 NCT WISH의 리더 겸 리드보컬로 데뷔했다. 독서와 애니메이션, 드럼 연주를 좋아하는 팀의 맏형 리더.',
  },
  {
    id: 'riku',
    stageName: '리쿠',
    stageNameEn: 'Riku',
    realName: '마에다 리쿠',
    birthDate: '2003-06-28',
    nationality: '일본',
    hometown: '일본 후쿠이',
    position: '메인 래퍼',
    trainingPeriod: '약 1년',
    color: '#EF5350',
    imageUrl: rikuPhoto,
    doll: { name: '쿠리', symbol: '다람쥐', emoji: '🐿️' },
    hobby: '작사, 운동',
    funFacts: [
      '서바이벌 프로그램 NCT Universe: LASTART에서 가장 먼저 소개된 참가자였다.',
      '별명은 쿠리이며, 보조개가 매력 포인트로 꼽힌다.',
      'WISH DOLL 캐릭터 "쿠리"는 빨간색 다람쥐 모티프다.',
    ],
    bio: '일본 후쿠이 출신으로 비교적 짧은 약 1년의 연습생 기간을 거쳐 NCT WISH의 메인 래퍼로 데뷔했다. 서바이벌 프로그램에서 가장 먼저 소개된 멤버로, 보조개가 매력 포인트다.',
  },
  {
    id: 'yushi',
    stageName: '유우시',
    stageNameEn: 'Yushi',
    realName: '토쿠노 유우시',
    birthDate: '2004-04-05',
    nationality: '일본',
    hometown: '일본 도쿄',
    position: '메인 댄서',
    trainingPeriod: '약 7년',
    color: '#4FC3F7',
    doll: { name: '버블냥', symbol: '고양이 × 물범(버블티 콘셉트)', emoji: '🐱' },
    hobby: '축구, 게임',
    funFacts: [
      '데뷔 전 EDAMAME BEANS라는 팀에서 활동한 이력이 있다.',
      '연습생 기간이 멤버 중 가장 길다(약 7년).',
      'WISH DOLL 캐릭터 "버블냥"은 귀를 가리면 물범처럼 보이는 재미있는 디테일이 있다.',
    ],
    bio: '일본 도쿄 출신으로 약 7년이라는 긴 연습생 기간을 거쳤다. 데뷔 전 EDAMAME BEANS 멤버로 활동한 이력이 있으며, 팀의 메인 댄서를 맡고 있다. 축구와 게임을 좋아한다.',
  },
  {
    id: 'jaehee',
    stageName: '재희',
    stageNameEn: 'Jaehee',
    realName: '김대영',
    birthDate: '2005-06-21',
    nationality: '한국',
    hometown: '대구',
    position: '메인보컬',
    trainingPeriod: '약 3개월',
    color: '#66BB6A',
    doll: { name: '댕트리버', symbol: '나무 모양 꼬리를 가진 리트리버', emoji: '🌳' },
    hobby: '노래 연습, 콘텐츠 시청',
    funFacts: [
      '멤버 중 연습생 기간이 가장 짧다(약 3개월).',
      '탄탄한 고음과 팔세토가 특기로 꼽힌다.',
      'WISH DOLL 캐릭터 이름 "댕트리버"는 본명(대영)의 "댕"과 리트리버를 합친 이름이다.',
    ],
    bio: '대구 출신으로 멤버 중 가장 짧은 약 3개월의 연습생 기간을 거쳐 데뷔했다. 탄탄한 고음과 팔세토가 특기인 팀의 메인보컬.',
  },
  {
    id: 'ryo',
    stageName: '료',
    stageNameEn: 'Ryo',
    realName: '히로세 료',
    birthDate: '2007-08-04',
    nationality: '일본',
    hometown: '일본 교토',
    position: '서브보컬',
    trainingPeriod: '약 1년',
    color: '#FFCA28',
    doll: { name: '론론', symbol: '강아지', emoji: '🐶' },
    hobby: '영화 감상, 그림 그리기',
    funFacts: [
      '사쿠야와 절친한 사이로 잘 알려져 있다.',
      'WISH DOLL 캐릭터 "론론"은 료가 어릴 적 좋아했던 인형 "톤톤"에서 모티프를 따왔다.',
    ],
    bio: '일본 교토 출신으로, 영화 감상과 그림 그리기를 좋아한다. 사쿠야와 절친한 사이로 알려져 있으며, 팀의 서브보컬을 맡고 있다.',
  },
  {
    id: 'sakuya',
    stageName: '사쿠야',
    stageNameEn: 'Sakuya',
    realName: '후지나가 사쿠야',
    birthDate: '2007-11-18',
    nationality: '일본',
    hometown: '일본 사이타마',
    position: '리드래퍼, 서브보컬, 막내',
    trainingPeriod: '약 1년',
    color: '#F06292',
    doll: { name: '팡이', symbol: '별 모양 날개를 가진 빵', emoji: '🥐' },
    hobby: '쇼핑, 축구',
    funFacts: [
      '팀의 막내이자 빵을 매우 좋아하는 것으로 유명하다.',
      '료와 절친한 사이로 알려져 있다.',
      'WISH DOLL 캐릭터 "팡이"는 사쿠야가 좋아하는 빵 + 별 모양 날개 콘셉트다.',
    ],
    bio: '일본 사이타마 출신으로 팀의 막내를 맡고 있다. 빵을 매우 좋아하고 쇼핑과 축구가 취미이며, 료와 절친한 사이로 알려져 있다.',
  },
];
