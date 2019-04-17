
export default services = screen => {
  return new Promise((resolve, reject) => {
    fetch(`https://1e1b9b65.ngrok.io/api/${screen}`, {
      method: "GET"
    })
      .then(async (res) => {
          if(res.status >= 400) {
              return resolve([]);
          }
          const result = await res.json();
          resolve(result);
      }) 
      .catch(err => {
        reject(err);
      });
  });
};
