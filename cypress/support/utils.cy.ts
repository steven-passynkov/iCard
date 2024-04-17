export function Init() {
  cy.viewport(400, 700);
  cy.visit("http://localhost:3000", {
    onBeforeLoad(win) {
      const position = {
        coords: {
          latitude: 37.7749,
          longitude: -122.4194,
          accuracy: 50,
        },
      };
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (callback) => {
          return callback(position);
        }
      );
    },
  });

  cy.get(".sc-ion-label-md-h > .md").then(($button) => {
    if ($button.is(":visible")) {
      cy.get(".sc-ion-label-md-h > .md").click();
    }
  });
}
