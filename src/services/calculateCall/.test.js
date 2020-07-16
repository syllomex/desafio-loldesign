import { calculateWithPlan, calculateWithoutPlan } from "./index";

describe("calculate call without plan", () => {
  it("should return the right values", () => {
    let origin = 11;
    let destiny = 16;
    let minutes = 20;
    expect(calculateWithoutPlan({ origin, destiny, minutes })).toBe("38.00");

    origin = 11;
    destiny = 17;
    minutes = 80;
    expect(calculateWithoutPlan({ origin, destiny, minutes })).toBe("136.00");

    origin = 18;
    destiny = 11;
    minutes = 200;
    expect(calculateWithoutPlan({ origin, destiny, minutes })).toBe("380.00");
    
    origin = 18;
    destiny = 17;
    minutes = 100;
    expect(calculateWithoutPlan({ origin, destiny, minutes })).toBe("");
  });
});

describe("calculate call with plan", () => {
  it("should return the right values", () => {
    let origin = 11;
    let destiny = 16;
    let minutes = 20;
    let plan = "falemais30";
    expect(calculateWithPlan({ origin, destiny, minutes, plan })).toBe("0.00");
    
    origin = 11;
    destiny = 17;
    minutes = 80;
    plan = "falemais60";
    expect(calculateWithPlan({ origin, destiny, minutes, plan })).toBe("37.40");
    
    origin = 18;
    destiny = 11;
    minutes = 200;
    plan = "falemais120";
    expect(calculateWithPlan({ origin, destiny, minutes, plan })).toBe("167.20");

    origin = 18;
    destiny = 17;
    minutes = 100;
    plan = "falemais30";
    expect(calculateWithoutPlan({ origin, destiny, minutes, plan })).toBe("");
  });
});
