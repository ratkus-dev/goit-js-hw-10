import{i as l}from"./assets/error-BVGOX9rY.js";/* empty css                      */import{i as r}from"./assets/vendor-Dov3POoy.js";document.querySelector(".form").addEventListener("submit",t=>{t.preventDefault();const o=parseInt(t.target.delay.value),i=t.target.state.value;new Promise((e,s)=>{setTimeout(()=>{i==="fulfilled"?e(o):s(o)},o)}).then(e=>{r.success({titleColor:"white",position:"topRight",backgroundColor:"green",messageColor:"white",title:"OK",message:`Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({titleColor:"white",position:"topRight",backgroundColor:"red",messageColor:"white",title:"Error",iconUrl:l,message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=2-snackbar.js.map
