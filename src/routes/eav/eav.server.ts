import type { Attribute, AttributeName, Namespace, NamespaceName, Namespaces } from "./eav";


const namespaces: Namespaces = {
    "Event": {
        "name": { type: "string", cardinality: "1" },
        "date": { type: "string", cardinality: "1" }
    }
}

const nsData: Record<string, Record<string, string>[]> = {
    "Event": [
        { name: "Event 1", date: "2021-01-01" },
        { name: "Event 2", date: "2021-01-02" },
        { name: "Event 3", date: "2021-01-03" },
    ]
};

export const getNamespaces = () => {
    return namespaces;
}

export const getNamespace = (nsName: NamespaceName) => {
    return namespaces[nsName];
}

export const addNamespace = (nsName: NamespaceName) => {
    namespaces[nsName] = {};
}

export const addAttribute = (nsName: NamespaceName, attrName: AttributeName, attr: Attribute) => {
    namespaces[nsName][attrName] = attr;
}

export const addNsData = (nsName: NamespaceName, data: Record<string, string>) => {
    if (!nsData[nsName]) {
        nsData[nsName] = [];
    }
    nsData[nsName].push(data);
}

export const getNsData = (nsName: NamespaceName) => {
    return nsData[nsName];
}