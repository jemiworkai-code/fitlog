import { FoodEntry } from '@/types/diet';

// 자주 먹는 한식 / 일반 음식 칼로리 데이터베이스 (100g 기준 또는 1인분 기준)
export const FOOD_DATABASE: FoodEntry[] = [
  // 밥류
  { name: '흰쌀밥', calories: 300, protein: 5, carbs: 65, fat: 1, amount: '1공기(210g)' },
  { name: '현미밥', calories: 280, protein: 6, carbs: 60, fat: 2, amount: '1공기(210g)' },
  { name: '잡곡밥', calories: 290, protein: 6, carbs: 62, fat: 2, amount: '1공기(210g)' },

  // 국/찌개
  { name: '된장찌개', calories: 120, protein: 8, carbs: 10, fat: 5, amount: '1인분' },
  { name: '김치찌개', calories: 150, protein: 10, carbs: 12, fat: 6, amount: '1인분' },
  { name: '순두부찌개', calories: 180, protein: 12, carbs: 8, fat: 10, amount: '1인분' },
  { name: '미역국', calories: 80, protein: 5, carbs: 6, fat: 3, amount: '1인분' },
  { name: '갈비탕', calories: 420, protein: 30, carbs: 15, fat: 25, amount: '1인분' },

  // 고기
  { name: '닭가슴살', calories: 165, protein: 31, carbs: 0, fat: 4, amount: '100g' },
  { name: '삼겹살', calories: 520, protein: 17, carbs: 0, fat: 50, amount: '100g' },
  { name: '소불고기', calories: 250, protein: 20, carbs: 8, fat: 15, amount: '100g' },
  { name: '닭볶음탕', calories: 280, protein: 22, carbs: 10, fat: 16, amount: '1인분' },
  { name: '제육볶음', calories: 320, protein: 20, carbs: 12, fat: 20, amount: '1인분' },
  { name: '달걀프라이', calories: 90, protein: 6, carbs: 0, fat: 7, amount: '1개' },
  { name: '삶은달걀', calories: 78, protein: 6, carbs: 1, fat: 5, amount: '1개' },

  // 분식
  { name: '떡볶이', calories: 380, protein: 8, carbs: 72, fat: 6, amount: '1인분' },
  { name: '순대', calories: 250, protein: 12, carbs: 28, fat: 10, amount: '1인분' },
  { name: '김밥', calories: 320, protein: 10, carbs: 55, fat: 8, amount: '1줄' },
  { name: '라면', calories: 500, protein: 10, carbs: 72, fat: 18, amount: '1봉지' },

  // 패스트푸드
  { name: '햄버거', calories: 480, protein: 25, carbs: 42, fat: 22, amount: '1개' },
  { name: '피자', calories: 280, protein: 12, carbs: 35, fat: 10, amount: '1조각' },
  { name: '치킨', calories: 400, protein: 28, carbs: 20, fat: 22, amount: '1/4마리' },

  // 샐러드 / 건강식
  { name: '샐러드', calories: 120, protein: 4, carbs: 15, fat: 5, amount: '1인분' },
  { name: '두부', calories: 80, protein: 8, carbs: 2, fat: 4, amount: '100g' },
  { name: '아보카도', calories: 160, protein: 2, carbs: 9, fat: 15, amount: '1/2개' },
  { name: '고구마', calories: 130, protein: 2, carbs: 30, fat: 0, amount: '1개(150g)' },

  // 음료
  { name: '아메리카노', calories: 10, protein: 0, carbs: 2, fat: 0, amount: '1잔' },
  { name: '라떼', calories: 150, protein: 6, carbs: 18, fat: 6, amount: '1잔' },
  { name: '프로틴쉐이크', calories: 160, protein: 30, carbs: 8, fat: 3, amount: '1스쿱' },
  { name: '오렌지주스', calories: 110, protein: 2, carbs: 26, fat: 0, amount: '200ml' },

  // 과일
  { name: '바나나', calories: 89, protein: 1, carbs: 23, fat: 0, amount: '1개' },
  { name: '사과', calories: 95, protein: 0, carbs: 25, fat: 0, amount: '1개' },
  { name: '딸기', calories: 50, protein: 1, carbs: 12, fat: 0, amount: '10개' },
  { name: '블루베리', calories: 85, protein: 1, carbs: 21, fat: 0, amount: '100g' },

  // 간식
  { name: '그릭요거트', calories: 100, protein: 10, carbs: 6, fat: 3, amount: '1컵(150g)' },
  { name: '견과류 믹스', calories: 170, protein: 5, carbs: 8, fat: 14, amount: '30g' },
  { name: '초콜릿바', calories: 230, protein: 3, carbs: 30, fat: 12, amount: '1개' },
];

export function searchFood(query: string): FoodEntry[] {
  if (!query.trim()) return FOOD_DATABASE.slice(0, 10);
  const lower = query.toLowerCase();
  return FOOD_DATABASE.filter((f) => f.name.toLowerCase().includes(lower));
}
