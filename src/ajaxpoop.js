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
        return ((m,u,q,d,h,c)=>{
            return new Promise((resolve,rejext)=>{
                let x  = new XMLHttpRequest()
                    ks, qry='';
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

                ks=Object.keys(q).filter((j)=>{return q.hasOwnProperty(j);});
                if(ks.length>0){
                    qry+='?';
                    ks.foreach((k)=>{
                        qry+=k+'='+uriEncodeComponent(q[k]);
                    });
                }
                ks=Object.keys(h).filter((j)=>{return q.hasOwnProperty(j);});
                ks.foreach((k)=>{
                    x.setRequestHeader(k,h[k]);
                });
                if(c) x.withCredentials=c;

                x.open(m.toUpperCase(),u+q,true);
                if(d) x.send(d); else x.send();
            });
        })(this.m, this.u, this.q, d, this.h, this.c);
    }
}

export default poop {
    get:(u)=>{
        return new req('GET',u);
    },
    put:(u)=>{
        return new req('PUT',u).header('Content-Type','application/json');
    },
    post:(u)=>{
        return new req('POST',u).header('Content-Type','application/json');
    },
    delete:(u)=>{
        return new req('DELETE',u);
    }
};
