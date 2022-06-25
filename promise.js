// callback 과 동일한 내용 promise 로 구현

const addSum = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(typeof a !== 'number' || typeof b !== 'number') {
                reject('a,b must be number');
            }
            resolve(a+b);
                
        }, 3000)
        }
    )
    }



// addSum(10,20)
//     .then(sum1 => {
//         console.log({sum1});
//         return addSum(sum1, 3)
//     })
//     .then((sum2)=>console.log({sum2}))
//     .catch((error) => console.log({error}));

const totalSum = async() => {
    let sum = await addSum(10,10)
    console.log({sum})
}

totalSum();
