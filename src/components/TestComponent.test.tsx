import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

function TestComponent() {
    return <div>Hello World</div>;
}

describe('TestComponent', () => {
    it('renders correctly', () => {
        render(<TestComponent />);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
