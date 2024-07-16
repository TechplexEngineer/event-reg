import { describe, it, expect, vi } from 'vitest';
import {
    render,
    screen
} from '@testing-library/svelte';
import FormForNamespace from './FormForNamespace.svelte';
import type { Namespace } from '../data/eav';

const sampleNs: Namespace = {
    "name": { type: "string", cardinality: "1" },
    "date": { type: "string", cardinality: "1" }
};
const nsName = "Event";

describe('FormForNamespace', () => {
    it('creates hidden input field with nsName', () => {
        render(FormForNamespace, { nsName: nsName, ns: sampleNs });
        expect(document.querySelector('input[type=hidden][name=namespace]')).toHaveValue(nsName);
    });
    it('creates form input with label for each ns attr', () => {
        render(FormForNamespace, { nsName: nsName, ns: sampleNs });
        screen.debug();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
    })
    it('creates submit button', () => {
        render(FormForNamespace, { nsName: nsName, ns: sampleNs });
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});