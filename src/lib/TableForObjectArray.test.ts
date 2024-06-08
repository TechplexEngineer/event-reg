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

    it('renders columns with custom title', () => {
        const columns = [
            { data: 'name', title: 'Name' },
            { data: 'age', title: 'Age' },
        ];
        render(TableForObjectArray, { data: sampleData, columns: columns });
        expect(
            screen.queryByText('Name')
        ).toBeVisible();
        expect(
            screen.queryByText('Age')
        ).toBeVisible();
    });

    it('renders columns with custom title and without custom title', () => {
        const columns = [
            'name',
            { data: 'age', title: 'Age' },
        ];
        render(TableForObjectArray, { data: sampleData, columns: columns });
        expect(
            screen.queryByText('name')
        ).toBeVisible();
        expect(
            screen.queryByText('Age')
        ).toBeVisible();
    });

    it('uses the data property to determine what to render', () => {
        const columns = [
            { data: 'name', title: 'Age' },
        ];
        render(TableForObjectArray, { data: sampleData, columns: columns });
        expect(
            screen.queryByText('Age')
        ).toBeVisible();
        expect(
            screen.queryByText('Alice')
        ).toBeVisible();
        expect(
            screen.queryByText('25')
        ).toBeNull();
    });
});