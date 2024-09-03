import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer = ({ src, img }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        const video = videoRef.current;
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleVideoEnd);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleVideoEnd);
        };
    }, []);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <video
                ref={videoRef}
                src={src}
                poster={img}
                preload="none"
                style={{ maxWidth: "100%", borderRadius: "6px" }}
                controlsList="nodownload nofullscreen noremoteplayback"
            />
            <div style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }} onClick={handlePlayPause}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    {isPlaying ? (
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    ) : (
                        <path d="M8 5v14l11-7z" />
                    )}
                </svg>
            </div>
            <div style={{ position: "absolute", bottom: "10px", left: "0", right: "0", height: "5px", backgroundColor: "#000000"}}>
                <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#4a90e2" }}></div>
            </div>
        </div>
    );
};

export default VideoPlayer;