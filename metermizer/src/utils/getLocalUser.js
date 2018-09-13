// Get and return the User from the local storage
function getLocalUser() {
  const localUser = localStorage.getItem('meterMizerUser');
  return localUser;
}

export default getLocalUser;
