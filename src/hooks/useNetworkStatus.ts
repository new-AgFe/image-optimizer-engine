// hooks/useNetworkStatus.ts
import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
    const [connection, setConnection] = useState<any>(null);

    useEffect(() => {
        // navigator.connection은 일부 브라우저(Chrome, Edge 등)에서 지원합니다.
        const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        
        if (conn) {
            const updateConnection = () => {
                setConnection({
                effectiveType: conn.effectiveType, // '4g', '3g' 등
                downlink: conn.downlink,         // 대역폭 (Mbps)
                rtt: conn.rtt,                   // 왕복 시간 (ms)
                saveData: conn.saveData          // 데이터 절약 모드 여부
                });
            };

            conn.addEventListener('change', updateConnection);
            updateConnection();

            return () => conn.removeEventListener('change', updateConnection);
        }
    }, []);

    return connection;
};