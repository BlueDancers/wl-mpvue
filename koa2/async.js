//使用async + await 一起使用

function delay(ward) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ward)
    }, 1000);
  })
}

async function start(){
  let word = await delay('1');
  console.log(word);
  let word2 = await delay('2');
  console.log(word2);
  let word3 = await delay('3')
  console.log(word3);
}

start();