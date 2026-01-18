import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import NotFound from '@/pages/NotFound';

describe('Basic Components', () => {
    it('NotFound renders truthy', () => {
        const { container } = render(<NotFound />);
        expect(container).toBeTruthy();
    });
});
