//make a promise that does the pooping magic
function r(m,u,d,h,c){
    return new Promise((resolve,rejext)=>{
        let x  = new XMLHttpRequest();
        x.open(m.toUpperCase(),u,true);
        
        //only care when we're done the rest of these can suck it
        x.onreadystatechange=((e)=>{
            switch(x.readyState){
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                case 4:
                    resolve(x);
            }
        });
        //fffffffffuck
        x.ontimeout = ((e)=>{
            reject('timed out');
        });

        //half the reason i did this is because these micro frameworks don't let me set headers
        let ks=Object.keys(h).filter((j)=>{return h.hasOwnProperty(j);});
        ks.map((k)=>{
            x.setRequestHeader(k,h[k]);
        });
        if(c) x.withCredentials=c;

        if(d) x.send(d); else x.send();
    });
}

//every time we poop(), we shit out a new requiest object
class req{
    constructor(u){
        this.u = u;
        this.h = {};
        this.c = false;
    }
    header(k,v){
        this.h.k=v; //add the (turtle)header map
        return this; //return itself for chaining
    }
    withCredentials(c){
        this.c=c; //with cors credentials
        return this; //chain the poop
    }
    get(){
        //return a promise
        return r('GET', this.u,  undefined, this.h, this.c);
    }
    put(d){
        //if you don't say so it's json. why would you send anything else seriously
        if(!this.h['Content-Type']) this.h['Content-Type']='application/json';
        return r('PUT', this.u, d, this.h, this.c); // return a promise
    }
    post(d){
        if(!this.h['Content-Type']) this.h['Content-Type']='application/json';
        return r('POST', this.u, d, this.h, this.c); //return a promise
    }
    delete(){
        return r('DELETE', this.u, undefined, this.h, this.c); //promise drill
    }
    flush(){
        return delete();
    }
}

//this file is an ass because its default function is to poop
export default function poop(u){
    return new req(u)
}
