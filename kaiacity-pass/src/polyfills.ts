import { Buffer } from 'buffer';

// Make Buffer available globally for browser compatibility
if (typeof globalThis !== 'undefined') {
  (globalThis as { Buffer?: typeof Buffer }).Buffer = Buffer;
}
if (typeof window !== 'undefined') {
  (window as { Buffer?: typeof Buffer }).Buffer = Buffer;

  // Phantom 및 Solana 관련 차단
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    // Phantom/Solana 관련 이벤트 차단
    if (
      type === 'phantom_initialized' ||
      type === 'phantom_ready' ||
      type === 'solana_initialized' ||
      type.includes('solana') ||
      type.includes('phantom')
    ) {
      console.log('🚫 Solana/Phantom wallet event blocked:', type);
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };

  // Solana Actions 차단
  const originalObserve = MutationObserver.prototype.observe;
  MutationObserver.prototype.observe = function (
    target: Node,
    options?: MutationObserverInit
  ) {
    // DOM 노드가 유효한지 확인
    if (!target || !(target instanceof Node)) {
      console.log('🚫 Invalid MutationObserver target blocked');
      return;
    }
    return originalObserve.call(this, target, options);
  };

  // Phantom 자동 감지 차단 - 하지만 MetaMask는 허용
  try {
    if ('phantom' in window && window.phantom) {
      console.log(
        '🔍 Phantom detected, but keeping for MetaMask compatibility'
      );
      // Phantom을 완전히 제거하지 않고, 우리 코드에서만 필터링
    }
  } catch (error) {
    console.log('🔍 Phantom handling error:', error);
  }
}
if (typeof global !== 'undefined') {
  (global as { Buffer?: typeof Buffer }).Buffer = Buffer;
}

export {};
