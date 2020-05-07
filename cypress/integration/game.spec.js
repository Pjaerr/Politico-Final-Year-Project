describe("User clicks the New Game button", () => {
  it("Takes the user to the fresh game view", () => {
    cy.visit("https://localhost:5001");

    cy.contains("New Game").click();

    cy.get('img[alt="Financial"]');
    cy.get('img[alt="Population Happiness"]');
    cy.get('img[alt="Domestic Political Favour"]');
    cy.get('img[alt="Foreign Political Favour"]');

    cy.contains("Make a Decision");
    cy.contains("Current Turn: 0");

    cy.get("svg");
  });
});

describe("User clicks on the Continue button", () => {
  it("Takes the user to a game with their existing data", () => {
    cy.visit("https://localhost:5001");

    cy.contains("New Game").click();

    cy.contains("Current Turn: 0");

    cy.contains("Make a Decision").click();
    cy.contains("Yes").click();

    cy.contains("Current Turn: 1");

    cy.reload();

    cy.contains("Continue").click();

    cy.contains("Current Turn: 1");
  });
});

describe("User clicks on the How To Play? link", () => {
  it("opens the How To Play modal", () => {
    cy.visit("https://localhost:5001");

    cy.contains("How to play?").click();
    cy.contains("Getting Started").should("be.visible");

    const firstImage = cy.get('img[alt="Screenshot of the game view"]');
    firstImage.scrollIntoView();
    firstImage.should("be.visible");

    const secondImage = cy.get(
      'img[alt="Screenshot of the game view with the region modal open"]'
    );
    secondImage.scrollIntoView();
    secondImage.should("be.visible");

    const thirdImage = cy.get(
      'img[alt="Screenshot of the game view with the decision modal open"]'
    );
    thirdImage.scrollIntoView();
    thirdImage.should("be.visible");
  });
});

describe("User clicks the Make a Decision button", () => {
  it("opens the decision modal", () => {
    cy.visit("https://localhost:5001");

    cy.contains("New Game").click();
    cy.contains("Make a Decision").click();

    cy.contains("Yes");
    cy.contains("No");
  });
});

describe("User clicks the Yes button on a decision modal", () => {
  it("closes the modal", () => {
    cy.visit("https://localhost:5001");

    cy.contains("New Game").click();
    cy.contains("Make a Decision").click();

    cy.contains("Yes").click();

    cy.contains("Yes").should("not.exist");
  });
});

describe("User clicks a region on the map", () => {
  it("opens a modal with information about the region", () => {
    cy.visit("https://localhost:5001");

    cy.contains("New Game").click();

    cy.get("svg > path:first-child").click();

    cy.contains("Statistics").should("be.visible");
    cy.get('img[alt="Province Population Icon"]').should("be.visible");
  });
});

describe("User closes the region information modal", () => {
  it("closes sucessfully", () => {
    cy.visit("https://localhost:5001");

    cy.contains("New Game").click();

    cy.get("svg > path:first-child").click();

    cy.get('button > img[alt="Back Arrow Icon"]').parent().click();

    cy.get('img[alt="Province Population Icon"]').should("not.exist");
  });
});

describe("User scrolls the mouse wheel down", () => {
  it("zooms into the map", () => {
    cy.visit("https://localhost:5001");

    cy.contains("New Game").click();

    const viewBoxBeforeTest = cy.get("svg").attribute("viewBox");

    cy.get("svg").trigger("wheel", {
      deltaY: 500,
    });

    const viewBoxAfterTest = cy.get("svg").attribute("viewBox");

    expect(viewBoxAfterTest).to.not.equal(viewBoxBeforeTest);
  });
});
