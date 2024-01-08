describe("Navigation", () => {
  it("should display a home page at '/'", () => {
    cy.visit("/");
    cy.get("h2").should("contain", "Event Planner");
  });

  it("should display an events page at '/events'", () => {
    cy.visit("/events");
    cy.get("h2").should("contain", "Events");
  });

  it("should display a create event page at '/events/create'", () => {
    cy.visit("/events/create");
    cy.get("h2").should("contain", "Create Event");
  });

  it('should display a dynamic page for an event at "/events/:id"', () => {
    // TODO: seed test database with an event
    cy.visit("/events/detail/1");
    cy.get("h2").should("contain", "Event 1");
  });
});

describe("Header", () => {
  it("should display a header on each page with links to '/events' and '/events/create'", () => {
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
    cy.get("header nav a").first().should("contain", "Events");
  });
});

describe("Footer", () => {
  for (const path of ["/", "/events", "/events/create", "/events/detail/1"]) {
    it(`should display a footer on '${path}' page`, () => {
      cy.visit(path);
      cy.get("footer").should("contain", "Event Planner");
    });
  }
});
