import { Init } from "../support/utils.cy";

describe("empty spec", () => {
  beforeEach(() => {
    Init();
  });
  it("passes", () => {
    cy.log("passes")
  });
});