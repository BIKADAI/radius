const covid19ImpactEstimator = (data) => {
  const periods = { days: 1, weeks: 7, months: 30 };
  const durationIndays = data.timeToElapse * periods[data.periodType];
  const factor = Math.floor(durationIndays / 3);
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
  output.impact.infectionsByRequestedTime = data.impact.currentlyInfected * 2 ** factor;
  output.severeImpact.infectionsByRequestedTime = data.impact.currentlyInfected * 2 ** factor;
  /**
   * challenge 1 end , and  number 2  start
   */
  const percentageInfectionsImpact = (data.impact.infectionsByRequestedTime * 15) / 100;
  output.impact.severeCasesByRequestedTime = Math.floor(percentageInfectionsImpact);
  const PersentageInfectionSevere = (data.severeImpact.infectionsByRequestedTime * 15) / 100;
  output.severeImpact.severeCasesByRequestedTime = Math.floor(PersentageInfectionSevere);
  let beds = (data.totalHospitalBeds - data.impact.severeCasesByRequestedTime * 35) / 100;
  output.impact.hospitalBedsByRequestedTime = Math.floor(beds);
  beds = (data.totalHospitalBeds - data.severeImpact.severeCasesByRequestedTime * 35) / 100;
  output.severeImpact.hospitalBedsByRequestedTime = Math.floor(beds);
  /**
   * end challenge 2, start challenge 3
   */
  let casesForVentByRequestedTimeImpact = (data.severeImpact.severeCasesByRequestedTime * 2) / 100;
  let casesForICUByRequestedTimeImpact = (data.impact.severeCasesByRequestedTime * 5) / 100;
  let casesForVentByRequestedTimeSevere = (data.severeImpact.severeCasesByRequestedTime * 2) / 100;
  let casesForICUByRequestedTimeSevere = (data.severeImpact.severeCasesByRequestedTime * 5) / 100;
  casesForICUByRequestedTimeImpact = Math.floor(casesForICUByRequestedTimeImpact);
  casesForVentByRequestedTimeImpact = Math.floor(casesForVentByRequestedTimeImpact);
  casesForVentByRequestedTimeSevere = Math.floor(casesForVentByRequestedTimeSevere);
  casesForICUByRequestedTimeSevere = Math.floor(casesForICUByRequestedTimeSevere);
  data.impact.casesForICUByRequestedTime = casesForICUByRequestedTimeImpact;
  data.impact.casesForVentilatorsByRequestedTime = casesForVentByRequestedTimeImpact;
  data.severeImpact.casesForVentilatorsByRequestedTime = casesForVentByRequestedTimeSevere;
  data.severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTimeSevere;
  /**
   * economy loss
   */
  let impactEconomyLost = data.impact.infectionsByRequestedTime;
  impactEconomyLost *= data.region.avgDailyIncomeInUSD;
  impactEconomyLost *= data.impact.avgDailyIncomePopulation;
  impactEconomyLost *= durationIndays;
  data.impact.dollarsInFlight = impactEconomyLost;
  impactEconomyLost = data.severeImpact.infectionsByRequestedTime;
  impactEconomyLost *= data.region.avgDailyIncomeInUSD;
  impactEconomyLost *= data.severeImpact.avgDailyIncomePopulation;
  impactEconomyLost *= durationIndays;
  data.severeImpact.dollarsInFlight = impactEconomyLost;

  return output;
};
export default covid19ImpactEstimator;
