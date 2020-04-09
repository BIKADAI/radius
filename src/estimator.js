const covid19ImpactEstimator = (data) => {
  const periods = { days: 1, weeks: 7, months: 30 };
  const durationIndays = data.timeToElapse * periods[data.periodType];
  const fa = Math.floor(durationIndays / 3);
  const output = {
    data: {},
    impact: {},
    severeImpact: {}
  };
  /**
   * challenge number 1 start here
   */
  output.data = data;
  output.impact.currentlyInfected = data.reportedCases * 10;
  output.severeImpact.currentlyInfected = data.reportedCases * 50;
  output.impact.infectionsByRequestedTime = output.impact.currentlyInfected * (2 ** (fa));
  output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected * (2 ** fa);
  /**
   * challenge 1 end , and  number 2  start
   */
  const percentageInfectionsImpact = (output.impact.infectionsByRequestedTime * 15) / 100;
  output.impact.severeCasesByRequestedTime = percentageInfectionsImpact;
  const PersentageInfectionSevere = (output.severeImpact.infectionsByRequestedTime * 15) / 100;
  output.severeImpact.severeCasesByRequestedTime = PersentageInfectionSevere;
  let beds = (data.totalHospitalBeds * 35) / 100 - output.impact.severeCasesByRequestedTime;
  output.impact.hospitalBedsByRequestedTime = Math.trunc(beds);
  beds = (data.totalHospitalBeds * 35) / 100 - output.severeImpact.severeCasesByRequestedTime;
  output.severeImpact.hospitalBedsByRequestedTime = Math.trunc(beds);
  /**
   * end challenge 2, start challenge 3
   */
  let casesForVentByRequestedTimeImpac = (output.severeImpact.infectionsByRequestedTime * 2) / 100;
  let casesForICUByRequestedTimeImpact = (output.impact.infectionsByRequestedTime * 5) / 100;
  let casesForVentByRequestedTimeSever = (output.severeImpact.infectionsByRequestedTime * 2) / 100;
  let casesForICUByRequestedTimeSevere = (output.severeImpact.infectionsByRequestedTime * 5) / 100;
  casesForICUByRequestedTimeImpact = Math.floor(casesForICUByRequestedTimeImpact);
  casesForVentByRequestedTimeImpac = Math.floor(casesForVentByRequestedTimeImpac);
  casesForVentByRequestedTimeSever = Math.floor(casesForVentByRequestedTimeSever);
  casesForICUByRequestedTimeSevere = Math.floor(casesForICUByRequestedTimeSevere);
  output.impact.casesForICUByRequestedTime = casesForICUByRequestedTimeImpact;
  output.impact.casesForVentilatorsByRequestedTime = casesForVentByRequestedTimeImpac;
  output.severeImpact.casesForVentilatorsByRequestedTime = casesForVentByRequestedTimeSever;
  output.severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTimeSevere;
  /**
   * economy loss
   */
  let impactEconomyLost = output.impact.infectionsByRequestedTime;
  /*
  impactEconomyLost *= data.region.avgDailyIncomeInUSD;
  */
  impactEconomyLost *= data.region.avgDailyIncomePopulation;
  impactEconomyLost *= durationIndays;
  output.impact.dollarsInFlight = impactEconomyLost;
  impactEconomyLost = output.severeImpact.infectionsByRequestedTime;
  /* *
   *impactEconomyLost *= data.region.avgDailyIncomeInUSD;
  */

  impactEconomyLost *= data.region.avgDailyIncomePopulation;
  impactEconomyLost *= durationIndays;
  output.severeImpact.dollarsInFlight = impactEconomyLost;

  return output;
};
export default covid19ImpactEstimator;
