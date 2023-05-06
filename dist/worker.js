onmessage = (event) => {
  const urls = event.data;
  const result = [];
  const xhr = new XMLHttpRequest();

  urls.forEach((url) => {
    xhr.open("HEAD", url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        const time = new Date().getTime() - performance.timing.navigationStart;
        result.push({ url: url, time: time });
        if (result.length === urls.length) {
          postMessage(result);
        }
      }
    };
    xhr.send();
  });
};
