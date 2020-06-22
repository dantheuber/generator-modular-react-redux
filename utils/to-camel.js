const capitalizeFirstLetter = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

module.exports = s => capitalizeFirstLetter(
  s.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase()
    .replace('-', '')
    .replace('_', '')
  )
);
