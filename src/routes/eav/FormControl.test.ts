import { describe, it, expect, vi } from 'vitest';
import {
    render,
    screen
} from '@testing-library/svelte';
import FormControl from './FormControl.svelte';


describe('FormControl', () => {
    it('renders an input element with name attribute', () => {
        render(FormControl, { name: "name" });

        expect(
            document.querySelector('input[name="name"]')
        ).not.toBeNull();
    });


    it('renders name prop as capitalized version for label', () => {
        render(FormControl, { name: "name" });
        // screen.debug();
        expect(
            screen.queryByLabelText('Name')
        ).toBeVisible();
    });

    it('allows label property to override default label', () => {
        render(FormControl, { name: "name", label: "Username" });

        expect(
            screen.queryByLabelText('Username')
        ).toBeVisible();
    });

    it('when no classes are supplied only default classes added', () => {
        render(FormControl, { name: "name" });
        // screen.debug();

        expect(
            document.querySelector('div')
        ).toHaveClass('', { exact: true });

        expect(
            document.querySelector('label')
        ).toHaveClass('form-label', { exact: true });

        expect(
            document.querySelector('input')
        ).toHaveClass('form-control', { exact: true });
    });

    it('adds classes to label', () => {
        render(FormControl, {
            name: "name", classes: {
                label: ["labelClass"],
                fg: ["fgClass"],
                input: ["inputClass"],
            }
        });
        // screen.debug();

        expect(
            screen.queryByLabelText('Name')?.parentElement
        ).toHaveClass('fgClass', { exact: true });

        expect(
            document.querySelector('label')
        ).toHaveClass('form-label labelClass', { exact: true });

        expect(
            document.querySelector('input')
        ).toHaveClass('form-control inputClass', { exact: true });
    });

    it('label for attribute matches input id', () => {
        render(FormControl, { name: "name" });

        expect(
            document.querySelector('label')!.getAttribute('for')
        ).toBe(document.querySelector('input')!.getAttribute('id'));
    });

    it('uses type as type attribute on input', () => {
        render(FormControl, { name: "name", type: "email" });

        expect(
            document.querySelector('input')!.getAttribute('type')
        ).toBe('email');
    });
});