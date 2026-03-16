import { STORAGE_KEY } from './constants';

// 스토리지 타입 설정 키 (이 설정은 항상 localStorage에 저장)
const STORAGE_TYPE_KEY = 'youtube_storage_type';

// API 키 메모리 저장소 (저장 안 함 모드용)
let memoryApiKey = '';

/**
 * 현재 스토리지 타입 가져오기
 * @returns {'local' | 'session' | 'noApiKey'} 스토리지 타입
 */
export function getStorageType() {
  return localStorage.getItem(STORAGE_TYPE_KEY) || 'local';
}

/**
 * 스토리지 타입 설정
 * @param {'local' | 'session' | 'noApiKey'} type - 스토리지 타입
 */
export function setStorageType(type) {
  const oldType = getStorageType();

  // 타입이 변경되면 기존 데이터를 새 스토리지로 마이그레이션
  if (oldType !== type) {
    migrateStorage(oldType, type);
  }

  localStorage.setItem(STORAGE_TYPE_KEY, type);
}

/**
 * 현재 설정된 스토리지 객체 가져오기
 * @returns {Storage} localStorage 또는 sessionStorage
 */
export function getStorage() {
  const type = getStorageType();
  return type === 'session' ? sessionStorage : localStorage;
}

/**
 * 스토리지에서 아이템 가져오기
 * @param {string} key - 키
 * @returns {string|null} 값
 */
export function getItem(key) {
  const type = getStorageType();

  // API 키 저장 안 함 모드: API 키는 메모리에서 가져오기
  if (type === 'noApiKey' && key === STORAGE_KEY) {
    return memoryApiKey || null;
  }

  return getStorage().getItem(key);
}

/**
 * 스토리지에 아이템 저장
 * @param {string} key - 키
 * @param {string} value - 값
 */
export function setItem(key, value) {
  const type = getStorageType();

  // API 키 저장 안 함 모드: API 키는 메모리에만 저장
  if (type === 'noApiKey' && key === STORAGE_KEY) {
    memoryApiKey = value;
    // 스토리지에 저장된 API 키가 있으면 삭제
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }

  try {
    getStorage().setItem(key, value);
  } catch (e) {
    console.warn('Storage setItem failed:', e);
  }
}

/**
 * 스토리지에서 아이템 삭제
 * @param {string} key - 키
 */
export function removeItem(key) {
  const type = getStorageType();

  // API 키 저장 안 함 모드: 메모리에서도 삭제
  if (type === 'noApiKey' && key === STORAGE_KEY) {
    memoryApiKey = '';
  }

  getStorage().removeItem(key);
}

/**
 * 스토리지의 모든 키 가져오기
 * @returns {string[]} 키 배열
 */
export function getAllKeys() {
  const storage = getStorage();
  return Object.keys(storage);
}

/**
 * 기존 스토리지에서 새 스토리지로 데이터 마이그레이션
 * @param {'local' | 'session' | 'noApiKey'} fromType - 기존 스토리지 타입
 * @param {'local' | 'session' | 'noApiKey'} toType - 새 스토리지 타입
 */
function migrateStorage(fromType, toType) {
  const fromStorage = fromType === 'session' ? sessionStorage : localStorage;
  const toStorage = toType === 'session' ? sessionStorage : localStorage;

  // youtube_ 접두사가 있는 키들만 마이그레이션 (설정 키 제외)
  const keysToMigrate = Object.keys(fromStorage).filter(
    key => key.startsWith('youtube_') && key !== STORAGE_TYPE_KEY
  );

  keysToMigrate.forEach(key => {
    const value = fromStorage.getItem(key);
    if (value) {
      // noApiKey 모드로 변경 시 API 키는 마이그레이션하지 않음
      if (toType === 'noApiKey' && key === STORAGE_KEY) {
        fromStorage.removeItem(key);
        return;
      }

      toStorage.setItem(key, value);
      fromStorage.removeItem(key);
    }
  });

  // noApiKey 모드에서 다른 모드로 변경 시 메모리 API 키 초기화
  if (fromType === 'noApiKey') {
    memoryApiKey = '';
  }
}
