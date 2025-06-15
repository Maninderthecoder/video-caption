'use client';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function VideoDownloader({ videoUrl, captions, videoDuration }) {

    // Function to download captions as SRT file
    const downloadSRT = () => {
        if (captions.length === 0) {
            alert('No captions to download');
            return;
        }

        let srtContent = '';
        captions.forEach((caption, index) => {
            const startTime = formatSRTTime(parseFloat(caption.startTime));
            const endTime = formatSRTTime(parseFloat(caption.endTime));

            srtContent += `${index + 1}\n`;
            srtContent += `${startTime} --> ${endTime}\n`;
            srtContent += `${caption.text}\n\n`;
        });

        const blob = new Blob([srtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'captions.srt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Function to download captions as VTT file
    const downloadVTT = () => {
        if (captions.length === 0) {
            alert('No captions to download');
            return;
        }

        let vttContent = 'WEBVTT\n\n';
        captions.forEach((caption) => {
            const startTime = formatVTTTime(parseFloat(caption.startTime));
            const endTime = formatVTTTime(parseFloat(caption.endTime));

            vttContent += `${startTime} --> ${endTime}\n`;
            vttContent += `${caption.text}\n\n`;
        });

        const blob = new Blob([vttContent], { type: 'text/vtt' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'captions.vtt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };



    // Helper function to format time for SRT
    const formatSRTTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
    };

    // Helper function to format time for VTT
    const formatVTTTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2 text-blue-500" />
                Download Caption Files
            </h3>

            <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Caption File Downloads</h4>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={downloadSRT}
                        disabled={captions.length === 0}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                    >
                        📄 Download SRT
                    </button>
                    <button
                        onClick={downloadVTT}
                        disabled={captions.length === 0}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                    >
                        📄 Download VTT
                    </button>
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-blue-700">
                            <p className="font-medium mb-1">Caption File Formats:</p>
                            <ul className="text-xs space-y-1">
                                <li>• <strong>SRT:</strong> Standard subtitle format, works with most video players</li>
                                <li>• <strong>VTT:</strong> Web Video Text Tracks format, ideal for web players</li>
                                <li>• Use these files with any video player that supports external captions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 