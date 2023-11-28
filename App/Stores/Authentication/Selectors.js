/**
 * Selectors let us factorize logic that queries the state.
 *
 * Selectors can be used in sagas or components to avoid duplicating that logic.
 *
 * Writing selectors is optional as it is not always necessary, we provide a simple example below.
 */

export const ExtractCityState = (response) => {
  if (!response) return {stateList: [], cityList: []};

  let states = [...new Set(response.map((x) => x.State))];
  let cityList = [];
  for (const item of response) {
    cityList.push({
      value: item.ZipCodeListId,
      label: item.City,
      Name: item.City,
      stateName: item.State,
    });
  }
  // console.log(JSON.stringify("cityList"))
  // console.log(JSON.stringify(cityList))
  let disinctStates = [];
  for (const item of states) {
    disinctStates.push({value: item, label: item, Name: item});
  }

  // console.log(JSON.stringify("disinctStates"))
  // console.log(JSON.stringify(disinctStates))

  return {stateList: disinctStates, cityList: cityList};
};
