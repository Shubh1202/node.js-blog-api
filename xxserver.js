// // const fs = require("fs")
// // console.log("start")

// // let i = 0
// // // while (i <= 100000) {
// // //     console.log(i)
// // //     i++
// // // }

// // setTimeout(() => console.log("Timeout"), 0)
// // setImmediate(() => console.log("Set Immidiate"))

// // fs.readFile("./app.js", (data, error) => {
// //     setTimeout(() => console.log("fs timeout"), 0)
// //     setImmediate(() => console.log("fs Set Immidiate"))
// //     console.log("77")
// // })

// // process.nextTick(() => console.log("next tick"))

// // console.log("end")


// const fs = require("fs");

// console.log("start"); // 1. Synchronous

// setTimeout(() => console.log("Timeout"), 0); // 3. Timer Phase
// setImmediate(() => console.log("Set Immediate")); // 4. Check Phase

// // Note: Error first callback hota hai Node.js me (err, data)
// fs.readFile("./app.js", (err, data) => {
//     // 5. Poll Phase ke andar ye execute hoga
//     console.log("77 (Inside File Read)");

//     // Ye dono agle tick/loop iteration me chalenge
//     setTimeout(() => console.log("fs timeout"), 0);     // Agla Timer Phase
//     setImmediate(() => console.log("fs Set Immediate")); // Agla Check Phase
// });

// process.nextTick(() => console.log("next tick")); // 2. Microtask (Sabse Pehle)

// console.log("end"); // 1. Synchronous



const fs = require("fs");

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
    Promise.resolve().then(() => console.log("Promise inside Timeout"));
}, 0);

setImmediate(() => {
    console.log("Set Immediate");
});

fs.readFile("./app.js", (err, data) => {
    console.log("fs.readFile Callback");

    setTimeout(() => console.log("fs Timeout"), 0);
    setImmediate(() => console.log("fs Set Immediate"));

    process.nextTick(() => console.log("nextTick inside fs"));
});

process.nextTick(() => {
    console.log("process.nextTick 1");
    process.nextTick(() => console.log("Nested nextTick"));
});

Promise.resolve().then(() => {
    console.log("Promise.resolve 1");
});

async function asyncFn() {
    console.log("Async/Await Start");
    await Promise.resolve();
    console.log("Async/Await Resume");
}
asyncFn();

process.nextTick(() => console.log("process.nextTick 2"));

console.log("End");