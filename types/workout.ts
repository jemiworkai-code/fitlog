export type ExerciseType =
  // 하체
  | 'squat' | 'lunge' | 'leg_press' | 'leg_curl' | 'leg_extension'
  | 'deadlift' | 'romanian_deadlift' | 'hip_thrust' | 'calf_raise' | 'glute_kickback'
  // 가슴
  | 'bench_press' | 'incline_bench_press' | 'dumbbell_fly' | 'dips' | 'cable_crossover'
  // 등
  | 'barbell_row' | 'lat_pulldown' | 'pullup' | 'cable_row' | 'face_pull'
  // 어깨
  | 'shoulder_press' | 'lateral_raise' | 'front_raise' | 'reverse_fly'
  // 이두 / 삼두
  | 'barbell_curl' | 'dumbbell_curl' | 'hammer_curl'
  | 'triceps_pushdown' | 'overhead_extension'
  // 코어
  | 'plank' | 'crunch' | 'leg_raise' | 'russian_twist'
  // 유산소
  | 'burpee' | 'mountain_climber' | 'jumping_jack' | 'jump_rope' | 'running';

export const EXERCISE_LABELS: Record<ExerciseType, string> = {
  // 하체
  squat: '스쿼트',
  lunge: '런지',
  leg_press: '레그프레스',
  leg_curl: '레그컬',
  leg_extension: '레그익스텐션',
  deadlift: '데드리프트',
  romanian_deadlift: '루마니안 데드리프트',
  hip_thrust: '힙쓰러스트',
  calf_raise: '카프레이즈',
  glute_kickback: '글루트 킥백',
  // 가슴
  bench_press: '벤치프레스',
  incline_bench_press: '인클라인 벤치프레스',
  dumbbell_fly: '덤벨 플라이',
  dips: '딥스',
  cable_crossover: '케이블 크로스오버',
  // 등
  barbell_row: '바벨로우',
  lat_pulldown: '랫풀다운',
  pullup: '풀업',
  cable_row: '케이블로우',
  face_pull: '페이스풀',
  // 어깨
  shoulder_press: '숄더프레스',
  lateral_raise: '사이드 래터럴 레이즈',
  front_raise: '프론트 레이즈',
  reverse_fly: '리버스 플라이',
  // 이두
  barbell_curl: '바벨컬',
  dumbbell_curl: '덤벨컬',
  hammer_curl: '해머컬',
  // 삼두
  triceps_pushdown: '트라이셉스 푸시다운',
  overhead_extension: '오버헤드 익스텐션',
  // 코어
  plank: '플랭크',
  crunch: '크런치',
  leg_raise: '레그레이즈',
  russian_twist: '러시안 트위스트',
  // 유산소
  burpee: '버피',
  mountain_climber: '마운틴 클라이머',
  jumping_jack: '점핑잭',
  jump_rope: '줄넘기',
  running: '런닝',
};

export const EXERCISE_GROUPS: { label: string; types: ExerciseType[] }[] = [
  { label: '하체', types: ['squat', 'lunge', 'leg_press', 'leg_curl', 'leg_extension', 'deadlift', 'romanian_deadlift', 'hip_thrust', 'calf_raise', 'glute_kickback'] },
  { label: '가슴', types: ['bench_press', 'incline_bench_press', 'dumbbell_fly', 'dips', 'cable_crossover'] },
  { label: '등', types: ['barbell_row', 'lat_pulldown', 'pullup', 'cable_row', 'face_pull'] },
  { label: '어깨', types: ['shoulder_press', 'lateral_raise', 'front_raise', 'reverse_fly'] },
  { label: '이두', types: ['barbell_curl', 'dumbbell_curl', 'hammer_curl'] },
  { label: '삼두', types: ['triceps_pushdown', 'overhead_extension'] },
  { label: '코어', types: ['plank', 'crunch', 'leg_raise', 'russian_twist'] },
  { label: '유산소', types: ['burpee', 'mountain_climber', 'jumping_jack', 'jump_rope', 'running'] },
];

export interface AnalysisResult {
  muscleGroups: string[];
  comment: string;
}

