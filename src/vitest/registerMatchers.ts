import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
console.log('expect', expect);
console.log('matchers', matchers);

expect.extend(matchers);