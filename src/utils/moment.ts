const momentTimezone = require('moment-timezone');

export default (...args: any) => momentTimezone(...args).tz("Europe/Kiev");
