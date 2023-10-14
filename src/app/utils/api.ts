const baseURL = "https://smt.esante.gouv.fr";

//modular function to request data from the API
function request(url: string, method = "GET") {
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method,
      })
        .then((response) => response.text()) //je sais que .json existe mais j'ai prefere utiliser .text pour pouvoir traiter les erreurs qui ne sont pas renvoye sous forme de json
        .then((data: string) => {
          let res: any;
          if (data[0] == "{" || data[0] == "[") {
            res = JSON.parse(data);
          } else {
            throw new Error(data);
          }
          return resolve(res);
        })
        .catch((error) => {
          return reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function conceptSearchRequest(
  text: string,
  size: number,
  page = 1,
  lang = "",
  terminologies = new Array<string>()
) {
  return request(
    `${baseURL}/api/concepts/search?searchedText=${text}&terminologyFilters=${terminologies.join(
      ","
    )}&pagination=${page}&lang=${lang}&size=${size}`,
    "POST"
  );
}

function terminologiesList() {
  return request(`${baseURL}/api/terminologies/list`);
}

function terminologiesHome() {
  return request(`${baseURL}/api/terminologies/home`);
}

function terminologiesSearchRequest(text: string, size: number, page = 1) {
  return request(
    `${baseURL}/api/terminologies/search?searchedText=${text}&pagination=${page}&size=${size}`
  );
}

function terminologyDownloadZip(terminologyId: string, version: string) {
  return `${baseURL}/wp-json/ans/terminologies/zip?terminologyId=${terminologyId}&version=${version}&licenceConsent=true&dataTransferConsent=true`;
}

// Export the functions for use in other parts of the project
export {
  conceptSearchRequest,
  terminologiesList,
  terminologiesHome,
  terminologiesSearchRequest,
  terminologyDownloadZip,
};
