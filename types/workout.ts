export type ExerciseType = 'squat' | 'lunge' | 'shoulder_press';

export const EXERCISE_LABELS: Record<ExerciseType, string> = {
  squat: '스쿼트',
  lunge: '런지',
  shoulder_press: '숄더프레스',
};

export interface AnalysisResult {
  muscleGroups: string[];
  comment: string;
}

export const DUMMY_ANALYSIS: Record<ExerciseType, AnalysisResult> = {
  squat: {
    muscleGroups: ['대퇴사두근', '둔근', '햄스트링'],
    comment: '무릎 방향을 발끝과 일치시키고, 허리를 곧게 유지하세요.',
  },
  lunge: {
    muscleGroups: ['대퇴사두근', '둔근', '종아리'],
    comment: '앞 무릎이 발끝을 넘지 않도록 주의하세요.',
  },
  shoulder_press: {
    muscleGroups: ['삼각근', '승모근', '삼두근'],
    comment: '팔꿈치를 90도로 유지하고 코어에 힘을 주세요.',
  },
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
