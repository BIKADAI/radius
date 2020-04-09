const covid19ImpactEstimator = (data) => {
  const periods = { days: 1, weeks: 7, months: 30 };
  const durationIndays = data.timeToElapse * periods[data.periodType];
  const fa = Math.floor(durationIndays / 3);
  const output = {
    data: {},
    impact: {
      currentlyInfected: 0,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0

    },
    severeImpact: {
      currentlyInfected: 0,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    }
  };
  /**
   * ok
   * challenge number 1 start here
   *  output.impact.infectionsByRequestedTime = output.impact.currentlyInfected * (2 ** (fa));
  output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected * (2 ** fa);
   */
  output.data = data;
  output.impact.currentlyInfected = data.reportedCases * 10 * fa;
  output.severeImpact.currentlyInfected = data.reportedCases * 50;
  /**
   * challenge 1 end , and  number 2  start
   */
  const percentageInfectionsImpact = (output.impact.infectionsByRequestedTime * 15) / 100;
  output.impact.severeCasesByRequestedTime = Math.floor(percentageInfectionsImpact);
  const PersentageInfectionSevere = (output.severeImpact.infectionsByRequestedTime * 15) / 100;
  output.severeImpact.severeCasesByRequestedTime = Math.floor(PersentageInfectionSevere);
  let beds = (data.totalHospitalBeds * 35) / 100 - output.impact.severeCasesByRequestedTime;
  output.impact.hospitalBedsByRequestedTime = Math.trunc(beds);
  beds = (data.totalHospitalBeds * 35) / 100 - output.severeImpact.severeCasesByRequestedTime;
  output.severeImpact.hospitalBedsByRequestedTime = Math.trunc(beds);
  /**
   * end challenge 2, start challenge 3
   */
  return output;
};
export default covid19ImpactEstimator;
