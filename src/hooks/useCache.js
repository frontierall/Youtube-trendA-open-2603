import { getStorage, getItem, setItem, removeItem, getAllKeys } from '../utils/storage';

const CACHE_PREFIX = 'youtube_cache_';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5분

/**
 * 캐시 저장
 * @param {string} key - 캐시 키
 * @param {any} data - 저장할 데이터
 */
export function setCache(key, data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  try {
    setItem(CACHE_PREFIX + key, JSON.stringify(cacheData));
  } catch (e) {
    // 스토리지 용량 초과 시 오래된 캐시 삭제
    clearExpiredCache();
    try {
      setItem(CACHE_PREFIX + key, JSON.stringify(cacheData));
    } catch (e2) {
      console.warn('Cache storage failed:', e2);
    }
  }
}

/**
 * 캐시 조회
 * @param {string} key - 캐시 키
 * @returns {any|null} 캐시된 데이터 또는 null
 */
export function getCache(key) {
  try {
    const cached = getItem(CACHE_PREFIX + key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);

    // 만료 확인
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      removeItem(CACHE_PREFIX + key);
      return null;
    }

    return data;
  } catch (e) {
    return null;
  }
}

/**
 * 캐시 키 생성
 * @param {string} regionCode - 국가 코드
 * @param {string} categoryId - 카테고리 ID
 * @returns {string} 캐시 키
 */
export function getCacheKey(regionCode, categoryId) {
  return `videos_${regionCode}_${categoryId}`;
}

/**
 * 만료된 캐시 삭제
 */
export function clearExpiredCache() {
  const storage = getStorage();
  const keys = Object.keys(storage);
  const now = Date.now();

  keys.forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      try {
        const cached = storage.getItem(key);
        if (cached) {
          const { timestamp } = JSON.parse(cached);
          if (now - timestamp > CACHE_EXPIRY) {
            storage.removeItem(key);
          }
        }
      } catch (e) {
        storage.removeItem(key);
      }
    }
  });
}

/**
 * 모든 캐시 삭제
 */
export function clearAllCache() {
  const storage = getStorage();
  const keys = Object.keys(storage);
  keys.forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      storage.removeItem(key);
    }
  });
}
