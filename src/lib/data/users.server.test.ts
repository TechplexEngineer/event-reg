import { describe, it, expect } from "vitest";
import { isAdmin } from "./users.server";

describe('isAdmin', () => {
    it('should return true for blake', () => {
        expect(isAdmin("techplex.engineer@gmail.com")).toBe(true);
        expect(isAdmin("blake@team4909.org")).toBe(true);
    });
});