//every time we poop(), we shit out a new request object
class Req{
    constructor(u){
        this.url = u;
        this.heads = {};
        this.cred = false;
        this.hacks = {};
        this.fucked = undefined;
    }
    getlike(m){
        //return a promise for getting
        return this.r(m);
    }
    get() {return this.getlike('GET');}
    head() {return this.getlike('HEAD');}
    trace() {return this.getlike('TRACE');}
    options() {return this.getlike('OPTIONS');}
    delete() {return this.getlike('DELETE');}
    putlike(m,d){
        //if you don't say so it's json. why would you send anything else like seriously
        //unless you're chrome and can't figure out boundaries
        if(!this.heads['Content-Type'] && !this.hacks['no-content-type']) this.heads['Content-Type']='application/json';
        return this.r(m,d); // return a promise
    }
    put(d) {return this.putlike('PUT', d);}
    post(d) {return this.putlike('POST', d);}
    patch(d) {return this.putlike('PATCH', d);}
    header(k,v){
        this.heads[k]=v; //add to the header map
        return this; //return itself for chaining
    }
    withCred(c){
        this.cred=c; //with cors credentials
        return this; //chain the poop
    }
    errorOn(s){
        this.fucked=s;
        return this;
    }
    //make a promise that does the pooping magic
    r(method, data){
        return new Promise((resolve,rejext)=>{
            let x  = new XMLHttpRequest();
            x.open(method,this.url,true);

            //only care when we're done the other events can suck it
            x.onreadystatechange=((e)=>{
                switch(x.readyState){
                    case 4:
                        //return the entire xhr object because the extra work of xhr.response is so worth
                        //being able to also do xhr.status xhr.getResponseHeader xhr.fuckyourface
                        if(!!this.fucked && !!this.fucked(x)) {
                            let e=new Error('ajaxpoop error '+x.status);
                            e.xhr=x; e.status=x.status;
                            rejext(e);
                        }else resolve(x);
                }
            });
            //welp timed out
            x.ontimeout = ((e)=>{rejext('timed out');});
            //half the reason i did this is because these micro frameworks don't let me set or see headers easily
            Object.getOwnPropertyNames(this.heads).forEach((k)=>{
                x.setRequestHeader(k,this.heads[k]);
            });
            x.withCredentials=this.cred;
            if(data && this.heads['Content-Type']=='application/json') x.send(JSON.stringify(data)); else x.send(data);
        });
    }
}

//this file is ass because poop comes out
export default function poop(u){
    return new Req(u)
}
