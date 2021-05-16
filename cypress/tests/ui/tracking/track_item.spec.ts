// / <reference types="cypress" />

import { createYield } from "typescript";

const trackCodes = {
  fake: "9472984984j98f289jr",
  real: "MTPAEG4WKX7J",
};
describe("Parcel Tracking", function () {
  it("Status Not Available", function () {
    cy.goto("TRACKING");
    cy.typee(trackCodes.fake, "name=track_code");
    cy.clickBtnByName("trackBtn");
    cy.wait(4000);
    [trackCodes.fake, "Status Not Available"].map((a) => cy.contains(a));
  });
  it("Track Successfully", function () {
    cy.contains("Track another package").click();
    cy.typee(trackCodes.real, "name=track_code");
    cy.clickByName("trackBtn");
    cy.wait(4000);
    cy.get("name=statusItem").should("exist");
    cy.contains(trackCodes.real);
  });
});
