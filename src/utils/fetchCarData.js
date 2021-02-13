// //  makes.forEach((d) => {
// //    const id = d.name.toLowerCase().split(' ').join('-')
// //   firestore.collection('CarBrands').doc(id).set({id, name: d.name});
// // });

// // for (let i = 0; i < 2; i++) {
// //   const m = toCapitalize(makes[i].label);

// //   models.push(
// //     new Promise(async (resolve, reject) => {
// //       const data = {
// //         make: m,
// //         values: await fetch(
// //           `https://cors-anywhere.herokuapp.com/https://edge.allegro.pl/data-provider/matching-item/CAR/attributes/MODEL_PRODUCTION?BRAND=${m}`,
// //           {
// //             headers: {
// //               'Access-Control-Allow-Origin': '*',
// //               accept: 'application/vnd.allegro.public.v1+json',
// //               Host: 'www.cars-data.com'
// //             }
// //           }
// //         )
// //           .then((r) => r.json())
// //           .then((r) => r.values)
// //       };
// //       resolve(data);
// //     })
// //   );

// //   Promise.all(models).then((s) => {
// //     const data = s.reduce((obj, acc) => ({
// //       ...obj,
// //       [acc.make]: [...acc.values.map((a) => a.value.split(' (')[0])]
// //     }), {});

// //     console.error(data);

// //     // s.forEach((res) => {
// //     //   console.error(res);
// //     // });
// //   });

// // Promise.all(models).then((s) => {

// //     console.error(res);

// // });
// for (let i = 0; i < makes.length; i++) {
//     const m = makes[i].name.toLowerCase().split(' ').join('-');

//     models.push(
//       new Promise(async (resolve, reject) => {
//         const data = await fetch(
//           `https://cors-anywhere.herokuapp.com/https://www.cars-data.com/ajax_files/get_groups.php?url=${m}`,
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               accept: '*/*',
//               Host: 'www.cars-data.com'
//             }
//           }
//         )
//           .then((res) => res.text())
//           .then((res) => {
//             const name = makes[i].name;
//             let arr = res.split('</option>');
//             arr.shift();
//             arr.pop();

//             const result = {
//               name,
//               values: [
//                 ...arr.map((el) => {
//                   let str = el.split('value="')[1].split('">')[0].split('|');
//                   return { model: toCapitalize(str[0]), type: str[1] };
//                 })
//               ]
//             };

//             return result;
//           })
//           .then((res) => {
//             console.error(res);
//             // const arr = res.reduce((obj, newObj) => {
//             //   console.error(newObj);
//             //   console.error(typeof newObj);
//             //   return { ...obj, [key]: newObj };
//             // }, {});

//             // console.error(res);
//             // console.error(typeof res);
//             // console.error(arr);
//             resolve(res);
//           });
//       })
//     );
//   }

//   Promise.all(models).then((data) => {
//     console.error('count', data.length);
//     const arr = data.reduce((obj, newObj) => {
//       // console.error(newObj);
//       // console.error(typeof newObj);
//       return { ...obj, [newObj.name]: newObj.values };
//     }, {});

//     Object.entries(arr).forEach(([name, value]) => {
//       const id = name.toLowerCase().split(' ').join('-');
//       firestore.collection('CarBrands').doc(id).set({ models: value});
//     });
//   });
