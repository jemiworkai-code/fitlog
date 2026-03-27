import { WorkoutRecord, DUMMY_ANALYSIS } from '@/types/workout';

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
];
