// src/App.tsx
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { Activity, Wifi, SignalHigh, AlertTriangle } from 'lucide-react';

function App() {
    const status = useNetworkStatus();

    // 1. 최적화하고 싶은 원본 이미지 주소를 변수로 둡니다.
    const ORIGINAL_IMAGE_URL = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'; // 예쁜 고양이 사진

    // 2. 서버 주소와 파라미터를 조합합니다.
    const optimizedSrc = `http://localhost:3000/api/image?url=${encodeURIComponent(ORIGINAL_IMAGE_URL)}&network=${status.effectiveType}`;

    if (!status) {
        return <div className="p-10">네트워크 정보를 불러올 수 없는 브라우저입니다.</div>;
    }

    return (
        <div className="mt-12 w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">🖼️ AI Smart Optimized Image</h2>
            
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden border">
                <img 
                    key={status.effectiveType} // 상태 바뀔 때마다 이미지 새로고침 강제
                    src={optimizedSrc}
                    alt="AI Optimized"
                    className="w-full h-full object-cover transition-opacity duration-500"
                />
            
                <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                    {status.effectiveType === '4g' ? 'High-Res Mode' : 'AI Smart Crop Mode'}
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-400 break-all bg-gray-50 p-2 rounded">
                <b>Request URL:</b> {optimizedSrc}
            </div>
        </div>
    );
}

export default App;