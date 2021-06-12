function formatHasilLab(hasil) {
  let data = '',
    comma = hasil ? hasil.split('.') : [];
  if (0 < comma.length) {
    data = comma.join(',');
    data = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    data = hasil;
  }

  return data;
}

function formatBytes(a, b) {
  if (0 === a || '' === a) return '0 Bytes';
  var c = 1024,
    d = b || 2,
    e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
}

export { formatHasilLab, formatBytes };
