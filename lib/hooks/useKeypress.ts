import { useEffect } from 'react';

/**
 * Hook to listen to specific key presses.
 *
 * @param {string} key - The key to listen to.
 * @param {function} action - The action to be executed when the key is pressed.
 */
const useKeypress = (key: string, action: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === key) {
        action();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [key, action]);
};

export default useKeypress;
