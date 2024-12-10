export const isTokenExpired = (tokenExp, cb) => {
  const expirationDate = new Date(tokenExp * 1000);
  const todayDate = new Date();
  const isExpired = expirationDate < todayDate;
  if (isExpired && cb) {
    cb();
  }
  return isExpired;
};
