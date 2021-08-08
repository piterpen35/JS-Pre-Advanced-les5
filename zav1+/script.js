function counter(){
    let sum = 0;
    return function inner(step){
    sum = sum+step;
    console.log('sum = ', sum);
}
}
let fn = counter();
fn(3);
fn(5);
fn(228);