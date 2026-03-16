import { useState } from 'react';
import { getStorageType, setStorageType } from '../utils/storage';

export function StorageSelector() {
  const [currentType, setCurrentType] = useState(getStorageType);
  const [showHelp, setShowHelp] = useState(false);

  const handleChange = (e) => {
    const newType = e.target.value;
    setStorageType(newType);
    setCurrentType(newType);
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          데이터 저장 방식:
        </label>
        <select
          value={currentType}
          onChange={handleChange}
          className="text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="local">계속 저장 (편리함)</option>
          <option value="session">사용 후 삭제 (보안 강화)</option>
        </select>
        <button
          onClick={() => setShowHelp(true)}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="저장 방식 도움말"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* 도움말 모달 */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                데이터 저장 방식 안내
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 본문 */}
            <div className="p-4 space-y-6">
              {/* 계속 저장 옵션 */}
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💾</span>
                  <h4 className="font-bold text-gray-900 dark:text-white">계속 저장 (편리함)</h4>
                  {currentType === 'local' && (
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full">
                      현재 선택
                    </span>
                  )}
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>브라우저를 닫았다가 다시 열어도 <strong className="text-gray-800 dark:text-gray-200">API 키, 즐겨찾기, 설정이 그대로</strong> 유지됩니다.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>매번 API 키를 다시 입력할 필요가 없어 <strong className="text-gray-800 dark:text-gray-200">편리</strong>합니다.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>공용 컴퓨터에서는 다음 사용자가 내 데이터를 볼 수 있습니다.</span>
                  </p>
                </div>
                <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded text-xs text-blue-700 dark:text-blue-300">
                  <strong>추천:</strong> 개인 컴퓨터, 개인 노트북, 개인 스마트폰
                </div>
              </div>

              {/* 사용 후 삭제 옵션 */}
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🔒</span>
                  <h4 className="font-bold text-gray-900 dark:text-white">사용 후 삭제 (보안 강화)</h4>
                  {currentType === 'session' && (
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs rounded-full">
                      현재 선택
                    </span>
                  )}
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>브라우저 탭이나 창을 닫으면 <strong className="text-gray-800 dark:text-gray-200">모든 데이터가 자동 삭제</strong>됩니다.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>다음 사용자가 내 API 키나 즐겨찾기를 <strong className="text-gray-800 dark:text-gray-200">볼 수 없어 안전</strong>합니다.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>브라우저를 닫을 때마다 API 키를 다시 입력해야 합니다.</span>
                  </p>
                </div>
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/30 rounded text-xs text-green-700 dark:text-green-300">
                  <strong>추천:</strong> 공용 컴퓨터, PC방, 도서관, 학교/회사 공용 PC
                </div>
              </div>

              {/* 보안 팁 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  보안 안내
                </h4>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">API 키는 어떻게 보호되나요?</p>
                    <p>API 키는 오직 <strong>당신의 브라우저 안에만</strong> 저장됩니다. 서버로 전송되거나 다른 곳에 저장되지 않습니다.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">그래도 걱정된다면?</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>"사용 후 삭제"</strong> 옵션을 선택하세요.</li>
                      <li>사용 후 브라우저의 <strong>개발자 도구 &gt; Application &gt; Storage</strong>에서 직접 삭제할 수 있습니다.</li>
                      <li>API 키에 <strong>사용량 제한</strong>을 설정하세요 (Google Cloud Console).</li>
                      <li>의심스러운 사용이 있으면 <strong>API 키를 재발급</strong>받으세요.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 푸터 */}
            <div className="p-4 border-t dark:border-gray-700">
              <button
                onClick={() => setShowHelp(false)}
                className="w-full py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
