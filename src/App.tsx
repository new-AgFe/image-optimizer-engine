// src/App.tsx
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { Activity, Wifi, SignalHigh, AlertTriangle } from 'lucide-react';

function App() {
    const status = useNetworkStatus();
    const a = "망했다";
    const a = "망했다";

    if (!status) {
        return <div className="p-10">네트워크 정보를 불러올 수 없는 브라우저입니다.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">📡 AI Image Optimizer Engine</h1>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                {/* 네트워크 상태 카드 */}
                <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-4">
                        <Wifi className="text-blue-500" />
                        <h2 className="text-xl font-semibold">Network Type</h2>
                    </div>
                    <p className="text-4xl font-bold text-gray-800">{status.effectiveType.toUpperCase()}</p>
                </div>

                {/* 대역폭 카드 */}
                <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-500">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="text-green-500" />
                        <h2 className="text-xl font-semibold">Downlink</h2>
                    </div>
                    <p className="text-4xl font-bold text-gray-800">{status.downlink} <span className="text-lg text-gray-500">Mbps</span></p>
                </div>

                {/* 지연 시간(RTT) 카드 */}
                <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-purple-500">
                    <div className="flex items-center gap-2 mb-4">
                        <SignalHigh className="text-purple-500" />
                        <h2 className="text-xl font-semibold">RTT (Latency)</h2>
                    </div>
                    <p className="text-4xl font-bold text-gray-800">{status.rtt} <span className="text-lg text-gray-500">ms</span></p>
                </div>

                {/* 권장 조치 (AI 엔진의 판단 로직 예시) */}
                <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-orange-500">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="text-orange-500" />
                        <h2 className="text-xl font-semibold">AI Strategy</h2>
                    </div>
                    <p className="text-lg font-medium text-gray-700">
                        {status.effectiveType === '4g' && status.downlink > 5 
                        ? "✅ 고해상도 원본 서빙 중" 
                        : "⚠️ 저용량 WebP 및 리사이징 적용"}
                    </p>
                </div>
            </div>

            <div className="mt-10 text-gray-500 italic">
                * 크롬 개발자 도구(F12) - Network - Throttling에서 상태를 바꿔보세요!
            </div>

            <div className="mt-12 w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md overflow-hidden">
                <h2 className="text-xl font-semibold mb-4">🖼️ Optimized Image Delivery</h2>
            
                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                        key={status.effectiveType} // 상태 바뀔 때마다 이미지 새로고침 강제
                        src={
                            status.effectiveType === '4g' 
                                ? `https://picsum.photos/id/10/1200/800` // 고화질
                                : `https://picsum.photos/id/10/200/150?grayscale&blur=2` // 저화질 + 흑백 + 블러
                        }
                        alt="Optimized content"
                        className="w-full h-full object-cover transition-opacity duration-500"
                    />
                </div>
            
                {/* 이미지 위에 현재 서빙 모드 표시 */}
                <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {status.effectiveType === '4g' ? 'High-Quality Mode' : 'Data-Saving Mode'}
                </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">
                네트워크 상태가 <b>{status.effectiveType}</b>이므로, 
                AI 엔진이 이미지의 {status.effectiveType === '4g' ? '해상도를 최대로 유지' : '압축률을 높이고 블러 처리'}했습니다.
            </p>
        </div>
    );
}

export default App;