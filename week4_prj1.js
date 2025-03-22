const express= require('express');
const app= epress();
const port= 3000;
app.get('/',(req,res) => {
    let form = req.body();
    res.send("HELLO WORLD");
});
app.get('/post', (req,res)=>{
    let form = req.body;
    res.send(`The form is ${JSON.Stringify(form)}`);
})
app.listen(port, () => {
    console.log("Server running");
});