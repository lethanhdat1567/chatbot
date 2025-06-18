export function findNodeById(node, id) {
    if (node.id === id) return node;

    if (node.next) {
        if (Array.isArray(node.next)) {
            for (const n of node.next) {
                const found = findNodeById(n, id);
                if (found) return found;
            }
        } else {
            const found = findNodeById(node.next, id);
            if (found) return found;
        }
    }

    if (node.condition) {
        for (const branch of node.condition.branches || []) {
            const found = findNodeById(branch.next, id);
            if (found) return found;
        }
        if (node.condition.default) {
            const found = findNodeById(node.condition.default, id);
            if (found) return found;
        }
    }

    return null;
}
