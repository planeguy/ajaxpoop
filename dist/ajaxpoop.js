function r(m,u,d,h,c){
    return new Promise((resolve,rejext)=>{
        let x  = new XMLHttpRequest();
        x.open(m.toUpperCase(),u,true);
        
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
        x.ontimeout = ((e)=>{
            reject('timed out');
        });


        let ks=Object.keys(h).filter((j)=>{return h.hasOwnProperty(j);});
        ks.map((k)=>{
            x.setRequestHeader(k,h[k]);
        });
        if(c) x.withCredentials=c;

        if(d) x.send(d); else x.send();
    });
}

class req{
    constructor(u){
        this.u = u;
        this.h = {};
        this.c = false;
    }
    header(k,v){
        this.h.k=v;
        return this;
    }
    withCredentials(c){
        this.c=c;
        return this;
    }
    get(){
        return r('GET', this.u,  undefined, this.h, this.c);
    }
    put(d){
        if(!this.h['Content-Type']) this.h['Content-Type']='application/json';
        return r('PUT', this.u, d, this.h, this.c);
    }
    post(d){
        if(!this.h['Content-Type']) this.h['Content-Type']='application/json';
        return r('POST', this.u, d, this.h, this.c);
    }
    delete(){
        return r('DELETE', this.u, undefined, this.h, this.c);
    }
}

export default function poop(u){
    return new req(u)
}
