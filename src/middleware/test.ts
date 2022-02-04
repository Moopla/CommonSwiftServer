export function logger (req : any, res : any, next : any){
    console.log('logging');
    next();
}