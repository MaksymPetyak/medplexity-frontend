import { type ClassValue, clsx } from 'clsx';
import { camelCase } from 'lodash';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayValue(value: any): React.ReactNode {
  if (value === null) {
    return null;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (
    typeof value === 'object' &&
    value.type === 'image' &&
    value.format === 'base64'
  ) {
    return (
      <img
        style={{ maxWidth: '512px' }}
        src={`data:image;base64,${value.content}`}
      />
    );
  }

  return JSON.stringify(value, null, 2);
}

export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCase(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
