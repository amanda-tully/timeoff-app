/// <reference types="cypress" />

// Utility to clear mock API storage between tests
const STORAGE_KEY = "timeoff_requests_v1";

function switchUser(name: string) {
  // Open user action sheet via avatar in header, then choose user by name
  cy.get("ion-avatar.custom-avatar").click({ force: true });
  cy.contains("button, ion-button", name, { matchCase: false }).click({
    force: true,
  });
}

function goTo(tab: "Requests" | "Responses") {
  cy.get("ion-tab-bar").within(() => {
    cy.contains("ion-tab-button", tab).click({ force: true });
  });
}

function submitRequest(opts: {
  type: "Vacation" | "Sick day" | "Personal";
  note?: string;
}) {
  cy.get('[data-testid="type-select"]').click({ force: true });
  cy.get("ion-alert, ion-popover").should("exist");

  cy.get("ion-alert .alert-radio-label, ion-popover .popover-viewport *")
    .contains(opts.type)
    .click({ force: true });

  // Click OK to confirm selection (for Ionic select/alert)
  cy.get("ion-alert button, ion-alert ion-button")
    .contains(/^OK$/i)
    .click({ force: true });

  // Wait for the select to reflect the chosen value before proceeding
  cy.get('[data-testid="type-select"]').should("contain.text", opts.type);

  // Wait for the submit button to be enabled (form is valid)
  cy.get('form[role="form"] ion-button[type="submit"]').should(
    "not.be.disabled",
  );

  if (opts.note) {
    cy.get("ion-textarea textarea")
      .should("not.be.disabled")
      .type(opts.note, { delay: 0 });
  }

  cy.get('form[role="form"]').submit();
}

function expectTopHistoryStatus(status: "Pending" | "Approved" | "Rejected") {
  // Read first status value in the list
  cy.get('[data-testid^="status-value-"]').first().should("have.text", status);
}

function processFirstPending(action: "Approve" | "Reject", note?: string) {
  // Wait for the process button to exist and be visible (increase timeout)
  cy.get('[data-testid="process-request-btn"]', { timeout: 10000 })
    .should("exist")
    .should("be.visible")
    .first()
    .click({ force: true });
  if (note) {
    cy.get("#supervisor-note-input").clear().type(note);
  }
  cy.contains("ion-button, button", action).click({ force: true });
}

describe("Time-off E2E across user roles", () => {
  beforeEach(() => {
    // Start clean
    cy.visit("/");
    cy.window().then((win) => win.localStorage.setItem(STORAGE_KEY, "[]"));
    cy.reload();
  });

  it("Employee submits a request; supervisor approves; employee sees Approved", () => {
    // Default user is Emma (request-only)
    goTo("Requests");

    submitRequest({ type: "Vacation", note: "Family trip" });

    // Should appear in employee history as Pending
    cy.contains("History");
    expectTopHistoryStatus("Pending");

    // Switch to Kate (has Responses view)
    switchUser("Kate");
    goTo("Responses");

    // Pending list should include Emma's request; process and approve
    processFirstPending("Approve", "Enjoy!");

    // The item should no longer be in pending; it appears in History as Approved
    cy.contains("History");
    cy.get('[data-testid^="status-value-"]')
      .first()
      .should("have.text", "Approved");

    // Switch back to Emma and verify status is Approved in her history
    switchUser("Emma");
    goTo("Requests");
    expectTopHistoryStatus("Approved");
  });

  it("Employee submits a request; supervisor rejects; employee sees Rejected", () => {
    // Create request as Bob
    switchUser("Bob");
    goTo("Requests");
    submitRequest({ type: "Personal" });
    expectTopHistoryStatus("Pending");

    switchUser("Kate");
    goTo("Responses");
    processFirstPending("Reject", "Need coverage");

    //  Verify the request is no longer in pending list
    cy.get('[data-testid="process-request-btn"]').should("not.exist");

    // Back to Bob
    switchUser("Bob");
    goTo("Requests");
    expectTopHistoryStatus("Rejected");
  });

  it("Pagination on employee history works", () => {
    // Use Kate (has Requests tab) to create > 3 requests
    switchUser("Kate");
    goTo("Requests");

    cy.wait(300);
    const types: Array<"Personal" | "Vacation" | "Sick day"> = [
      "Personal",
      "Personal",
      "Personal",
      "Vacation",
      "Sick day",
    ];

    types.forEach((type) => {
      submitRequest({ type });
      cy.wait(2000);
      // Wait for the submit button to be enabled before next submission
      cy.get('form[role="form"] ion-button[type="submit"]').should(
        "not.be.disabled",
      );
    });

    // After submitting requests and confirming pagination container exists
    cy.get(".pagination-container", { timeout: 10000 }).should("exist");

    // Wait for at least 2 pagination numbers to appear
    cy.get(".pagination-number", { timeout: 10000 }).should(
      "have.length.gte",
      2,
    );

    // Debug: print pagination buttons' HTML
    cy.get(".pagination-number").then(($els) => {
      // eslint-disable-next-line no-console
      console.log($els.map((i, el) => el.outerHTML).get());
    });

    // Now check that one of them is marked as current (try both aria-current and active class)
    cy.get(
      '.pagination-number[aria-current="page"], .pagination-number.pagination-number-active',
      { timeout: 10000 },
    )
      .should("exist")
      .and("contain.text", "1");

    // Navigate to page 2 and verify page indicator changes
    cy.contains(".pagination-number", "2").click();
    cy.get(
      '.pagination-number[aria-current="page"], .pagination-number.pagination-number-active',
      { timeout: 10000 },
    ).should("contain.text", "2");
  });

  it("Data persists across reloads (localStorage-backed)", () => {
    // Emma creates a request
    goTo("Requests");
    submitRequest({ type: "Vacation", note: "Persistence check" });
    expectTopHistoryStatus("Pending");

    // Reload and verify it remains
    cy.reload();
    goTo("Requests");
    expectTopHistoryStatus("Pending");
  });
});
