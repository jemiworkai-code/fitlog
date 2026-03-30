import { WorkoutRecord, DUMMY_ANALYSIS } from '@/types/workout';
import { DietRecord } from '@/types/diet';

export const MOCK_RECORDS: WorkoutRecord[] = [
  {
    id: 'mock-1',
    exerciseType: 'squat',
    memo: '오늘 처음 배운 스쿼트 자세. 무릎이 안쪽으로 들어가는 것 주의.',
    uploadedAt: '2026-03-25T10:30:00.000Z',
    videoUrl: null,
    videoFileName: 'squat_0325.mp4',
    analysisResult: DUMMY_ANALYSIS.squat,
  },
  {
    id: 'mock-2',
    exerciseType: 'lunge',
    memo: '런지 자세 교정 후 재촬영. 앞무릎 각도 신경쓰기.',
    uploadedAt: '2026-03-26T14:00:00.000Z',
    videoUrl: null,
    videoFileName: 'lunge_0326.mp4',
    analysisResult: DUMMY_ANALYSIS.lunge,
  },
  {
    id: 'mock-3',
    exerciseType: 'shoulder_press',
    memo: '덤벨 숄더프레스 10kg. 좌우 균형이 아직 불안정함.',
    uploadedAt: '2026-03-27T09:15:00.000Z',
    videoUrl: null,
    videoFileName: 'shoulder_press_0327.mp4',
    analysisResult: DUMMY_ANALYSIS.shoulder_press,
  },
  {
    id: 'mock-4',
    exerciseType: 'deadlift',
    memo: '데드리프트 첫 시도. 허리 중립 유지에 집중.',
    uploadedAt: '2026-03-28T11:00:00.000Z',
    videoUrl: null,
    videoFileName: 'deadlift_0328.mp4',
    analysisResult: DUMMY_ANALYSIS.deadlift,
  },
  {
    id: 'mock-5',
    exerciseType: 'bench_press',
    memo: '벤치프레스 50kg 5세트. 어깨뼈 고정 연습.',
    uploadedAt: '2026-03-29T10:00:00.000Z',
    videoUrl: null,
    videoFileName: 'bench_0329.mp4',
    analysisResult: DUMMY_ANALYSIS.bench_press,
  },
];

export const MOCK_DIET_RECORDS: DietRecord[] = [
  {
    id: 'diet-1',
    date: '2026-03-27',
    mealType: 'lunch',
    foods: [
      { name: '흰쌀밥', calories: 300, protein: 5, carbs: 65, fat: 1, amount: '1공기' },
      { name: '된장찌개', calories: 120, protein: 8, carbs: 10, fat: 5, amount: '1인분' },
    ],
    photoUrl: null,
    note: '',
  },
  {
    id: 'diet-2',
    date: '2026-03-27',
    mealType: 'dinner',
    foods: [
      { name: '닭가슴살', calories: 165, protein: 31, carbs: 0, fat: 4, amount: '100g' },
      { name: '샐러드', calories: 120, protein: 4, carbs: 15, fat: 5, amount: '1인분' },
    ],
    photoUrl: null,
    note: '다이어트 식단',
  },
  {
    id: 'diet-3',
    date: '2026-03-28',
    mealType: 'breakfast',
    foods: [
      { name: '그릭요거트', calories: 100, protein: 10, carbs: 6, fat: 3, amount: '1컵' },
      { name: '바나나', calories: 89, protein: 1, carbs: 23, fat: 0, amount: '1개' },
    ],
    photoUrl: null,
    note: '',
  },
  {
    id: 'diet-4',
    date: '2026-03-28',
    mealType: 'lunch',
    foods: [
      { name: '김밥', calories: 320, protein: 10, carbs: 55, fat: 8, amount: '1줄' },
    ],
    photoUrl: null,
    note: '',
  },
  {
    id: 'diet-5',
    date: '2026-03-28',
    mealType: 'dinner',
    foods: [
      { name: '제육볶음', calories: 320, protein: 20, carbs: 12, fat: 20, amount: '1인분' },
      { name: '현미밥', calories: 280, protein: 6, carbs: 60, fat: 2, amount: '1공기' },
    ],
    photoUrl: null,
    note: '',
  },
  {
    id: 'diet-6',
    date: '2026-03-29',
    mealType: 'lunch',
    foods: [
      { name: '닭볶음탕', calories: 280, protein: 22, carbs: 10, fat: 16, amount: '1인분' },
      { name: '흰쌀밥', calories: 300, protein: 5, carbs: 65, fat: 1, amount: '1공기' },
    ],
    photoUrl: null,
    note: '',
  },
  {
    id: 'diet-7',
    date: '2026-03-29',
    mealType: 'snack',
    foods: [
      { name: '아메리카노', calories: 10, protein: 0, carbs: 2, fat: 0, amount: '1잔' },
      { name: '견과류 믹스', calories: 170, protein: 5, carbs: 8, fat: 14, amount: '30g' },
    ],
    photoUrl: null,
    note: '',
  },
];

// 최근 6일 걸음수 시드 데이터
export const MOCK_STEP_HISTORY: Record<string, number> = {
  '2026-03-24': 3200,
  '2026-03-25': 8500,
  '2026-03-26': 6100,
  '2026-03-27': 9800,
  '2026-03-28': 4300,
  '2026-03-29': 7600,
};
