'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/lib/store';
import BarChart from '@/components/BarChart';

// ─── Step Counter (DeviceMotion API) ──────────────────────────────────────
const STEP_THRESHOLD = 12;
const STEP_COOLDOWN  = 400;

function useStepCounter() {
  const [steps,     setSteps]     = useState(0);
  const [active,    setActive]    = useState(false);
  const [supported, setSupported] = useState(true);
  const lastStepTime = useRef(0);
  const lastAccel    = useRef({ x: 0, y: 0, z: 0 });

  const handleMotion = useCallback((e: DeviceMotionEvent) => {
    const acc = e.accelerationIncludingGravity;
    if (!acc) return;
    const { x = 0, y = 0, z = 0 } = acc;
    const dx = (x ?? 0) - lastAccel.current.x;
    const dy = (y ?? 0) - lastAccel.current.y;
    const dz = (z ?? 0) - lastAccel.current.z;
    lastAccel.current = { x: x ?? 0, y: y ?? 0, z: z ?? 0 };
    const magnitude = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const now = Date.now();
    if (magnitude > STEP_THRESHOLD && now - lastStepTime.current > STEP_COOLDOWN) {
      lastStepTime.current = now;
      setSteps((s) => s + 1);
    }
  }, []);

  useEffect(() => {
    if (typeof DeviceMotionEvent === 'undefined') setSupported(false);
  }, []);

  useEffect(() => () => { window.removeEventListener('devicemotion', handleMotion); }, [handleMotion]);

  async function start() {
    if (typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      const perm = await (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
      if (perm !== 'granted') return;
    }
    window.addEventListener('devicemotion', handleMotion);
    setActive(true);
  }

  function stop()  { window.removeEventListener('devicemotion', handleMotion); setActive(false); }
  function reset() { stop(); setSteps(0); }

  return { steps, active, supported, start, stop, reset };
}

// ─── Heart Rate ────────────────────────────────────────────────────────────
function HeartRateSection() {
  const [bpm,      setBpm]      = useState<number | null>(null);
  const [measuring,setMeasuring]= useState(false);
  const [inputBpm, setInputBpm] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startMeasure() {
    setMeasuring(true); setBpm(null);
    timerRef.current = setTimeout(() => {
      setBpm(Math.floor(Math.random() * 30) + 65);
      setMeasuring(false);
    }, 5000);
  }
  function stopMeasure() { if (timerRef.current) clearTimeout(timerRef.current); setMeasuring(false); }
  function saveManual() {
    const n = parseInt(inputBpm);
    if (!isNaN(n) && n > 30 && n < 220) { setBpm(n); setInputBpm(''); }
  }

  const zone = bpm === null ? null
    : bpm < 60  ? { label: '안정시', color: 'text-blue-500' }
    : bpm < 100 ? { label: '정상',   color: 'text-green-500' }
    : bpm < 140 ? { label: '유산소', color: 'text-yellow-500' }
    : bpm < 170 ? { label: '고강도', color: 'text-orange-500' }
    :             { label: '최대',   color: 'text-red-500' };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">❤️</span> 심박수
      </h2>
      <div className="text-center mb-5">
        {bpm !== null ? (
          <>
            <p className={`text-5xl font-bold tabular-nums ${zone?.color}`}>{bpm}</p>
            <p className="text-sm text-gray-400 mt-1">BPM · {zone?.label}</p>
          </>
        ) : (
          <p className="text-4xl font-bold text-gray-300">--</p>
        )}
      </div>
      <button
        onClick={measuring ? stopMeasure : startMeasure}
        className={`w-full py-3 rounded-xl font-medium text-sm transition-colors mb-3 ${
          measuring ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-rose-500 text-white hover:bg-rose-600'
        }`}
      >
        {measuring ? '측정 중... (중지)' : '카메라로 측정 (데모)'}
      </button>
      {measuring && (
        <p className="text-xs text-center text-gray-400 mb-3">📷 추후 rPPG 카메라 측정으로 연결됩니다</p>
      )}
      <div className="flex gap-2">
        <input
          type="number" value={inputBpm}
          onChange={(e) => setInputBpm(e.target.value)}
          placeholder="직접 입력 (BPM)"
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <button onClick={saveManual} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm hover:bg-gray-200">저장</button>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function HealthPage() {
  const { getLast7Steps, saveTodaySteps } = useStore();
  const { steps, active, supported, start, stop, reset } = useStepCounter();

  const last7      = getLast7Steps();
  const goal       = 10000;
  const progress   = Math.min((steps / goal) * 100, 100);
  const kcal       = Math.round(steps * 0.04);
  const distanceKm = (steps * 0.76 / 1000).toFixed(2);

  // Merge today's live steps into chart data
  const todayStr = new Date().toISOString().slice(0, 10);
  const chartBars = last7.map((d) => ({
    label:     d.label,
    value:     d.date === todayStr ? steps : d.steps,
    highlight: d.date === todayStr,
  }));

  function handleStop() {
    stop();
    if (steps > 0) saveTodaySteps(steps);
  }

  return (
    <main className="px-4 pt-10 pb-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">건강</h1>

      {/* 7-day Steps Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
            <span>👟</span> 최근 7일 걸음수
          </h2>
          <span className="text-xs text-gray-400">목표 {goal.toLocaleString()}보</span>
        </div>
        <BarChart bars={chartBars} unit="보" goal={goal} />
      </div>

      {/* Today Step Counter */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">🦶</span> 오늘 만보기
        </h2>

        <div className="text-center mb-4">
          <p className="text-6xl font-bold text-indigo-600 tabular-nums">{steps.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-1">걸음</p>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-indigo-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400">소모 칼로리</p>
            <p className="font-semibold text-indigo-700">{kcal} kcal</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400">이동 거리</p>
            <p className="font-semibold text-indigo-700">{distanceKm} km</p>
          </div>
        </div>

        {!supported ? (
          <p className="text-xs text-center text-red-400">이 기기는 동작 센서를 지원하지 않습니다.</p>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={active ? handleStop : start}
              className={`flex-1 py-3 rounded-xl font-medium text-sm transition-colors ${
                active
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {active ? '측정 중지 & 저장' : '측정 시작'}
            </button>
            <button onClick={reset} className="px-4 py-3 rounded-xl bg-gray-100 text-gray-500 text-sm hover:bg-gray-200">
              초기화
            </button>
          </div>
        )}
      </div>

      <HeartRateSection />
    </main>
  );
}
