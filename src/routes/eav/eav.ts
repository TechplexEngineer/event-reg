import type { HTMLInputType } from "./FormControl.svelte";

export const typeOptions = ['string', 'number', 'boolean'] as const;
export type NamespaceTypeOptions = typeof typeOptions[number];

export const cardinalityOptions = [
    { value: '1', label: 'One' },
    { value: 'n', label: 'Many' }
] as const;

const co = cardinalityOptions.map(option => option.value);
export type NamespaceCardinalityOptions = typeof co[number];

export type Attribute = {
    comment?: string,
    cardinality: NamespaceCardinalityOptions,
    type: NamespaceTypeOptions
};

export type AttributeName = string;
export type Namespace = Record<AttributeName, Attribute>;

export type NamespaceName = string;
export type Namespaces = Record<NamespaceName, Namespace>;

// Mappers

export const mapNamespaceTypeToInputType = (nsType: NamespaceTypeOptions): HTMLInputType => {
    switch (nsType) {
        case 'string': return 'text';
        case 'number': return 'number';
        case 'boolean': return 'checkbox';
    }
    return 'text';
}