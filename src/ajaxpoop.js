function r(m,u,d,h,c){
    return new Promise((resolve,rejext)=>{
        let x  = new XMLHttpRequest();
        x.open(m.toUpperCase(),u,true);
        x.onreadystatechange((e)=>{
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
        if(h){
            let ks=Object.keys(h);
            ks.foreach((k)=>{
                x.setRequestHeader(k,h[k]);
            });
        }
        if(c) x.withCredentials=c;
        if(d) x.send(d); else x.send();
    });
}

class req{
    constructor(m,u){
        this.m = m;
        this.u = u;
        this.h = {};
        this.c = false;
        this.q = {}
    }
    header(k,v){
        this.h.k=v;
        return this;
    }
    withCredentials(c){
        this.c=c;
        return this;
    }
    query(k,v){
        q[k]=v;
    }
    send(d){
        return r(this.m,this.u,d,this.h,this.c);
    }
}

class P {
    get(u){
        return new req('GET',u);
    }
    put(u){
        return new req('PUT',u).header('Content-Type','application/json');
    }
    post(u){
        return new req('POST',u).header('Content-Type','application/json');
    }
    delete(u){
        return new req('DELETE',u);
    }
}

export new P();
