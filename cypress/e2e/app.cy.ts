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
    cy.visit("/events/1");
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
  for (const path of ["/", "/events", "/events/create", "/events/1"]) {
    it(`should display a footer on '${path}' page`, () => {
      cy.visit(path);
      cy.get("footer").should("contain", "Event Planner");
    });
  }
});

describe("Events Page", () => {
  it("should display a list of events", () => {
    // seed test database with 3 events
    cy.visit("/events");
    for (const eventName of ["Event 1", "Event 2", "Event 3"]) {
      const eventCard = cy.get("ul li a");
      eventCard.should("contain", eventName);
      eventCard.find("img").should("have.attr", "src"); // TODO: query for image src?
      // TODO: test for description?????
      // eventCard.find("p").should("contain", /Test Location/i); // TODO: add dynamic location
    }
  });

  // Leave this to a future ticket
  it("should navigate to the detail page for an event when the event is clicked", () => {
    // seed test database with event
    cy.visit("/events");
    const event = cy.get("ul li a").first();
    event.should("contain", "Event 1");
    event.click();

    cy.url().should("include", "/events/1");
    cy.get("h2").should("contain", "Event 1");
  });
});

describe("Create New Event Page", () => {
  it("should allow a user to create a new event", () => {
    // TODO: intercept the DB insert somewhere/get id??

    cy.visit("/events/create");

    const submitButton = cy.contains("button", "Create");

    submitButton.should("be.disabled");

    const titleInput = cy.contains("input", "Title");
    const descriptionInput = cy.contains(
      "input[type='textarea']",
      "Description",
    );
    const locationInput = cy.contains("input", "Location"); // TODO: make this a map selector or dropdown???
    const dateInput = cy.contains("input[type='date']", "Date");

    titleInput.type("Test Event");
    descriptionInput.type("Some Test Event Description");
    locationInput.type("Test Location");
    dateInput.type("2024-12-31");
    // const imgInput  // TODO: add this when image uploads supported?

    submitButton.should("be.enabled");
    submitButton.click();
    submitButton.should("be.disabled");
    // TODO: loading state??

    cy.url().should("include", "events/1");
    cy.contains("h2", "Test Event");
  });
});
