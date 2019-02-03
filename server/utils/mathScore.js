const _ = require("lodash");


calculateTotalLabels = (label, criteriaArrays) => {
  return   _.countBy(criteriaArrays, (criteria) => criteria.label === label)["true"]
}

calculateTotalYes = (label, criteriaArrays) => {
  return   _.countBy(criteriaArrays, (criteria) => criteria.label === label && criteria.value === "YES")["true"]
}

calculateTotalNo = (label, criteriaArrays) => {
  return   _.countBy(criteriaArrays, (criteria) => criteria.label === label && criteria.value === "NO")["true"]
}

calculateTotalNA = (label, criteriaArrays) => {
  return   _.countBy(criteriaArrays, (criteria) => criteria.label === label && criteria.value === "NA")["true"]
}


module.exports = {
  calculateTotalLabels,
  calculateTotalYes,
  calculateTotalNo,
  calculateTotalNA
};
