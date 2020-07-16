let taxes = {
  from11to16: 1.9,
  from16to11: 2.9,
  from11to17: 1.7,
  from17to11: 2.7,
  from11to18: 0.9,
  from18to11: 1.9,
};

let plans = {
  falemais30: 30,
  falemais60: 60,
  falemais120: 120,
};

let ADDITION_PERCENTUAL = 1.1; // 10%

function getTax({ origin, destiny }) {
  let tax = taxes[`from${origin}to${destiny}`];
  if (!tax) {
    return "tax not found";
  }
  return tax;
}

function getPlan({ plan = "" } = {}) {
  if (!plan) {
    return "plan not found";
  }
  return plans[plan];
}

export function calculateWithoutPlan({
  origin = 0,
  destiny = 0,
  minutes = 0,
} = {}) {
  let tax = getTax({ origin, destiny });

  let result = minutes * tax;

  if (isNaN(result)) return "";
  return result.toFixed(2);
}

export function calculateWithPlan({
  origin = 0,
  destiny = 0,
  minutes = 0,
  plan = "",
} = {}) {
  let tax = getTax({ origin, destiny });
  let planLimit = getPlan({ plan });

  if (minutes <= planLimit) {
    return "0.00";
  }

  let exceededMinutes = minutes - planLimit;
  let newTax = tax * ADDITION_PERCENTUAL;

  let result = newTax * exceededMinutes;
  if (isNaN(result)) return "";
  return result.toFixed(2);
}