export const DUMMY_ANALYSIS: Record<ExerciseType, AnalysisResult> = {
  squat: { muscleGroups: ['대퇴사두근', '둔근', '햄스트링'], comment: '무릎 방향을 발끝과 일치시키고, 허리를 곧게 유지하세요.' },
  lunge: { muscleGroups: ['대퇴사두근', '둔근', '종아리'], comment: '앞 무릎이 발끝을 넘지 않도록 주의하세요.' },
  leg_press: { muscleGroups: ['대퇴사두근', '둔근', '햄스트링'], comment: '발 위치에 따라 자극 부위가 달라집니다. 무릎이 안쪽으로 쏠리지 않게 주의하세요.' },
  leg_curl: { muscleGroups: ['햄스트링', '종아리'], comment: '천천히 내리는 동작에서 근육을 더 자극하세요.' },
  leg_extension: { muscleGroups: ['대퇴사두근'], comment: '끝까지 펴는 동작에서 잠깐 멈추면 효과가 높아집니다.' },
  deadlift: { muscleGroups: ['햄스트링', '둔근', '척추기립근', '승모근'], comment: '허리를 중립으로 유지하고, 바벨을 몸에 최대한 가깝게 당기세요.' },
  romanian_deadlift: { muscleGroups: ['햄스트링', '둔근'], comment: '고관절 힌지에 집중하고 허리가 둥글어지지 않도록 주의하세요.' },
  hip_thrust: { muscleGroups: ['둔근', '햄스트링'], comment: '엉덩이를 최대한 높이 올리고 꼭대기에서 1초간 수축을 유지하세요.' },
  calf_raise: { muscleGroups: ['비복근', '가자미근'], comment: '발뒤꿈치를 최대한 높이 올리고 천천히 내리세요.' },
  glute_kickback: { muscleGroups: ['둔근', '햄스트링'], comment: '허리가 아닌 고관절로 다리를 뒤로 밀어야 합니다.' },
  bench_press: { muscleGroups: ['대흉근', '삼두근', '전면 삼각근'], comment: '어깨뼈를 모아 고정하고, 바를 가슴 하단에 닿게 내리세요.' },
  incline_bench_press: { muscleGroups: ['상부 대흉근', '삼두근', '전면 삼각근'], comment: '45도 이하 각도가 상부 가슴 자극에 최적입니다.' },
  dumbbell_fly: { muscleGroups: ['대흉근', '전면 삼각근'], comment: '팔꿈치를 약간 구부린 상태를 유지하고 가슴 스트레치에 집중하세요.' },
  dips: { muscleGroups: ['대흉근', '삼두근', '전면 삼각근'], comment: '몸을 약간 앞으로 기울이면 가슴, 수직이면 삼두에 집중됩니다.' },
  cable_crossover: { muscleGroups: ['대흉근 내측', '전면 삼각근'], comment: '양손이 교차할 때까지 당겨 대흉근 내측을 완전히 수축시키세요.' },
  barbell_row: { muscleGroups: ['광배근', '승모근', '이두근'], comment: '바를 배꼽 방향으로 당기고, 등을 수평으로 유지하세요.' },
  lat_pulldown: { muscleGroups: ['광배근', '이두근', '후면 삼각근'], comment: '팔꿈치를 아래로 당기는 느낌으로 광배근을 수축시키세요.' },
  pullup: { muscleGroups: ['광배근', '이두근', '코어'], comment: '흔들리지 않게 코어에 힘을 주고, 턱이 바 위로 올라오도록 하세요.' },
  cable_row: { muscleGroups: ['광배근', '승모근', '이두근'], comment: '등을 뒤로 당기는 느낌으로, 팔로만 당기지 않도록 주의하세요.' },
  face_pull: { muscleGroups: ['후면 삼각근', '승모근', '외회전근'], comment: '로프 끝을 귀 옆으로 당기고, 팔꿈치를 높이 유지하세요.' },
  shoulder_press: { muscleGroups: ['삼각근', '승모근', '삼두근'], comment: '팔꿈치를 90도로 유지하고 코어에 힘을 주세요.' },
  lateral_raise: { muscleGroups: ['측면 삼각근'], comment: '팔꿈치를 약간 구부리고, 새끼손가락이 엄지보다 높게 올라오도록 하세요.' },
  front_raise: { muscleGroups: ['전면 삼각근', '상부 대흉근'], comment: '반동 없이 천천히 들어올리고, 어깨 높이까지만 올리세요.' },
  reverse_fly: { muscleGroups: ['후면 삼각근', '능형근'], comment: '팔꿈치를 약간 구부리고 등을 조이는 느낌으로 수행하세요.' },
  barbell_curl: { muscleGroups: ['이두근', '전완근'], comment: '팔꿈치를 옆구리에 고정하고 상완으로만 들어올리세요.' },
  dumbbell_curl: { muscleGroups: ['이두근', '전완근'], comment: '손목을 안쪽으로 회전(슈피네이션)하면서 올리면 이두근 수축이 강해집니다.' },
  hammer_curl: { muscleGroups: ['이두근', '상완근', '전완근'], comment: '망치 쥐듯 중립 그립을 유지하고 반동 없이 들어올리세요.' },
  triceps_pushdown: { muscleGroups: ['삼두근'], comment: '팔꿈치를 몸 옆에 고정하고, 완전히 펴는 것이 중요합니다.' },
  overhead_extension: { muscleGroups: ['삼두근 장두'], comment: '팔꿈치가 앞뒤로 흔들리지 않도록 고정하세요.' },
  plank: { muscleGroups: ['복직근', '복횡근', '코어 전체'], comment: '엉덩이가 처지거나 올라가지 않게 일직선을 유지하세요.' },
  crunch: { muscleGroups: ['복직근'], comment: '목이 아닌 복근으로 올라오고, 허리를 바닥에 붙인 채 수행하세요.' },
  leg_raise: { muscleGroups: ['하복부', '장요근'], comment: '내려올 때 허리가 뜨지 않도록 천천히 컨트롤하세요.' },
  russian_twist: { muscleGroups: ['복사근', '복직근'], comment: '몸통을 회전시키며, 발이 바닥에 닿지 않게 유지하면 강도가 높아집니다.' },
  burpee: { muscleGroups: ['전신'], comment: '빠른 속도보다 정확한 동작이 중요합니다. 착지 시 무릎을 부드럽게 구부리세요.' },
  mountain_climber: { muscleGroups: ['코어', '어깨', '대퇴사두근'], comment: '엉덩이를 들지 말고 플랭크 자세를 유지하며 빠르게 수행하세요.' },
  jumping_jack: { muscleGroups: ['종아리', '어깨', '둔근'], comment: '착지 시 발 전체가 닿도록 하고 무릎을 약간 구부리세요.' },
  jump_rope: { muscleGroups: ['종아리', '전완근', '심폐기능'], comment: '앞발로 가볍게 착지하고 팔꿈치를 옆구리 가까이 고정하세요.' },
  running: { muscleGroups: ['대퇴사두근', '햄스트링', '종아리', '심폐기능'], comment: '착지 시 발뒤꿈치보다 발 중간 부분으로 닿는 미드풋 착지를 권장합니다.' },
};

export interface WorkoutRecord {
  id: string;
  exerciseType: ExerciseType;
  memo: string;
  uploadedAt: string;
  videoUrl: string | null;
  videoFileName?: string;
  analysisResult: AnalysisResult;
}
