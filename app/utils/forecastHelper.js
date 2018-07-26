// Get weather description
function getWeatherDescByDay(organized) {
  const descs = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const desc = forecasts.map(forecast => forecast.weather[0].description);
    // Pick middle description
    descs[day] = desc[Math.floor(desc.length / 2)];
  });

  return descs;
}

// Get datetime
function getDtByDay(organized) {
  const dts = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dt = forecasts.map(forecast => forecast.dt);
    // Pick middle dt
    dts[day] = dt[Math.floor(dt.length / 2)];
  });
  return dts;
}

// Get date_text
function getDateTextByDay(organized) {
  const dTexts = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dText = forecasts.map(forecast => forecast.dt_txt);
    // Pick middle dtext
    dTexts[day] = dText[Math.floor(dText.length / 2)];
  });

  return dTexts;
}

// Get humidity
function getHumidityByDay(organized) {
  const humiditys = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const humidity = forecasts.map(forecast => forecast.main.humidity);
    // Pick middle humidity value
    humiditys[day] = humidity[Math.floor(humidity.length / 2)];
  });

  return humiditys;
}

// @returns object {day: icon_string}
function getIconByDay(organized) {
  const icons = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dayIcons = forecasts.map(forecast => forecast.weather[0].icon);
    // Pick middle icon
    icons[day] = dayIcons[Math.floor(dayIcons.length / 2)].replace("n", "d");
  });

  return icons;
}

// @returns object {day: [min_temp, max_temp]}
function getMinMaxTempByDay(organized) {
  const temps = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dayTemps = forecasts.map(forecast => forecast.main.temp);
    const minTemp = Math.min(...dayTemps);
    const maxTemp = Math.max(...dayTemps);
    temps[day] = [Math.round(minTemp), Math.round(maxTemp)];
  });

  return temps;
}

// @returns object {day : [hour forecast1, hour forecast2, ...]}
export function organizeByDay(list) {
  return list.reduce((obj, forecast) => {
    // get day
    const day = forecast.dt_txt.split(" ")[0].split("-")[2];
    if (!obj[day]) {
      obj[day] = [forecast];
    } else {
      obj[day].push(forecast);
    }
    return obj;
  }, {});
}

/**
 * Fills each forecast day with temperature and icon.
 *
 * @param {Object} organized - result from organizeByDay()
 * @returns {Object[]} with format of:
 *  {
 *    dt: {number},
 *    dt_text: {string},
 *    icon: {string},
 *    temps: {number[]},
 *    humidity: {number},
 *    description: {string},
 *  }
 */
export function combineInfoByDay(organized) {
  const days = [];

  const dts = getDtByDay(organized);
  const dt_texts = getDateTextByDay(organized);
  const icons = getIconByDay(organized);
  const temps = getMinMaxTempByDay(organized);
  const humiditys = getHumidityByDay(organized);
  const descriptions = getWeatherDescByDay(organized);

  Object.keys(icons).forEach(day => {
    const dayInfo = {
      dt: dts[day],
      dt_text: dt_texts[day],
      icon: icons[day],
      temps: temps[day],
      humidity: humiditys[day],
      description: descriptions[day]
    };
    days.push(dayInfo);
  });

  return days;
}
