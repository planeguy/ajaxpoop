//make a promise that does the pooping magic
function r(m,u,d,h,c,s){
    return new Promise((resolve,rejext)=>{
        let x  = new XMLHttpRequest();
        x.open(m,u,true);

        //only care when we're done the other events can suck it
        x.onreadystatechange=((e)=>{
            switch(x.readyState){
                case 4:
                    //return the entire xhr object because the extra work of xhr.response is so worth
                    //being able to also do xhr.status xhr.getResponseHeader xhr.fuckyourface
                    if(!!s && !!s(x)) {
                        let e=new Error('ajaxpoop error '+x.status);
                        e.xhr=x; e.status=x.status;
                        rejext(e);
                    }else resolve(x);
            }
        });
        //welp timed out
        x.ontimeout = ((e)=>{rejext('timed out');});
        //half the reason i did this is because these micro frameworks don't let me set or see headers easily
        Object.getOwnPropertyNames(h).forEach((k)=>{
            x.setRequestHeader(k,h[k]);
        });
        x.withCredentials=c;
        if(d && h['Content-Type']=='application/json') x.send(JSON.stringify(d)); else x.send(d);
    });
}

//every time we poop(), we shit out a new request object
class Req{
    constructor(u){
        this.u = u;
        this.h = {};
        this.c = false;
        this.p = {};
        this.s = undefined;
    }
    header(k,v){
        this.h[k]=v; //add to the header map
        return this; //return itself for chaining
    }
    withCred(c){
        this.c=c; //with cors credentials
        return this; //chain the poop
    }
    getlike(m){
        //return a promise for getting
        return r(m, this.u,  undefined, this.h, this.c, this.s);
    }
    get() {return this.getlike('GET');}
    head() {return this.getlike('HEAD');}
    trace() {return this.getlike('TRACE');}
    options() {return this.getlike('OPTIONS');}
    delete() {return this.getlike('DELETE');}
    putlike(m,d){
        //if you don't say so it's json. why would you send anything else like seriously
        //unless you're chrome and can't figure out boundaries
        if(!this.h['Content-Type'] && !this.p['no-content-type']) this.h['Content-Type']='application/json';
        return r(m, this.u, d, this.h, this.c, this.s); // return a promise
    }
    put(d) {return this.putlike('PUT', d);}
    post(d) {return this.putlike('POST', d);}
    patch(d) {return this.putlike('PATCH', d);}
    errorOn(s){
        this.s=s;
        return this;
    }
}

//this file is ass because the thing that comes out is poop
export default function poop(u){
    return new Req(u)
}
