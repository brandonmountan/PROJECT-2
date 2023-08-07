const dayjs = require('dayjs');

function getGreeting() {
  const hour = dayjs().hour();

  if (hour >= 0 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

module.exports = { getGreeting };
