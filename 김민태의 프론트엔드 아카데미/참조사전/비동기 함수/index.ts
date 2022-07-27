function delay(ms: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 10) % 2 === 0) {
        resolve("success");
      } else {
        reject("failure");
      }
    }, ms);
  });
}

delay(3000)
  .then((result: string) => {
    console.log("done promise" + result);
  })
  .catch((error: string) => {
    console.error("fail promise" + error);
  });

async function main2() {
  try {
    const res = await delay(3000);
    console.log("done promise" + res);
  } catch (e) {
    console.error("fail promise" + e);
  }
}

main2();
