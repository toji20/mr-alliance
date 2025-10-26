'use client'
import { useEffect, useState } from 'react';
import styles from '@/styles/LoadingScreen.module.css';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mProgress, setMProgress] = useState(0);
  const [rProgress, setRProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setMProgress(Math.min(progress, 50) * 2);
    setRProgress(Math.max(0, (progress - 50) * 2));
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.background}></div>
      
      <div className={styles.logoContainer}>
        <div className={styles.letterWrapper}>
          <div 
            className={`${styles.letterM} ${mProgress >= 100 ? styles.complete : ''}`}
            style={{ clipPath:`inset(0 ${100 - mProgress}% 0 0)` }}
          >
            M
          </div>
        </div>

        <div className={styles.letterWrapper}>
          <div 
            className={`${styles.letterR} ${rProgress >= 100 ? styles.complete : ''}`}
            style={{ clipPath: `inset(0 ${100 - rProgress}% 0 0)` }}
          >
            R
          </div>
        </div>
      </div>

      <div className={styles.companyName}>
        <span className={styles.mrPart}>MR</span>
        <span className={styles.separator}> | </span>
        <span className={styles.alliancePart}>ALLIANCE</span>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;