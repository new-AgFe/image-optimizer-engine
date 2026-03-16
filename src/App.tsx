// src/App.tsx
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useMemo } from 'react';
import { Activity, Wifi, SignalHigh, AlertTriangle } from 'lucide-react';

function App() {
    const status = useNetworkStatus();

    const optimizedImageSrc = useMemo(() => {
        if (!status) return '';
        
        const ORIGINAL_URL = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'; // 예시: 고양이
        const serverBaseUrl = 'http://localhost:3000/api/image';
        
        // encodeURIComponent를 써야 원본 URL 내의 특수문자가 깨지지 않습니다.
        return `${serverBaseUrl}?url=${encodeURIComponent(ORIGINAL_URL)}&network=${status.effectiveType}`;
    }, [status?.effectiveType]);

    if (!status) {
        return <div className="p-10">네트워크 정보를 불러올 수 없는 브라우저입니다.</div>;
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">🖼️ AI Smart Optimized Image</h2>
            
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden border">
                <img 
                    key={optimizedImageSrc} // 상태 바뀔 때마다 이미지 새로고침 강제
                    src={optimizedImageSrc}
                    alt="AI Optimized"
                    className="w-full h-full object-cover transition-opacity duration-500"
                />
            
                <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                    {status.effectiveType === '4g' ? 'High-Res Mode' : 'AI Smart Crop Mode'}
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-400 break-all bg-gray-50 p-2 rounded">
                <b>Request URL:</b> {optimizedImageSrc}
            </div>
        </div>
    );
}

export default App;