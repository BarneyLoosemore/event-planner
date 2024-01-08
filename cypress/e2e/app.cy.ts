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

describe("Header", () => {
  it("should display a header on the home page with links to '/events' and '/events/create'", () => {
    cy.visit("/");
    cy.get("header > h1").should("contain", "Event Planner");
    const eventsLink = cy.get("header nav a").first();
    eventsLink.should("contain", "Events");
    eventsLink.click();

    cy.url().should("include", "/events");

    const createEventLink = cy.get("header nav a").last();
    createEventLink.should("contain", "Create Event");
    createEventLink.click();

    cy.url().should("include", "/events/create");
  });
});
