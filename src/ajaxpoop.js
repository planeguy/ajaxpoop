//make a promise that does the pooping magic
function r(m,u,d,h,c){
    return new Promise((resolve,rejext)=>{
        let x  = new XMLHttpRequest();
        x.open(m,u,true);

        //only care when we're done the rest of these can suck it
        x.onreadystatechange=((e)=>{
            switch(x.readyState){
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                case 4:
                    //return the entire xhr object because having to do xhr.response is so worth
                    //being able to also do xhr.status xhr.getResponseHeader xhr.fuckyourface
                    resolve(x);
            }
        });
        //welp
        x.ontimeout = ((e)=>{
            rejext('timed out');
        });
        //half the reason i did this is because these micro frameworks don't let me set headers
        let ks=Object.keys(h).filter((j)=>{return h.hasOwnProperty(j);});
        ks.map((k)=>{
            x.setRequestHeader(k,h[k]);
        });
        if(c) x.withCredentials=c;

        if(d){
            if(h['Content-Type']=='application/json') x.send(JSON.stringify(d));
            else x.send(d);
        } else x.send();
    });
}

//every time we poop(), we shit out a new request object
class req{
    constructor(u){
        this.u = u;
        this.h = {};
        this.c = false;
        this.p = {};
    }
    header(k,v){
        this.h[k]=v; //add to the (turtle)header map
        return this; //return itself for chaining
    }
    withCredentials(c){
        this.c=c; //with cors credentials
        return this; //chain the poop
    }
    hack(k){
        this.p[k]=true; //a flag of random horseshit fuck you
        return this;
    }
    getlike(m){
        //return a promise for getting
        return r(m, this.u,  undefined, this.h, this.c);
    }
    putlike(m){
        //if you don't say so it's json. why would you send anything else seriously
        //unless you're chrome and can't figure out boundaries
        if(!this.h['Content-Type'] && !this.p['no-content-type']) this.h['Content-Type']='application/json';
        return r(m, this.u, d, this.h, this.c); // return a promise
    }
    get(){
        return this.getlike('GET');
    }
    put(d){
        return this.putlike('PUT');
    }
    post(d){
        return this.putlike('POST');
    }
    patch(d){
        return this.putlike('PATCH');
    }
    head(){
        return this.getlike('HEAD');
    }
    trace(){
        return this.getlike('TRACE');
    }
    options(){
        return this.getlike('OPTIONS');
    }
    delete(){
        return this.getlike('DELETE');
    }
    flush(){
        return this.delete(); //har har
    }
}

//this file is ass because the thing that comes out is poop
export default function poop(u){
    return new req(u)
}
