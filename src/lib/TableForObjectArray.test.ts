import { describe, it, expect } from 'vitest';
import {
    render,
    screen
} from '@testing-library/svelte';
import TableForObjectArray from './TableForObjectArray.svelte';

const sampleData = [
    { name: 'Alice', age: "25" },
]

describe('TableForObjectArray', () => {
    it('renders columns without explicit list', () => {
        render(TableForObjectArray, { data: sampleData });
        expect(
            screen.queryByText('name')
        ).toBeVisible();
        expect(
            screen.queryByText('age')
        ).toBeVisible();
    });

    it('renders columns with explicit list', () => {
        render(TableForObjectArray, { data: sampleData, columns: ["name"] });
        expect(
            screen.queryByText('name')
        ).toBeVisible();
        expect(
            screen.queryByText('age')
        ).toBeNull();
    });
});