describe("Navigation", () => {
  it("should display a home page at '/'", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Event Planner");
  });

  it("should display an events page at '/events'", () => {
    cy.visit("/events");
    cy.get("h1").should("contain", "Events");
  });

  it('should display a dynamic page for an event at "/events/:id"', () => {
    // TODO: seed test database with an event
    cy.visit("/events/1");
    cy.get("h1").should("contain", "Event 1");
  });
});
