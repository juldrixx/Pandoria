export const dummyService = {
  get,
}

function get() {
  return new Promise((resolve, reject) => {
    fetch('https://loripsum.net/api')
      .then(result => {
        return result.text();
      })
      .then(result => {
        resolve({ dummyResult: result });
      })
      .catch(error => {
        reject(error);
      });
  });
}