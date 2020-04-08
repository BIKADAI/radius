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
  output.impact.infectionsByRequestedTime = output.impact.currentlyInfected * 2 ** factor;
  output.severeImpact.infectionsByRequestedTime = output.impact.currentlyInfected * 2 ** factor;
  /**
   * challenge 1 end , and  number 2  start
   */
  const percentageInfectionsImpact = (output.impact.infectionsByRequestedTime * 15) / 100;
  output.impact.severeCasesByRequestedTime = Math.floor(percentageInfectionsImpact);
  const PersentageInfectionSevere = (output.severeImpact.infectionsByRequestedTime * 15) / 100;
  output.severeImpact.severeCasesByRequestedTime = Math.floor(PersentageInfectionSevere);
  let beds = (data.totalHospitalBeds - output.impact.severeCasesByRequestedTime * 35) / 100;
  output.impact.hospitalBedsByRequestedTime = Math.floor(beds);
  beds = (data.totalHospitalBeds - output.severeImpact.severeCasesByRequestedTime * 35) / 100;
  output.severeImpact.hospitalBedsByRequestedTime = Math.floor(beds);
  /**
   * end challenge 2, start challenge 3
   */
  let casesForVentByRequestedTimeImpact = (output.severeImpact.severeCasesByRequestedTime * 2) / 100;
  let casesForICUByRequestedTimeImpact = (output.impact.severeCasesByRequestedTime * 5) / 100;
  let casesForVentByRequestedTimeSevere = (output.severeImpact.severeCasesByRequestedTime * 2) / 100;
  let casesForICUByRequestedTimeSevere = (output.severeImpact.severeCasesByRequestedTime * 5) / 100;
  casesForICUByRequestedTimeImpact = Math.floor(casesForICUByRequestedTimeImpact);
  casesForVentByRequestedTimeImpact = Math.floor(casesForVentByRequestedTimeImpact);
  casesForVentByRequestedTimeSevere = Math.floor(casesForVentByRequestedTimeSevere);
  casesForICUByRequestedTimeSevere = Math.floor(casesForICUByRequestedTimeSevere);
  output.impact.casesForICUByRequestedTime = casesForICUByRequestedTimeImpact;
  output.impact.casesForVentilatorsByRequestedTime = casesForVentByRequestedTimeImpact;
  output.severeImpact.casesForVentilatorsByRequestedTime = casesForVentByRequestedTimeSevere;
  output.severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTimeSevere;
  /**
   * economy loss
   */
  let impactEconomyLost = output.impact.infectionsByRequestedTime;
  impactEconomyLost *= data.region.avgDailyIncomeInUSD;
  impactEconomyLost *= data.region.avgDailyIncomePopulation;
  impactEconomyLost *= durationIndays;
  data.impact.dollarsInFlight = impactEconomyLost;
  impactEconomyLost = output.severeImpact.infectionsByRequestedTime;
  impactEconomyLost *= data.region.avgDailyIncomeInUSD;
  impactEconomyLost *= output.severeImpact.avgDailyIncomePopulation;
  impactEconomyLost *= durationIndays;
  output.severeImpact.dollarsInFlight = impactEconomyLost;

  return output;
};
export default covid19ImpactEstimator;
