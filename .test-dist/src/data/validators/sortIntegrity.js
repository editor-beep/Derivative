"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSortIntegrity = void 0;
const validateSortIntegrity = (entries, options) => {
    const issues = [];
    const requirePoolCoverage = options?.requirePoolCoverage ?? false;
    const allowedPoolExtras = new Set(options?.allowedPoolExtras ?? []);
    for (const entry of entries) {
        const entryLabel = entry.root ?? "unknown-entry";
        const poolSet = new Set(entry.pool);
        for (const group of entry.groups) {
            for (const token of group.accepts) {
                if (!poolSet.has(token)) {
                    issues.push({
                        entryLabel,
                        message: `group '${group.id}' accepts '${token}' but it is missing from pool`,
                    });
                }
            }
        }
        if (requirePoolCoverage) {
            const acceptedTerms = new Set(entry.groups.flatMap((group) => group.accepts));
            const decoyTerms = new Set(entry.falseSystem?.decoys ?? []);
            for (const token of entry.pool) {
                if (!acceptedTerms.has(token) && !decoyTerms.has(token) && !allowedPoolExtras.has(token)) {
                    issues.push({
                        entryLabel,
                        message: `pool token '${token}' is neither accepted, marked as an explicit decoy, nor listed as an allowed injected decoy`,
                    });
                }
            }
        }
    }
    return issues;
};
exports.validateSortIntegrity = validateSortIntegrity;
