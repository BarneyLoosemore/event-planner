describe("Navigation", () => {
  it("should display the home page", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Event Planner");
  });
});
