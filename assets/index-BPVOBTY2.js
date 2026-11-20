(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ea="174",Ih=0,el=1,Lh=2,Cc=1,Pc=2,Cn=3,xn=0,Ve=1,Ee=2,Qn=0,Yi=1,ji=2,nl=3,il=4,Dh=5,xi=100,Nh=101,Uh=102,Fh=103,Bh=104,Oh=200,kh=201,zh=202,Gh=203,Lo=204,Do=205,Hh=206,Vh=207,Wh=208,Xh=209,qh=210,Yh=211,jh=212,Kh=213,Zh=214,No=0,Uo=1,Fo=2,Ji=3,Bo=4,Oo=5,ko=6,zo=7,Ic=0,$h=1,Jh=2,Dn=0,Qh=1,tu=2,eu=3,nu=4,iu=5,su=6,ru=7,sl="attached",ou="detached",Lc=300,Qi=301,ts=302,Go=303,Ho=304,Br=306,ti=1e3,Zn=1001,Cr=1002,We=1003,Dc=1004,As=1005,Le=1006,Sr=1007,In=1008,_n=1009,Nc=1010,Uc=1011,Ls=1012,wa=1013,ei=1014,un=1015,ls=1016,Aa=1017,Ra=1018,es=1020,Fc=35902,Bc=1021,Oc=1022,Ye=1023,kc=1024,zc=1025,Ki=1026,ns=1027,Ca=1028,Pa=1029,Gc=1030,Ia=1031,La=1033,Tr=33776,br=33777,Er=33778,wr=33779,Vo=35840,Wo=35841,Xo=35842,qo=35843,Yo=36196,jo=37492,Ko=37496,Zo=37808,$o=37809,Jo=37810,Qo=37811,ta=37812,ea=37813,na=37814,ia=37815,sa=37816,ra=37817,oa=37818,aa=37819,la=37820,ca=37821,Ar=36492,ha=36494,ua=36495,Hc=36283,fa=36284,da=36285,pa=36286,au=2200,Vc=2201,lu=2202,Ds=2300,Ns=2301,qr=2302,Wi=2400,Xi=2401,Pr=2402,Da=2500,cu=2501,hu=0,Wc=1,ma=2,uu=3200,fu=3201,Xc=0,du=1,jn="",Me="srgb",Xe="srgb-linear",Ir="linear",ce="srgb",bi=7680,rl=519,pu=512,mu=513,gu=514,qc=515,xu=516,_u=517,yu=518,vu=519,ga=35044,ol="300 es",Ln=2e3,Lr=2001;class Si{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let al=1234567;const Cs=Math.PI/180,is=180/Math.PI;function dn(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[r&255]+Ue[r>>8&255]+Ue[r>>16&255]+Ue[r>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function qt(r,t,e){return Math.max(t,Math.min(e,r))}function Na(r,t){return(r%t+t)%t}function Mu(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function Su(r,t,e){return r!==t?(e-r)/(t-r):0}function Ps(r,t,e){return(1-e)*r+e*t}function Tu(r,t,e,n){return Ps(r,t,1-Math.exp(-e*n))}function bu(r,t=1){return t-Math.abs(Na(r,t*2)-t)}function Eu(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function wu(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function Au(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Ru(r,t){return r+Math.random()*(t-r)}function Cu(r){return r*(.5-Math.random())}function Pu(r){r!==void 0&&(al=r);let t=al+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Iu(r){return r*Cs}function Lu(r){return r*is}function Du(r){return(r&r-1)===0&&r!==0}function Nu(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Uu(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Fu(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),f=o((t-n)/2),d=s((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":r.set(a*h,l*u,l*f,a*c);break;case"YZY":r.set(l*f,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*f,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*d,a*c);break;case"YXY":r.set(l*d,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function hn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function le(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Bu={DEG2RAD:Cs,RAD2DEG:is,generateUUID:dn,clamp:qt,euclideanModulo:Na,mapLinear:Mu,inverseLerp:Su,lerp:Ps,damp:Tu,pingpong:bu,smoothstep:Eu,smootherstep:wu,randInt:Au,randFloat:Ru,randFloatSpread:Cu,seededRandom:Pu,degToRad:Iu,radToDeg:Lu,isPowerOfTwo:Du,ceilPowerOfTwo:Nu,floorPowerOfTwo:Uu,setQuaternionFromProperEuler:Fu,normalize:le,denormalize:hn};class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,i,s,o,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=i[0],m=i[3],p=i[6],y=i[1],v=i[4],_=i[7],A=i[2],E=i[5],w=i[8];return s[0]=o*x+a*y+l*A,s[3]=o*m+a*v+l*E,s[6]=o*p+a*_+l*w,s[1]=c*x+h*y+u*A,s[4]=c*m+h*v+u*E,s[7]=c*p+h*_+u*w,s[2]=f*x+d*y+g*A,s[5]=f*m+d*v+g*E,s[8]=f*p+d*_+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*s,d=c*s-o*l,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=f*x,t[4]=(h*e-i*l)*x,t[5]=(i*s-a*e)*x,t[6]=d*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yr.makeScale(t,e)),this}rotate(t){return this.premultiply(Yr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yr=new Gt;function Yc(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Us(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ou(){const r=Us("canvas");return r.style.display="block",r}const ll={};function pi(r){r in ll||(ll[r]=!0,console.warn(r))}function ku(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function zu(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Gu(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const cl=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hl=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hu(){const r={enabled:!0,workingColorSpace:Xe,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ce&&(i.r=Nn(i.r),i.g=Nn(i.g),i.b=Nn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ce&&(i.r=Zi(i.r),i.g=Zi(i.g),i.b=Zi(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===jn?Ir:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Xe]:{primaries:t,whitePoint:n,transfer:Ir,toXYZ:cl,fromXYZ:hl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Me},outputColorSpaceConfig:{drawingBufferColorSpace:Me}},[Me]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:cl,fromXYZ:hl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Me}}}),r}const Qt=Hu();function Nn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Zi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ei;class Vu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ei===void 0&&(Ei=Us("canvas")),Ei.width=t.width,Ei.height=t.height;const n=Ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ei}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Us("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Nn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Nn(e[n]/255)*255):e[n]=Nn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wu=0;class Ua{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=dn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(jr(i[o].image)):s.push(jr(i[o]))}else s=jr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function jr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Vu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xu=0;class we extends Si{constructor(t=we.DEFAULT_IMAGE,e=we.DEFAULT_MAPPING,n=Zn,i=Zn,s=Le,o=In,a=Ye,l=_n,c=we.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=dn(),this.name="",this.source=new Ua(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ti:t.x=t.x-Math.floor(t.x);break;case Zn:t.x=t.x<0?0:1;break;case Cr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ti:t.y=t.y-Math.floor(t.y);break;case Zn:t.y=t.y<0?0:1;break;case Cr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}we.DEFAULT_IMAGE=null;we.DEFAULT_MAPPING=Lc;we.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,i=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,_=(d+1)/2,A=(p+1)/2,E=(h+f)/4,w=(u+x)/4,C=(g+m)/4;return v>_&&v>A?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=E/n,s=w/n):_>A?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=E/i,s=C/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=w/s,i=C/s),this.set(n,i,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-x)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qu extends Si{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Le,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new we(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ua(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends qu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class jc extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yu extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],x=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==f||c!==d||h!==g){let m=1-a;const p=l*f+c*d+h*g+u*x,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const A=Math.sqrt(v),E=Math.atan2(A,p*y);m=Math.sin(m*E)/A,a=Math.sin(a*E)/A}const _=a*y;if(l=l*m+f*_,c=c*m+d*_,h=h*m+g*_,u=u*m+x*_,m===1-a){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ul.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ul.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Kr.copy(this).projectOnVector(t),this.sub(Kr)}reflect(t){return this.sub(Kr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kr=new D,ul=new pn;class Un{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(s,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hs.copy(n.boundingBox)),Hs.applyMatrix4(t.matrixWorld),this.union(Hs)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),Vs.subVectors(this.max,ms),wi.subVectors(t.a,ms),Ai.subVectors(t.b,ms),Ri.subVectors(t.c,ms),Fn.subVectors(Ai,wi),Bn.subVectors(Ri,Ai),oi.subVectors(wi,Ri);let e=[0,-Fn.z,Fn.y,0,-Bn.z,Bn.y,0,-oi.z,oi.y,Fn.z,0,-Fn.x,Bn.z,0,-Bn.x,oi.z,0,-oi.x,-Fn.y,Fn.x,0,-Bn.y,Bn.x,0,-oi.y,oi.x,0];return!Zr(e,wi,Ai,Ri,Vs)||(e=[1,0,0,0,1,0,0,0,1],!Zr(e,wi,Ai,Ri,Vs))?!1:(Ws.crossVectors(Fn,Bn),e=[Ws.x,Ws.y,Ws.z],Zr(e,wi,Ai,Ri,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Tn=[new D,new D,new D,new D,new D,new D,new D,new D],an=new D,Hs=new Un,wi=new D,Ai=new D,Ri=new D,Fn=new D,Bn=new D,oi=new D,ms=new D,Vs=new D,Ws=new D,ai=new D;function Zr(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ai.fromArray(r,s);const a=i.x*Math.abs(ai.x)+i.y*Math.abs(ai.y)+i.z*Math.abs(ai.z),l=t.dot(ai),c=e.dot(ai),h=n.dot(ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const ju=new Un,gs=new D,$r=new D;class vn{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ju.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(gs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($r.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add($r)),this.expandByPoint(gs.copy(t.center).sub($r))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const bn=new D,Jr=new D,Xs=new D,On=new D,Qr=new D,qs=new D,to=new D;class Or{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bn.copy(this.origin).addScaledVector(this.direction,e),bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Jr.copy(t).add(e).multiplyScalar(.5),Xs.copy(e).sub(t).normalize(),On.copy(this.origin).sub(Jr);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Xs),a=On.dot(this.direction),l=-On.dot(Xs),c=On.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Jr).addScaledVector(Xs,f),d}intersectSphere(t,e){bn.subVectors(t.center,this.origin);const n=bn.dot(this.direction),i=bn.dot(bn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,bn)!==null}intersectTriangle(t,e,n,i,s){Qr.subVectors(e,t),qs.subVectors(n,t),to.crossVectors(Qr,qs);let o=this.direction.dot(to),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;On.subVectors(this.origin,t);const l=a*this.direction.dot(qs.crossVectors(On,qs));if(l<0)return null;const c=a*this.direction.dot(Qr.cross(On));if(c<0||l+c>o)return null;const h=-a*On.dot(to);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt{constructor(t,e,n,i,s,o,a,l,c,h,u,f,d,g,x,m){kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,f,d,g,x,m)}set(t,e,n,i,s,o,a,l,c,h,u,f,d,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ci.setFromMatrixColumn(t,0).length(),s=1/Ci.setFromMatrixColumn(t,1).length(),o=1/Ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-x*c,e[9]=-a*l,e[2]=x-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,x=c*u;e[0]=f+x*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=x+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,x=c*u;e[0]=f-x*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+x,e[1]=l*u,e[5]=x*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-x*u}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+x,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ku,t,Zu)}lookAt(t,e,n){const i=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),kn.crossVectors(n,Ke),kn.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),kn.crossVectors(n,Ke)),kn.normalize(),Ys.crossVectors(Ke,kn),i[0]=kn.x,i[4]=Ys.x,i[8]=Ke.x,i[1]=kn.y,i[5]=Ys.y,i[9]=Ke.y,i[2]=kn.z,i[6]=Ys.z,i[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],y=n[3],v=n[7],_=n[11],A=n[15],E=i[0],w=i[4],C=i[8],T=i[12],M=i[1],P=i[5],z=i[9],k=i[13],q=i[2],K=i[6],Y=i[10],et=i[14],U=i[3],X=i[7],Z=i[11],Q=i[15];return s[0]=o*E+a*M+l*q+c*U,s[4]=o*w+a*P+l*K+c*X,s[8]=o*C+a*z+l*Y+c*Z,s[12]=o*T+a*k+l*et+c*Q,s[1]=h*E+u*M+f*q+d*U,s[5]=h*w+u*P+f*K+d*X,s[9]=h*C+u*z+f*Y+d*Z,s[13]=h*T+u*k+f*et+d*Q,s[2]=g*E+x*M+m*q+p*U,s[6]=g*w+x*P+m*K+p*X,s[10]=g*C+x*z+m*Y+p*Z,s[14]=g*T+x*k+m*et+p*Q,s[3]=y*E+v*M+_*q+A*U,s[7]=y*w+v*P+_*K+A*X,s[11]=y*C+v*z+_*Y+A*Z,s[15]=y*T+v*k+_*et+A*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+s*l*u-i*c*u-s*a*f+n*c*f+i*a*d-n*l*d)+x*(+e*l*d-e*c*f+s*o*f-i*o*d+i*c*h-s*l*h)+m*(+e*c*u-e*a*d-s*o*u+n*o*d+s*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*f+i*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=u*m*c-x*f*c+x*l*d-a*m*d-u*l*p+a*f*p,v=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,_=h*x*c-g*u*c+g*a*d-o*x*d-h*a*p+o*u*p,A=g*u*l-h*x*l-g*a*f+o*x*f+h*a*m-o*u*m,E=e*y+n*v+i*_+s*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/E;return t[0]=y*w,t[1]=(x*f*s-u*m*s-x*i*d+n*m*d+u*i*p-n*f*p)*w,t[2]=(a*m*s-x*l*s+x*i*c-n*m*c-a*i*p+n*l*p)*w,t[3]=(u*l*s-a*f*s-u*i*c+n*f*c+a*i*d-n*l*d)*w,t[4]=v*w,t[5]=(h*m*s-g*f*s+g*i*d-e*m*d-h*i*p+e*f*p)*w,t[6]=(g*l*s-o*m*s-g*i*c+e*m*c+o*i*p-e*l*p)*w,t[7]=(o*f*s-h*l*s+h*i*c-e*f*c-o*i*d+e*l*d)*w,t[8]=_*w,t[9]=(g*u*s-h*x*s-g*n*d+e*x*d+h*n*p-e*u*p)*w,t[10]=(o*x*s-g*a*s+g*n*c-e*x*c-o*n*p+e*a*p)*w,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*d-e*a*d)*w,t[12]=A*w,t[13]=(h*x*i-g*u*i+g*n*f-e*x*f-h*n*m+e*u*m)*w,t[14]=(g*a*i-o*x*i-g*n*l+e*x*l+o*n*m-e*a*m)*w,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*f+e*a*f)*w,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,f=s*c,d=s*h,g=s*u,x=o*h,m=o*u,p=a*u,y=l*c,v=l*h,_=l*u,A=n.x,E=n.y,w=n.z;return i[0]=(1-(x+p))*A,i[1]=(d+_)*A,i[2]=(g-v)*A,i[3]=0,i[4]=(d-_)*E,i[5]=(1-(f+p))*E,i[6]=(m+y)*E,i[7]=0,i[8]=(g+v)*w,i[9]=(m-y)*w,i[10]=(1-(f+x))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ci.set(i[0],i[1],i[2]).length();const o=Ci.set(i[4],i[5],i[6]).length(),a=Ci.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],ln.copy(this);const c=1/s,h=1/o,u=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Ln){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(a===Ln)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Lr)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Ln){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),f=(e+t)*c,d=(n+i)*h;let g,x;if(a===Ln)g=(o+s)*u,x=-2*u;else if(a===Lr)g=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ci=new D,ln=new kt,Ku=new D(0,0,0),Zu=new D(1,1,1),kn=new D,Ys=new D,Ke=new D,fl=new kt,dl=new pn;class yn{constructor(t=0,e=0,n=0,i=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dl.setFromEuler(this),this.setFromQuaternion(dl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class Kc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $u=0;const pl=new D,Pi=new pn,En=new kt,js=new D,xs=new D,Ju=new D,Qu=new pn,ml=new D(1,0,0),gl=new D(0,1,0),xl=new D(0,0,1),_l={type:"added"},tf={type:"removed"},Ii={type:"childadded",child:null},eo={type:"childremoved",child:null};class fe extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fe.DEFAULT_UP.clone();const t=new D,e=new yn,n=new pn,i=new D(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new kt},normalMatrix:{value:new Gt}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(ml,t)}rotateY(t){return this.rotateOnAxis(gl,t)}rotateZ(t){return this.rotateOnAxis(xl,t)}translateOnAxis(t,e){return pl.copy(t).applyQuaternion(this.quaternion),this.position.add(pl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ml,t)}translateY(t){return this.translateOnAxis(gl,t)}translateZ(t){return this.translateOnAxis(xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?js.copy(t):js.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(xs,js,this.up):En.lookAt(js,xs,this.up),this.quaternion.setFromRotationMatrix(En),i&&(En.extractRotation(i.matrixWorld),Pi.setFromRotationMatrix(En),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_l),Ii.child=t,this.dispatchEvent(Ii),Ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(tf),eo.child=t,this.dispatchEvent(eo),eo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_l),Ii.child=t,this.dispatchEvent(Ii),Ii.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,t,Ju),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Qu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}fe.DEFAULT_UP=new D(0,1,0);fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new D,wn=new D,no=new D,An=new D,Li=new D,Di=new D,yl=new D,io=new D,so=new D,ro=new D,oo=new ie,ao=new ie,lo=new ie;class nn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),cn.subVectors(t,e),i.cross(cn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){cn.subVectors(i,e),wn.subVectors(n,e),no.subVectors(t,e);const o=cn.dot(cn),a=cn.dot(wn),l=cn.dot(no),c=wn.dot(wn),h=wn.dot(no),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,An.x),l.addScaledVector(o,An.y),l.addScaledVector(a,An.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return oo.setScalar(0),ao.setScalar(0),lo.setScalar(0),oo.fromBufferAttribute(t,e),ao.fromBufferAttribute(t,n),lo.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(oo,s.x),o.addScaledVector(ao,s.y),o.addScaledVector(lo,s.z),o}static isFrontFacing(t,e,n,i){return cn.subVectors(n,e),wn.subVectors(t,e),cn.cross(wn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),cn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return nn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return nn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return nn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return nn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return nn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Li.subVectors(i,n),Di.subVectors(s,n),io.subVectors(t,n);const l=Li.dot(io),c=Di.dot(io);if(l<=0&&c<=0)return e.copy(n);so.subVectors(t,i);const h=Li.dot(so),u=Di.dot(so);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Li,o);ro.subVectors(t,s);const d=Li.dot(ro),g=Di.dot(ro);if(g>=0&&d<=g)return e.copy(s);const x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Di,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return yl.subVectors(s,i),a=(u-h)/(u-h+(d-g)),e.copy(i).addScaledVector(yl,a);const p=1/(m+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(Li,o).addScaledVector(Di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function co(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class rt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=Na(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=co(o,s,t+1/3),this.g=co(o,s,t),this.b=co(o,s,t-1/3)}return Qt.toWorkingColorSpace(this,i),this}setStyle(t,e=Me){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Me){const n=Zc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}copyLinearToSRGB(t){return this.r=Zi(t.r),this.g=Zi(t.g),this.b=Zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Me){return Qt.fromWorkingColorSpace(Fe.copy(this),t),Math.round(qt(Fe.r*255,0,255))*65536+Math.round(qt(Fe.g*255,0,255))*256+Math.round(qt(Fe.b*255,0,255))}getHexString(t=Me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,i=Fe.g,s=Fe.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Me){Qt.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,i=Fe.b;return t!==Me?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(Ks);const n=Ps(zn.h,Ks.h,e),i=Ps(zn.s,Ks.s,e),s=Ps(zn.l,Ks.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new rt;rt.NAMES=Zc;let ef=0;class mn extends Si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=dn(),this.name="",this.type="Material",this.blending=Yi,this.side=xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lo,this.blendDst=Do,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bi,this.stencilZFail=bi,this.stencilZPass=bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Lo&&(n.blendSrc=this.blendSrc),this.blendDst!==Do&&(n.blendDst=this.blendDst),this.blendEquation!==xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _e extends mn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new D,Zs=new Et;let nf=0;class Oe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ga,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Zs.fromBufferAttribute(this,e),Zs.applyMatrix3(t),this.setXY(e,Zs.x,Zs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ga&&(t.usage=this.usage),t}}class $c extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Jc extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class xe extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let sf=0;const tn=new kt,ho=new fe,Ni=new D,Ze=new Un,_s=new Un,Ce=new D;class De extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Yc(t)?Jc:$c)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Gt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return ho.lookAt(t),ho.updateMatrix(),this.applyMatrix4(ho.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new xe(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ze.setFromBufferAttribute(s),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];_s.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(Ze.min,_s.min),Ze.expandByPoint(Ce),Ce.addVectors(Ze.max,_s.max),Ze.expandByPoint(Ce)):(Ze.expandByPoint(_s.min),Ze.expandByPoint(_s.max))}Ze.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Ce.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ce));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ce.fromBufferAttribute(a,c),l&&(Ni.fromBufferAttribute(t,c),Ce.add(Ni)),i=Math.max(i,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new D,l[C]=new D;const c=new D,h=new D,u=new D,f=new Et,d=new Et,g=new Et,x=new D,m=new D;function p(C,T,M){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,M),f.fromBufferAttribute(s,C),d.fromBufferAttribute(s,T),g.fromBufferAttribute(s,M),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),a[C].add(x),a[T].add(x),a[M].add(x),l[C].add(m),l[T].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,T=y.length;C<T;++C){const M=y[C],P=M.start,z=M.count;for(let k=P,q=P+z;k<q;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const v=new D,_=new D,A=new D,E=new D;function w(C){A.fromBufferAttribute(i,C),E.copy(A);const T=a[C];v.copy(T),v.sub(A.multiplyScalar(A.dot(T))).normalize(),_.crossVectors(E,T);const P=_.dot(l[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,P)}for(let C=0,T=y.length;C<T;++C){const M=y[C],P=M.start,z=M.count;for(let k=P,q=P+z;k<q;k+=3)w(t.getX(k+0)),w(t.getX(k+1)),w(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new D,s=new D,o=new D,a=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Oe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new De,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vl=new kt,li=new Or,$s=new vn,Ml=new D,Js=new D,Qs=new D,tr=new D,uo=new D,er=new D,Sl=new D,nr=new D;class I extends fe{constructor(t=new De,e=new _e){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){er.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(uo.fromBufferAttribute(u,t),o?er.addScaledVector(uo,h):er.addScaledVector(uo.sub(e),h))}e.add(er)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(s),li.copy(t.ray).recast(t.near),!($s.containsPoint(li.origin)===!1&&(li.intersectSphere($s,Ml)===null||li.origin.distanceToSquared(Ml)>(t.far-t.near)**2))&&(vl.copy(s).invert(),li.copy(t.ray).applyMatrix4(vl),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=y,A=v;_<A;_+=3){const E=a.getX(_),w=a.getX(_+1),C=a.getX(_+2);i=ir(this,p,t,n,c,h,u,E,w,C),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const y=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);i=ir(this,o,t,n,c,h,u,y,v,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=y,A=v;_<A;_+=3){const E=_,w=_+1,C=_+2;i=ir(this,p,t,n,c,h,u,E,w,C),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const y=m,v=m+1,_=m+2;i=ir(this,o,t,n,c,h,u,y,v,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function rf(r,t,e,n,i,s,o,a){let l;if(t.side===Ve?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===xn,a),l===null)return null;nr.copy(a),nr.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(nr);return c<e.near||c>e.far?null:{distance:c,point:nr.clone(),object:r}}function ir(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Js),r.getVertexPosition(l,Qs),r.getVertexPosition(c,tr);const h=rf(r,t,e,n,Js,Qs,tr,Sl);if(h){const u=new D;nn.getBarycoord(Sl,Js,Qs,tr,u),i&&(h.uv=nn.getInterpolatedAttribute(i,a,l,c,u,new Et)),s&&(h.uv1=nn.getInterpolatedAttribute(s,a,l,c,u,new Et)),o&&(h.normal=nn.getInterpolatedAttribute(o,a,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new D,materialIndex:0};nn.getNormal(Js,Qs,tr,f.normal),h.face=f,h.barycoord=u}return h}class J extends De{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new xe(c,3)),this.setAttribute("normal",new xe(h,3)),this.setAttribute("uv",new xe(u,2));function g(x,m,p,y,v,_,A,E,w,C,T){const M=_/w,P=A/C,z=_/2,k=A/2,q=E/2,K=w+1,Y=C+1;let et=0,U=0;const X=new D;for(let Z=0;Z<Y;Z++){const Q=Z*P-k;for(let ct=0;ct<K;ct++){const pt=ct*M-z;X[x]=pt*y,X[m]=Q*v,X[p]=q,c.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=E>0?1:-1,h.push(X.x,X.y,X.z),u.push(ct/w),u.push(1-Z/C),et+=1}}for(let Z=0;Z<C;Z++)for(let Q=0;Q<w;Q++){const ct=f+Q+K*Z,pt=f+Q+K*(Z+1),W=f+(Q+1)+K*(Z+1),ot=f+(Q+1)+K*Z;l.push(ct,pt,ot),l.push(pt,W,ot),U+=6}a.addGroup(d,U,T),d+=U,f+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new J(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ss(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ge(r){const t={};for(let e=0;e<r.length;e++){const n=ss(r[e]);for(const i in n)t[i]=n[i]}return t}function of(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Qc(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const af={clone:ss,merge:Ge};var lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sn extends mn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lf,this.fragmentShader=cf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=of(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class th extends fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=Ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new D,Tl=new Et,bl=new Et;class He extends th{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z)}getViewSize(t,e){return this.getViewBounds(t,Tl,bl),e.subVectors(bl,Tl)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Cs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Fi=1;class hf extends fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new He(Ui,Fi,t,e);i.layers=this.layers,this.add(i);const s=new He(Ui,Fi,t,e);s.layers=this.layers,this.add(s);const o=new He(Ui,Fi,t,e);o.layers=this.layers,this.add(o);const a=new He(Ui,Fi,t,e);a.layers=this.layers,this.add(a);const l=new He(Ui,Fi,t,e);l.layers=this.layers,this.add(l);const c=new He(Ui,Fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class eh extends we{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Qi,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class uf extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new eh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Le}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new J(5,5,5),s=new sn({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Qn});s.uniforms.tEquirect.value=e;const o=new I(i,s),a=e.minFilter;return e.minFilter===In&&(e.minFilter=Le),new hf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}class Wt extends fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ff={type:"move"};class fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ff)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Wt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Fa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new rt(t),this.density=e}clone(){return new Fa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ba extends fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class nh{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ga,this.updateRanges=[],this.version=0,this.uuid=dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ze=new D;class Fs{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=hn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=hn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=hn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=hn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Fs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ih extends mn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Bi;const ys=new D,Oi=new D,ki=new D,zi=new Et,vs=new Et,sh=new kt,sr=new D,Ms=new D,rr=new D,El=new Et,po=new Et,wl=new Et;class df extends fe{constructor(t=new ih){if(super(),this.isSprite=!0,this.type="Sprite",Bi===void 0){Bi=new De;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new nh(e,5);Bi.setIndex([0,1,2,0,2,3]),Bi.setAttribute("position",new Fs(n,3,0,!1)),Bi.setAttribute("uv",new Fs(n,2,3,!1))}this.geometry=Bi,this.material=t,this.center=new Et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Oi.setFromMatrixScale(this.matrixWorld),sh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ki.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Oi.multiplyScalar(-ki.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;or(sr.set(-.5,-.5,0),ki,o,Oi,i,s),or(Ms.set(.5,-.5,0),ki,o,Oi,i,s),or(rr.set(.5,.5,0),ki,o,Oi,i,s),El.set(0,0),po.set(1,0),wl.set(1,1);let a=t.ray.intersectTriangle(sr,Ms,rr,!1,ys);if(a===null&&(or(Ms.set(-.5,.5,0),ki,o,Oi,i,s),po.set(0,1),a=t.ray.intersectTriangle(sr,rr,Ms,!1,ys),a===null))return;const l=t.ray.origin.distanceTo(ys);l<t.near||l>t.far||e.push({distance:l,point:ys.clone(),uv:nn.getInterpolation(ys,sr,Ms,rr,El,po,wl,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function or(r,t,e,n,i,s){zi.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(vs.x=s*zi.x-i*zi.y,vs.y=i*zi.x+s*zi.y):vs.copy(zi),r.copy(t),r.x+=vs.x,r.y+=vs.y,r.applyMatrix4(sh)}const Al=new D,Rl=new ie,Cl=new ie,pf=new D,Pl=new kt,ar=new D,mo=new vn,Il=new kt,go=new Or;class mf extends I{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sl,this.bindMatrix=new kt,this.bindMatrixInverse=new kt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Un),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ar),this.boundingBox.expandByPoint(ar)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ar),this.boundingSphere.expandByPoint(ar)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mo.copy(this.boundingSphere),mo.applyMatrix4(i),t.ray.intersectsSphere(mo)!==!1&&(Il.copy(i).invert(),go.copy(t.ray).applyMatrix4(Il),!(this.boundingBox!==null&&go.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,go)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ie,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===sl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ou?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;Rl.fromBufferAttribute(i.attributes.skinIndex,t),Cl.fromBufferAttribute(i.attributes.skinWeight,t),Al.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=Cl.getComponent(s);if(o!==0){const a=Rl.getComponent(s);Pl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(pf.copy(Al).applyMatrix4(Pl),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class rh extends fe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class oh extends we{constructor(t=null,e=1,n=1,i,s,o,a,l,c=We,h=We,u,f){super(null,o,a,l,c,h,i,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ll=new kt,gf=new kt;class Oa{constructor(t=[],e=[]){this.uuid=dn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new kt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new kt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=t.length;s<o;s++){const a=t[s]?t[s].matrixWorld:gf;Ll.multiplyMatrices(a,e[s]),Ll.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Oa(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new oh(e,t,t,Ye,un);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let o=e[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new rh),this.bones.push(o),this.boneInverses.push(new kt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class xa extends Oe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Gi=new kt,Dl=new kt,lr=[],Nl=new Un,xf=new kt,Ss=new I,Ts=new vn;class _f extends I{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new xa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,xf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Un),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),Nl.copy(t.boundingBox).applyMatrix4(Gi),this.boundingBox.union(Nl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),Ts.copy(t.boundingSphere).applyMatrix4(Gi),this.boundingSphere.union(Ts)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ts.copy(this.boundingSphere),Ts.applyMatrix4(n),t.ray.intersectsSphere(Ts)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Gi),Dl.multiplyMatrices(n,Gi),Ss.matrixWorld=Dl,Ss.raycast(t,lr);for(let o=0,a=lr.length;o<a;o++){const l=lr[o];l.instanceId=s,l.object=this,e.push(l)}lr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new xa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new oh(new Float32Array(i*this.count),i,this.count,Ca,un));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const xo=new D,yf=new D,vf=new Gt;class mi{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=xo.subVectors(n,e).cross(yf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(xo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||vf.getNormalMatrix(t),i=this.coplanarPoint(xo).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new vn,cr=new D;class ka{constructor(t=new mi,e=new mi,n=new mi,i=new mi,s=new mi,o=new mi){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],g=i[9],x=i[10],m=i[11],p=i[12],y=i[13],v=i[14],_=i[15];if(n[0].setComponents(l-s,f-c,m-d,_-p).normalize(),n[1].setComponents(l+s,f+c,m+d,_+p).normalize(),n[2].setComponents(l+o,f+h,m+g,_+y).normalize(),n[3].setComponents(l-o,f-h,m-g,_-y).normalize(),n[4].setComponents(l-a,f-u,m-x,_-v).normalize(),e===Ln)n[5].setComponents(l+a,f+u,m+x,_+v).normalize();else if(e===Lr)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(cr.x=i.normal.x>0?t.max.x:t.min.x,cr.y=i.normal.y>0?t.max.y:t.min.y,cr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ah extends mn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Dr=new D,Nr=new D,Ul=new kt,bs=new Or,hr=new vn,_o=new D,Fl=new D;class za extends fe{constructor(t=new De,e=new ah){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)Dr.fromBufferAttribute(e,i-1),Nr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Dr.distanceTo(Nr);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(i),hr.radius+=s,t.ray.intersectsSphere(hr)===!1)return;Ul.copy(i).invert(),bs.copy(t.ray).applyMatrix4(Ul);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=c){const p=h.getX(x),y=h.getX(x+1),v=ur(this,t,bs,l,p,y,x);v&&e.push(v)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(d),p=ur(this,t,bs,l,x,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=c){const p=ur(this,t,bs,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=ur(this,t,bs,l,g-1,d,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ur(r,t,e,n,i,s,o){const a=r.geometry.attributes.position;if(Dr.fromBufferAttribute(a,i),Nr.fromBufferAttribute(a,s),e.distanceSqToSegment(Dr,Nr,_o,Fl)>n)return;_o.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(_o);if(!(c<t.near||c>t.far))return{distance:c,point:Fl.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Bl=new D,Ol=new D;class Mf extends za{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Bl.fromBufferAttribute(e,i),Ol.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Bl.distanceTo(Ol);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Sf extends za{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Ga extends mn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const kl=new kt,_a=new Or,fr=new vn,dr=new D;class lh extends fe{constructor(t=new De,e=new Ga){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(i),fr.radius+=s,t.ray.intersectsSphere(fr)===!1)return;kl.copy(i).invert(),_a.copy(t.ray).applyMatrix4(kl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,x=d;g<x;g++){const m=c.getX(g);dr.fromBufferAttribute(u,m),zl(dr,m,l,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,x=d;g<x;g++)dr.fromBufferAttribute(u,g),zl(dr,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function zl(r,t,e,n,i,s,o){const a=_a.distanceSqToPoint(r);if(a<e){const l=new D;_a.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ni extends we{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ha extends we{constructor(t,e,n,i,s,o,a,l,c,h=Ki){if(h!==Ki&&h!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ki&&(n=ei),n===void 0&&h===ns&&(n=es),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:We,this.minFilter=l!==void 0?l:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ua(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class yi extends De{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new D,h=new Et;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new xe(o,3)),this.setAttribute("normal",new xe(a,3)),this.setAttribute("uv",new xe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Pe extends De{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],f=[],d=[];let g=0;const x=[],m=n/2;let p=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new xe(u,3)),this.setAttribute("normal",new xe(f,3)),this.setAttribute("uv",new xe(d,2));function y(){const _=new D,A=new D;let E=0;const w=(e-t)/n;for(let C=0;C<=s;C++){const T=[],M=C/s,P=M*(e-t)+t;for(let z=0;z<=i;z++){const k=z/i,q=k*l+a,K=Math.sin(q),Y=Math.cos(q);A.x=P*K,A.y=-M*n+m,A.z=P*Y,u.push(A.x,A.y,A.z),_.set(K,w,Y).normalize(),f.push(_.x,_.y,_.z),d.push(k,1-M),T.push(g++)}x.push(T)}for(let C=0;C<i;C++)for(let T=0;T<s;T++){const M=x[T][C],P=x[T+1][C],z=x[T+1][C+1],k=x[T][C+1];(t>0||T!==0)&&(h.push(M,P,k),E+=3),(e>0||T!==s-1)&&(h.push(P,z,k),E+=3)}c.addGroup(p,E,0),p+=E}function v(_){const A=g,E=new Et,w=new D;let C=0;const T=_===!0?t:e,M=_===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;const P=g;for(let z=0;z<=i;z++){const q=z/i*l+a,K=Math.cos(q),Y=Math.sin(q);w.x=T*Y,w.y=m*M,w.z=T*K,u.push(w.x,w.y,w.z),f.push(0,M,0),E.x=K*.5+.5,E.y=Y*.5*M+.5,d.push(E.x,E.y),g++}for(let z=0;z<i;z++){const k=A+z,q=P+z;_===!0?h.push(q,q+1,k):h.push(q+1,q,k),C+=3}c.addGroup(p,C,_===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class kr extends Pe{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new kr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _t extends De{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const y=p*f-o;for(let v=0;v<c;v++){const _=v*u-s;g.push(_,-y,0),x.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const v=y+c*p,_=y+c*(p+1),A=y+1+c*(p+1),E=y+1+c*p;d.push(v,_,E),d.push(_,A,E)}this.setIndex(d),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(x,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _t(t.width,t.height,t.widthSegments,t.heightSegments)}}class Va extends De{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,d=new D,g=new Et;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){const p=s+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let x=0;x<i;x++){const m=x*(n+1);for(let p=0;p<n;p++){const y=p+m,v=y,_=y+n+1,A=y+n+2,E=y+1;a.push(v,_,E),a.push(_,A,E)}}this.setIndex(a),this.setAttribute("position",new xe(l,3)),this.setAttribute("normal",new xe(c,3)),this.setAttribute("uv",new xe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Va(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Kn extends De{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new D,f=new D,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const y=[],v=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let A=0;A<=e;A++){const E=A/e;u.x=-t*Math.cos(i+E*s)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(i+E*s)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(E+_,1-v),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const v=h[p][y+1],_=h[p][y],A=h[p+1][y],E=h[p+1][y+1];(p!==0||o>0)&&d.push(v,_,E),(p!==n-1||l<Math.PI)&&d.push(_,A,E)}this.setIndex(d),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(x,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ur extends De{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new D,u=new D,f=new D;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const x=g/i*s,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const x=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,y=(i+1)*d+g;o.push(x,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new xe(a,3)),this.setAttribute("normal",new xe(l,3)),this.setAttribute("uv",new xe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class $ extends mn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xc,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class be extends ${constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new rt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new rt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new rt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Tf extends mn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bf extends mn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function pr(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Ef(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function wf(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Gl(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let l=0;l!==t;++l)i[o++]=r[a+l]}return i}function ch(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=r[i++];while(s!==void 0)}class ks{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Af extends ks{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wi,endingEnd:Wi}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xi:s=t,a=2*e-n;break;case Pr:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Xi:o=t,l=2*n-e;break;case Pr:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(i-e),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,y=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,v=(-1-d)*m+(1.5+d)*x+.5*g,_=d*m-d*x;for(let A=0;A!==a;++A)s[A]=p*o[h+A]+y*o[c+A]+v*o[l+A]+_*o[u+A];return s}}class hh extends ks{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==a;++f)s[f]=o[c+f]*u+o[l+f]*h;return s}}class Rf extends ks{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Mn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=pr(e,this.TimeBufferType),this.values=pr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:pr(t.times,Array),values:pr(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Rf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new hh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Af(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ds:e=this.InterpolantFactoryMethodDiscrete;break;case Ns:e=this.InterpolantFactoryMethodLinear;break;case qr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ds;case this.InterpolantFactoryMethodLinear:return Ns;case this.InterpolantFactoryMethodSmooth:return qr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Ef(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qr,s=t.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{const u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){const x=e[u+g];if(x!==e[f+g]||x!==e[d+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];const u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=Ns;class cs extends Mn{constructor(t,e,n){super(t,e,n)}}cs.prototype.ValueTypeName="bool";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=Ds;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;class uh extends Mn{}uh.prototype.ValueTypeName="color";class rs extends Mn{}rs.prototype.ValueTypeName="number";class Cf extends ks{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e);let c=t*a;for(let h=c+a;c!==h;c+=4)pn.slerpFlat(s,0,o,c-a,o,c,l);return s}}class os extends Mn{InterpolantFactoryMethodLinear(t){return new Cf(this.times,this.values,this.getValueSize(),t)}}os.prototype.ValueTypeName="quaternion";os.prototype.InterpolantFactoryMethodSmooth=void 0;class hs extends Mn{constructor(t,e,n){super(t,e,n)}}hs.prototype.ValueTypeName="string";hs.prototype.ValueBufferType=Array;hs.prototype.DefaultInterpolation=Ds;hs.prototype.InterpolantFactoryMethodLinear=void 0;hs.prototype.InterpolantFactoryMethodSmooth=void 0;class as extends Mn{}as.prototype.ValueTypeName="vector";class Fr{constructor(t="",e=-1,n=[],i=Da){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=dn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(If(n[o]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(Mn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=wf(l);l=Gl(l,1,h),c=Gl(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new rs(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let f=i[u];f||(i[u]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,f,d,g,x){if(d.length!==0){const m=[],p=[];ch(d,m,p,g),m.length!==0&&x.push(new u(f,m,p))}},i=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const f=c[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)d[f[g].morphTargets[x]]=-1;for(const x in d){const m=[],p=[];for(let y=0;y!==f[g].morphTargets.length;++y){const v=f[g];m.push(v.time),p.push(v.morphTarget===x?1:0)}i.push(new rs(".morphTargetInfluence["+x+"]",m,p))}l=d.length*o}else{const d=".bones["+e[u].name+"]";n(as,d+".position",f,"pos",i),n(os,d+".quaternion",f,"rot",i),n(as,d+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Pf(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return rs;case"vector":case"vector2":case"vector3":case"vector4":return as;case"color":return uh;case"quaternion":return os;case"bool":case"boolean":return cs;case"string":return hs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function If(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Pf(r.type);if(r.times===void 0){const e=[],n=[];ch(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const $n={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Lf{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}}const Df=new Lf;class us{constructor(t){this.manager=t!==void 0?t:Df,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}us.DEFAULT_MATERIAL_NAME="__DEFAULT";const Rn={};class Nf extends Error{constructor(t,e){super(t),this.response=e}}class fh extends us{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=$n.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Rn[t]!==void 0){Rn[t].push({onLoad:e,onProgress:n,onError:i});return}Rn[t]=[],Rn[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Rn[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let x=0;const m=new ReadableStream({start(p){y();function y(){u.read().then(({done:v,value:_})=>{if(v)p.close();else{x+=_.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:d});for(let E=0,w=h.length;E<w;E++){const C=h[E];C.onProgress&&C.onProgress(A)}p.enqueue(_),y()}},v=>{p.error(v)})}}});return new Response(m)}else throw new Nf(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{$n.add(t,c);const h=Rn[t];delete Rn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{const h=Rn[t];if(h===void 0)throw this.manager.itemError(t),c;delete Rn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Uf extends us{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=$n.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=Us("img");function l(){h(),$n.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class Ff extends us{constructor(t){super(t)}load(t,e,n,i){const s=new we,o=new Uf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class zr extends fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Bf extends zr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new rt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const yo=new kt,Hl=new D,Vl=new D;class Wa{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ka,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Hl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hl),Vl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vl),e.updateMatrixWorld(),yo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Of extends Wa{constructor(){super(new He(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=is*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Gr extends zr{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.target=new fe,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Of}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Wl=new kt,Es=new D,vo=new D;class kf extends Wa{constructor(){super(new He(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Es.setFromMatrixPosition(t.matrixWorld),n.position.copy(Es),vo.copy(n.position),vo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(vo),n.updateMatrixWorld(),i.makeTranslation(-Es.x,-Es.y,-Es.z),Wl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl)}}class vi extends zr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new kf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Hr extends th{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class zf extends Wa{constructor(){super(new Hr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gf extends zr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.target=new fe,this.shadow=new zf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Is{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Hf extends us{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=$n.get(t);if(o!==void 0){if(s.manager.itemStart(t),o.then){o.then(c=>{e&&e(c),s.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return $n.add(t,c),e&&e(c),s.manager.itemEnd(t),c}).catch(function(c){i&&i(c),$n.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});$n.add(t,l),s.manager.itemStart(t)}}class Vf extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class Wf{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,o;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-s,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,o=i;s!==o;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){pn.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const o=this._workIndex*s;pn.multiplyQuaternionsFlat(t,o,t,e,t,n),pn.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=e+a;t[l]=t[l]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,s){for(let o=0;o!==s;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const Xa="\\[\\]\\.:\\/",Xf=new RegExp("["+Xa+"]","g"),qa="[^"+Xa+"]",qf="[^"+Xa.replace("\\.","")+"]",Yf=/((?:WC+[\/:])*)/.source.replace("WC",qa),jf=/(WCOD+)?/.source.replace("WCOD",qf),Kf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qa),Zf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qa),$f=new RegExp("^"+Yf+jf+Kf+Zf+"$"),Jf=["material","materials","bones","map"];class Qf{constructor(t,e,n){const i=n||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class oe{constructor(t,e,n){this.path=e,this.parsedPath=n||oe.parseTrackName(e),this.node=oe.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new oe.Composite(t,e,n):new oe(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Xf,"")}static parseTrackName(t){const e=$f.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Jf.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=oe.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[i];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}oe.Composite=Qf;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class td{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,o=s.length,a=new Array(o),l={endingStart:Wi,endingEnd:Wi};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Vc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,o=s/i,a=i/s;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const l=(t-s)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case cu:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Da:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const o=n===lu;if(t===0)return s===-1?i:o&&(s&1)===1?e-i:i;if(n===au){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=Xi,i.endingEnd=Xi):(t?i.endingStart=this.zeroSlopeAtStart?Xi:Wi:i.endingStart=Pr,e?i.endingEnd=this.zeroSlopeAtEnd?Xi:Wi:i.endingEnd=Pr)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=e,a[1]=s+t,l[1]=n,this}}const ed=new Float32Array(1);class nd extends Si{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const f=i[u],d=f.name;let g=h[d];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,d));continue}const x=e&&e._propertyBindings[u].binding.parsedPath;g=new Wf(oe.create(n,d,x),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,d),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let o=s[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,f=(t._localRoot||this._root).uuid;delete u[f],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new hh(new Float32Array(2),new Float32Array(2),1,ed),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let o=typeof t=="string"?Fr.findByName(i,t):t;const a=o!==null?o.uuid:t,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Da),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new td(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?Fr.findByName(n,t):t,o=s?s.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}function Xl(r,t,e,n){const i=id(n);switch(e){case Bc:return r*t;case kc:return r*t;case zc:return r*t*2;case Ca:return r*t/i.components*i.byteLength;case Pa:return r*t/i.components*i.byteLength;case Gc:return r*t*2/i.components*i.byteLength;case Ia:return r*t*2/i.components*i.byteLength;case Oc:return r*t*3/i.components*i.byteLength;case Ye:return r*t*4/i.components*i.byteLength;case La:return r*t*4/i.components*i.byteLength;case Tr:case br:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Er:case wr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Wo:case qo:return Math.max(r,16)*Math.max(t,8)/4;case Vo:case Xo:return Math.max(r,8)*Math.max(t,8)/2;case Yo:case jo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ko:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Zo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case $o:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Jo:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Qo:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case ta:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ea:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case na:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ia:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case sa:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case ra:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case oa:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case aa:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case la:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ca:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Ar:case ha:case ua:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Hc:case fa:return Math.ceil(r/4)*Math.ceil(t/4)*8;case da:case pa:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function id(r){switch(r){case _n:case Nc:return{byteLength:1,components:1};case Ls:case Uc:case ls:return{byteLength:2,components:1};case Aa:case Ra:return{byteLength:2,components:4};case ei:case wa:case un:return{byteLength:4,components:1};case Fc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ea}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ea);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function dh(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function sd(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const x=u[d];r.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var rd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,od=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ad=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ud=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,md=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_d=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Td=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Rd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Pd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Id=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ld=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ud="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Od=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$d=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ep=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,np=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ip=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,op=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ap=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,up=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_p=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ap=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Rp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ip=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Np=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Up=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Op=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Gp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$p=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,im=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,um=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,fm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_m=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Em=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Am=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Im=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Um=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:rd,alphahash_pars_fragment:od,alphamap_fragment:ad,alphamap_pars_fragment:ld,alphatest_fragment:cd,alphatest_pars_fragment:hd,aomap_fragment:ud,aomap_pars_fragment:fd,batching_pars_vertex:dd,batching_vertex:pd,begin_vertex:md,beginnormal_vertex:gd,bsdfs:xd,iridescence_fragment:_d,bumpmap_pars_fragment:yd,clipping_planes_fragment:vd,clipping_planes_pars_fragment:Md,clipping_planes_pars_vertex:Sd,clipping_planes_vertex:Td,color_fragment:bd,color_pars_fragment:Ed,color_pars_vertex:wd,color_vertex:Ad,common:Rd,cube_uv_reflection_fragment:Cd,defaultnormal_vertex:Pd,displacementmap_pars_vertex:Id,displacementmap_vertex:Ld,emissivemap_fragment:Dd,emissivemap_pars_fragment:Nd,colorspace_fragment:Ud,colorspace_pars_fragment:Fd,envmap_fragment:Bd,envmap_common_pars_fragment:Od,envmap_pars_fragment:kd,envmap_pars_vertex:zd,envmap_physical_pars_fragment:$d,envmap_vertex:Gd,fog_vertex:Hd,fog_pars_vertex:Vd,fog_fragment:Wd,fog_pars_fragment:Xd,gradientmap_pars_fragment:qd,lightmap_pars_fragment:Yd,lights_lambert_fragment:jd,lights_lambert_pars_fragment:Kd,lights_pars_begin:Zd,lights_toon_fragment:Jd,lights_toon_pars_fragment:Qd,lights_phong_fragment:tp,lights_phong_pars_fragment:ep,lights_physical_fragment:np,lights_physical_pars_fragment:ip,lights_fragment_begin:sp,lights_fragment_maps:rp,lights_fragment_end:op,logdepthbuf_fragment:ap,logdepthbuf_pars_fragment:lp,logdepthbuf_pars_vertex:cp,logdepthbuf_vertex:hp,map_fragment:up,map_pars_fragment:fp,map_particle_fragment:dp,map_particle_pars_fragment:pp,metalnessmap_fragment:mp,metalnessmap_pars_fragment:gp,morphinstance_vertex:xp,morphcolor_vertex:_p,morphnormal_vertex:yp,morphtarget_pars_vertex:vp,morphtarget_vertex:Mp,normal_fragment_begin:Sp,normal_fragment_maps:Tp,normal_pars_fragment:bp,normal_pars_vertex:Ep,normal_vertex:wp,normalmap_pars_fragment:Ap,clearcoat_normal_fragment_begin:Rp,clearcoat_normal_fragment_maps:Cp,clearcoat_pars_fragment:Pp,iridescence_pars_fragment:Ip,opaque_fragment:Lp,packing:Dp,premultiplied_alpha_fragment:Np,project_vertex:Up,dithering_fragment:Fp,dithering_pars_fragment:Bp,roughnessmap_fragment:Op,roughnessmap_pars_fragment:kp,shadowmap_pars_fragment:zp,shadowmap_pars_vertex:Gp,shadowmap_vertex:Hp,shadowmask_pars_fragment:Vp,skinbase_vertex:Wp,skinning_pars_vertex:Xp,skinning_vertex:qp,skinnormal_vertex:Yp,specularmap_fragment:jp,specularmap_pars_fragment:Kp,tonemapping_fragment:Zp,tonemapping_pars_fragment:$p,transmission_fragment:Jp,transmission_pars_fragment:Qp,uv_pars_fragment:tm,uv_pars_vertex:em,uv_vertex:nm,worldpos_vertex:im,background_vert:sm,background_frag:rm,backgroundCube_vert:om,backgroundCube_frag:am,cube_vert:lm,cube_frag:cm,depth_vert:hm,depth_frag:um,distanceRGBA_vert:fm,distanceRGBA_frag:dm,equirect_vert:pm,equirect_frag:mm,linedashed_vert:gm,linedashed_frag:xm,meshbasic_vert:_m,meshbasic_frag:ym,meshlambert_vert:vm,meshlambert_frag:Mm,meshmatcap_vert:Sm,meshmatcap_frag:Tm,meshnormal_vert:bm,meshnormal_frag:Em,meshphong_vert:wm,meshphong_frag:Am,meshphysical_vert:Rm,meshphysical_frag:Cm,meshtoon_vert:Pm,meshtoon_frag:Im,points_vert:Lm,points_frag:Dm,shadow_vert:Nm,shadow_frag:Um,sprite_vert:Fm,sprite_frag:Bm},ut={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},gn={basic:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new rt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Ge([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Ge([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new rt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Ge([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Ge([ut.points,ut.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Ge([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Ge([ut.common,ut.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Ge([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Ge([ut.sprite,ut.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Ge([ut.common,ut.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Ge([ut.lights,ut.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};gn.physical={uniforms:Ge([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const mr={r:0,b:0,g:0},hi=new yn,Om=new kt;function km(r,t,e,n,i,s,o){const a=new rt(0);let l=s===!0?0:1,c,h,u=null,f=0,d=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?e:t).get(_)),_}function x(v){let _=!1;const A=g(v);A===null?p(a,l):A&&A.isColor&&(p(A,1),_=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(v,_){const A=g(_);A&&(A.isCubeTexture||A.mapping===Br)?(h===void 0&&(h=new I(new J(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:ss(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),hi.copy(_.backgroundRotation),hi.x*=-1,hi.y*=-1,hi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Om.makeRotationFromEuler(hi)),h.material.toneMapped=Qt.getTransfer(A.colorSpace)!==ce,(u!==A||f!==A.version||d!==r.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,d=r.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new I(new _t(2,2),new sn({name:"BackgroundMaterial",uniforms:ss(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(A.colorSpace)!==ce,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=A,f=A.version,d=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,_){v.getRGB(mr,Qc(r)),n.buffers.color.setClear(mr.r,mr.g,mr.b,_,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:x,addToRenderList:m,dispose:y}}function zm(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(M,P,z,k,q){let K=!1;const Y=u(k,z,P);s!==Y&&(s=Y,c(s.object)),K=d(M,k,z,q),K&&g(M,k,z,q),q!==null&&t.update(q,r.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,_(M,P,z,k),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,P,z){const k=z.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let K=q[P.id];K===void 0&&(K={},q[P.id]=K);let Y=K[k];return Y===void 0&&(Y=f(l()),K[k]=Y),Y}function f(M){const P=[],z=[],k=[];for(let q=0;q<e;q++)P[q]=0,z[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:k,object:M,attributes:{},index:null}}function d(M,P,z,k){const q=s.attributes,K=P.attributes;let Y=0;const et=z.getAttributes();for(const U in et)if(et[U].location>=0){const Z=q[U];let Q=K[U];if(Q===void 0&&(U==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),U==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor)),Z===void 0||Z.attribute!==Q||Q&&Z.data!==Q.data)return!0;Y++}return s.attributesNum!==Y||s.index!==k}function g(M,P,z,k){const q={},K=P.attributes;let Y=0;const et=z.getAttributes();for(const U in et)if(et[U].location>=0){let Z=K[U];Z===void 0&&(U==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),U==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor));const Q={};Q.attribute=Z,Z&&Z.data&&(Q.data=Z.data),q[U]=Q,Y++}s.attributes=q,s.attributesNum=Y,s.index=k}function x(){const M=s.newAttributes;for(let P=0,z=M.length;P<z;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){const z=s.newAttributes,k=s.enabledAttributes,q=s.attributeDivisors;z[M]=1,k[M]===0&&(r.enableVertexAttribArray(M),k[M]=1),q[M]!==P&&(r.vertexAttribDivisor(M,P),q[M]=P)}function y(){const M=s.newAttributes,P=s.enabledAttributes;for(let z=0,k=P.length;z<k;z++)P[z]!==M[z]&&(r.disableVertexAttribArray(z),P[z]=0)}function v(M,P,z,k,q,K,Y){Y===!0?r.vertexAttribIPointer(M,P,z,q,K):r.vertexAttribPointer(M,P,z,k,q,K)}function _(M,P,z,k){x();const q=k.attributes,K=z.getAttributes(),Y=P.defaultAttributeValues;for(const et in K){const U=K[et];if(U.location>=0){let X=q[et];if(X===void 0&&(et==="instanceMatrix"&&M.instanceMatrix&&(X=M.instanceMatrix),et==="instanceColor"&&M.instanceColor&&(X=M.instanceColor)),X!==void 0){const Z=X.normalized,Q=X.itemSize,ct=t.get(X);if(ct===void 0)continue;const pt=ct.buffer,W=ct.type,ot=ct.bytesPerElement,gt=W===r.INT||W===r.UNSIGNED_INT||X.gpuType===wa;if(X.isInterleavedBufferAttribute){const ht=X.data,Rt=ht.stride,jt=X.offset;if(ht.isInstancedInterleavedBuffer){for(let Dt=0;Dt<U.locationSize;Dt++)p(U.location+Dt,ht.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Dt=0;Dt<U.locationSize;Dt++)m(U.location+Dt);r.bindBuffer(r.ARRAY_BUFFER,pt);for(let Dt=0;Dt<U.locationSize;Dt++)v(U.location+Dt,Q/U.locationSize,W,Z,Rt*ot,(jt+Q/U.locationSize*Dt)*ot,gt)}else{if(X.isInstancedBufferAttribute){for(let ht=0;ht<U.locationSize;ht++)p(U.location+ht,X.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let ht=0;ht<U.locationSize;ht++)m(U.location+ht);r.bindBuffer(r.ARRAY_BUFFER,pt);for(let ht=0;ht<U.locationSize;ht++)v(U.location+ht,Q/U.locationSize,W,Z,Q*ot,Q/U.locationSize*ht*ot,gt)}}else if(Y!==void 0){const Z=Y[et];if(Z!==void 0)switch(Z.length){case 2:r.vertexAttrib2fv(U.location,Z);break;case 3:r.vertexAttrib3fv(U.location,Z);break;case 4:r.vertexAttrib4fv(U.location,Z);break;default:r.vertexAttrib1fv(U.location,Z)}}}}y()}function A(){C();for(const M in n){const P=n[M];for(const z in P){const k=P[z];for(const q in k)h(k[q].object),delete k[q];delete P[z]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const z in P){const k=P[z];for(const q in k)h(k[q].object),delete k[q];delete P[z]}delete n[M.id]}function w(M){for(const P in n){const z=n[P];if(z[M.id]===void 0)continue;const k=z[M.id];for(const q in k)h(k[q].object),delete k[q];delete z[M.id]}}function C(){T(),o=!0,s!==i&&(s=i,c(s.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:T,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function Gm(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Hm(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==Ye&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const C=w===ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==_n&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==un&&!C)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:A,maxSamples:E}}function Vm(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new mi,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const y=s?0:n,v=y*4;let _=p.clippingState||null;l.value=_,_=h(g,f,v,d);for(let A=0;A!==v;++A)_[A]=e[A];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=d+x*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,_=d;v!==x;++v,_+=4)o.copy(u[v]).applyMatrix4(y,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Wm(r){let t=new WeakMap;function e(o,a){return a===Go?o.mapping=Qi:a===Ho&&(o.mapping=ts),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Go||a===Ho)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new uf(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const qi=4,ql=[.125,.215,.35,.446,.526,.582],_i=20,Mo=new Hr,Yl=new rt;let So=null,To=0,bo=0,Eo=!1;const gi=(1+Math.sqrt(5))/2,Hi=1/gi,jl=[new D(-gi,Hi,0),new D(gi,Hi,0),new D(-Hi,0,gi),new D(Hi,0,gi),new D(0,gi,-Hi),new D(0,gi,Hi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Xm=new D;class ya{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,s={}){const{size:o=256,position:a=Xm}=s;So=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),bo=this._renderer.getActiveMipmapLevel(),Eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$l(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(So,To,bo),this._renderer.xr.enabled=Eo,t.scissorTest=!1,gr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qi||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),So=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),bo=this._renderer.getActiveMipmapLevel(),Eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Le,minFilter:Le,generateMipmaps:!1,type:ls,format:Ye,colorSpace:Xe,depthBuffer:!1},i=Kl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kl(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qm(s)),this._blurMaterial=Ym(s,t,e)}return i}_compileMaterial(t){const e=new I(this._lodPlanes[0],t);this._renderer.compile(e,Mo)}_sceneToCubeUV(t,e,n,i,s){const l=new He(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Yl),u.toneMapping=Dn,u.autoClear=!1;const g=new _e({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),x=new I(new J,g);let m=!1;const p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,m=!0):(g.color.copy(Yl),m=!0);for(let y=0;y<6;y++){const v=y%3;v===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[y],s.y,s.z)):v===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[y]));const _=this._cubeSize;gr(i,v*_,y>2?_:0,_,_),u.setRenderTarget(i),m&&u.render(x,l),u.render(t,l)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Qi||t.mapping===ts;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=$l()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new I(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;gr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Mo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=jl[(i-s-1)%jl.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new I(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*_i-1),x=s/g,m=isFinite(s)?1+Math.floor(h*x):_i;m>_i&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${_i}`);const p=[];let y=0;for(let w=0;w<_i;++w){const C=w/x,T=Math.exp(-C*C/2);p.push(T),w===0?y+=T:w<m&&(y+=2*T)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const _=this._sizeLods[i],A=3*_*(i>v-qi?i-v+qi:0),E=4*(this._cubeSize-_);gr(e,A,E,3*_,2*_),l.setRenderTarget(e),l.render(u,Mo)}}function qm(r){const t=[],e=[],n=[];let i=r;const s=r-qi+1+ql.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-qi?l=ql[o-r+qi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,x=3,m=2,p=1,y=new Float32Array(x*g*d),v=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let E=0;E<d;E++){const w=E%3*2/3-1,C=E>2?0:-1,T=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];y.set(T,x*g*E),v.set(f,m*g*E);const M=[E,E,E,E,E,E];_.set(M,p*g*E)}const A=new De;A.setAttribute("position",new Oe(y,x)),A.setAttribute("uv",new Oe(v,m)),A.setAttribute("faceIndex",new Oe(_,p)),t.push(A),i>qi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Kl(r,t,e){const n=new fn(r,t,e);return n.texture.mapping=Br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function gr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Ym(r,t,e){const n=new Float32Array(_i),i=new D(0,1,0);return new sn({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Zl(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function $l(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Ya(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jm(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Go||l===Ho,h=l===Qi||l===ts;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ya(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new ya(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Km(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&pi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Zm(r,t,e,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],r.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let x=0;if(d!==null){const y=d.array;x=d.version;for(let v=0,_=y.length;v<_;v+=3){const A=y[v+0],E=y[v+1],w=y[v+2];f.push(A,E,E,w,w,A)}}else if(g!==void 0){const y=g.array;x=g.version;for(let v=0,_=y.length/3-1;v<_;v+=3){const A=v+0,E=v+1,w=v+2;f.push(A,E,E,w,w,A)}}else return;const m=new(Yc(f)?Jc:$c)(f,1);m.version=x;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function $m(r,t,e){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){r.drawElements(n,d,s,f*o),e.update(d,n,1)}function c(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,x,0,g);let p=0;for(let y=0;y<g;y++)p+=d[y]*x[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jm(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Qm(r,t,e){const n=new WeakMap,i=new ie;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),m===!0&&(_=3);let A=a.attributes.position.count*_,E=1;A>t.maxTextureSize&&(E=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const w=new Float32Array(A*E*4*u),C=new jc(w,A,E,u);C.type=un,C.needsUpdate=!0;const T=_*4;for(let P=0;P<u;P++){const z=p[P],k=y[P],q=v[P],K=A*E*4*P;for(let Y=0;Y<z.count;Y++){const et=Y*T;g===!0&&(i.fromBufferAttribute(z,Y),w[K+et+0]=i.x,w[K+et+1]=i.y,w[K+et+2]=i.z,w[K+et+3]=0),x===!0&&(i.fromBufferAttribute(k,Y),w[K+et+4]=i.x,w[K+et+5]=i.y,w[K+et+6]=i.z,w[K+et+7]=0),m===!0&&(i.fromBufferAttribute(q,Y),w[K+et+8]=i.x,w[K+et+9]=i.y,w[K+et+10]=i.z,w[K+et+11]=q.itemSize===4?i.w:1)}}f={count:u,texture:C,size:new Et(A,E)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",x),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function t0(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const ph=new we,Jl=new Ha(1,1),mh=new jc,gh=new Yu,xh=new eh,Ql=[],tc=[],ec=new Float32Array(16),nc=new Float32Array(9),ic=new Float32Array(4);function fs(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Ql[i];if(s===void 0&&(s=new Float32Array(i),Ql[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Ae(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Re(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Vr(r,t){let e=tc[t];e===void 0&&(e=new Int32Array(t),tc[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function e0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function n0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;r.uniform2fv(this.addr,t),Re(e,t)}}function i0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;r.uniform3fv(this.addr,t),Re(e,t)}}function s0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;r.uniform4fv(this.addr,t),Re(e,t)}}function r0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;ic.set(n),r.uniformMatrix2fv(this.addr,!1,ic),Re(e,n)}}function o0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;nc.set(n),r.uniformMatrix3fv(this.addr,!1,nc),Re(e,n)}}function a0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;ec.set(n),r.uniformMatrix4fv(this.addr,!1,ec),Re(e,n)}}function l0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function c0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;r.uniform2iv(this.addr,t),Re(e,t)}}function h0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;r.uniform3iv(this.addr,t),Re(e,t)}}function u0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;r.uniform4iv(this.addr,t),Re(e,t)}}function f0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function d0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;r.uniform2uiv(this.addr,t),Re(e,t)}}function p0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;r.uniform3uiv(this.addr,t),Re(e,t)}}function m0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;r.uniform4uiv(this.addr,t),Re(e,t)}}function g0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Jl.compareFunction=qc,s=Jl):s=ph,e.setTexture2D(t||s,i)}function x0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||gh,i)}function _0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||xh,i)}function y0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||mh,i)}function v0(r){switch(r){case 5126:return e0;case 35664:return n0;case 35665:return i0;case 35666:return s0;case 35674:return r0;case 35675:return o0;case 35676:return a0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return h0;case 35669:case 35673:return u0;case 5125:return f0;case 36294:return d0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return x0;case 35680:case 36300:case 36308:case 36293:return _0;case 36289:case 36303:case 36311:case 36292:return y0}}function M0(r,t){r.uniform1fv(this.addr,t)}function S0(r,t){const e=fs(t,this.size,2);r.uniform2fv(this.addr,e)}function T0(r,t){const e=fs(t,this.size,3);r.uniform3fv(this.addr,e)}function b0(r,t){const e=fs(t,this.size,4);r.uniform4fv(this.addr,e)}function E0(r,t){const e=fs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function w0(r,t){const e=fs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function A0(r,t){const e=fs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function R0(r,t){r.uniform1iv(this.addr,t)}function C0(r,t){r.uniform2iv(this.addr,t)}function P0(r,t){r.uniform3iv(this.addr,t)}function I0(r,t){r.uniform4iv(this.addr,t)}function L0(r,t){r.uniform1uiv(this.addr,t)}function D0(r,t){r.uniform2uiv(this.addr,t)}function N0(r,t){r.uniform3uiv(this.addr,t)}function U0(r,t){r.uniform4uiv(this.addr,t)}function F0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Ae(n,s)||(r.uniform1iv(this.addr,s),Re(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ph,s[o])}function B0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Ae(n,s)||(r.uniform1iv(this.addr,s),Re(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||gh,s[o])}function O0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Ae(n,s)||(r.uniform1iv(this.addr,s),Re(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||xh,s[o])}function k0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Ae(n,s)||(r.uniform1iv(this.addr,s),Re(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||mh,s[o])}function z0(r){switch(r){case 5126:return M0;case 35664:return S0;case 35665:return T0;case 35666:return b0;case 35674:return E0;case 35675:return w0;case 35676:return A0;case 5124:case 35670:return R0;case 35667:case 35671:return C0;case 35668:case 35672:return P0;case 35669:case 35673:return I0;case 5125:return L0;case 36294:return D0;case 36295:return N0;case 36296:return U0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return B0;case 35680:case 36300:case 36308:case 36293:return O0;case 36289:case 36303:case 36311:case 36292:return k0}}class G0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=v0(e.type)}}class H0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=z0(e.type)}}class V0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const wo=/(\w+)(\])?(\[|\.)?/g;function sc(r,t){r.seq.push(t),r.map[t.id]=t}function W0(r,t,e){const n=r.name,i=n.length;for(wo.lastIndex=0;;){const s=wo.exec(n),o=wo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){sc(e,c===void 0?new G0(a,r,t):new H0(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new V0(a),sc(e,u)),e=u}}}class Rr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);W0(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function rc(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const X0=37297;let q0=0;function Y0(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const oc=new Gt;function j0(r){Qt._getMatrix(oc,Qt.workingColorSpace,r);const t=`mat3( ${oc.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(r)){case Ir:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function ac(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Y0(r.getShaderSource(t),o)}else return i}function K0(r,t){const e=j0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Z0(r,t){let e;switch(t){case Qh:e="Linear";break;case tu:e="Reinhard";break;case eu:e="Cineon";break;case nu:e="ACESFilmic";break;case su:e="AgX";break;case ru:e="Neutral";break;case iu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const xr=new D;function $0(){Qt.getLuminanceCoefficients(xr);const r=xr.x.toFixed(4),t=xr.y.toFixed(4),e=xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rs).join(`
`)}function Q0(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function tg(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Rs(r){return r!==""}function lc(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function cc(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const eg=/^[ \t]*#include +<([\w\d./]+)>/gm;function va(r){return r.replace(eg,ig)}const ng=new Map;function ig(r,t){let e=Vt[t];if(e===void 0){const n=ng.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return va(e)}const sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hc(r){return r.replace(sg,rg)}function rg(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function uc(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function og(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Cc?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Pc?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Cn&&(t="SHADOWMAP_TYPE_VSM"),t}function ag(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Qi:case ts:t="ENVMAP_TYPE_CUBE";break;case Br:t="ENVMAP_TYPE_CUBE_UV";break}return t}function lg(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ts:t="ENVMAP_MODE_REFRACTION";break}return t}function cg(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ic:t="ENVMAP_BLENDING_MULTIPLY";break;case $h:t="ENVMAP_BLENDING_MIX";break;case Jh:t="ENVMAP_BLENDING_ADD";break}return t}function hg(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function ug(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=og(e),c=ag(e),h=lg(e),u=cg(e),f=hg(e),d=J0(e),g=Q0(s),x=i.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Rs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Rs).join(`
`),p.length>0&&(p+=`
`)):(m=[uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),p=[uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Dn?Z0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,K0("linearToOutputTexel",e.outputColorSpace),$0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Rs).join(`
`)),o=va(o),o=lc(o,e),o=cc(o,e),a=va(a),a=lc(a,e),a=cc(a,e),o=hc(o),a=hc(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+o,_=y+p+a,A=rc(i,i.VERTEX_SHADER,v),E=rc(i,i.FRAGMENT_SHADER,_);i.attachShader(x,A),i.attachShader(x,E),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function w(P){if(r.debug.checkShaderErrors){const z=i.getProgramInfoLog(x).trim(),k=i.getShaderInfoLog(A).trim(),q=i.getShaderInfoLog(E).trim();let K=!0,Y=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,A,E);else{const et=ac(i,A,"vertex"),U=ac(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+et+`
`+U)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(k===""||q==="")&&(Y=!1);Y&&(P.diagnostics={runnable:K,programLog:z,vertexShader:{log:k,prefix:m},fragmentShader:{log:q,prefix:p}})}i.deleteShader(A),i.deleteShader(E),C=new Rr(i,x),T=tg(i,x)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,X0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=q0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=E,this}let fg=0;class dg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new pg(t),e.set(t,n)),n}}class pg{constructor(t){this.id=fg++,this.code=t,this.usedTimes=0}}function mg(r,t,e,n,i,s,o){const a=new Kc,l=new dg,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,M,P,z,k){const q=z.fog,K=k.geometry,Y=T.isMeshStandardMaterial?z.environment:null,et=(T.isMeshStandardMaterial?e:t).get(T.envMap||Y),U=et&&et.mapping===Br?et.image.height:null,X=g[T.type];T.precision!==null&&(d=i.getMaxPrecision(T.precision),d!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",d,"instead."));const Z=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Q=Z!==void 0?Z.length:0;let ct=0;K.morphAttributes.position!==void 0&&(ct=1),K.morphAttributes.normal!==void 0&&(ct=2),K.morphAttributes.color!==void 0&&(ct=3);let pt,W,ot,gt;if(X){const ae=gn[X];pt=ae.vertexShader,W=ae.fragmentShader}else pt=T.vertexShader,W=T.fragmentShader,l.update(T),ot=l.getVertexShaderID(T),gt=l.getFragmentShaderID(T);const ht=r.getRenderTarget(),Rt=r.state.buffers.depth.getReversed(),jt=k.isInstancedMesh===!0,Dt=k.isBatchedMesh===!0,pe=!!T.map,he=!!T.matcap,Kt=!!et,L=!!T.aoMap,$e=!!T.lightMap,Zt=!!T.bumpMap,$t=!!T.normalMap,Pt=!!T.displacementMap,de=!!T.emissiveMap,Ct=!!T.metalnessMap,R=!!T.roughnessMap,S=T.anisotropy>0,G=T.clearcoat>0,nt=T.dispersion>0,st=T.iridescence>0,tt=T.sheen>0,At=T.transmission>0,mt=S&&!!T.anisotropyMap,Mt=G&&!!T.clearcoatMap,te=G&&!!T.clearcoatNormalMap,lt=G&&!!T.clearcoatRoughnessMap,St=st&&!!T.iridescenceMap,Nt=st&&!!T.iridescenceThicknessMap,Ft=tt&&!!T.sheenColorMap,Tt=tt&&!!T.sheenRoughnessMap,Jt=!!T.specularMap,Ht=!!T.specularColorMap,ue=!!T.specularIntensityMap,N=At&&!!T.transmissionMap,ft=At&&!!T.thicknessMap,j=!!T.gradientMap,it=!!T.alphaMap,yt=T.alphaTest>0,xt=!!T.alphaHash,zt=!!T.extensions;let ye=Dn;T.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(ye=r.toneMapping);const Ne={shaderID:X,shaderType:T.type,shaderName:T.name,vertexShader:pt,fragmentShader:W,defines:T.defines,customVertexShaderID:ot,customFragmentShaderID:gt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:d,batching:Dt,batchingColor:Dt&&k._colorsTexture!==null,instancing:jt,instancingColor:jt&&k.instanceColor!==null,instancingMorph:jt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ht===null?r.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Xe,alphaToCoverage:!!T.alphaToCoverage,map:pe,matcap:he,envMap:Kt,envMapMode:Kt&&et.mapping,envMapCubeUVHeight:U,aoMap:L,lightMap:$e,bumpMap:Zt,normalMap:$t,displacementMap:f&&Pt,emissiveMap:de,normalMapObjectSpace:$t&&T.normalMapType===du,normalMapTangentSpace:$t&&T.normalMapType===Xc,metalnessMap:Ct,roughnessMap:R,anisotropy:S,anisotropyMap:mt,clearcoat:G,clearcoatMap:Mt,clearcoatNormalMap:te,clearcoatRoughnessMap:lt,dispersion:nt,iridescence:st,iridescenceMap:St,iridescenceThicknessMap:Nt,sheen:tt,sheenColorMap:Ft,sheenRoughnessMap:Tt,specularMap:Jt,specularColorMap:Ht,specularIntensityMap:ue,transmission:At,transmissionMap:N,thicknessMap:ft,gradientMap:j,opaque:T.transparent===!1&&T.blending===Yi&&T.alphaToCoverage===!1,alphaMap:it,alphaTest:yt,alphaHash:xt,combine:T.combine,mapUv:pe&&x(T.map.channel),aoMapUv:L&&x(T.aoMap.channel),lightMapUv:$e&&x(T.lightMap.channel),bumpMapUv:Zt&&x(T.bumpMap.channel),normalMapUv:$t&&x(T.normalMap.channel),displacementMapUv:Pt&&x(T.displacementMap.channel),emissiveMapUv:de&&x(T.emissiveMap.channel),metalnessMapUv:Ct&&x(T.metalnessMap.channel),roughnessMapUv:R&&x(T.roughnessMap.channel),anisotropyMapUv:mt&&x(T.anisotropyMap.channel),clearcoatMapUv:Mt&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:te&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&x(T.sheenRoughnessMap.channel),specularMapUv:Jt&&x(T.specularMap.channel),specularColorMapUv:Ht&&x(T.specularColorMap.channel),specularIntensityMapUv:ue&&x(T.specularIntensityMap.channel),transmissionMapUv:N&&x(T.transmissionMap.channel),thicknessMapUv:ft&&x(T.thicknessMap.channel),alphaMapUv:it&&x(T.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&($t||S),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(pe||it),fog:!!q,useFog:T.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Rt,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ct,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:ye,decodeVideoTexture:pe&&T.map.isVideoTexture===!0&&Qt.getTransfer(T.map.colorSpace)===ce,decodeVideoTextureEmissive:de&&T.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(T.emissiveMap.colorSpace)===ce,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ee,flipSided:T.side===Ve,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:zt&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&T.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function p(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const P in T.defines)M.push(P),M.push(T.defines[P]);return T.isRawShaderMaterial===!1&&(y(M,T),v(M,T),M.push(r.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function y(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function v(T,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),T.push(a.mask)}function _(T){const M=g[T.type];let P;if(M){const z=gn[M];P=af.clone(z.uniforms)}else P=T.uniforms;return P}function A(T,M){let P;for(let z=0,k=h.length;z<k;z++){const q=h[z];if(q.cacheKey===M){P=q,++P.usedTimes;break}}return P===void 0&&(P=new ug(r,M,T,s),h.push(P)),P}function E(T){if(--T.usedTimes===0){const M=h.indexOf(T);h[M]=h[h.length-1],h.pop(),T.destroy()}}function w(T){l.remove(T)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:A,releaseProgram:E,releaseShaderCache:w,programs:h,dispose:C}}function gg(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function xg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function fc(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function dc(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,d,g,x,m){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},r[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,f,d,g,x,m){const p=o(u,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,g,x,m){const p=o(u,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||xg),n.length>1&&n.sort(f||fc),i.length>1&&i.sort(f||fc)}function h(){for(let u=t,f=r.length;u<f;u++){const d=r[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function _g(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new dc,r.set(n,[o])):i>=s.length?(o=new dc,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function yg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new rt};break;case"SpotLight":e={position:new D,direction:new D,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":e={color:new rt,position:new D,halfWidth:new D,halfHeight:new D};break}return r[t.id]=e,e}}}function vg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Mg=0;function Sg(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Tg(r){const t=new yg,e=vg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const i=new D,s=new kt,o=new kt;function a(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,y=0,v=0,_=0,A=0,E=0,w=0;c.sort(Sg);for(let T=0,M=c.length;T<M;T++){const P=c[T],z=P.color,k=P.intensity,q=P.distance,K=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*k,u+=z.g*k,f+=z.b*k;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(P.sh.coefficients[Y],k);w++}else if(P.isDirectionalLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const et=P.shadow,U=e.get(P);U.shadowIntensity=et.intensity,U.shadowBias=et.bias,U.shadowNormalBias=et.normalBias,U.shadowRadius=et.radius,U.shadowMapSize=et.mapSize,n.directionalShadow[d]=U,n.directionalShadowMap[d]=K,n.directionalShadowMatrix[d]=P.shadow.matrix,y++}n.directional[d]=Y,d++}else if(P.isSpotLight){const Y=t.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(z).multiplyScalar(k),Y.distance=q,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,n.spot[x]=Y;const et=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,et.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[x]=et.matrix,P.castShadow){const U=e.get(P);U.shadowIntensity=et.intensity,U.shadowBias=et.bias,U.shadowNormalBias=et.normalBias,U.shadowRadius=et.radius,U.shadowMapSize=et.mapSize,n.spotShadow[x]=U,n.spotShadowMap[x]=K,_++}x++}else if(P.isRectAreaLight){const Y=t.get(P);Y.color.copy(z).multiplyScalar(k),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=Y,m++}else if(P.isPointLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const et=P.shadow,U=e.get(P);U.shadowIntensity=et.intensity,U.shadowBias=et.bias,U.shadowNormalBias=et.normalBias,U.shadowRadius=et.radius,U.shadowMapSize=et.mapSize,U.shadowCameraNear=et.camera.near,U.shadowCameraFar=et.camera.far,n.pointShadow[g]=U,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=P.shadow.matrix,v++}n.point[g]=Y,g++}else if(P.isHemisphereLight){const Y=t.get(P);Y.skyColor.copy(P.color).multiplyScalar(k),Y.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[p]=Y,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==g||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==y||C.numPointShadows!==v||C.numSpotShadows!==_||C.numSpotMaps!==A||C.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+A-E,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=w,C.directionalLength=d,C.pointLength=g,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=y,C.numPointShadows=v,C.numSpotShadows=_,C.numSpotMaps=A,C.numLightProbes=w,n.version=Mg++)}function l(c,h){let u=0,f=0,d=0,g=0,x=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const v=c[p];if(v.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(v.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),d++}else if(v.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function pc(r){const t=new Tg(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function bg(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new pc(r),t.set(i,[a])):s>=o.length?(a=new pc(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Eg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ag(r,t,e){let n=new ka;const i=new Et,s=new Et,o=new ie,a=new Tf({depthPacking:fu}),l=new bf,c={},h=e.maxTextureSize,u={[xn]:Ve,[Ve]:xn,[Ee]:Ee},f=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Eg,fragmentShader:wg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new De;g.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new I(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cc;let p=this.type;this.render=function(E,w,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const T=r.getRenderTarget(),M=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),z=r.state;z.setBlending(Qn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const k=p!==Cn&&this.type===Cn,q=p===Cn&&this.type!==Cn;for(let K=0,Y=E.length;K<Y;K++){const et=E[K],U=et.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;i.copy(U.mapSize);const X=U.getFrameExtents();if(i.multiply(X),s.copy(U.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/X.x),i.x=s.x*X.x,U.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/X.y),i.y=s.y*X.y,U.mapSize.y=s.y)),U.map===null||k===!0||q===!0){const Q=this.type!==Cn?{minFilter:We,magFilter:We}:{};U.map!==null&&U.map.dispose(),U.map=new fn(i.x,i.y,Q),U.map.texture.name=et.name+".shadowMap",U.camera.updateProjectionMatrix()}r.setRenderTarget(U.map),r.clear();const Z=U.getViewportCount();for(let Q=0;Q<Z;Q++){const ct=U.getViewport(Q);o.set(s.x*ct.x,s.y*ct.y,s.x*ct.z,s.y*ct.w),z.viewport(o),U.updateMatrices(et,Q),n=U.getFrustum(),_(w,C,U.camera,et,this.type)}U.isPointLightShadow!==!0&&this.type===Cn&&y(U,C),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(T,M,P)};function y(E,w){const C=t.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new fn(i.x,i.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(w,null,C,f,x,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(w,null,C,d,x,null)}function v(E,w,C,T){let M=null;const P=C.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)M=P;else if(M=C.isPointLight===!0?l:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const z=M.uuid,k=w.uuid;let q=c[z];q===void 0&&(q={},c[z]=q);let K=q[k];K===void 0&&(K=M.clone(),q[k]=K,w.addEventListener("dispose",A)),M=K}if(M.visible=w.visible,M.wireframe=w.wireframe,T===Cn?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=r.properties.get(M);z.light=C}return M}function _(E,w,C,T,M){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Cn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,E.matrixWorld);const k=t.update(E),q=E.material;if(Array.isArray(q)){const K=k.groups;for(let Y=0,et=K.length;Y<et;Y++){const U=K[Y],X=q[U.materialIndex];if(X&&X.visible){const Z=v(E,X,T,M);E.onBeforeShadow(r,E,w,C,k,Z,U),r.renderBufferDirect(C,null,k,Z,E,U),E.onAfterShadow(r,E,w,C,k,Z,U)}}}else if(q.visible){const K=v(E,q,T,M);E.onBeforeShadow(r,E,w,C,k,K,null),r.renderBufferDirect(C,null,k,K,E,null),E.onAfterShadow(r,E,w,C,k,K,null)}}const z=E.children;for(let k=0,q=z.length;k<q;k++)_(z[k],w,C,T,M)}function A(E){E.target.removeEventListener("dispose",A);for(const C in c){const T=c[C],M=E.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const Rg={[No]:Uo,[Fo]:ko,[Bo]:zo,[Ji]:Oo,[Uo]:No,[ko]:Fo,[zo]:Bo,[Oo]:Ji};function Cg(r,t){function e(){let N=!1;const ft=new ie;let j=null;const it=new ie(0,0,0,0);return{setMask:function(yt){j!==yt&&!N&&(r.colorMask(yt,yt,yt,yt),j=yt)},setLocked:function(yt){N=yt},setClear:function(yt,xt,zt,ye,Ne){Ne===!0&&(yt*=ye,xt*=ye,zt*=ye),ft.set(yt,xt,zt,ye),it.equals(ft)===!1&&(r.clearColor(yt,xt,zt,ye),it.copy(ft))},reset:function(){N=!1,j=null,it.set(-1,0,0,0)}}}function n(){let N=!1,ft=!1,j=null,it=null,yt=null;return{setReversed:function(xt){if(ft!==xt){const zt=t.get("EXT_clip_control");ft?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);const ye=yt;yt=null,this.setClear(ye)}ft=xt},getReversed:function(){return ft},setTest:function(xt){xt?ht(r.DEPTH_TEST):Rt(r.DEPTH_TEST)},setMask:function(xt){j!==xt&&!N&&(r.depthMask(xt),j=xt)},setFunc:function(xt){if(ft&&(xt=Rg[xt]),it!==xt){switch(xt){case No:r.depthFunc(r.NEVER);break;case Uo:r.depthFunc(r.ALWAYS);break;case Fo:r.depthFunc(r.LESS);break;case Ji:r.depthFunc(r.LEQUAL);break;case Bo:r.depthFunc(r.EQUAL);break;case Oo:r.depthFunc(r.GEQUAL);break;case ko:r.depthFunc(r.GREATER);break;case zo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}it=xt}},setLocked:function(xt){N=xt},setClear:function(xt){yt!==xt&&(ft&&(xt=1-xt),r.clearDepth(xt),yt=xt)},reset:function(){N=!1,j=null,it=null,yt=null,ft=!1}}}function i(){let N=!1,ft=null,j=null,it=null,yt=null,xt=null,zt=null,ye=null,Ne=null;return{setTest:function(ae){N||(ae?ht(r.STENCIL_TEST):Rt(r.STENCIL_TEST))},setMask:function(ae){ft!==ae&&!N&&(r.stencilMask(ae),ft=ae)},setFunc:function(ae,rn,Sn){(j!==ae||it!==rn||yt!==Sn)&&(r.stencilFunc(ae,rn,Sn),j=ae,it=rn,yt=Sn)},setOp:function(ae,rn,Sn){(xt!==ae||zt!==rn||ye!==Sn)&&(r.stencilOp(ae,rn,Sn),xt=ae,zt=rn,ye=Sn)},setLocked:function(ae){N=ae},setClear:function(ae){Ne!==ae&&(r.clearStencil(ae),Ne=ae)},reset:function(){N=!1,ft=null,j=null,it=null,yt=null,xt=null,zt=null,ye=null,Ne=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,y=null,v=null,_=null,A=null,E=null,w=new rt(0,0,0),C=0,T=!1,M=null,P=null,z=null,k=null,q=null;const K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,et=0;const U=r.getParameter(r.VERSION);U.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(U)[1]),Y=et>=1):U.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),Y=et>=2);let X=null,Z={};const Q=r.getParameter(r.SCISSOR_BOX),ct=r.getParameter(r.VIEWPORT),pt=new ie().fromArray(Q),W=new ie().fromArray(ct);function ot(N,ft,j,it){const yt=new Uint8Array(4),xt=r.createTexture();r.bindTexture(N,xt),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let zt=0;zt<j;zt++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ft,0,r.RGBA,1,1,it,0,r.RGBA,r.UNSIGNED_BYTE,yt):r.texImage2D(ft+zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,yt);return xt}const gt={};gt[r.TEXTURE_2D]=ot(r.TEXTURE_2D,r.TEXTURE_2D,1),gt[r.TEXTURE_CUBE_MAP]=ot(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[r.TEXTURE_2D_ARRAY]=ot(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),gt[r.TEXTURE_3D]=ot(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(r.DEPTH_TEST),o.setFunc(Ji),Zt(!1),$t(el),ht(r.CULL_FACE),L(Qn);function ht(N){h[N]!==!0&&(r.enable(N),h[N]=!0)}function Rt(N){h[N]!==!1&&(r.disable(N),h[N]=!1)}function jt(N,ft){return u[N]!==ft?(r.bindFramebuffer(N,ft),u[N]=ft,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ft),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ft),!0):!1}function Dt(N,ft){let j=d,it=!1;if(N){j=f.get(ft),j===void 0&&(j=[],f.set(ft,j));const yt=N.textures;if(j.length!==yt.length||j[0]!==r.COLOR_ATTACHMENT0){for(let xt=0,zt=yt.length;xt<zt;xt++)j[xt]=r.COLOR_ATTACHMENT0+xt;j.length=yt.length,it=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,it=!0);it&&r.drawBuffers(j)}function pe(N){return g!==N?(r.useProgram(N),g=N,!0):!1}const he={[xi]:r.FUNC_ADD,[Nh]:r.FUNC_SUBTRACT,[Uh]:r.FUNC_REVERSE_SUBTRACT};he[Fh]=r.MIN,he[Bh]=r.MAX;const Kt={[Oh]:r.ZERO,[kh]:r.ONE,[zh]:r.SRC_COLOR,[Lo]:r.SRC_ALPHA,[qh]:r.SRC_ALPHA_SATURATE,[Wh]:r.DST_COLOR,[Hh]:r.DST_ALPHA,[Gh]:r.ONE_MINUS_SRC_COLOR,[Do]:r.ONE_MINUS_SRC_ALPHA,[Xh]:r.ONE_MINUS_DST_COLOR,[Vh]:r.ONE_MINUS_DST_ALPHA,[Yh]:r.CONSTANT_COLOR,[jh]:r.ONE_MINUS_CONSTANT_COLOR,[Kh]:r.CONSTANT_ALPHA,[Zh]:r.ONE_MINUS_CONSTANT_ALPHA};function L(N,ft,j,it,yt,xt,zt,ye,Ne,ae){if(N===Qn){x===!0&&(Rt(r.BLEND),x=!1);return}if(x===!1&&(ht(r.BLEND),x=!0),N!==Dh){if(N!==m||ae!==T){if((p!==xi||_!==xi)&&(r.blendEquation(r.FUNC_ADD),p=xi,_=xi),ae)switch(N){case Yi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ji:r.blendFunc(r.ONE,r.ONE);break;case nl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case il:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Yi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ji:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case nl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case il:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,v=null,A=null,E=null,w.set(0,0,0),C=0,m=N,T=ae}return}yt=yt||ft,xt=xt||j,zt=zt||it,(ft!==p||yt!==_)&&(r.blendEquationSeparate(he[ft],he[yt]),p=ft,_=yt),(j!==y||it!==v||xt!==A||zt!==E)&&(r.blendFuncSeparate(Kt[j],Kt[it],Kt[xt],Kt[zt]),y=j,v=it,A=xt,E=zt),(ye.equals(w)===!1||Ne!==C)&&(r.blendColor(ye.r,ye.g,ye.b,Ne),w.copy(ye),C=Ne),m=N,T=!1}function $e(N,ft){N.side===Ee?Rt(r.CULL_FACE):ht(r.CULL_FACE);let j=N.side===Ve;ft&&(j=!j),Zt(j),N.blending===Yi&&N.transparent===!1?L(Qn):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const it=N.stencilWrite;a.setTest(it),it&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),de(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ht(r.SAMPLE_ALPHA_TO_COVERAGE):Rt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(N){M!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),M=N)}function $t(N){N!==Ih?(ht(r.CULL_FACE),N!==P&&(N===el?r.cullFace(r.BACK):N===Lh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Rt(r.CULL_FACE),P=N}function Pt(N){N!==z&&(Y&&r.lineWidth(N),z=N)}function de(N,ft,j){N?(ht(r.POLYGON_OFFSET_FILL),(k!==ft||q!==j)&&(r.polygonOffset(ft,j),k=ft,q=j)):Rt(r.POLYGON_OFFSET_FILL)}function Ct(N){N?ht(r.SCISSOR_TEST):Rt(r.SCISSOR_TEST)}function R(N){N===void 0&&(N=r.TEXTURE0+K-1),X!==N&&(r.activeTexture(N),X=N)}function S(N,ft,j){j===void 0&&(X===null?j=r.TEXTURE0+K-1:j=X);let it=Z[j];it===void 0&&(it={type:void 0,texture:void 0},Z[j]=it),(it.type!==N||it.texture!==ft)&&(X!==j&&(r.activeTexture(j),X=j),r.bindTexture(N,ft||gt[N]),it.type=N,it.texture=ft)}function G(){const N=Z[X];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function nt(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function At(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function mt(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function lt(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function St(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ft(N){pt.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),pt.copy(N))}function Tt(N){W.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),W.copy(N))}function Jt(N,ft){let j=c.get(ft);j===void 0&&(j=new WeakMap,c.set(ft,j));let it=j.get(N);it===void 0&&(it=r.getUniformBlockIndex(ft,N.name),j.set(N,it))}function Ht(N,ft){const it=c.get(ft).get(N);l.get(ft)!==it&&(r.uniformBlockBinding(ft,it,N.__bindingPointIndex),l.set(ft,it))}function ue(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},X=null,Z={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,y=null,v=null,_=null,A=null,E=null,w=new rt(0,0,0),C=0,T=!1,M=null,P=null,z=null,k=null,q=null,pt.set(0,0,r.canvas.width,r.canvas.height),W.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ht,disable:Rt,bindFramebuffer:jt,drawBuffers:Dt,useProgram:pe,setBlending:L,setMaterial:$e,setFlipSided:Zt,setCullFace:$t,setLineWidth:Pt,setPolygonOffset:de,setScissorTest:Ct,activeTexture:R,bindTexture:S,unbindTexture:G,compressedTexImage2D:nt,compressedTexImage3D:st,texImage2D:St,texImage3D:Nt,updateUBOMapping:Jt,uniformBlockBinding:Ht,texStorage2D:te,texStorage3D:lt,texSubImage2D:tt,texSubImage3D:At,compressedTexSubImage2D:mt,compressedTexSubImage3D:Mt,scissor:Ft,viewport:Tt,reset:ue}}function Pg(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return d?new OffscreenCanvas(R,S):Us("canvas")}function x(R,S,G){let nt=1;const st=Ct(R);if((st.width>G||st.height>G)&&(nt=G/Math.max(st.width,st.height)),nt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const tt=Math.floor(nt*st.width),At=Math.floor(nt*st.height);u===void 0&&(u=g(tt,At));const mt=S?g(tt,At):u;return mt.width=tt,mt.height=At,mt.getContext("2d").drawImage(R,0,0,tt,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+tt+"x"+At+")."),mt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){r.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(R,S,G,nt,st=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let tt=S;if(S===r.RED&&(G===r.FLOAT&&(tt=r.R32F),G===r.HALF_FLOAT&&(tt=r.R16F),G===r.UNSIGNED_BYTE&&(tt=r.R8)),S===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.R8UI),G===r.UNSIGNED_SHORT&&(tt=r.R16UI),G===r.UNSIGNED_INT&&(tt=r.R32UI),G===r.BYTE&&(tt=r.R8I),G===r.SHORT&&(tt=r.R16I),G===r.INT&&(tt=r.R32I)),S===r.RG&&(G===r.FLOAT&&(tt=r.RG32F),G===r.HALF_FLOAT&&(tt=r.RG16F),G===r.UNSIGNED_BYTE&&(tt=r.RG8)),S===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.RG8UI),G===r.UNSIGNED_SHORT&&(tt=r.RG16UI),G===r.UNSIGNED_INT&&(tt=r.RG32UI),G===r.BYTE&&(tt=r.RG8I),G===r.SHORT&&(tt=r.RG16I),G===r.INT&&(tt=r.RG32I)),S===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.RGB8UI),G===r.UNSIGNED_SHORT&&(tt=r.RGB16UI),G===r.UNSIGNED_INT&&(tt=r.RGB32UI),G===r.BYTE&&(tt=r.RGB8I),G===r.SHORT&&(tt=r.RGB16I),G===r.INT&&(tt=r.RGB32I)),S===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&(tt=r.RGBA8UI),G===r.UNSIGNED_SHORT&&(tt=r.RGBA16UI),G===r.UNSIGNED_INT&&(tt=r.RGBA32UI),G===r.BYTE&&(tt=r.RGBA8I),G===r.SHORT&&(tt=r.RGBA16I),G===r.INT&&(tt=r.RGBA32I)),S===r.RGB&&G===r.UNSIGNED_INT_5_9_9_9_REV&&(tt=r.RGB9_E5),S===r.RGBA){const At=st?Ir:Qt.getTransfer(nt);G===r.FLOAT&&(tt=r.RGBA32F),G===r.HALF_FLOAT&&(tt=r.RGBA16F),G===r.UNSIGNED_BYTE&&(tt=At===ce?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&(tt=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&(tt=r.RGB5_A1)}return(tt===r.R16F||tt===r.R32F||tt===r.RG16F||tt===r.RG32F||tt===r.RGBA16F||tt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function _(R,S){let G;return R?S===null||S===ei||S===es?G=r.DEPTH24_STENCIL8:S===un?G=r.DEPTH32F_STENCIL8:S===Ls&&(G=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ei||S===es?G=r.DEPTH_COMPONENT24:S===un?G=r.DEPTH_COMPONENT32F:S===Ls&&(G=r.DEPTH_COMPONENT16),G}function A(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==We&&R.minFilter!==Le?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function E(R){const S=R.target;S.removeEventListener("dispose",E),C(S),S.isVideoTexture&&h.delete(S)}function w(R){const S=R.target;S.removeEventListener("dispose",w),M(S)}function C(R){const S=n.get(R);if(S.__webglInit===void 0)return;const G=R.source,nt=f.get(G);if(nt){const st=nt[S.__cacheKey];st.usedTimes--,st.usedTimes===0&&T(R),Object.keys(nt).length===0&&f.delete(G)}n.remove(R)}function T(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const G=R.source,nt=f.get(G);delete nt[S.__cacheKey],o.memory.textures--}function M(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(S.__webglFramebuffer[nt]))for(let st=0;st<S.__webglFramebuffer[nt].length;st++)r.deleteFramebuffer(S.__webglFramebuffer[nt][st]);else r.deleteFramebuffer(S.__webglFramebuffer[nt]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[nt])}else{if(Array.isArray(S.__webglFramebuffer))for(let nt=0;nt<S.__webglFramebuffer.length;nt++)r.deleteFramebuffer(S.__webglFramebuffer[nt]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let nt=0;nt<S.__webglColorRenderbuffer.length;nt++)S.__webglColorRenderbuffer[nt]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[nt]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const G=R.textures;for(let nt=0,st=G.length;nt<st;nt++){const tt=n.get(G[nt]);tt.__webglTexture&&(r.deleteTexture(tt.__webglTexture),o.memory.textures--),n.remove(G[nt])}n.remove(R)}let P=0;function z(){P=0}function k(){const R=P;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function q(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function K(R,S){const G=n.get(R);if(R.isVideoTexture&&Pt(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const nt=R.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(G,R,S);return}}e.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+S)}function Y(R,S){const G=n.get(R);if(R.version>0&&G.__version!==R.version){W(G,R,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+S)}function et(R,S){const G=n.get(R);if(R.version>0&&G.__version!==R.version){W(G,R,S);return}e.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+S)}function U(R,S){const G=n.get(R);if(R.version>0&&G.__version!==R.version){ot(G,R,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+S)}const X={[ti]:r.REPEAT,[Zn]:r.CLAMP_TO_EDGE,[Cr]:r.MIRRORED_REPEAT},Z={[We]:r.NEAREST,[Dc]:r.NEAREST_MIPMAP_NEAREST,[As]:r.NEAREST_MIPMAP_LINEAR,[Le]:r.LINEAR,[Sr]:r.LINEAR_MIPMAP_NEAREST,[In]:r.LINEAR_MIPMAP_LINEAR},Q={[pu]:r.NEVER,[vu]:r.ALWAYS,[mu]:r.LESS,[qc]:r.LEQUAL,[gu]:r.EQUAL,[yu]:r.GEQUAL,[xu]:r.GREATER,[_u]:r.NOTEQUAL};function ct(R,S){if(S.type===un&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Le||S.magFilter===Sr||S.magFilter===As||S.magFilter===In||S.minFilter===Le||S.minFilter===Sr||S.minFilter===As||S.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,X[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,X[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,X[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,Z[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,Z[S.minFilter]),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,Q[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===We||S.minFilter!==As&&S.minFilter!==In||S.type===un&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function pt(R,S){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",E));const nt=S.source;let st=f.get(nt);st===void 0&&(st={},f.set(nt,st));const tt=q(S);if(tt!==R.__cacheKey){st[tt]===void 0&&(st[tt]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,G=!0),st[tt].usedTimes++;const At=st[R.__cacheKey];At!==void 0&&(st[R.__cacheKey].usedTimes--,At.usedTimes===0&&T(S)),R.__cacheKey=tt,R.__webglTexture=st[tt].texture}return G}function W(R,S,G){let nt=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(nt=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(nt=r.TEXTURE_3D);const st=pt(R,S),tt=S.source;e.bindTexture(nt,R.__webglTexture,r.TEXTURE0+G);const At=n.get(tt);if(tt.version!==At.__version||st===!0){e.activeTexture(r.TEXTURE0+G);const mt=Qt.getPrimaries(Qt.workingColorSpace),Mt=S.colorSpace===jn?null:Qt.getPrimaries(S.colorSpace),te=S.colorSpace===jn||mt===Mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let lt=x(S.image,!1,i.maxTextureSize);lt=de(S,lt);const St=s.convert(S.format,S.colorSpace),Nt=s.convert(S.type);let Ft=v(S.internalFormat,St,Nt,S.colorSpace,S.isVideoTexture);ct(nt,S);let Tt;const Jt=S.mipmaps,Ht=S.isVideoTexture!==!0,ue=At.__version===void 0||st===!0,N=tt.dataReady,ft=A(S,lt);if(S.isDepthTexture)Ft=_(S.format===ns,S.type),ue&&(Ht?e.texStorage2D(r.TEXTURE_2D,1,Ft,lt.width,lt.height):e.texImage2D(r.TEXTURE_2D,0,Ft,lt.width,lt.height,0,St,Nt,null));else if(S.isDataTexture)if(Jt.length>0){Ht&&ue&&e.texStorage2D(r.TEXTURE_2D,ft,Ft,Jt[0].width,Jt[0].height);for(let j=0,it=Jt.length;j<it;j++)Tt=Jt[j],Ht?N&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,Tt.width,Tt.height,St,Nt,Tt.data):e.texImage2D(r.TEXTURE_2D,j,Ft,Tt.width,Tt.height,0,St,Nt,Tt.data);S.generateMipmaps=!1}else Ht?(ue&&e.texStorage2D(r.TEXTURE_2D,ft,Ft,lt.width,lt.height),N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,lt.width,lt.height,St,Nt,lt.data)):e.texImage2D(r.TEXTURE_2D,0,Ft,lt.width,lt.height,0,St,Nt,lt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ht&&ue&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,Ft,Jt[0].width,Jt[0].height,lt.depth);for(let j=0,it=Jt.length;j<it;j++)if(Tt=Jt[j],S.format!==Ye)if(St!==null)if(Ht){if(N)if(S.layerUpdates.size>0){const yt=Xl(Tt.width,Tt.height,S.format,S.type);for(const xt of S.layerUpdates){const zt=Tt.data.subarray(xt*yt/Tt.data.BYTES_PER_ELEMENT,(xt+1)*yt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,xt,Tt.width,Tt.height,1,St,zt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,Tt.width,Tt.height,lt.depth,St,Tt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,Ft,Tt.width,Tt.height,lt.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?N&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,Tt.width,Tt.height,lt.depth,St,Nt,Tt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,j,Ft,Tt.width,Tt.height,lt.depth,0,St,Nt,Tt.data)}else{Ht&&ue&&e.texStorage2D(r.TEXTURE_2D,ft,Ft,Jt[0].width,Jt[0].height);for(let j=0,it=Jt.length;j<it;j++)Tt=Jt[j],S.format!==Ye?St!==null?Ht?N&&e.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,Tt.width,Tt.height,St,Tt.data):e.compressedTexImage2D(r.TEXTURE_2D,j,Ft,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?N&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,Tt.width,Tt.height,St,Nt,Tt.data):e.texImage2D(r.TEXTURE_2D,j,Ft,Tt.width,Tt.height,0,St,Nt,Tt.data)}else if(S.isDataArrayTexture)if(Ht){if(ue&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,Ft,lt.width,lt.height,lt.depth),N)if(S.layerUpdates.size>0){const j=Xl(lt.width,lt.height,S.format,S.type);for(const it of S.layerUpdates){const yt=lt.data.subarray(it*j/lt.data.BYTES_PER_ELEMENT,(it+1)*j/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,it,lt.width,lt.height,1,St,Nt,yt)}S.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,St,Nt,lt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ft,lt.width,lt.height,lt.depth,0,St,Nt,lt.data);else if(S.isData3DTexture)Ht?(ue&&e.texStorage3D(r.TEXTURE_3D,ft,Ft,lt.width,lt.height,lt.depth),N&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,St,Nt,lt.data)):e.texImage3D(r.TEXTURE_3D,0,Ft,lt.width,lt.height,lt.depth,0,St,Nt,lt.data);else if(S.isFramebufferTexture){if(ue)if(Ht)e.texStorage2D(r.TEXTURE_2D,ft,Ft,lt.width,lt.height);else{let j=lt.width,it=lt.height;for(let yt=0;yt<ft;yt++)e.texImage2D(r.TEXTURE_2D,yt,Ft,j,it,0,St,Nt,null),j>>=1,it>>=1}}else if(Jt.length>0){if(Ht&&ue){const j=Ct(Jt[0]);e.texStorage2D(r.TEXTURE_2D,ft,Ft,j.width,j.height)}for(let j=0,it=Jt.length;j<it;j++)Tt=Jt[j],Ht?N&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,St,Nt,Tt):e.texImage2D(r.TEXTURE_2D,j,Ft,St,Nt,Tt);S.generateMipmaps=!1}else if(Ht){if(ue){const j=Ct(lt);e.texStorage2D(r.TEXTURE_2D,ft,Ft,j.width,j.height)}N&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,St,Nt,lt)}else e.texImage2D(r.TEXTURE_2D,0,Ft,St,Nt,lt);m(S)&&p(nt),At.__version=tt.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ot(R,S,G){if(S.image.length!==6)return;const nt=pt(R,S),st=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+G);const tt=n.get(st);if(st.version!==tt.__version||nt===!0){e.activeTexture(r.TEXTURE0+G);const At=Qt.getPrimaries(Qt.workingColorSpace),mt=S.colorSpace===jn?null:Qt.getPrimaries(S.colorSpace),Mt=S.colorSpace===jn||At===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const te=S.isCompressedTexture||S.image[0].isCompressedTexture,lt=S.image[0]&&S.image[0].isDataTexture,St=[];for(let it=0;it<6;it++)!te&&!lt?St[it]=x(S.image[it],!0,i.maxCubemapSize):St[it]=lt?S.image[it].image:S.image[it],St[it]=de(S,St[it]);const Nt=St[0],Ft=s.convert(S.format,S.colorSpace),Tt=s.convert(S.type),Jt=v(S.internalFormat,Ft,Tt,S.colorSpace),Ht=S.isVideoTexture!==!0,ue=tt.__version===void 0||nt===!0,N=st.dataReady;let ft=A(S,Nt);ct(r.TEXTURE_CUBE_MAP,S);let j;if(te){Ht&&ue&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Jt,Nt.width,Nt.height);for(let it=0;it<6;it++){j=St[it].mipmaps;for(let yt=0;yt<j.length;yt++){const xt=j[yt];S.format!==Ye?Ft!==null?Ht?N&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt,0,0,xt.width,xt.height,Ft,xt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt,Jt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt,0,0,xt.width,xt.height,Ft,Tt,xt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt,Jt,xt.width,xt.height,0,Ft,Tt,xt.data)}}}else{if(j=S.mipmaps,Ht&&ue){j.length>0&&ft++;const it=Ct(St[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Jt,it.width,it.height)}for(let it=0;it<6;it++)if(lt){Ht?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,St[it].width,St[it].height,Ft,Tt,St[it].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Jt,St[it].width,St[it].height,0,Ft,Tt,St[it].data);for(let yt=0;yt<j.length;yt++){const zt=j[yt].image[it].image;Ht?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt+1,0,0,zt.width,zt.height,Ft,Tt,zt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt+1,Jt,zt.width,zt.height,0,Ft,Tt,zt.data)}}else{Ht?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Ft,Tt,St[it]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Jt,Ft,Tt,St[it]);for(let yt=0;yt<j.length;yt++){const xt=j[yt];Ht?N&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt+1,0,0,Ft,Tt,xt.image[it]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,yt+1,Jt,Ft,Tt,xt.image[it])}}}m(S)&&p(r.TEXTURE_CUBE_MAP),tt.__version=st.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function gt(R,S,G,nt,st,tt){const At=s.convert(G.format,G.colorSpace),mt=s.convert(G.type),Mt=v(G.internalFormat,At,mt,G.colorSpace),te=n.get(S),lt=n.get(G);if(lt.__renderTarget=S,!te.__hasExternalTextures){const St=Math.max(1,S.width>>tt),Nt=Math.max(1,S.height>>tt);st===r.TEXTURE_3D||st===r.TEXTURE_2D_ARRAY?e.texImage3D(st,tt,Mt,St,Nt,S.depth,0,At,mt,null):e.texImage2D(st,tt,Mt,St,Nt,0,At,mt,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),$t(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,nt,st,lt.__webglTexture,0,Zt(S)):(st===r.TEXTURE_2D||st>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,nt,st,lt.__webglTexture,tt),e.bindFramebuffer(r.FRAMEBUFFER,null)}function ht(R,S,G){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer){const nt=S.depthTexture,st=nt&&nt.isDepthTexture?nt.type:null,tt=_(S.stencilBuffer,st),At=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,mt=Zt(S);$t(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,mt,tt,S.width,S.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,mt,tt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,tt,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,At,r.RENDERBUFFER,R)}else{const nt=S.textures;for(let st=0;st<nt.length;st++){const tt=nt[st],At=s.convert(tt.format,tt.colorSpace),mt=s.convert(tt.type),Mt=v(tt.internalFormat,At,mt,tt.colorSpace),te=Zt(S);G&&$t(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,Mt,S.width,S.height):$t(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,Mt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Mt,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Rt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=n.get(S.depthTexture);nt.__renderTarget=S,(!nt.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),K(S.depthTexture,0);const st=nt.__webglTexture,tt=Zt(S);if(S.depthTexture.format===Ki)$t(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,st,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,st,0);else if(S.depthTexture.format===ns)$t(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,st,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function jt(R){const S=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const nt=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),nt){const st=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,nt.removeEventListener("dispose",st)};nt.addEventListener("dispose",st),S.__depthDisposeCallback=st}S.__boundDepthTexture=nt}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Rt(S.__webglFramebuffer,R)}else if(G){S.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[nt]),S.__webglDepthbuffer[nt]===void 0)S.__webglDepthbuffer[nt]=r.createRenderbuffer(),ht(S.__webglDepthbuffer[nt],R,!1);else{const st=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer[nt];r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,st,r.RENDERBUFFER,tt)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),ht(S.__webglDepthbuffer,R,!1);else{const nt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,st=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,st),r.framebufferRenderbuffer(r.FRAMEBUFFER,nt,r.RENDERBUFFER,st)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Dt(R,S,G){const nt=n.get(R);S!==void 0&&gt(nt.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&jt(R)}function pe(R){const S=R.texture,G=n.get(R),nt=n.get(S);R.addEventListener("dispose",w);const st=R.textures,tt=R.isWebGLCubeRenderTarget===!0,At=st.length>1;if(At||(nt.__webglTexture===void 0&&(nt.__webglTexture=r.createTexture()),nt.__version=S.version,o.memory.textures++),tt){G.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[mt]=[];for(let Mt=0;Mt<S.mipmaps.length;Mt++)G.__webglFramebuffer[mt][Mt]=r.createFramebuffer()}else G.__webglFramebuffer[mt]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let mt=0;mt<S.mipmaps.length;mt++)G.__webglFramebuffer[mt]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(At)for(let mt=0,Mt=st.length;mt<Mt;mt++){const te=n.get(st[mt]);te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&$t(R)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let mt=0;mt<st.length;mt++){const Mt=st[mt];G.__webglColorRenderbuffer[mt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[mt]);const te=s.convert(Mt.format,Mt.colorSpace),lt=s.convert(Mt.type),St=v(Mt.internalFormat,te,lt,Mt.colorSpace,R.isXRRenderTarget===!0),Nt=Zt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt,St,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,G.__webglColorRenderbuffer[mt])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),ht(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(tt){e.bindTexture(r.TEXTURE_CUBE_MAP,nt.__webglTexture),ct(r.TEXTURE_CUBE_MAP,S);for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)gt(G.__webglFramebuffer[mt][Mt],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Mt);else gt(G.__webglFramebuffer[mt],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(S)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let mt=0,Mt=st.length;mt<Mt;mt++){const te=st[mt],lt=n.get(te);e.bindTexture(r.TEXTURE_2D,lt.__webglTexture),ct(r.TEXTURE_2D,te),gt(G.__webglFramebuffer,R,te,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,0),m(te)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let mt=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(mt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(mt,nt.__webglTexture),ct(mt,S),S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)gt(G.__webglFramebuffer[Mt],R,S,r.COLOR_ATTACHMENT0,mt,Mt);else gt(G.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,mt,0);m(S)&&p(mt),e.unbindTexture()}R.depthBuffer&&jt(R)}function he(R){const S=R.textures;for(let G=0,nt=S.length;G<nt;G++){const st=S[G];if(m(st)){const tt=y(R),At=n.get(st).__webglTexture;e.bindTexture(tt,At),p(tt),e.unbindTexture()}}}const Kt=[],L=[];function $e(R){if(R.samples>0){if($t(R)===!1){const S=R.textures,G=R.width,nt=R.height;let st=r.COLOR_BUFFER_BIT;const tt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=n.get(R),mt=S.length>1;if(mt)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(st|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(st|=r.STENCIL_BUFFER_BIT)),mt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const te=n.get(S[Mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,te,0)}r.blitFramebuffer(0,0,G,nt,0,0,G,nt,st,r.NEAREST),l===!0&&(Kt.length=0,L.length=0,Kt.push(r.COLOR_ATTACHMENT0+Mt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Kt.push(tt),L.push(tt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Kt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),mt)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const te=n.get(S[Mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,te,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function Zt(R){return Math.min(i.maxSamples,R.samples)}function $t(R){const S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Pt(R){const S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function de(R,S){const G=R.colorSpace,nt=R.format,st=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==Xe&&G!==jn&&(Qt.getTransfer(G)===ce?(nt!==Ye||st!==_n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}function Ct(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=K,this.setTexture2DArray=Y,this.setTexture3D=et,this.setTextureCube=U,this.rebindTextures=Dt,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=$e,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=$t}function Ig(r,t){function e(n,i=jn){let s;const o=Qt.getTransfer(i);if(n===_n)return r.UNSIGNED_BYTE;if(n===Aa)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Ra)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Fc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Nc)return r.BYTE;if(n===Uc)return r.SHORT;if(n===Ls)return r.UNSIGNED_SHORT;if(n===wa)return r.INT;if(n===ei)return r.UNSIGNED_INT;if(n===un)return r.FLOAT;if(n===ls)return r.HALF_FLOAT;if(n===Bc)return r.ALPHA;if(n===Oc)return r.RGB;if(n===Ye)return r.RGBA;if(n===kc)return r.LUMINANCE;if(n===zc)return r.LUMINANCE_ALPHA;if(n===Ki)return r.DEPTH_COMPONENT;if(n===ns)return r.DEPTH_STENCIL;if(n===Ca)return r.RED;if(n===Pa)return r.RED_INTEGER;if(n===Gc)return r.RG;if(n===Ia)return r.RG_INTEGER;if(n===La)return r.RGBA_INTEGER;if(n===Tr||n===br||n===Er||n===wr)if(o===ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Tr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Er)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Tr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Er)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vo||n===Wo||n===Xo||n===qo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Vo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yo||n===jo||n===Ko)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Yo||n===jo)return o===ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ko)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zo||n===$o||n===Jo||n===Qo||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===la||n===ca)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Zo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$o)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qo)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ta)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ea)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===na)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ia)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ra)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===aa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===la)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ca)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ar||n===ha||n===ua)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Ar)return o===ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ha)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ua)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hc||n===fa||n===da||n===pa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ar)return s.COMPRESSED_RED_RGTC1_EXT;if(n===fa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===da)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}const Lg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new we,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new sn({vertexShader:Lg,fragmentShader:Dg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new I(new _t(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ug extends Si{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const x=new Ng,m=e.getContextAttributes();let p=null,y=null;const v=[],_=[],A=new Et;let E=null;const w=new He;w.viewport=new ie;const C=new He;C.viewport=new ie;const T=[w,C],M=new Vf;let P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ot=v[W];return ot===void 0&&(ot=new fo,v[W]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(W){let ot=v[W];return ot===void 0&&(ot=new fo,v[W]=ot),ot.getGripSpace()},this.getHand=function(W){let ot=v[W];return ot===void 0&&(ot=new fo,v[W]=ot),ot.getHandSpace()};function k(W){const ot=_.indexOf(W.inputSource);if(ot===-1)return;const gt=v[ot];gt!==void 0&&(gt.update(W.inputSource,W.frame,c||o),gt.dispatchEvent({type:W.type,data:W.inputSource}))}function q(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",K);for(let W=0;W<v.length;W++){const ot=_[W];ot!==null&&(_[W]=null,v[W].disconnect(ot))}P=null,z=null,x.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,y=null,pt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",q),i.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(A),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,ht=null,Rt=null;m.depth&&(Rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=m.stencil?ns:Ki,ht=m.stencil?es:ei);const jt={colorFormat:e.RGBA8,depthFormat:Rt,scaleFactor:s};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(jt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new fn(f.textureWidth,f.textureHeight,{format:Ye,type:_n,depthTexture:new Ha(f.textureWidth,f.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const gt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,gt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new fn(d.framebufferWidth,d.framebufferHeight,{format:Ye,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),pt.setContext(i),pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K(W){for(let ot=0;ot<W.removed.length;ot++){const gt=W.removed[ot],ht=_.indexOf(gt);ht>=0&&(_[ht]=null,v[ht].disconnect(gt))}for(let ot=0;ot<W.added.length;ot++){const gt=W.added[ot];let ht=_.indexOf(gt);if(ht===-1){for(let jt=0;jt<v.length;jt++)if(jt>=_.length){_.push(gt),ht=jt;break}else if(_[jt]===null){_[jt]=gt,ht=jt;break}if(ht===-1)break}const Rt=v[ht];Rt&&Rt.connect(gt)}}const Y=new D,et=new D;function U(W,ot,gt){Y.setFromMatrixPosition(ot.matrixWorld),et.setFromMatrixPosition(gt.matrixWorld);const ht=Y.distanceTo(et),Rt=ot.projectionMatrix.elements,jt=gt.projectionMatrix.elements,Dt=Rt[14]/(Rt[10]-1),pe=Rt[14]/(Rt[10]+1),he=(Rt[9]+1)/Rt[5],Kt=(Rt[9]-1)/Rt[5],L=(Rt[8]-1)/Rt[0],$e=(jt[8]+1)/jt[0],Zt=Dt*L,$t=Dt*$e,Pt=ht/(-L+$e),de=Pt*-L;if(ot.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(de),W.translateZ(Pt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Rt[10]===-1)W.projectionMatrix.copy(ot.projectionMatrix),W.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const Ct=Dt+Pt,R=pe+Pt,S=Zt-de,G=$t+(ht-de),nt=he*pe/R*Ct,st=Kt*pe/R*Ct;W.projectionMatrix.makePerspective(S,G,nt,st,Ct,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function X(W,ot){ot===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ot.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;let ot=W.near,gt=W.far;x.texture!==null&&(x.depthNear>0&&(ot=x.depthNear),x.depthFar>0&&(gt=x.depthFar)),M.near=C.near=w.near=ot,M.far=C.far=w.far=gt,(P!==M.near||z!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,z=M.far),w.layers.mask=W.layers.mask|2,C.layers.mask=W.layers.mask|4,M.layers.mask=w.layers.mask|C.layers.mask;const ht=W.parent,Rt=M.cameras;X(M,ht);for(let jt=0;jt<Rt.length;jt++)X(Rt[jt],ht);Rt.length===2?U(M,w,C):M.projectionMatrix.copy(w.projectionMatrix),Z(W,M,ht)};function Z(W,ot,gt){gt===null?W.matrix.copy(ot.matrixWorld):(W.matrix.copy(gt.matrixWorld),W.matrix.invert(),W.matrix.multiply(ot.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ot.projectionMatrix),W.projectionMatrixInverse.copy(ot.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=is*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=W)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let Q=null;function ct(W,ot){if(h=ot.getViewerPose(c||o),g=ot,h!==null){const gt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let ht=!1;gt.length!==M.cameras.length&&(M.cameras.length=0,ht=!0);for(let Dt=0;Dt<gt.length;Dt++){const pe=gt[Dt];let he=null;if(d!==null)he=d.getViewport(pe);else{const L=u.getViewSubImage(f,pe);he=L.viewport,Dt===0&&(t.setRenderTargetTextures(y,L.colorTexture,f.ignoreDepthValues?void 0:L.depthStencilTexture),t.setRenderTarget(y))}let Kt=T[Dt];Kt===void 0&&(Kt=new He,Kt.layers.enable(Dt),Kt.viewport=new ie,T[Dt]=Kt),Kt.matrix.fromArray(pe.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(pe.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(he.x,he.y,he.width,he.height),Dt===0&&(M.matrix.copy(Kt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ht===!0&&M.cameras.push(Kt)}const Rt=i.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){const Dt=u.getDepthInformation(gt[0]);Dt&&Dt.isValid&&Dt.texture&&x.init(t,Dt,i.renderState)}}for(let gt=0;gt<v.length;gt++){const ht=_[gt],Rt=v[gt];ht!==null&&Rt!==void 0&&Rt.update(ht,ot,c||o)}Q&&Q(W,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}const pt=new dh;pt.setAnimationLoop(ct),this.setAnimationLoop=function(W){Q=W},this.dispose=function(){}}}const ui=new yn,Fg=new kt;function Bg(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qc(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,v,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ve&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ve&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,_=y.envMapRotation;v&&(m.envMap.value=v,ui.copy(_),ui.x*=-1,ui.y*=-1,ui.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),m.envMapRotation.value.setFromMatrix4(Fg.makeRotationFromEuler(ui)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ve&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Og(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const _=v.program;n.uniformBlockBinding(y,_)}function c(y,v){let _=i[y.id];_===void 0&&(g(y),_=h(y),i[y.id]=_,y.addEventListener("dispose",m));const A=v.program;n.updateUBOMapping(y,A);const E=t.render.frame;s[y.id]!==E&&(f(y),s[y.id]=E)}function h(y){const v=u();y.__bindingPointIndex=v;const _=r.createBuffer(),A=y.__size,E=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,A,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,_),_}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=i[y.id],_=y.uniforms,A=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let E=0,w=_.length;E<w;E++){const C=Array.isArray(_[E])?_[E]:[_[E]];for(let T=0,M=C.length;T<M;T++){const P=C[T];if(d(P,E,T,A)===!0){const z=P.__offset,k=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let K=0;K<k.length;K++){const Y=k[K],et=x(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,r.bufferSubData(r.UNIFORM_BUFFER,z+q,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,q),q+=et.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,z,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(y,v,_,A){const E=y.value,w=v+"_"+_;if(A[w]===void 0)return typeof E=="number"||typeof E=="boolean"?A[w]=E:A[w]=E.clone(),!0;{const C=A[w];if(typeof E=="number"||typeof E=="boolean"){if(C!==E)return A[w]=E,!0}else if(C.equals(E)===!1)return C.copy(E),!0}return!1}function g(y){const v=y.uniforms;let _=0;const A=16;for(let w=0,C=v.length;w<C;w++){const T=Array.isArray(v[w])?v[w]:[v[w]];for(let M=0,P=T.length;M<P;M++){const z=T[M],k=Array.isArray(z.value)?z.value:[z.value];for(let q=0,K=k.length;q<K;q++){const Y=k[q],et=x(Y),U=_%A,X=U%et.boundary,Z=U+X;_+=X,Z!==0&&A-Z<et.storage&&(_+=A-Z),z.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=et.storage}}}const E=_%A;return E>0&&(_+=A-E),y.__size=_,y.__cache={},this}function x(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function p(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class kg{constructor(t={}){const{canvas:e=Ou(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Me,this.toneMapping=Dn,this.toneMappingExposure=1;const _=this;let A=!1,E=0,w=0,C=null,T=-1,M=null;const P=new ie,z=new ie;let k=null;const q=new rt(0);let K=0,Y=e.width,et=e.height,U=1,X=null,Z=null;const Q=new ie(0,0,Y,et),ct=new ie(0,0,Y,et);let pt=!1;const W=new ka;let ot=!1,gt=!1;this.transmissionResolutionScale=1;const ht=new kt,Rt=new kt,jt=new D,Dt=new ie,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function Kt(){return C===null?U:1}let L=n;function $e(b,B){return e.getContext(b,B)}try{const b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ea}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),L===null){const B="webgl2";if(L=$e(B,b),L===null)throw $e(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Zt,$t,Pt,de,Ct,R,S,G,nt,st,tt,At,mt,Mt,te,lt,St,Nt,Ft,Tt,Jt,Ht,ue,N;function ft(){Zt=new Km(L),Zt.init(),Ht=new Ig(L,Zt),$t=new Hm(L,Zt,t,Ht),Pt=new Cg(L,Zt),$t.reverseDepthBuffer&&f&&Pt.buffers.depth.setReversed(!0),de=new Jm(L),Ct=new gg,R=new Pg(L,Zt,Pt,Ct,$t,Ht,de),S=new Wm(_),G=new jm(_),nt=new sd(L),ue=new zm(L,nt),st=new Zm(L,nt,de,ue),tt=new t0(L,st,nt,de),Ft=new Qm(L,$t,R),lt=new Vm(Ct),At=new mg(_,S,G,Zt,$t,ue,lt),mt=new Bg(_,Ct),Mt=new _g,te=new bg(Zt),Nt=new km(_,S,G,Pt,tt,d,l),St=new Ag(_,tt,$t),N=new Og(L,de,$t,Pt),Tt=new Gm(L,Zt,de),Jt=new $m(L,Zt,de),de.programs=At.programs,_.capabilities=$t,_.extensions=Zt,_.properties=Ct,_.renderLists=Mt,_.shadowMap=St,_.state=Pt,_.info=de}ft();const j=new Ug(_,L);this.xr=j,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Zt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Zt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(b){b!==void 0&&(U=b,this.setSize(Y,et,!1))},this.getSize=function(b){return b.set(Y,et)},this.setSize=function(b,B,H=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=b,et=B,e.width=Math.floor(b*U),e.height=Math.floor(B*U),H===!0&&(e.style.width=b+"px",e.style.height=B+"px"),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(Y*U,et*U).floor()},this.setDrawingBufferSize=function(b,B,H){Y=b,et=B,U=H,e.width=Math.floor(b*H),e.height=Math.floor(B*H),this.setViewport(0,0,b,B)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(Q)},this.setViewport=function(b,B,H,V){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,B,H,V),Pt.viewport(P.copy(Q).multiplyScalar(U).round())},this.getScissor=function(b){return b.copy(ct)},this.setScissor=function(b,B,H,V){b.isVector4?ct.set(b.x,b.y,b.z,b.w):ct.set(b,B,H,V),Pt.scissor(z.copy(ct).multiplyScalar(U).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(b){Pt.setScissorTest(pt=b)},this.setOpaqueSort=function(b){X=b},this.setTransparentSort=function(b){Z=b},this.getClearColor=function(b){return b.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(b=!0,B=!0,H=!0){let V=0;if(b){let O=!1;if(C!==null){const at=C.texture.format;O=at===La||at===Ia||at===Pa}if(O){const at=C.texture.type,dt=at===_n||at===ei||at===Ls||at===es||at===Aa||at===Ra,vt=Nt.getClearColor(),bt=Nt.getClearAlpha(),Bt=vt.r,Ot=vt.g,It=vt.b;dt?(g[0]=Bt,g[1]=Ot,g[2]=It,g[3]=bt,L.clearBufferuiv(L.COLOR,0,g)):(x[0]=Bt,x[1]=Ot,x[2]=It,x[3]=bt,L.clearBufferiv(L.COLOR,0,x))}else V|=L.COLOR_BUFFER_BIT}B&&(V|=L.DEPTH_BUFFER_BIT),H&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Nt.dispose(),Mt.dispose(),te.dispose(),Ct.dispose(),S.dispose(),G.dispose(),tt.dispose(),ue.dispose(),N.dispose(),At.dispose(),j.dispose(),j.removeEventListener("sessionstart",ja),j.removeEventListener("sessionend",Ka),si.stop()};function it(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const b=de.autoReset,B=St.enabled,H=St.autoUpdate,V=St.needsUpdate,O=St.type;ft(),de.autoReset=b,St.enabled=B,St.autoUpdate=H,St.needsUpdate=V,St.type=O}function xt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function zt(b){const B=b.target;B.removeEventListener("dispose",zt),ye(B)}function ye(b){Ne(b),Ct.remove(b)}function Ne(b){const B=Ct.get(b).programs;B!==void 0&&(B.forEach(function(H){At.releaseProgram(H)}),b.isShaderMaterial&&At.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,H,V,O,at){B===null&&(B=pe);const dt=O.isMesh&&O.matrixWorld.determinant()<0,vt=Eh(b,B,H,V,O);Pt.setMaterial(V,dt);let bt=H.index,Bt=1;if(V.wireframe===!0){if(bt=st.getWireframeAttribute(H),bt===void 0)return;Bt=2}const Ot=H.drawRange,It=H.attributes.position;let ee=Ot.start*Bt,se=(Ot.start+Ot.count)*Bt;at!==null&&(ee=Math.max(ee,at.start*Bt),se=Math.min(se,(at.start+at.count)*Bt)),bt!==null?(ee=Math.max(ee,0),se=Math.min(se,bt.count)):It!=null&&(ee=Math.max(ee,0),se=Math.min(se,It.count));const Se=se-ee;if(Se<0||Se===1/0)return;ue.setup(O,V,vt,H,bt);let ve,ne=Tt;if(bt!==null&&(ve=nt.get(bt),ne=Jt,ne.setIndex(ve)),O.isMesh)V.wireframe===!0?(Pt.setLineWidth(V.wireframeLinewidth*Kt()),ne.setMode(L.LINES)):ne.setMode(L.TRIANGLES);else if(O.isLine){let Lt=V.linewidth;Lt===void 0&&(Lt=1),Pt.setLineWidth(Lt*Kt()),O.isLineSegments?ne.setMode(L.LINES):O.isLineLoop?ne.setMode(L.LINE_LOOP):ne.setMode(L.LINE_STRIP)}else O.isPoints?ne.setMode(L.POINTS):O.isSprite&&ne.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)pi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ne.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))ne.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Lt=O._multiDrawStarts,Ie=O._multiDrawCounts,re=O._multiDrawCount,on=bt?nt.get(bt).bytesPerElement:1,Ti=Ct.get(V).currentProgram.getUniforms();for(let je=0;je<re;je++)Ti.setValue(L,"_gl_DrawID",je),ne.render(Lt[je]/on,Ie[je])}else if(O.isInstancedMesh)ne.renderInstances(ee,Se,O.count);else if(H.isInstancedBufferGeometry){const Lt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Ie=Math.min(H.instanceCount,Lt);ne.renderInstances(ee,Se,Ie)}else ne.render(ee,Se)};function ae(b,B,H){b.transparent===!0&&b.side===Ee&&b.forceSinglePass===!1?(b.side=Ve,b.needsUpdate=!0,Gs(b,B,H),b.side=xn,b.needsUpdate=!0,Gs(b,B,H),b.side=Ee):Gs(b,B,H)}this.compile=function(b,B,H=null){H===null&&(H=b),p=te.get(H),p.init(B),v.push(p),H.traverseVisible(function(O){O.isLight&&O.layers.test(B.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),b!==H&&b.traverseVisible(function(O){O.isLight&&O.layers.test(B.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const V=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const at=O.material;if(at)if(Array.isArray(at))for(let dt=0;dt<at.length;dt++){const vt=at[dt];ae(vt,H,O),V.add(vt)}else ae(at,H,O),V.add(at)}),p=v.pop(),V},this.compileAsync=function(b,B,H=null){const V=this.compile(b,B,H);return new Promise(O=>{function at(){if(V.forEach(function(dt){Ct.get(dt).currentProgram.isReady()&&V.delete(dt)}),V.size===0){O(b);return}setTimeout(at,10)}Zt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let rn=null;function Sn(b){rn&&rn(b)}function ja(){si.stop()}function Ka(){si.start()}const si=new dh;si.setAnimationLoop(Sn),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(b){rn=b,j.setAnimationLoop(b),b===null?si.stop():si.start()},j.addEventListener("sessionstart",ja),j.addEventListener("sessionend",Ka),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(B),B=j.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,B,C),p=te.get(b,v.length),p.init(B),v.push(p),Rt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),W.setFromProjectionMatrix(Rt),gt=this.localClippingEnabled,ot=lt.init(this.clippingPlanes,gt),m=Mt.get(b,y.length),m.init(),y.push(m),j.enabled===!0&&j.isPresenting===!0){const at=_.xr.getDepthSensingMesh();at!==null&&Wr(at,B,-1/0,_.sortObjects)}Wr(b,B,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(X,Z),he=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,he&&Nt.addToRenderList(m,b),this.info.render.frame++,ot===!0&&lt.beginShadows();const H=p.state.shadowsArray;St.render(H,b,B),ot===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=m.opaque,O=m.transmissive;if(p.setupLights(),B.isArrayCamera){const at=B.cameras;if(O.length>0)for(let dt=0,vt=at.length;dt<vt;dt++){const bt=at[dt];$a(V,O,b,bt)}he&&Nt.render(b);for(let dt=0,vt=at.length;dt<vt;dt++){const bt=at[dt];Za(m,b,bt,bt.viewport)}}else O.length>0&&$a(V,O,b,B),he&&Nt.render(b),Za(m,b,B);C!==null&&w===0&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(_,b,B),ue.resetDefaultState(),T=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],ot===!0&&lt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Wr(b,B,H,V){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||W.intersectsSprite(b)){V&&Dt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Rt);const dt=tt.update(b),vt=b.material;vt.visible&&m.push(b,dt,vt,H,Dt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||W.intersectsObject(b))){const dt=tt.update(b),vt=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Dt.copy(b.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),Dt.copy(dt.boundingSphere.center)),Dt.applyMatrix4(b.matrixWorld).applyMatrix4(Rt)),Array.isArray(vt)){const bt=dt.groups;for(let Bt=0,Ot=bt.length;Bt<Ot;Bt++){const It=bt[Bt],ee=vt[It.materialIndex];ee&&ee.visible&&m.push(b,dt,ee,H,Dt.z,It)}}else vt.visible&&m.push(b,dt,vt,H,Dt.z,null)}}const at=b.children;for(let dt=0,vt=at.length;dt<vt;dt++)Wr(at[dt],B,H,V)}function Za(b,B,H,V){const O=b.opaque,at=b.transmissive,dt=b.transparent;p.setupLightsView(H),ot===!0&&lt.setGlobalState(_.clippingPlanes,H),V&&Pt.viewport(P.copy(V)),O.length>0&&zs(O,B,H),at.length>0&&zs(at,B,H),dt.length>0&&zs(dt,B,H),Pt.buffers.depth.setTest(!0),Pt.buffers.depth.setMask(!0),Pt.buffers.color.setMask(!0),Pt.setPolygonOffset(!1)}function $a(b,B,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new fn(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?ls:_n,minFilter:In,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const at=p.state.transmissionRenderTarget[V.id],dt=V.viewport||P;at.setSize(dt.z*_.transmissionResolutionScale,dt.w*_.transmissionResolutionScale);const vt=_.getRenderTarget();_.setRenderTarget(at),_.getClearColor(q),K=_.getClearAlpha(),K<1&&_.setClearColor(16777215,.5),_.clear(),he&&Nt.render(H);const bt=_.toneMapping;_.toneMapping=Dn;const Bt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),ot===!0&&lt.setGlobalState(_.clippingPlanes,V),zs(b,H,V),R.updateMultisampleRenderTarget(at),R.updateRenderTargetMipmap(at),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let It=0,ee=B.length;It<ee;It++){const se=B[It],Se=se.object,ve=se.geometry,ne=se.material,Lt=se.group;if(ne.side===Ee&&Se.layers.test(V.layers)){const Ie=ne.side;ne.side=Ve,ne.needsUpdate=!0,Ja(Se,H,V,ve,ne,Lt),ne.side=Ie,ne.needsUpdate=!0,Ot=!0}}Ot===!0&&(R.updateMultisampleRenderTarget(at),R.updateRenderTargetMipmap(at))}_.setRenderTarget(vt),_.setClearColor(q,K),Bt!==void 0&&(V.viewport=Bt),_.toneMapping=bt}function zs(b,B,H){const V=B.isScene===!0?B.overrideMaterial:null;for(let O=0,at=b.length;O<at;O++){const dt=b[O],vt=dt.object,bt=dt.geometry,Bt=V===null?dt.material:V,Ot=dt.group;vt.layers.test(H.layers)&&Ja(vt,B,H,bt,Bt,Ot)}}function Ja(b,B,H,V,O,at){b.onBeforeRender(_,B,H,V,O,at),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(_,B,H,V,b,at),O.transparent===!0&&O.side===Ee&&O.forceSinglePass===!1?(O.side=Ve,O.needsUpdate=!0,_.renderBufferDirect(H,B,V,O,b,at),O.side=xn,O.needsUpdate=!0,_.renderBufferDirect(H,B,V,O,b,at),O.side=Ee):_.renderBufferDirect(H,B,V,O,b,at),b.onAfterRender(_,B,H,V,O,at)}function Gs(b,B,H){B.isScene!==!0&&(B=pe);const V=Ct.get(b),O=p.state.lights,at=p.state.shadowsArray,dt=O.state.version,vt=At.getParameters(b,O.state,at,B,H),bt=At.getProgramCacheKey(vt);let Bt=V.programs;V.environment=b.isMeshStandardMaterial?B.environment:null,V.fog=B.fog,V.envMap=(b.isMeshStandardMaterial?G:S).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,Bt===void 0&&(b.addEventListener("dispose",zt),Bt=new Map,V.programs=Bt);let Ot=Bt.get(bt);if(Ot!==void 0){if(V.currentProgram===Ot&&V.lightsStateVersion===dt)return tl(b,vt),Ot}else vt.uniforms=At.getUniforms(b),b.onBeforeCompile(vt,_),Ot=At.acquireProgram(vt,bt),Bt.set(bt,Ot),V.uniforms=vt.uniforms;const It=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(It.clippingPlanes=lt.uniform),tl(b,vt),V.needsLights=Ah(b),V.lightsStateVersion=dt,V.needsLights&&(It.ambientLightColor.value=O.state.ambient,It.lightProbe.value=O.state.probe,It.directionalLights.value=O.state.directional,It.directionalLightShadows.value=O.state.directionalShadow,It.spotLights.value=O.state.spot,It.spotLightShadows.value=O.state.spotShadow,It.rectAreaLights.value=O.state.rectArea,It.ltc_1.value=O.state.rectAreaLTC1,It.ltc_2.value=O.state.rectAreaLTC2,It.pointLights.value=O.state.point,It.pointLightShadows.value=O.state.pointShadow,It.hemisphereLights.value=O.state.hemi,It.directionalShadowMap.value=O.state.directionalShadowMap,It.directionalShadowMatrix.value=O.state.directionalShadowMatrix,It.spotShadowMap.value=O.state.spotShadowMap,It.spotLightMatrix.value=O.state.spotLightMatrix,It.spotLightMap.value=O.state.spotLightMap,It.pointShadowMap.value=O.state.pointShadowMap,It.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Ot,V.uniformsList=null,Ot}function Qa(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=Rr.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function tl(b,B){const H=Ct.get(b);H.outputColorSpace=B.outputColorSpace,H.batching=B.batching,H.batchingColor=B.batchingColor,H.instancing=B.instancing,H.instancingColor=B.instancingColor,H.instancingMorph=B.instancingMorph,H.skinning=B.skinning,H.morphTargets=B.morphTargets,H.morphNormals=B.morphNormals,H.morphColors=B.morphColors,H.morphTargetsCount=B.morphTargetsCount,H.numClippingPlanes=B.numClippingPlanes,H.numIntersection=B.numClipIntersection,H.vertexAlphas=B.vertexAlphas,H.vertexTangents=B.vertexTangents,H.toneMapping=B.toneMapping}function Eh(b,B,H,V,O){B.isScene!==!0&&(B=pe),R.resetTextureUnits();const at=B.fog,dt=V.isMeshStandardMaterial?B.environment:null,vt=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Xe,bt=(V.isMeshStandardMaterial?G:S).get(V.envMap||dt),Bt=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ot=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),It=!!H.morphAttributes.position,ee=!!H.morphAttributes.normal,se=!!H.morphAttributes.color;let Se=Dn;V.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Se=_.toneMapping);const ve=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ne=ve!==void 0?ve.length:0,Lt=Ct.get(V),Ie=p.state.lights;if(ot===!0&&(gt===!0||b!==M)){const ke=b===M&&V.id===T;lt.setState(V,b,ke)}let re=!1;V.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Ie.state.version||Lt.outputColorSpace!==vt||O.isBatchedMesh&&Lt.batching===!1||!O.isBatchedMesh&&Lt.batching===!0||O.isBatchedMesh&&Lt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Lt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Lt.instancing===!1||!O.isInstancedMesh&&Lt.instancing===!0||O.isSkinnedMesh&&Lt.skinning===!1||!O.isSkinnedMesh&&Lt.skinning===!0||O.isInstancedMesh&&Lt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Lt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Lt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Lt.instancingMorph===!1&&O.morphTexture!==null||Lt.envMap!==bt||V.fog===!0&&Lt.fog!==at||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==lt.numPlanes||Lt.numIntersection!==lt.numIntersection)||Lt.vertexAlphas!==Bt||Lt.vertexTangents!==Ot||Lt.morphTargets!==It||Lt.morphNormals!==ee||Lt.morphColors!==se||Lt.toneMapping!==Se||Lt.morphTargetsCount!==ne)&&(re=!0):(re=!0,Lt.__version=V.version);let on=Lt.currentProgram;re===!0&&(on=Gs(V,B,O));let Ti=!1,je=!1,ps=!1;const me=on.getUniforms(),Je=Lt.uniforms;if(Pt.useProgram(on.program)&&(Ti=!0,je=!0,ps=!0),V.id!==T&&(T=V.id,je=!0),Ti||M!==b){Pt.buffers.depth.getReversed()?(ht.copy(b.projectionMatrix),zu(ht),Gu(ht),me.setValue(L,"projectionMatrix",ht)):me.setValue(L,"projectionMatrix",b.projectionMatrix),me.setValue(L,"viewMatrix",b.matrixWorldInverse);const qe=me.map.cameraPosition;qe!==void 0&&qe.setValue(L,jt.setFromMatrixPosition(b.matrixWorld)),$t.logarithmicDepthBuffer&&me.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&me.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,je=!0,ps=!0)}if(O.isSkinnedMesh){me.setOptional(L,O,"bindMatrix"),me.setOptional(L,O,"bindMatrixInverse");const ke=O.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),me.setValue(L,"boneTexture",ke.boneTexture,R))}O.isBatchedMesh&&(me.setOptional(L,O,"batchingTexture"),me.setValue(L,"batchingTexture",O._matricesTexture,R),me.setOptional(L,O,"batchingIdTexture"),me.setValue(L,"batchingIdTexture",O._indirectTexture,R),me.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&me.setValue(L,"batchingColorTexture",O._colorsTexture,R));const Qe=H.morphAttributes;if((Qe.position!==void 0||Qe.normal!==void 0||Qe.color!==void 0)&&Ft.update(O,H,on),(je||Lt.receiveShadow!==O.receiveShadow)&&(Lt.receiveShadow=O.receiveShadow,me.setValue(L,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Je.envMap.value=bt,Je.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&B.environment!==null&&(Je.envMapIntensity.value=B.environmentIntensity),je&&(me.setValue(L,"toneMappingExposure",_.toneMappingExposure),Lt.needsLights&&wh(Je,ps),at&&V.fog===!0&&mt.refreshFogUniforms(Je,at),mt.refreshMaterialUniforms(Je,V,U,et,p.state.transmissionRenderTarget[b.id]),Rr.upload(L,Qa(Lt),Je,R)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Rr.upload(L,Qa(Lt),Je,R),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&me.setValue(L,"center",O.center),me.setValue(L,"modelViewMatrix",O.modelViewMatrix),me.setValue(L,"normalMatrix",O.normalMatrix),me.setValue(L,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const ke=V.uniformsGroups;for(let qe=0,Xr=ke.length;qe<Xr;qe++){const ri=ke[qe];N.update(ri,on),N.bind(ri,on)}}return on}function wh(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function Ah(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,B,H){Ct.get(b.texture).__webglTexture=B,Ct.get(b.depthTexture).__webglTexture=H;const V=Ct.get(b);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,B){const H=Ct.get(b);H.__webglFramebuffer=B,H.__useDefaultFramebuffer=B===void 0};const Rh=L.createFramebuffer();this.setRenderTarget=function(b,B=0,H=0){C=b,E=B,w=H;let V=!0,O=null,at=!1,dt=!1;if(b){const bt=Ct.get(b);if(bt.__useDefaultFramebuffer!==void 0)Pt.bindFramebuffer(L.FRAMEBUFFER,null),V=!1;else if(bt.__webglFramebuffer===void 0)R.setupRenderTarget(b);else if(bt.__hasExternalTextures)R.rebindTextures(b,Ct.get(b.texture).__webglTexture,Ct.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const It=b.depthTexture;if(bt.__boundDepthTexture!==It){if(It!==null&&Ct.has(It)&&(b.width!==It.image.width||b.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(b)}}const Bt=b.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(dt=!0);const Ot=Ct.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ot[B])?O=Ot[B][H]:O=Ot[B],at=!0):b.samples>0&&R.useMultisampledRTT(b)===!1?O=Ct.get(b).__webglMultisampledFramebuffer:Array.isArray(Ot)?O=Ot[H]:O=Ot,P.copy(b.viewport),z.copy(b.scissor),k=b.scissorTest}else P.copy(Q).multiplyScalar(U).floor(),z.copy(ct).multiplyScalar(U).floor(),k=pt;if(H!==0&&(O=Rh),Pt.bindFramebuffer(L.FRAMEBUFFER,O)&&V&&Pt.drawBuffers(b,O),Pt.viewport(P),Pt.scissor(z),Pt.setScissorTest(k),at){const bt=Ct.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+B,bt.__webglTexture,H)}else if(dt){const bt=Ct.get(b.texture),Bt=B;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,bt.__webglTexture,H,Bt)}else if(b!==null&&H!==0){const bt=Ct.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,bt.__webglTexture,H)}T=-1},this.readRenderTargetPixels=function(b,B,H,V,O,at,dt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Ct.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&dt!==void 0&&(vt=vt[dt]),vt){Pt.bindFramebuffer(L.FRAMEBUFFER,vt);try{const bt=b.texture,Bt=bt.format,Ot=bt.type;if(!$t.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-V&&H>=0&&H<=b.height-O&&L.readPixels(B,H,V,O,Ht.convert(Bt),Ht.convert(Ot),at)}finally{const bt=C!==null?Ct.get(C).__webglFramebuffer:null;Pt.bindFramebuffer(L.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(b,B,H,V,O,at,dt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Ct.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&dt!==void 0&&(vt=vt[dt]),vt){const bt=b.texture,Bt=bt.format,Ot=bt.type;if(!$t.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=b.width-V&&H>=0&&H<=b.height-O){Pt.bindFramebuffer(L.FRAMEBUFFER,vt);const It=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,It),L.bufferData(L.PIXEL_PACK_BUFFER,at.byteLength,L.STREAM_READ),L.readPixels(B,H,V,O,Ht.convert(Bt),Ht.convert(Ot),0);const ee=C!==null?Ct.get(C).__webglFramebuffer:null;Pt.bindFramebuffer(L.FRAMEBUFFER,ee);const se=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ku(L,se,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,It),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,at),L.deleteBuffer(It),L.deleteSync(se),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,B=null,H=0){b.isTexture!==!0&&(pi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,b=arguments[1]);const V=Math.pow(2,-H),O=Math.floor(b.image.width*V),at=Math.floor(b.image.height*V),dt=B!==null?B.x:0,vt=B!==null?B.y:0;R.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,dt,vt,O,at),Pt.unbindTexture()};const Ch=L.createFramebuffer(),Ph=L.createFramebuffer();this.copyTextureToTexture=function(b,B,H=null,V=null,O=0,at=null){b.isTexture!==!0&&(pi("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,b=arguments[1],B=arguments[2],at=arguments[3]||0,H=null),at===null&&(O!==0?(pi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=O,O=0):at=0);let dt,vt,bt,Bt,Ot,It,ee,se,Se;const ve=b.isCompressedTexture?b.mipmaps[at]:b.image;if(H!==null)dt=H.max.x-H.min.x,vt=H.max.y-H.min.y,bt=H.isBox3?H.max.z-H.min.z:1,Bt=H.min.x,Ot=H.min.y,It=H.isBox3?H.min.z:0;else{const Qe=Math.pow(2,-O);dt=Math.floor(ve.width*Qe),vt=Math.floor(ve.height*Qe),b.isDataArrayTexture?bt=ve.depth:b.isData3DTexture?bt=Math.floor(ve.depth*Qe):bt=1,Bt=0,Ot=0,It=0}V!==null?(ee=V.x,se=V.y,Se=V.z):(ee=0,se=0,Se=0);const ne=Ht.convert(B.format),Lt=Ht.convert(B.type);let Ie;B.isData3DTexture?(R.setTexture3D(B,0),Ie=L.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(R.setTexture2DArray(B,0),Ie=L.TEXTURE_2D_ARRAY):(R.setTexture2D(B,0),Ie=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,B.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,B.unpackAlignment);const re=L.getParameter(L.UNPACK_ROW_LENGTH),on=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Ti=L.getParameter(L.UNPACK_SKIP_PIXELS),je=L.getParameter(L.UNPACK_SKIP_ROWS),ps=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ve.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ve.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Bt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ot),L.pixelStorei(L.UNPACK_SKIP_IMAGES,It);const me=b.isDataArrayTexture||b.isData3DTexture,Je=B.isDataArrayTexture||B.isData3DTexture;if(b.isDepthTexture){const Qe=Ct.get(b),ke=Ct.get(B),qe=Ct.get(Qe.__renderTarget),Xr=Ct.get(ke.__renderTarget);Pt.bindFramebuffer(L.READ_FRAMEBUFFER,qe.__webglFramebuffer),Pt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Xr.__webglFramebuffer);for(let ri=0;ri<bt;ri++)me&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.get(b).__webglTexture,O,It+ri),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.get(B).__webglTexture,at,Se+ri)),L.blitFramebuffer(Bt,Ot,dt,vt,ee,se,dt,vt,L.DEPTH_BUFFER_BIT,L.NEAREST);Pt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Pt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||b.isRenderTargetTexture||Ct.has(b)){const Qe=Ct.get(b),ke=Ct.get(B);Pt.bindFramebuffer(L.READ_FRAMEBUFFER,Ch),Pt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ph);for(let qe=0;qe<bt;qe++)me?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Qe.__webglTexture,O,It+qe):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Qe.__webglTexture,O),Je?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ke.__webglTexture,at,Se+qe):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ke.__webglTexture,at),O!==0?L.blitFramebuffer(Bt,Ot,dt,vt,ee,se,dt,vt,L.COLOR_BUFFER_BIT,L.NEAREST):Je?L.copyTexSubImage3D(Ie,at,ee,se,Se+qe,Bt,Ot,dt,vt):L.copyTexSubImage2D(Ie,at,ee,se,Bt,Ot,dt,vt);Pt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Pt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Je?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Ie,at,ee,se,Se,dt,vt,bt,ne,Lt,ve.data):B.isCompressedArrayTexture?L.compressedTexSubImage3D(Ie,at,ee,se,Se,dt,vt,bt,ne,ve.data):L.texSubImage3D(Ie,at,ee,se,Se,dt,vt,bt,ne,Lt,ve):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,at,ee,se,dt,vt,ne,Lt,ve.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,at,ee,se,ve.width,ve.height,ne,ve.data):L.texSubImage2D(L.TEXTURE_2D,at,ee,se,dt,vt,ne,Lt,ve);L.pixelStorei(L.UNPACK_ROW_LENGTH,re),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,on),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ti),L.pixelStorei(L.UNPACK_SKIP_ROWS,je),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ps),at===0&&B.generateMipmaps&&L.generateMipmap(Ie),Pt.unbindTexture()},this.copyTextureToTexture3D=function(b,B,H=null,V=null,O=0){return b.isTexture!==!0&&(pi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,b=arguments[2],B=arguments[3],O=arguments[4]||0),pi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,B,H,V,O)},this.initRenderTarget=function(b){Ct.get(b).__webglFramebuffer===void 0&&R.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?R.setTextureCube(b,0):b.isData3DTexture?R.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?R.setTexture2DArray(b,0):R.setTexture2D(b,0),Pt.unbindTexture()},this.resetState=function(){E=0,w=0,C=null,Pt.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}const F=4,ge=3.65,Xt=4.25,Jn=21,Mi=15,Bs=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,1,0,0,0,1,1,1,3,3,3,1,0,1,0,0,0,1,0,1],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,1,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,1,0,1],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,1,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,1,0,1],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,0,0,1,1,1,0,0,0,1,1,1,0,0,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];function mc(r,t){return{col:Math.floor(r/F),row:Math.floor(t/F)}}function Ao(r,t){return r>=1&&r<=18&&t>=1&&t<=4}const Hn={x:8.6*F,z:2.32*F,yaw:-Math.PI/2},Be={x:14.8*F,z:2.25*F},Vi={x:17.55*F,z:2.25*F,rotY:-Math.PI/2},Xn=18.85*F,qn=2.25*F,_r={x:18.45*F,z:2.25*F},zg=19.45*F,Vn={xStart:5*F,xEnd:16.4*F,z:1*F+.06,height:1.72},Yn={x:4.5*F,z:13.5*F},gc={x:1*F+.52,z:7.5*F},Ma=[{id:"plat-15-16",col:4,numLeft:"16",numRight:"15",titleLeft:"中央・総武線 (各駅停車)",subLeft:"中野・三鷹方面  Chuo-Sobu Line",colorLeft:"#e8be00",badgeLeft:"JB",titleRight:"山手線 (外回り)",subRight:"池袋・上野方面  Yamanote Line",colorRight:"#6fba2c",badgeRight:"JY",glowColor:7522360},{id:"plat-13-14",col:7,numLeft:"14",numRight:"13",titleLeft:"山手線 (内回り)",subLeft:"渋谷・品川方面  Yamanote Line",colorLeft:"#6fba2c",badgeLeft:"JY",titleRight:"中央・総武線 (各駅停車)",subRight:"水道橋・秋葉原・千葉方面",colorRight:"#e8be00",badgeRight:"JB",glowColor:7322156},{id:"plat-11-12",col:10,numLeft:"12",numRight:"11",titleLeft:"中央線 (快速)",subLeft:"中野・立川・高尾方面  Chuo Line",colorLeft:"#eb5a1e",badgeLeft:"JC",titleRight:"中央線 (快速・青梅線)",subRight:"立川・八王子・青梅方面",colorRight:"#eb5a1e",badgeRight:"JC",glowColor:15098404},{id:"plat-9-10",col:13,numLeft:"10",numRight:"9",titleLeft:"中央本線 (特急)",subLeft:"あずさ・かいじ・富士回遊",colorLeft:"#0074be",badgeLeft:"JC",titleRight:"中央本線 (特急)",subRight:"甲府・松本・河口湖方面",colorRight:"#0074be",badgeRight:"JC",glowColor:2656472},{id:"plat-7-8",col:16,numLeft:"8",numRight:"7",titleLeft:"中央線 (快速)",subLeft:"四ツ谷・御茶ノ水・東京方面",colorLeft:"#eb5a1e",badgeLeft:"JC",titleRight:"中央線 (快速)",subRight:"御茶ノ水・東京方面  Chuo Line",colorRight:"#eb5a1e",badgeRight:"JC",glowColor:15098404}],Gg=[{id:"term-midori",name:"チャージ機 #01",zone:"東西自由通路・地下みどりの窓口横 きっぷうりば",x:7.5*F,z:5*F-.42,rotY:Math.PI},{id:"term-west-gate",name:"チャージ機 #02",zone:"東西自由通路・西改札前（西口広場方面）",x:1*F+.46,z:2.5*F,rotY:Math.PI/2},{id:"term-inside-14",name:"チャージ機 #03",zone:"改札内コンコース・13/14番線階段横 のりこし精算所",x:7.5*F,z:6*F+.42,rotY:0},{id:"term-central-west",name:"チャージ機 #04",zone:"中央通路・中央西改札（小田急・京王のりかえ口）",x:5.5*F,z:14*F-.46,rotY:Math.PI},{id:"term-central-east",name:"チャージ機 #05",zone:"中央東改札・ルミネエスト／NewDays新宿横",x:16.5*F,z:14*F-.46,rotY:Math.PI}],_h=[{id:"hide-phone",name:"公衆電話ボックス（西口地下連絡通路）",kind:"phonebooth",x:1*F+.52,z:7.5*F,rotY:Math.PI/2,insideX:1*F+.48,insideZ:7.5*F,exitX:1*F+1.52,exitZ:7.5*F},{id:"hide-west-locker",name:"Suicaコインロッカー（西改札前広場）",kind:"locker",x:1*F+.48,z:4.2*F,rotY:Math.PI/2,insideX:1*F+.42,insideZ:4.2*F,exitX:1*F+1.48,exitZ:4.2*F},{id:"hide-midori-office",name:"駅員用ロッカー（地下みどりの窓口・駅事務室裏）",kind:"locker",x:12*F+.48,z:5.5*F,rotY:Math.PI/2,insideX:12*F+.42,insideZ:5.5*F,exitX:12*F+1.48,exitZ:5.5*F},{id:"hide-central-sw",name:"清掃用具ロッカー（中央通路 15・16番線階段下）",kind:"locker",x:4*F+.48,z:13.5*F,rotY:Math.PI/2,insideX:4*F+.42,insideZ:13.5*F,exitX:4*F+1.48,exitZ:13.5*F},{id:"hide-central-east",name:"大型コインロッカー（東口・ルミネエスト連絡通路）",kind:"locker",x:20*F-.48,z:8.5*F,rotY:-Math.PI/2,insideX:20*F-.42,insideZ:8.5*F,exitX:20*F-1.48,exitZ:8.5*F}],Sa=[{id:"note-pedestal",title:"東西自由通路・アルプス広場 特設展示プレート",date:"11月18日 掲示",x:Be.x-.36,y:.82,z:Be.z+.25,rotY:-Math.PI/2+.14,lines:["【JR新宿駅 東西自由通路 特設展示「紫のうさぎ」等身大立像】","長さ45.6mの「新宿ウォール456」と連動し、新しい仲間が新宿駅に登場しました。","※終電後の自由通路立ち入り・着ぐるみ立像への接触は厳禁です。","（裏面に爪で引っ掻いたような文字）","「00:19、展示ケースを内側から割って出てきた。笑ったまま目が合う。絶対に見るな」"]},{id:"note-office",title:"新宿駅 地下みどりの窓口・当直日誌",date:"11月19日 00:26",x:11.2*F,y:.86,z:6.2*F,rotY:.35,lines:["00:15 山手線・中央線・総武線 終電発車確認。東口・西口地上出口シャッター閉鎖。","00:22 「新宿ウォール456」と柱の「J・ADビジョン」が全て紫のうさぎに切り替わり、直後に展示台が空に。","00:24 東口（歌舞伎町方面）非常シャッターは、構内5か所のチャージ機で残高¥1,000を認証しないと開かない。","チャージ音が鳴ると奴は改札を抜けて猛スピードで飛んでくる。隠れたら【息を止めろ】([Space])。ライトも消せ。"]},{id:"note-bench",title:"改札内コンコース 13・14番線階段前の手帳",date:"日付不明",x:8.6*F,y:.55,z:8.5*F,rotY:.35,lines:["新宿駅の地下は東西自由通路と中央通路が7〜16番線の階段で繋がっている。","J・ADビジョンの光柱の陰から、紫の大きな耳が半分だけ覗いていた。懐中電灯を当てた瞬間、照明が端から順番に破裂した。","硬貨([G])を遠くへ投げれば音のほうへ走る。西口連絡通路の公衆電話が鳴っても、絶対に出るな。"]},{id:"note-newdays",title:"NewDays 新宿（東口改札外）シャッター貼紙",date:"11月19日 深夜",x:19*F+.06,y:1.38,z:5.8*F,rotY:Math.PI/2,vertical:!0,lines:["【緊急】東口・地上出口（歌舞伎町・アルタ方面）強制解錠手順","1. 地下みどりの窓口横 きっぷうりば / 2. 西改札前（西口広場）","3. 改札内 13・14番線階段横 精算所 / 4. 中央西改札 / 5. 中央東改札","5か所すべてでSuicaチャージし ¥1,000 に到達すると、東口非常ゲートの緑ランプが点灯する。","※13・14番線や15・16番線から電車の音が聴こえても、終電はもう終わっている。階段を上がるな。"]},{id:"note-metro",title:"中央通路 清掃員のメモ",date:"11月19日 00:34",x:10.5*F,y:.03,z:12.2*F,rotY:-.45,lines:["中央通路の証明写真機のカーテンの中でストロボが光った。誰も入っていないのに。","ロッカーに隠れている時、扉のスリットのすぐ向こうに奴の赤い目が見えた。","[Space]（スマホは「息を止める」）を押し続けて息を殺したら、扉を引っ掻いて去っていった。息を切らすな。"]}],Hg=[{id:"coin-1",x:11.5*F,y:.02,z:2.2*F},{id:"coin-2",x:3.5*F,y:.02,z:6.5*F},{id:"coin-3",x:11.5*F,y:.02,z:8.5*F},{id:"coin-4",x:14.5*F,y:.02,z:11.8*F}],yr=[{x:16.5*F,z:2.2*F},{x:11*F,z:2.2*F},{x:5.5*F,z:2.2*F},{x:4.5*F,z:6.5*F},{x:8.5*F,z:8.5*F},{x:16.5*F,z:6.5*F},{x:16.5*F,z:11.5*F},{x:10.5*F,z:11.8*F},{x:4.5*F,z:11.5*F},{x:1.5*F,z:8.5*F},{x:19.5*F,z:8.5*F}],Vg=[{x:6.5*F,z:3.5*F},{x:8.5*F,z:3.5*F},{x:10.5*F,z:3.5*F},{x:12.5*F,z:3.5*F},{x:14.5*F,z:3.5*F}];class Wg{colliders=[];exitGateColliderIndex=-1;constructor(){this.buildColliders()}buildColliders(){for(let t=0;t<Mi;t++)for(let e=0;e<Jn;e++){const n=Bs[t][e],i=e*F,s=t*F;if(n===1)this.colliders.push({minX:i,maxX:i+F,minZ:s,maxZ:s+F,opaque:!0});else if(n===2){const o=(F-1.92)*.5,a=(F-1.54)*.5;this.colliders.push({minX:i+o,maxX:i+F-o,minZ:s+a,maxZ:s+F-a,opaque:!0})}else n===3?this.colliders.push({minX:i,maxX:i+F,minZ:s+.15,maxZ:s+.65,opaque:!1}):n===4&&this.colliders.push({minX:i+.18,maxX:i+F-.18,minZ:s+.14,maxZ:s+F-.14,opaque:!1})}this.colliders.push({minX:Be.x-1.05,maxX:Be.x+1.05,minZ:Be.z-1.05,maxZ:Be.z+1.05,opaque:!1}),this.colliders.push({minX:Xn-.68,maxX:Xn+.68,minZ:1*F,maxZ:qn-1.35,opaque:!1}),this.colliders.push({minX:Xn-.68,maxX:Xn+.68,minZ:qn+1.35,maxZ:4*F,opaque:!1}),this.exitGateColliderIndex=this.colliders.length,this.colliders.push({minX:Xn-.62,maxX:Xn+.62,minZ:qn-1.35,maxZ:qn+1.35,opaque:!1}),this.colliders.push({minX:11.2*F-1.2,maxX:11.2*F+1.2,minZ:6.2*F-.45,maxZ:6.2*F+.45,opaque:!1}),this.colliders.push({minX:8.6*F-1.4,maxX:8.6*F+1.4,minZ:8.5*F-.35,maxZ:8.5*F+.35,opaque:!1})}setExitGateUnlocked(t){const e=this.colliders[this.exitGateColliderIndex];e&&(t?(e.minZ=-999,e.maxZ=-998):(e.minZ=qn-1.35,e.maxZ=qn+1.35))}resolveCircle(t,e,n){let i=t,s=e;for(let o=0;o<3;o++)for(const a of this.colliders){const l=Math.max(a.minX,Math.min(i,a.maxX)),c=Math.max(a.minZ,Math.min(s,a.maxZ)),h=i-l,u=s-c,f=h*h+u*u;if(f<n*n)if(f>1e-8){const d=Math.sqrt(f),g=n-d;i+=h/d*g,s+=u/d*g}else{const d=Math.abs(i-a.minX),g=Math.abs(i-a.maxX),x=Math.abs(s-a.minZ),m=Math.abs(s-a.maxZ),p=Math.min(d,g,x,m);p===d?i=a.minX-n:p===g?i=a.maxX+n:p===x?s=a.minZ-n:s=a.maxZ+n}}return{x:i,z:s}}hasLineOfSight(t,e,n,i){const s=n-t,o=i-e,a=Math.hypot(s,o);if(a<.05)return!0;const l=Math.ceil(a/.35);for(let c=1;c<l;c++){const h=c/l,u=t+s*h,f=e+o*h;for(const d of this.colliders)if(d.opaque&&u>=d.minX&&u<=d.maxX&&f>=d.minZ&&f<=d.maxZ)return!1}return!0}}function fi(r,t){const e=mc(r.x,r.z),n=mc(t.x,t.z),i=(m,p)=>m<1||m>=Jn-1||p<1||p>=Mi-1?!1:Bs[p][m]===0,s=m=>{if(i(m.col,m.row))return m;for(let p=1;p<=3;p++)for(let y=-p;y<=p;y++)for(let v=-p;v<=p;v++)if(i(m.col+v,m.row+y))return{col:m.col+v,row:m.row+y};return{col:11,row:2}},o=s(e),a=s(n),l=(m,p)=>`${m},${p}`,c=[{c:o.col,r:o.row,g:0,f:Math.hypot(a.col-o.col,a.row-o.row),parent:null}],h=new Map([[l(o.col,o.row),0]]),u=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[-1,1,1.414],[1,-1,1.414],[-1,-1,1.414]];let f=null,d=0;for(;c.length>0&&d++<480;){c.sort((p,y)=>p.f-y.f);const m=c.shift();if(m.c===a.col&&m.r===a.row){f=m;break}for(const[p,y,v]of u){const _=m.c+p,A=m.r+y;if(!i(_,A)||p!==0&&y!==0&&(!i(m.c+p,m.r)||!i(m.c,m.r+y)))continue;const E=m.g+v,w=l(_,A);E<(h.get(w)??1/0)&&(h.set(w,E),c.push({c:_,r:A,g:E,f:E+Math.hypot(a.col-_,a.row-A),parent:m}))}}if(!f)return[{x:t.x,z:t.z}];const g=[];let x=f;for(;x&&x.parent;)g.unshift({x:(x.c+.5)*F,z:(x.r+.5)*F}),x=x.parent;return g.length>0?g[g.length-1]={x:t.x,z:t.z}:g.push({x:t.x,z:t.z}),g}function ds(r){let t=r>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function wt(r,t){const e=document.createElement("canvas");return e.width=r,e.height=t,[e,e.getContext("2d")]}function Ut(r,t=1,e=1,n=!0){const i=new ni(r);return i.wrapS=ti,i.wrapT=ti,i.repeat.set(t,e),i.anisotropy=8,n&&(i.colorSpace=Me),i.needsUpdate=!0,i}function ii(r,t=2,e=1,n=1){const i=r.width,s=r.height,o=r.getContext("2d").getImageData(0,0,i,s).data,[a,l]=wt(i,s),c=l.createImageData(i,s),h=c.data,u=(f,d)=>{const g=(f%i+i)%i,x=(d%s+s)%s;return o[(x*i+g)*4]/255};for(let f=0;f<s;f++)for(let d=0;d<i;d++){const g=u(d-1,f),x=u(d+1,f),m=u(d,f-1),p=u(d,f+1);let y=(g-x)*t,v=(m-p)*t,_=1;const A=1/Math.hypot(y,v,_);y*=A,v*=A,_*=A;const E=(f*i+d)*4;h[E]=Math.round((y*.5+.5)*255),h[E+1]=Math.round((v*.5+.5)*255),h[E+2]=Math.round((_*.5+.5)*255),h[E+3]=255}return l.putImageData(c,0,0),Ut(a,e,n,!1)}function Xg(){const r=qg(),t=jg(),e=Kg(),n=rx(),i=Ex(),s=new Map,o=new Map;for(const a of Ma)s.set(a.id,Qg(a)),o.set(a.numLeft,yc(a.numLeft,a.titleLeft,a.colorLeft)),o.set(a.numRight,yc(a.numRight,a.titleRight,a.colorRight));return{wallTile:r.color,wallNormal:r.normal,wallRoughness:r.roughness,pillarMetal:Yg(),floorTerrazzo:t.color,floorNormal:t.normal,floorRoughness:t.roughness,ceilingLouver:e.color,ceilingNormal:e.normal,tactileLine:xc(!1),tactileDots:xc(!0),tactileLineNormal:Zg(),lockerMetal:sx(),brushedMetalNormal:Tx(),shutterMetal:n.color,shutterNormal:n.normal,newDaysShutter:ox(),vendingFront:ax(),ticketMachineFront:lx(),chargeMachineHeader:cx(),chargeMachineLowerDeck:hx(),turnstileFrontArrow:ux(),barricadePanel:fx(),fireAlarmBox:dx(),fareTableHeader:ex(),fareAdjustFront:nx(),fareAdjustSign:ix(),midoriHeader:Jg(),gateHeaderWest:vr("西改札","West Gate","西检票口  서쪽 개찰구"),gateHeaderEast:vr("東改札","East Gate","東检票口  동쪽 개찰구"),gateHeaderCentralWest:vr("中央西改札","Central West Gate","小田急線・京王線のりかえ"),gateHeaderCentralEast:vr("中央東改札","Central East Gate","ルミネエスト・東口方面"),gatePillarWest:_c("西改札","West Gate","西检票口  서쪽 개찰구"),gatePillarEast:_c("東改札","East Gate","東检票口  동쪽 개찰구"),platformStairHeaders:s,platformNumPlaques:o,stationMap:Cx(),wall456Stages:[0,1,2,3,4].map(a=>$g(a)),signageStages:[0,1,2,3,4].map(a=>yh(a)),posterStages:[0,1,2].map(a=>Rx(a)),signEastExit:Mr("東口・アルプス広場・歌舞伎町 →","East Exit · Alps Sq. / Kabukicho / Alta / Marunouchi Line","#f4f5f0","#14181c",["#0e6b38","#80c342","#e62e36"]),signWestPassage:Mr("← 西口地下広場・都庁・小田急・京王","West Concourse · for Met. Gov. Office / Odakyu / Keio Lines","#f4f5f0","#14181c",["#0e6b38","#008ed6","#dd0077"]),signCentralEast:Mr("← 東改札 / 中央東改札・ルミネエスト →","East Gate · Central East Gate / LUMINE EST / NewDays","#f4f5f0","#14181c",["#80c342","#f15a22","#ffd400"]),signMetroPromenade:Mr("← 中央西改札 / 7〜16番線 / 中央東改札 →","Central Passage · Tracks 7-16 / Odakyu & Keio Transfer","#131b24","#f0f4f2",["#80c342","#f15a22","#ffd400"]),signMidoriTicket:tx("← きっぷうりば・みどりの窓口","Tickets / JR Ticket Office [i]"),signYamanote:vc("14・15","山手線","渋谷・品川 / 池袋・上野方面 [JY17]","#80c342"),signChuo:vc("7・8","中央線（快速）","東京 / 高尾・立川方面 [JC05]","#f15a22"),signStationName:px(),signWarning:gx(),signEmergencyExit:mx(),signPhotoBooth:xx(),signPayphone:_x(),pedestalPlaque:yx(),wetFloorSign:vx(),clockFace:Mx(),graffitiDonotLook:Mc("目を合わせるな","新宿ウォールが赤くなったら走れ"),graffitiSound:Mc("音に反応する","隠れたら [Space] で息を止めろ"),fireHydrant:bx(),floorGrate:i.color,floorGrateNormal:i.normal,clawDragDecal:wx(),flashlightCookie:Sx(),rabbitSuitNormal:Ax(),rabbitSuitGrime:Sc(!1),rabbitFaceGrime:Sc(!0),puddleAlpha:Lx(),rippleRing:Dx(),lightShaftSoft:Nx()}}function qg(){const[r,t]=wt(1024,1024),[e,n]=wt(512,512),[i,s]=wt(512,512),o=ds(2026);t.fillStyle="#c5c3bc",t.fillRect(0,0,1024,1024),n.fillStyle="#c8c8c8",n.fillRect(0,0,512,512),s.fillStyle="#a8a8a8",s.fillRect(0,0,512,512);const a=256,l=256;for(let u=0;u<1024;u+=l)for(let f=0;f<1024;f+=a){const d=Math.floor((o()-.5)*8),g=196+d,x=194+d,m=188+d;t.fillStyle=`rgb(${g},${x},${m})`,t.fillRect(f+3,u+3,a-6,l-6);const p=205+(o()-.5)*10;n.fillStyle=`rgb(${p|0},${p|0},${p|0})`,n.fillRect(f/2+1.5,u/2+1.5,a/2-3,l/2-3);const y=135+(o()-.5)*20;s.fillStyle=`rgb(${y|0},${y|0},${y|0})`,s.fillRect(f/2+1.5,u/2+1.5,a/2-3,l/2-3)}t.strokeStyle="rgba(72,74,72,0.75)",t.lineWidth=3,n.strokeStyle="#707070",n.lineWidth=1.8;for(let u=0;u<=1024;u+=l)t.beginPath(),t.moveTo(0,u),t.lineTo(1024,u),t.stroke(),n.beginPath(),n.moveTo(0,u/2),n.lineTo(512,u/2),n.stroke();for(let u=0;u<=1024;u+=a)t.beginPath(),t.moveTo(u,0),t.lineTo(u,1024),t.stroke(),n.beginPath(),n.moveTo(u/2,0),n.lineTo(u/2,512),n.stroke();const c=t.createLinearGradient(0,956,0,1024);c.addColorStop(0,"#787e84"),c.addColorStop(.35,"#aeb4ba"),c.addColorStop(1,"#54585e"),t.fillStyle=c,t.fillRect(0,956,1024,68),s.fillStyle="#484848",s.fillRect(0,478,512,34);const h=t.createLinearGradient(0,0,0,140);return h.addColorStop(0,"rgba(28,32,36,0.34)"),h.addColorStop(1,"rgba(28,32,36,0)"),t.fillStyle=h,t.fillRect(0,0,1024,140),{color:Ut(r,1,1,!0),normal:ii(e,1.4,1,1),roughness:Ut(i,1,1,!1)}}function Yg(){const[r,t]=wt(512,1024);t.fillStyle="#d4d6db",t.fillRect(0,0,512,1024);for(let n=0;n<940;n+=235){const i=t.createLinearGradient(0,n,512,n);i.addColorStop(0,"#c6c9cf"),i.addColorStop(.5,"#e2e5ea"),i.addColorStop(1,"#c4c7cd"),t.fillStyle=i,t.fillRect(3,n+3,506,229),t.strokeStyle="rgba(72,76,82,0.72)",t.lineWidth=3,t.strokeRect(2,n+2,508,231)}const e=t.createLinearGradient(0,940,512,940);return e.addColorStop(0,"#6a7076"),e.addColorStop(.5,"#a4abb2"),e.addColorStop(1,"#646a70"),t.fillStyle=e,t.fillRect(0,940,512,84),t.strokeStyle="#2a2e33",t.lineWidth=4,t.beginPath(),t.moveTo(0,940),t.lineTo(512,940),t.stroke(),Ut(r,1,1,!0)}function jg(){const[r,t]=wt(1024,1024),[e,n]=wt(512,512),[i,s]=wt(512,512),o=ds(3088);t.fillStyle="#969289",t.fillRect(0,0,1024,1024),n.fillStyle="#d4d4d4",n.fillRect(0,0,512,512),s.fillStyle="#7c7c7c",s.fillRect(0,0,512,512);const a=256,l=[[0,1,0,0],[1,0,1,0],[0,0,0,1],[0,1,1,0]];for(let c=0;c<4;c++)for(let h=0;h<4;h++){const u=h*a,f=c*a,d=l[c][h]===1,g=Math.floor((o()-.5)*8),x=(d?132:168)+g,m=(d?127:163)+g,p=(d?118:153)+g;t.fillStyle=`rgb(${x},${m},${p})`,t.fillRect(u+2,f+2,a-4,a-4);const y=212+(o()-.5)*10;n.fillStyle=`rgb(${y|0},${y|0},${y|0})`,n.fillRect(u/2+1,f/2+1,a/2-2,a/2-2);const v=(d?122:136)+(o()-.5)*20;s.fillStyle=`rgb(${v|0},${v|0},${v|0})`,s.fillRect(u/2+1,f/2+1,a/2-2,a/2-2)}for(let c=0;c<2e4;c++){const h=o()*1024,u=o()*1024,f=o(),d=f>.7?190:f>.34?136:64,g=f>.88?2.5:1.5;t.fillStyle=`rgba(${d},${d-2},${d-5},${.16+o()*.24})`,t.fillRect(h,u,g,g)}for(let c=0;c<18;c++){const h=o()*1024,u=o()*1024,f=45+o()*110,d=t.createRadialGradient(h,u,8,h,u,f);d.addColorStop(0,"rgba(32, 34, 36, 0.14)"),d.addColorStop(1,"rgba(32, 34, 36, 0)"),t.fillStyle=d,t.fillRect(h-f,u-f,f*2,f*2)}for(let c=0;c<14;c++){const h=o()*512,u=o()*512,f=36+o()*82,d=s.createRadialGradient(h,u,6,h,u,f);d.addColorStop(0,"rgba(62,62,62,0.72)"),d.addColorStop(.55,"rgba(92,92,92,0.52)"),d.addColorStop(1,"rgba(130,130,130,0)"),s.fillStyle=d,s.fillRect(h-f,u-f,f*2,f*2)}t.strokeStyle="rgba(48,46,42,0.86)",t.lineWidth=3,n.strokeStyle="#a4a4a4",n.lineWidth=1.4,s.strokeStyle="#e0e0e0",s.lineWidth=2;for(let c=0;c<=1024;c+=a)t.beginPath(),t.moveTo(c,0),t.lineTo(c,1024),t.stroke(),t.beginPath(),t.moveTo(0,c),t.lineTo(1024,c),t.stroke(),n.beginPath(),n.moveTo(c/2,0),n.lineTo(c/2,512),n.stroke(),n.beginPath(),n.moveTo(0,c/2),n.lineTo(512,c/2),n.stroke(),s.beginPath(),s.moveTo(c/2,0),s.lineTo(c/2,512),s.stroke(),s.beginPath(),s.moveTo(0,c/2),s.lineTo(512,c/2),s.stroke();return{color:Ut(r,21,15,!0),normal:ii(e,.76,21,15),roughness:Ut(i,21,15,!1)}}function Kg(){const[r,t]=wt(512,512),[e,n]=wt(256,256),i=ds(5151);t.fillStyle="#c8c6be",t.fillRect(0,0,512,512),n.fillStyle="#c0c0c0",n.fillRect(0,0,256,256);for(let s=0;s<512;s+=32){const o=Math.floor((i()-.5)*6);t.fillStyle=`rgb(${202+o},${200+o},${194+o})`,t.fillRect(0,s+3,512,27),t.fillStyle="#6c6a64",t.fillRect(0,s,512,3),n.fillStyle="#e4e4e4",n.fillRect(0,s/2+2,256,13),n.fillStyle="#525252",n.fillRect(0,s/2,256,2)}return t.fillStyle="#484a4d",t.fillRect(0,0,10,512),t.fillStyle="#8c8a84",t.fillRect(10,0,6,512),t.strokeStyle="rgba(110,110,106,0.75)",t.lineWidth=2.5,t.strokeRect(160,128,192,192),{color:Ut(r,21,15,!0),normal:ii(e,1.35,21,15)}}function xc(r){const[t,e]=wt(128,128);if(e.fillStyle="#e0b212",e.fillRect(0,0,128,128),r)for(let n=0;n<5;n++)for(let i=0;i<5;i++){const s=14+i*25,o=14+n*25;e.fillStyle="#9c7808",e.beginPath(),e.arc(s+1.5,o+1.5,7,0,Math.PI*2),e.fill(),e.fillStyle="#f5ca28",e.beginPath(),e.arc(s,o,6.2,0,Math.PI*2),e.fill()}else for(let n=0;n<4;n++){const i=14+n*31;e.fillStyle="#9c7808",e.fillRect(i+2,6,11,116),e.fillStyle="#f5ca28",e.fillRect(i,6,10,116)}return e.strokeStyle="rgba(54,42,10,0.62)",e.lineWidth=3,e.strokeRect(1.5,1.5,125,125),Ut(t,1,1,!0)}function Zg(){const[r,t]=wt(128,128);t.fillStyle="#606060",t.fillRect(0,0,128,128),t.fillStyle="#ececec";for(let e=0;e<4;e++)t.fillRect(14+e*31,6,10,116);return ii(r,2.2,1,1)}function $g(r){const[t,e]=wt(2048,256);if(r===0||r===1){const n=e.createLinearGradient(0,0,2048,256);r===0?(n.addColorStop(0,"#0d4e74"),n.addColorStop(.24,"#1c428c"),n.addColorStop(.5,"#4c2c82"),n.addColorStop(.76,"#842e72"),n.addColorStop(1,"#105078")):(n.addColorStop(0,"#0b2f4e"),n.addColorStop(.3,"#2d1858"),n.addColorStop(.6,"#4d144a"),n.addColorStop(1,"#0d2a46")),e.fillStyle=n,e.fillRect(0,0,2048,256);for(let s=0;s<7;s++){e.beginPath();const o=52+s*25;e.moveTo(0,o);for(let a=0;a<=2048;a+=64){const l=o+Math.sin(a*.0045+s*1.1)*44+Math.cos(a*.009-s*.7)*22;e.lineTo(a,l)}e.lineTo(2048,256),e.lineTo(0,256),e.closePath(),e.fillStyle=s%2===0?r===0?"rgba(72, 188, 232, 0.17)":"rgba(92, 54, 152, 0.20)":r===0?"rgba(208, 96, 184, 0.17)":"rgba(128, 24, 96, 0.24)",e.fill()}e.shadowColor="rgba(6, 10, 22, 0.72)",e.shadowBlur=10,e.fillStyle="rgba(232, 242, 248, 0.92)",e.textAlign="center",e.font="600 26px sans-serif",e.fillText("WELCOME TO",720,102),e.font="700 62px sans-serif",e.fillText("SHINJUKU",720,164),e.font="600 26px sans-serif",e.fillText("ようこそ",1320,102),e.font="700 60px sans-serif",e.fillText("新 宿",1320,164),e.shadowBlur=0,e.fillStyle="rgba(16, 26, 38, 0.78)",e.fillRect(48,26,340,204),e.strokeStyle="#80c342",e.lineWidth=4,e.strokeRect(48,26,340,204),e.fillStyle="#a8ef72",e.font="bold 20px sans-serif",e.fillText("JR新宿駅 東西自由通路",218,66),e.fillStyle="#ffffff",e.font="bold 26px sans-serif",e.fillText(r===0?"新マスコット「紫のうさぎ」":"展示ケース破損・警戒中",218,114),e.fillStyle="#c8d8e4",e.font="600 18px sans-serif",e.fillText(r===0?"アルプス広場にて特別展示中":"00:47 終電運行終了・東口閉鎖",218,162);const i=(s,o,a)=>{e.fillStyle="#6c42a4",e.beginPath(),e.ellipse(s-26,o-60,12,34,-.35,0,Math.PI*2),e.ellipse(s+26,o-60,12,34,.35,0,Math.PI*2),e.arc(s,o-12,34,0,Math.PI*2),e.ellipse(s,o+48,42,48,0,0,Math.PI*2),e.fill(),e.fillStyle="#efeae0",e.beginPath(),e.ellipse(s,o-14,24,18,0,0,Math.PI*2),e.fill(),e.fillStyle=a?"#ff242c":"#101216",e.beginPath(),e.arc(s-10,o-16,4.5,0,Math.PI*2),e.arc(s+10,o-16,4.5,0,Math.PI*2),e.fill()};i(1820,142,r>=1),r===1&&(i(1024,148,!0),i(510,152,!0))}else if(r===2){const n=136.53333333333333;for(let i=0;i<15;i++){const s=i*n;e.fillStyle=i%2===0?"#1c1228":"#261736",e.fillRect(s+2,0,n-4,256),e.fillStyle="#4e1658",e.fillRect(s+2,0,n-4,34),e.fillStyle="#f2e8f8",e.textAlign="center",e.font="bold 14px sans-serif",e.fillText("見てるよ",s+n*.5,23);const o=s+n*.5,a=136;e.fillStyle="#5c308e",e.beginPath(),e.ellipse(o-24,a-52,11,32,-.38,0,Math.PI*2),e.ellipse(o+24,a-52,11,32,.38,0,Math.PI*2),e.arc(o,a-6,34,0,Math.PI*2),e.fill(),e.fillStyle="#dcd4c8",e.beginPath(),e.ellipse(o,a-8,25,18,0,0,Math.PI*2),e.fill(),e.fillStyle="#07060a",e.beginPath(),e.arc(o-10,a-11,5.5,0,Math.PI*2),e.arc(o+10,a-11,5.5,0,Math.PI*2),e.fill(),e.fillStyle="#ff262c",e.beginPath(),e.arc(o-10,a-11,2.2,0,Math.PI*2),e.arc(o+10,a-11,2.2,0,Math.PI*2),e.fill(),e.fillStyle="#e43a44",e.font="bold 18px serif",e.fillText(i%3===0?"まだ帰れない":i%3===1?"東口閉鎖中":"うしろに注意",o,232)}}else if(r===3)e.fillStyle="#0c0e13",e.fillRect(0,0,2048,256),e.strokeStyle="#d82c34",e.lineWidth=6,e.strokeRect(8,8,2032,240),e.fillStyle="#f03840",e.textAlign="center",e.font="900 72px serif",e.fillText("う し ろ に い る        振 り 向 く な        息 を 止 め ろ",1024,150),e.fillStyle="#a4b2be",e.font="700 22px monospace",e.fillText("SHINJUKU WALL 456 // EMERGENCY ALERT — UNIDENTIFIED ENTITY IN CONCOURSE B1F",1024,218);else{const n=e.createLinearGradient(0,0,0,256);n.addColorStop(0,"#3a0508"),n.addColorStop(.5,"#1a0305"),n.addColorStop(1,"#42060a"),e.fillStyle=n,e.fillRect(0,0,2048,256);for(let i=220;i<=1828;i+=402)e.fillStyle="#3c1452",e.beginPath(),e.ellipse(i,128,145,118,0,0,Math.PI*2),e.fill(),e.fillStyle="#d6cfc4",e.beginPath(),e.ellipse(i,120,108,76,0,0,Math.PI*2),e.fill(),e.fillStyle="#050407",e.beginPath(),e.arc(i-42,104,22,0,Math.PI*2),e.arc(i+42,104,22,0,Math.PI*2),e.fill(),e.fillStyle="#ff1e26",e.beginPath(),e.arc(i-42,104,6.5,0,Math.PI*2),e.arc(i+42,104,6.5,0,Math.PI*2),e.fill(),e.fillStyle="#050407",e.beginPath(),e.ellipse(i,150,64,42,0,0,Math.PI),e.fill();e.fillStyle="#ff2e36",e.textAlign="center",e.font="900 54px serif",e.fillText("逃 が さ な い",420,236),e.fillText("み つ け た",1024,236),e.fillText("逃 が さ な い",1628,236)}e.fillStyle="rgba(0,0,0,0.14)";for(let n=0;n<256;n+=4)e.fillRect(0,n,2048,1);return Ut(t,1,1,!0)}function Jg(){const[r,t]=wt(2048,128);t.fillStyle="#f6f8f5",t.fillRect(0,0,2048,128),t.strokeStyle="#26282a",t.lineWidth=6,t.strokeRect(3,3,2042,122),t.strokeStyle="#dcdfd9",t.lineWidth=2;for(const n of[420,840,1260,1680])t.beginPath(),t.moveTo(n,6),t.lineTo(n,122),t.stroke();const e=560;return t.fillStyle="#0d7a3e",t.fillRect(e,20,88,88),t.fillStyle="#ffffff",t.beginPath(),t.arc(e+44,45,13,0,Math.PI*2),t.fill(),t.fillRect(e+22,62,44,22),t.fillStyle="#0d7a3e",t.fillRect(e+14,82,60,7),t.textAlign="left",t.fillStyle="#0d7a3e",t.font="800 58px sans-serif",t.fillText("みどりの窓口",e+114,86),t.fillStyle="#14171a",t.font="700 56px sans-serif",t.fillText("Ticket Office",e+492,86),Ut(r,1,1,!0)}function vr(r,t,e){const[n,i]=wt(2048,128);return i.fillStyle="#146837",i.fillRect(0,0,2048,128),i.fillStyle="#0d4a26",i.fillRect(0,118,2048,10),i.fillStyle="#ffffff",i.textAlign="left",i.font="italic 900 52px sans-serif",i.fillText("JR",180,76),i.font="700 38px sans-serif",i.fillText("新宿駅",274,58),i.font="600 20px sans-serif",i.fillText("Shinjuku Station",274,90),i.font="800 54px sans-serif",i.fillText(r,620,64),i.font="600 22px sans-serif",i.fillText(`${t}    ${e}`,624,98),[["JY","#7ac142"],["JC","#f15a22"],["JB","#f2c700"],["JA","#009e60"],["JS","#e21f26"]].forEach(([o,a],l)=>{const c=1360+l*78,h=32;i.fillStyle="#ffffff",i.fillRect(c,h,56,56),i.strokeStyle=a,i.lineWidth=7,i.strokeRect(c+4,h+4,48,48),i.fillStyle="#14181c",i.textAlign="center",i.font="900 24px sans-serif",i.fillText(o,c+28,h+37)}),Ut(n,1,1,!0)}function _c(r,t,e){const[n,i]=wt(512,512);return i.fillStyle="#146837",i.fillRect(0,0,512,512),i.strokeStyle="#e6ece8",i.lineWidth=8,i.strokeRect(8,8,496,496),i.fillStyle="#ffffff",i.textAlign="left",i.font="italic 900 54px sans-serif",i.fillText("JR",44,92),i.font="700 42px sans-serif",i.fillText("新宿駅",136,76),i.font="600 22px sans-serif",i.fillText("Shinjuku Station",136,108),[["JY","#7ac142"],["JC","#f15a22"],["JB","#f2c700"],["JA","#009e60"],["JS","#e21f26"]].forEach(([o,a],l)=>{const c=46+l*62,h=136;i.fillStyle="#ffffff",i.fillRect(c,h,52,52),i.strokeStyle=a,i.lineWidth=7,i.strokeRect(c+4,h+4,44,44),i.fillStyle="#14181c",i.textAlign="center",i.font="900 22px sans-serif",i.fillText(o,c+26,h+34)}),i.fillStyle="#ffffff",i.textAlign="center",i.font="800 92px sans-serif",i.fillText(r,256,316),i.font="700 44px sans-serif",i.fillText(t,256,388),i.font="600 26px sans-serif",i.fillText(e,256,446),Ut(n,1,1,!0)}function Qg(r){const[t,e]=wt(1024,192);e.fillStyle=r.colorLeft,e.fillRect(0,0,512,192),e.fillStyle=r.colorRight,e.fillRect(512,0,512,192),e.fillStyle="#f6f8f6",e.fillRect(468,12,88,168),e.fillStyle="#14181c",e.textAlign="center",e.font="900 72px sans-serif",e.fillText("↑",512,120);const i=r.colorLeft==="#e8be00"?"#14181c":"#ffffff";e.fillStyle=i,e.textAlign="left",e.font="900 84px sans-serif",e.fillText(r.numLeft,24,114),e.font="800 32px sans-serif",e.fillText(r.titleLeft,138,76),e.font="600 21px sans-serif",e.fillText(r.subLeft,138,122);const o=r.colorRight==="#e8be00"?"#14181c":"#ffffff";return e.fillStyle=o,e.textAlign="right",e.font="900 84px sans-serif",e.fillText(r.numRight,1e3,114),e.textAlign="left",e.font="800 32px sans-serif",e.fillText(r.titleRight,576,76),e.font="600 21px sans-serif",e.fillText(r.subRight,576,122),e.fillStyle="#f4f4f0",e.fillRect(0,152,1024,40),e.fillStyle="#c42428",e.textAlign="center",e.font="700 22px sans-serif",e.fillText("↑ 1F ホーム階段  //  00:47 終電運行終了・ホーム立入禁止",512,180),Ut(t,1,1,!0)}function yc(r,t,e){const[n,i]=wt(256,512);return i.fillStyle="#1c2024",i.fillRect(0,0,256,512),i.fillStyle=e,i.fillRect(0,0,256,20),i.fillStyle="#f4f6f8",i.textAlign="center",i.font="900 162px sans-serif",i.fillText(r,128,186),i.fillStyle="#cfd6dc",i.font="700 20px sans-serif",i.fillText(`${r}番線のりば`,128,228),i.fillStyle="#e8e6df",i.fillRect(28,260,200,224),i.strokeStyle="#687078",i.lineWidth=6,i.strokeRect(28,260,200,224),i.fillStyle="#b82226",i.fillRect(34,266,188,38),i.fillStyle="#ffffff",i.font="bold 18px sans-serif",i.fillText("終電終了のお知らせ",128,291),i.fillStyle="#1c2024",i.font="bold 16px sans-serif",i.fillText(t,128,332),i.font="600 14px sans-serif",i.fillText("本日の運転はすべて",128,366),i.fillText("終了いたしました。",128,390),i.fillStyle="#b82226",i.font="bold 16px sans-serif",i.fillText("東口非常出口へ",128,430),i.fillStyle="#22262a",i.font="bold 14px monospace",i.fillText("JR東日本 新宿駅",128,464),Ut(n,1,1,!0)}function tx(r,t){const[e,n]=wt(640,160);return n.fillStyle="#f6f8f5",n.fillRect(0,0,640,160),n.strokeStyle="#1c2024",n.lineWidth=8,n.strokeRect(4,4,632,152),n.fillStyle="#14181c",n.textAlign="center",n.font="800 40px sans-serif",n.fillText(r,320,76),n.fillStyle="#3a4248",n.font="600 22px sans-serif",n.fillText(t,320,122),Ut(e,1,1,!0)}function ex(){const[r,t]=wt(1024,256);t.fillStyle="#f4f7f5",t.fillRect(0,0,1024,256),t.strokeStyle="#5c646c",t.lineWidth=6,t.strokeRect(3,3,1018,250);for(let e=0;e<4;e++){const n=12+e*252;t.strokeStyle="#7a828a",t.lineWidth=4,t.strokeRect(n,12,240,232),t.fillStyle="#0e6b38",t.fillRect(n+4,16,232,28),t.fillStyle="#ffffff",t.textAlign="center",t.font="bold 16px sans-serif",t.fillText(e===0?"JR東日本線 近郊区間運賃表":e===1?"山手線・中央線 案内図":e===2?"湘南新宿・埼京線 運賃表":"Suica・指定席ご案内",n+120,36);const i=n+120,s=126;t.strokeStyle="#7ac142",t.lineWidth=5,t.beginPath(),t.ellipse(i,s,46,56,0,0,Math.PI*2),t.stroke(),t.strokeStyle="#f15a22",t.beginPath(),t.moveTo(n+20,s),t.lineTo(n+220,s),t.stroke(),t.strokeStyle="#f2c700",t.beginPath(),t.moveTo(n+20,s+12),t.lineTo(n+220,s+12),t.stroke(),t.strokeStyle="#008ed6",t.beginPath(),t.moveTo(i-20,56),t.lineTo(i+25,224),t.stroke(),t.fillStyle="#e02428",t.fillRect(i-48,s-12,34,18),t.fillStyle="#ffffff",t.font="bold 12px sans-serif",t.fillText("新宿",i-31,s+1)}return Ut(r,1,1,!0)}function nx(){const[r,t]=wt(512,512);t.fillStyle="#d8dad6",t.fillRect(0,0,512,512),t.strokeStyle="#b4b8b4",t.lineWidth=2;for(let n=0;n<=512;n+=64)t.beginPath(),t.moveTo(n,0),t.lineTo(n,512),t.stroke();for(let n=0;n<=512;n+=64)t.beginPath(),t.moveTo(0,n),t.lineTo(512,n),t.stroke();for(let n=0;n<3;n++){const i=22+n*162;t.fillStyle="#e8be14",t.fillRect(i,76,144,240),t.strokeStyle="#383424",t.lineWidth=3,t.strokeRect(i,76,144,240),t.fillStyle="#181816",t.textAlign="center",t.font="bold 16px sans-serif",t.fillText("のりこし精算機",i+72,102),t.fillStyle="#162834",t.fillRect(i+18,118,108,86),t.fillStyle="#84e8f4",t.fillRect(i+24,124,96,74),t.fillStyle="#0c222c",t.font="bold 14px sans-serif",t.fillText("IC・きっぷ精算",i+72,156),t.fillText("Suicaチャージ",i+72,178),t.fillStyle="#24282c",t.fillRect(i+20,218,104,72)}const e=t.createLinearGradient(0,316,0,512);return e.addColorStop(0,"#b8bec4"),e.addColorStop(.12,"#787e84"),e.addColorStop(1,"#585e64"),t.fillStyle=e,t.fillRect(0,316,512,196),Ut(r,1,1,!0)}function ix(){const[r,t]=wt(512,112);return t.fillStyle="#f4f6f2",t.fillRect(0,0,512,112),t.strokeStyle="#1e2226",t.lineWidth=6,t.strokeRect(3,3,506,106),t.fillStyle="#181c20",t.fillRect(24,20,72,72),t.fillStyle="#f4c818",t.font="bold 28px sans-serif",t.textAlign="center",t.fillText("¥",60,66),t.fillStyle="#181c20",t.textAlign="left",t.font="800 36px sans-serif",t.fillText("精算機",116,56),t.font="700 22px sans-serif",t.fillText("Fare Adjustment Machine",116,88),Ut(r,1,1,!0)}function sx(){const[r,t]=wt(256,512);t.fillStyle="#2c3844",t.fillRect(0,0,256,512),t.fillStyle="#19222b",t.fillRect(0,0,256,44),t.fillStyle="#7cd152",t.fillRect(10,10,74,24),t.fillStyle="#0f1d0d",t.font="bold 14px sans-serif",t.fillText("Suica対応",15,27),t.fillStyle="#dce2e6",t.font="bold 15px sans-serif",t.fillText("コインロッカー",96,28);for(let e=0;e<4;e++)for(let n=0;n<2;n++){const i=8+n*124,s=52+e*114;t.fillStyle="#435262",t.fillRect(i,s,116,106),t.strokeStyle="#181e24",t.lineWidth=3,t.strokeRect(i,s,116,106),t.fillStyle="#1a1f24",t.fillRect(i+84,s+32,20,42),t.fillStyle=(e+n)%3===0?"#3ad678":"#d63e3e",t.fillRect(i+90,s+38,8,6),t.fillStyle="#cfd5dc",t.font="bold 13px monospace",t.fillText(`W-${e*2+n+201}`,i+10,s+22)}return Ut(r,1,1,!0)}function rx(){const[r,t]=wt(256,256),[e,n]=wt(128,128);t.fillStyle="#53585e",t.fillRect(0,0,256,256);for(let i=0;i<256;i+=16){const s=t.createLinearGradient(0,i,0,i+16);s.addColorStop(0,"#6a7076"),s.addColorStop(.5,"#4c5156"),s.addColorStop(1,"#2b2e32"),t.fillStyle=s,t.fillRect(0,i,256,16);const o=n.createLinearGradient(0,i/2,0,i/2+8);o.addColorStop(0,"#ffffff"),o.addColorStop(.5,"#909090"),o.addColorStop(1,"#202020"),n.fillStyle=o,n.fillRect(0,i/2,128,8)}return{color:Ut(r,2,2,!0),normal:ii(e,2.6,2,2)}}function ox(){const[r,t]=wt(512,512);for(let e=112;e<512;e+=16){const n=t.createLinearGradient(0,e,0,e+16);n.addColorStop(0,"#656c72"),n.addColorStop(.5,"#4c5258"),n.addColorStop(1,"#2e3236"),t.fillStyle=n,t.fillRect(0,e,512,16)}return t.fillStyle="#125a32",t.fillRect(0,0,512,112),t.fillStyle="#7cc93d",t.fillRect(0,96,512,16),t.fillStyle="#ffffff",t.font="900 50px sans-serif",t.textAlign="left",t.fillText("NewDays",28,66),t.fillStyle="#d4f2df",t.font="600 18px sans-serif",t.fillText("新宿（東口改札外） // 営業時間外",248,62),t.fillStyle="rgba(8,10,12,0.28)",t.fillRect(0,112,512,34),Ut(r,1,1,!0)}function ax(){const[r,t]=wt(256,512);t.fillStyle="#d4d6d2",t.fillRect(0,0,256,512),t.fillStyle="#114d7c",t.fillRect(0,0,256,36),t.fillStyle="#eaf6ff",t.font="bold 20px sans-serif",t.textAlign="center",t.fillText("acure  //  SHINJUKU",128,25),t.fillStyle="#121d26",t.fillRect(14,44,228,240),t.fillStyle="#dff2f8",t.fillRect(20,50,216,228);const e=["#2575b8","#c63529","#388a45","#d49a24","#1e242b","#cf6b24","#468aa6"];for(let n=0;n<3;n++){const i=66+n*74;t.fillStyle="#b4c0c6",t.fillRect(22,i+48,212,7);for(let s=0;s<6;s++){const o=30+s*33;t.fillStyle=e[(n*6+s)%e.length],t.fillRect(o,i+6,22,40),t.fillStyle="rgba(255,255,255,0.38)",t.fillRect(o+3,i+10,5,32),t.fillStyle=n===2?"#c43329":"#1b5896",t.fillRect(o,i+50,22,10)}}return t.fillStyle="#1f242b",t.fillRect(156,298,78,84),t.fillStyle="#2ec278",t.fillRect(168,312,54,22),t.fillStyle="#f2f5f2",t.font="bold 12px sans-serif",t.fillText("Suica",195,327),t.fillStyle="#161a1f",t.fillRect(22,400,212,82),t.strokeStyle="#737980",t.lineWidth=3,t.strokeRect(22,400,212,82),Ut(r,1,1,!0)}function Os(r,t,e,n,i){r.fillStyle="#f6f7f5",r.fillRect(t,e,n,i),r.fillStyle="#9a8068",r.fillRect(t+n*.14,e+i*.24,n*.18,i*.56),r.fillStyle="#d41b24",r.font=`900 ${Math.round(i*.62)}px sans-serif`,r.textAlign="left",r.fillText("IC",t+n*.36,e+i*.78)}function lx(){const[r,t]=wt(1024,512);return t.fillStyle="#d4d8da",t.fillRect(0,0,1024,512),[{kind:"green",title:"きっぷ・チャージ",sub:"Tickets / Charge"},{kind:"green",title:"きっぷ・チャージ",sub:"Tickets / Charge"},{kind:"multi",title:"定期券・Suica",sub:"Commuter Pass / Charge"},{kind:"mv",title:"指定席券売機",sub:"Reserved Seat Tickets"}].forEach((n,i)=>{const s=18+i*248,o=232,a=t.createLinearGradient(s,0,s+o,0);a.addColorStop(0,"#c8ced2"),a.addColorStop(.5,"#dde1e4"),a.addColorStop(1,"#bcc2c6"),t.fillStyle=a,t.fillRect(s,18,o,476),t.strokeStyle="#6c7278",t.lineWidth=3,t.strokeRect(s,18,o,476);const l=n.kind==="green"?"#1c9638":n.kind==="multi"?"#464a50":"#185296",c=n.kind==="green"?"#6ac042":n.kind==="multi"?"#8c929a":"#3a78c2",h=n.kind==="green"?"#6cc044":n.kind==="multi"?"#70767e":"#2a64ad";t.fillStyle=h,t.fillRect(s+4,22,54,106),t.fillStyle="#ffffff",t.font="italic 900 20px sans-serif",t.textAlign="center",t.fillText("JR",s+31,48),Os(t,s+11,58,40,26),t.fillStyle=l,t.fillRect(s+60,22,o-64,54),t.fillStyle="#ffffff",t.font="800 18px sans-serif",t.textAlign="center",t.fillText(n.title,s+60+(o-64)*.5,56),t.fillStyle=c,t.fillRect(s+60,78,o-64,50),t.fillStyle="#ffffff",t.textAlign="left",t.font="700 12px sans-serif",t.fillText(n.sub.split(" / ")[0],s+68,98),t.fillText(n.sub.split(" / ")[1]||"Tickets",s+68,116),t.fillStyle="#0e1114",t.fillRect(s+o-58,86,44,34),t.fillStyle="#b4babf",t.fillRect(s+12,138,o-24,152);for(let u=0;u<4;u++)t.fillStyle="#eaedf0",t.fillRect(s+18,156+u*28,22,20),t.strokeStyle="#70767c",t.lineWidth=1.5,t.strokeRect(s+18,156+u*28,22,20);t.fillStyle="#1e242a",t.fillRect(s+48,146,166,136),t.fillStyle="#f2f5f2",t.fillRect(s+54,152,154,124),n.kind==="multi"?(t.fillStyle="#249848",t.fillRect(s+62,174,66,36),t.fillStyle="#c83474",t.fillRect(s+62,218,66,36),t.fillStyle="#2c3036",t.fillRect(s+134,174,66,36),t.fillStyle="#22262c",t.fillRect(s+134,218,66,36),t.fillStyle="#ffffff",t.font="bold 10px sans-serif",t.textAlign="center",t.fillText("きっぷ",s+95,196),t.fillText("定期券",s+95,240),t.fillText("Suica",s+167,196),t.fillText("チャージ",s+167,240)):(t.strokeStyle="#38a446",t.lineWidth=3,t.strokeRect(s+62,164,138,86),t.fillStyle="#24943c",t.fillRect(s+64,166,134,18),t.fillStyle="#ffffff",t.textAlign="center",t.font="bold 10px sans-serif",t.fillText("Suica・きっぷ選択",s+131,179),Os(t,s+76,198,34,24),t.fillStyle="#7ec83c",t.fillRect(s+122,198,42,26),t.fillStyle="#183018",t.font="bold 9px sans-serif",t.fillText("Suica",s+143,214),t.fillStyle="#207834",t.fillRect(s+76,232,110,12)),t.fillStyle="#a4acb2",t.fillRect(s+12,300,o-24,178),t.fillStyle="#22272c",t.fillRect(s+22,314,62,32),t.fillStyle="#28a89a",t.fillRect(s+26,318,54,6),t.fillStyle="#1a1f24",t.fillRect(s+94,314,54,28),t.fillStyle="#262b30",t.fillRect(s+94,350,54,14),t.fillStyle="#d4d8dc",t.fillRect(s+158,314,52,54),t.fillStyle="#5a6066";for(let u=0;u<4;u++)for(let f=0;f<3;f++)t.fillRect(s+163+f*15,319+u*12,10,8);t.fillStyle="#181c20",t.fillRect(s+22,382,126,76),t.fillStyle="#2e343a",t.fillRect(s+28,390,114,28),t.fillRect(s+28,424,114,26),t.fillStyle="#181c20",t.fillRect(s+158,382,52,76)}),Ut(r,1,1,!0)}function cx(){const[r,t]=wt(512,256);return t.fillStyle="#e8ecea",t.fillRect(0,0,512,256),t.fillStyle="#6ec244",t.fillRect(6,6,122,244),t.fillStyle="#ffffff",t.font="italic 900 44px sans-serif",t.textAlign="center",t.fillText("JR",67,66),Os(t,20,92,94,62),t.fillStyle="#123e1c",t.font="700 16px sans-serif",t.fillText("Suica対応",67,198),t.fillStyle="#1a9a3a",t.fillRect(134,6,372,122),t.fillStyle="#ffffff",t.font="900 42px sans-serif",t.textAlign="center",t.fillText("きっぷ・チャージ",320,82),t.fillStyle="#6ec244",t.fillRect(134,134,372,116),t.fillStyle="#ffffff",t.textAlign="left",t.font="700 32px sans-serif",t.fillText("Tickets",160,182),t.fillText("Charge",160,224),t.fillStyle="#0c0f12",t.fillRect(384,150,102,82),t.strokeStyle="#384048",t.lineWidth=4,t.strokeRect(384,150,102,82),t.fillStyle="#48e88c",t.font="700 22px monospace",t.textAlign="center",t.fillText("¥200",435,198),Ut(r,1,1,!0)}function hx(){const[r,t]=wt(512,512),e=t.createLinearGradient(0,0,512,0);e.addColorStop(0,"#c6ccd0"),e.addColorStop(.5,"#dfe3e6"),e.addColorStop(1,"#bcc2c6"),t.fillStyle=e,t.fillRect(0,0,512,512),t.strokeStyle="#70767c",t.lineWidth=4,t.strokeRect(8,8,496,496),t.beginPath(),t.moveTo(8,226),t.lineTo(504,226),t.stroke(),t.fillStyle="#181c20",t.fillRect(28,36,134,72),t.fillStyle="#24b456",t.fillRect(46,56,98,10),t.fillStyle="#2c3238",t.font="700 16px sans-serif",t.textAlign="center",t.fillText("紙幣 / BILLS",95,132),t.fillStyle="#181c20",t.fillRect(184,36,136,86),t.fillStyle="#384048",t.fillRect(204,52,96,44),t.fillStyle="#2c3238",t.fillText("硬貨 / COINS",252,146),t.fillStyle="#edf0f2",t.fillRect(344,30,140,168),t.strokeStyle="#6c7278",t.lineWidth=3,t.strokeRect(344,30,140,168);for(let n=0;n<4;n++)for(let i=0;i<3;i++)t.fillStyle=n===3&&i===0?"#d44238":n===3&&i===2?"#228c44":"#6e757c",t.fillRect(358+i*40,44+n*36,30,26);return t.fillStyle="#161a1f",t.fillRect(28,250,294,224),t.strokeStyle="#5a6066",t.lineWidth=4,t.strokeRect(28,250,294,224),t.fillStyle="#2a3036",t.fillRect(44,272,262,62),t.fillRect(44,356,262,94),t.fillStyle="#aeb6bc",t.font="700 15px sans-serif",t.fillText("きっぷ・領収書 / TICKETS",175,308),t.fillText("おつり / CHANGE",175,408),t.fillStyle="#9aa0a6",t.fillRect(344,250,140,224),t.strokeStyle="#5a6066",t.strokeRect(344,250,140,224),t.fillStyle="#181c20",t.fillRect(0,482,512,30),Ut(r,1,1,!0)}function ux(){const[r,t]=wt(128,256);return t.fillStyle="#161a20",t.fillRect(0,0,128,256),t.strokeStyle="#3c444c",t.lineWidth=6,t.strokeRect(3,3,122,250),t.fillStyle="#0e281a",t.fillRect(18,20,92,92),t.fillStyle="#38e882",t.beginPath(),t.moveTo(64,98),t.lineTo(28,56),t.lineTo(48,56),t.lineTo(48,30),t.lineTo(80,30),t.lineTo(80,56),t.lineTo(100,56),t.closePath(),t.fill(),t.fillStyle="#06080a",t.fillRect(24,144,80,14),t.fillStyle="#54d88c",t.fillRect(24,138,80,4),Os(t,26,184,76,46),Ut(r,1,1,!0)}function fx(){const[r,t]=wt(512,256);t.fillStyle="#e6e4dc",t.fillRect(0,0,512,256);for(let e=-64;e<576;e+=48)t.fillStyle="#c82026",t.beginPath(),t.moveTo(e,0),t.lineTo(e+24,0),t.lineTo(e+8,38),t.lineTo(e-16,38),t.closePath(),t.fill(),t.beginPath(),t.moveTo(e,218),t.lineTo(e+24,218),t.lineTo(e+8,256),t.lineTo(e-16,256),t.closePath(),t.fill();return t.fillStyle="#181a1d",t.textAlign="center",t.font="900 46px sans-serif",t.fillText("終電終了・立入禁止",256,118),t.fillStyle="#b81e24",t.font="800 28px monospace",t.fillText("CLOSED AFTER LAST TRAIN — 00:47",256,166),t.fillStyle="#484e54",t.font="700 20px sans-serif",t.fillText("JR東日本 新宿駅",256,202),Ut(r,1,1,!0)}function dx(){const[r,t]=wt(128,256);return t.fillStyle="#a81c20",t.fillRect(0,0,128,256),t.strokeStyle="#520c0e",t.lineWidth=6,t.strokeRect(3,3,122,250),t.fillStyle="#ff3838",t.beginPath(),t.arc(64,52,18,0,Math.PI*2),t.fill(),t.fillStyle="#f2efe8",t.beginPath(),t.arc(64,136,34,0,Math.PI*2),t.fill(),t.fillStyle="#d42228",t.beginPath(),t.arc(64,136,18,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.textAlign="center",t.font="bold 20px sans-serif",t.fillText("強く押す",64,212),t.font="bold 14px monospace",t.fillText("FIRE ALARM",64,238),Ut(r,1,1,!0)}function Mr(r,t,e,n,i){const[s,o]=wt(768,176);o.fillStyle=e,o.fillRect(0,0,768,176),o.strokeStyle=e==="#f4f5f0"?"#24282c":"rgba(255,255,255,0.28)",o.lineWidth=6,o.strokeRect(4,4,760,168);const a=752/i.length;return i.forEach((l,c)=>{o.fillStyle=l,o.fillRect(8+c*a,152,a,16)}),o.fillStyle="#0e6b38",o.fillRect(24,28,62,62),o.fillStyle="#ffffff",o.textAlign="center",o.font="italic 900 28px sans-serif",o.fillText("JR",55,70),o.fillStyle=n,o.textAlign="center",o.font="800 40px sans-serif",o.fillText(r,416,78),o.fillStyle=e==="#f4f5f0"?"#363c42":"rgba(232,238,236,0.84)",o.font="600 21px sans-serif",o.fillText(t,416,126),Ut(s,1,1,!0)}function vc(r,t,e,n){const[i,s]=wt(640,176);return s.fillStyle="#11161d",s.fillRect(0,0,640,176),s.fillStyle=n,s.fillRect(0,0,132,176),s.fillStyle="#0c1014",s.textAlign="center",s.font="900 40px sans-serif",s.fillText(r,66,102),s.font="700 18px sans-serif",s.fillText("番線",66,138),s.fillStyle="#f2f4f0",s.textAlign="left",s.font="700 46px sans-serif",s.fillText(t,156,84),s.fillStyle="#b4c0c8",s.font="600 22px sans-serif",s.fillText(e,156,132),s.fillStyle=n,s.fillRect(132,160,508,16),Ut(i,1,1,!0)}function px(){const[r,t]=wt(512,192);return t.fillStyle="#eae7de",t.fillRect(0,0,512,192),t.fillStyle="#20262b",t.fillRect(0,0,512,14),t.fillStyle="#1c6d36",t.fillRect(0,114,512,26),t.fillStyle="#80c342",t.fillRect(174,114,164,26),t.strokeStyle="#80c342",t.lineWidth=6,t.strokeRect(20,30,56,60),t.fillStyle="#14171a",t.textAlign="center",t.font="800 17px monospace",t.fillText("JY",48,55),t.font="900 24px monospace",t.fillText("17",48,82),t.strokeStyle="#f15a22",t.strokeRect(436,30,56,60),t.font="800 17px monospace",t.fillText("JC",464,55),t.font="900 24px monospace",t.fillText("05",464,82),t.fillStyle="#14171a",t.font="800 54px sans-serif",t.fillText("しんじゅく",256,84),t.fillStyle="#16191c",t.font="700 28px sans-serif",t.fillText("新宿   Shinjuku",256,174),t.fillStyle="#eef4ee",t.font="600 14px sans-serif",t.fillText("← 代々木",70,132),t.fillText("新大久保 →",440,132),Ut(r,1,1,!0)}function mx(){const[r,t]=wt(256,96);return t.fillStyle="#0e783f",t.fillRect(0,0,256,96),t.strokeStyle="#c4f8dc",t.lineWidth=5,t.strokeRect(4,4,248,88),t.fillStyle="#eefff6",t.beginPath(),t.arc(54,28,9,0,Math.PI*2),t.fill(),t.lineWidth=6,t.strokeStyle="#eefff6",t.beginPath(),t.moveTo(54,38),t.lineTo(48,60),t.lineTo(36,76),t.moveTo(48,60),t.lineTo(66,76),t.moveTo(52,46),t.lineTo(72,42),t.moveTo(52,46),t.lineTo(34,54),t.stroke(),t.textAlign="left",t.font="700 32px sans-serif",t.fillText("非常口",92,50),t.font="700 18px monospace",t.fillText("EXIT",102,76),Ut(r,1,1,!0)}function gx(){const[r,t]=wt(512,256);return t.fillStyle="#15181c",t.fillRect(0,0,512,256),t.fillStyle="#d4a224",t.fillRect(0,0,512,36),t.fillRect(0,220,512,36),t.fillStyle="#111417",t.textAlign="center",t.font="800 22px sans-serif",t.fillText("JR SHINJUKU STATION // 終電終了",256,26),t.fillStyle="#f0ede4",t.font="700 33px sans-serif",t.fillText("本日ノ運行ハ終了シマシタ",256,110),t.fillStyle="#e54949",t.font="700 25px sans-serif",t.fillText("東口 非常出口（歌舞伎町方面）へ",256,162),t.fillStyle="#9aa2aa",t.font="600 18px monospace",t.fillText("LAST TRAIN DEPARTED — 00:15",256,200),Ut(r,1,1,!0)}function xx(){const[r,t]=wt(256,96);return t.fillStyle="#0c334a",t.fillRect(0,0,256,96),t.strokeStyle="#6fe2ff",t.lineWidth=4,t.strokeRect(4,4,248,88),t.fillStyle="#ecfbff",t.textAlign="center",t.font="800 32px sans-serif",t.fillText("証明写真",128,48),t.fillStyle="#7de6ff",t.font="700 17px monospace",t.fillText("PHOTO BOOTH ¥800",128,78),Ut(r,1,1,!0)}function _x(){const[r,t]=wt(256,80);return t.fillStyle="#0f683a",t.fillRect(0,0,256,80),t.strokeStyle="#b4f6cf",t.lineWidth=4,t.strokeRect(4,4,248,72),t.fillStyle="#f4fff8",t.textAlign="center",t.font="700 28px sans-serif",t.fillText("公衆電話",128,42),t.font="600 15px monospace",t.fillText("PUBLIC TELEPHONE",128,66),Ut(r,1,1,!0)}function yx(){const[r,t]=wt(512,256);return t.fillStyle="#15181c",t.fillRect(0,0,512,256),t.strokeStyle="#c8aa60",t.lineWidth=8,t.strokeRect(10,10,492,236),t.fillStyle="#ece8dd",t.textAlign="center",t.font="700 28px serif",t.fillText("新宿駅東西自由通路・アルプス広場 特設展示",256,74),t.fillStyle="#d4b464",t.font="700 44px sans-serif",t.fillText("「 紫のうさぎ 」",256,146),t.fillStyle="#a4aab2",t.font="500 20px sans-serif",t.fillText("JR新宿駅 新マスコット等身大立像 — 展示中",256,202),Ut(r,1,1,!0)}function vx(){const[r,t]=wt(256,384);return t.fillStyle="#d4a620",t.fillRect(0,0,256,384),t.strokeStyle="#181818",t.lineWidth=10,t.strokeRect(12,12,232,360),t.beginPath(),t.moveTo(128,56),t.lineTo(196,174),t.lineTo(60,174),t.closePath(),t.stroke(),t.fillStyle="#181818",t.textAlign="center",t.font="900 58px sans-serif",t.fillText("!",128,158),t.font="700 40px sans-serif",t.fillText("足元注意",128,250),t.font="700 26px sans-serif",t.fillText("清掃中",128,298),t.font="700 18px monospace",t.fillText("WET FLOOR",128,342),Ut(r,1,1,!0)}function Mx(){const[r,t]=wt(256,256);t.fillStyle="#125a30",t.fillRect(0,0,256,256),t.fillStyle="#d8f084",t.beginPath(),t.arc(128,128,110,0,Math.PI*2),t.fill(),t.strokeStyle="#14181a";for(let i=0;i<12;i++){const s=i/12*Math.PI*2,o=i%3===0?82:92;t.lineWidth=i%3===0?7:3.5,t.beginPath(),t.moveTo(128+Math.cos(s)*o,128+Math.sin(s)*o),t.lineTo(128+Math.cos(s)*104,128+Math.sin(s)*104),t.stroke()}const e=(0+47/60)/12*Math.PI*2-Math.PI/2,n=47/60*Math.PI*2-Math.PI/2;return t.strokeStyle="#141618",t.lineCap="round",t.lineWidth=8,t.beginPath(),t.moveTo(128,128),t.lineTo(128+Math.cos(e)*56,128+Math.sin(e)*56),t.stroke(),t.lineWidth=5,t.beginPath(),t.moveTo(128,128),t.lineTo(128+Math.cos(n)*84,128+Math.sin(n)*84),t.stroke(),t.fillStyle="#141618",t.beginPath(),t.arc(128,128,7,0,Math.PI*2),t.fill(),Ut(r,1,1,!0)}function Mc(r,t){const[e,n]=wt(512,256);n.clearRect(0,0,512,256),n.save(),n.translate(256,128),n.rotate(-.04),n.textAlign="center",n.fillStyle="rgba(138,16,16,0.85)",n.font="900 54px serif",n.fillText(r,0,-16),n.fillStyle="rgba(116,12,12,0.75)",n.font="700 28px serif",n.fillText(t,6,52),n.strokeStyle="rgba(120,14,14,0.65)",n.lineWidth=4,n.beginPath(),n.moveTo(-180,4),n.lineTo(188,-2),n.stroke(),n.restore();const i=new ni(e);return i.colorSpace=Me,i.needsUpdate=!0,i}function Sx(){const[r,t]=wt(256,256);t.fillStyle="#000000",t.fillRect(0,0,256,256);const e=t.createRadialGradient(128,128,6,128,128,124);e.addColorStop(0,"rgba(255,250,240,1.0)"),e.addColorStop(.24,"rgba(246,248,242,0.95)"),e.addColorStop(.52,"rgba(196,214,218,0.56)"),e.addColorStop(.76,"rgba(176,198,206,0.34)"),e.addColorStop(.84,"rgba(224,238,242,0.48)"),e.addColorStop(.93,"rgba(72,88,96,0.14)"),e.addColorStop(1,"rgba(0,0,0,0.0)"),t.fillStyle=e,t.fillRect(0,0,256,256);const n=new ni(r);return n.colorSpace=Me,n.needsUpdate=!0,n}function Tx(){const[r,t]=wt(256,256),e=ds(414);t.fillStyle="#808080",t.fillRect(0,0,256,256);for(let n=0;n<256;n++){const i=116+Math.floor((e()-.5)*24);t.fillStyle=`rgb(${i},${i},${i})`,t.fillRect(0,n,256,1)}return ii(r,1.25,2,2)}function bx(){const[r,t]=wt(256,512);return t.fillStyle="#8e1f22",t.fillRect(0,0,256,512),t.strokeStyle="#380c0d",t.lineWidth=8,t.strokeRect(8,8,240,496),t.fillStyle="#241819",t.fillRect(28,28,200,118),t.fillStyle="#e02d2d",t.beginPath(),t.arc(82,88,22,0,Math.PI*2),t.fill(),t.fillStyle="#a0a6ad",t.beginPath(),t.arc(174,88,30,0,Math.PI*2),t.fill(),t.fillStyle="#ebe6dc",t.textAlign="center",t.font="900 62px sans-serif",t.fillText("消",128,240),t.fillText("火",128,314),t.fillText("栓",128,388),t.fillStyle="#d8cec4",t.font="700 18px monospace",t.fillText("FIRE HYDRANT",128,444),Ut(r,1,1,!0)}function Ex(){const[r,t]=wt(256,256),[e,n]=wt(128,128);t.fillStyle="#090b0d",t.fillRect(0,0,256,256),n.fillStyle="#121212",n.fillRect(0,0,128,128),t.fillStyle="#606870",n.fillStyle="#e4e4e4",t.fillRect(0,0,256,16),t.fillRect(0,240,256,16),t.fillRect(0,0,16,256),t.fillRect(240,0,16,256);for(let i=24;i<236;i+=18)t.fillStyle="#505860",t.fillRect(i,12,8,232),n.fillStyle="#d4d4d4",n.fillRect(i/2,6,4,116);return{color:Ut(r,2,1,!0),normal:ii(e,2.4,2,1)}}function wx(){const[r,t]=wt(512,256);t.clearRect(0,0,512,256),[64,102,144,186].forEach((i,s)=>{t.strokeStyle=s%2===0?"rgba(68,14,44,0.78)":"rgba(98,12,24,0.68)",t.lineWidth=10+(s===1?5:0),t.lineCap="round",t.beginPath(),t.moveTo(42+s*8,i),t.bezierCurveTo(180,i+8,310,i+18,465-s*14,i+34),t.stroke()});const n=new ni(r);return n.colorSpace=Me,n.needsUpdate=!0,n}function Ax(){const[r,t]=wt(512,512),e=ds(777);t.fillStyle="#808080",t.fillRect(0,0,512,512);for(let n=0;n<22e3;n++){const i=e()*512,s=e()*512,o=Math.floor(58+e()*140);t.fillStyle=`rgb(${o},${o},${o})`,t.fillRect(i,s,1.3+e()*1.4,2.6+e()*3.2)}for(let n=0;n<42;n++){const i=e()*512,s=e()*512,o=16+e()*48,a=t.createRadialGradient(i,s,2,i,s,o),l=e()>.45?32:204;a.addColorStop(0,`rgba(${l},${l},${l},0.46)`),a.addColorStop(1,"rgba(128,128,128,0)"),t.fillStyle=a,t.fillRect(i-o,s-o,o*2,o*2)}return ii(r,2.7,4,4)}function Sc(r){const[t,e]=wt(512,512),n=ds(r?912:911);e.fillStyle=r?"#c4beb2":"#7b4fa8",e.fillRect(0,0,512,512);for(let i=0;i<14e3;i++){const s=n()*512,o=n()*512,a=n()>.42;e.fillStyle=r?a?`rgba(54,48,44,${n()*.16})`:`rgba(235,232,224,${n()*.14})`:a?`rgba(28,14,44,${n()*.24})`:`rgba(154,112,202,${n()*.16})`,e.fillRect(s,o,2,3)}return Ut(t,2,2,!0)}function yh(r){const[t,e]=wt(512,1024);if(r===0){const l=e.createLinearGradient(0,0,512,1024);l.addColorStop(0,"#28b8e8"),l.addColorStop(.42,"#d8c4f8"),l.addColorStop(.75,"#f2a4dc"),l.addColorStop(1,"#3898f0"),e.fillStyle=l,e.fillRect(0,0,512,1024),e.fillStyle="rgba(255,255,255,0.34)",e.beginPath(),e.moveTo(0,240),e.bezierCurveTo(180,140,340,360,512,220),e.lineTo(512,740),e.bezierCurveTo(340,820,180,620,0,740),e.closePath(),e.fill()}else{const l=["#e8e4da","#221830","#181022","#0c1015","#1a0406"];e.fillStyle=l[r]||"#1a0406",e.fillRect(0,0,512,1024)}e.fillStyle=r>=4?"#7c0f14":r===3?"#1a242c":r===2?"#4d1954":"#0f6a36",e.fillRect(0,0,512,112),e.fillStyle=r>=3?"#f44a4a":"#f4f6f2",e.textAlign="center",e.font="800 30px sans-serif";const n=["J・AD VISION // JR新宿駅","新宿駅でずっと見てるよ","終電はもう終わったよ","CAM-E04 // TARGET LOCKED","み つ け た"];e.fillText(n[r],256,70);const i=256,s=480;r===3?(e.strokeStyle="rgba(220,50,50,0.65)",e.lineWidth=4,e.strokeRect(48,220,416,460),e.fillStyle="rgba(235,60,60,0.9)",e.font="700 26px monospace",e.fillText("REC ● SHINJUKU B1F",256,270),e.font="900 84px serif",e.fillText("う し ろ",256,470),e.fillStyle="#cfd8df",e.font="600 24px sans-serif",e.fillText("東西自由通路・改札内を徘徊中",256,560),e.fillText("ライトを消して息を止めろ",256,610)):r===4?(e.fillStyle="#38134d",e.beginPath(),e.ellipse(i,s,220,260,0,0,Math.PI*2),e.fill(),e.fillStyle="#cec8be",e.beginPath(),e.ellipse(i,s-10,155,118,0,0,Math.PI*2),e.fill(),e.fillStyle="#050407",e.beginPath(),e.arc(i-64,s-34,34,0,Math.PI*2),e.arc(i+64,s-34,34,0,Math.PI*2),e.fill(),e.fillStyle="#ff2228",e.beginPath(),e.arc(i-64,s-34,8,0,Math.PI*2),e.arc(i+64,s-34,8,0,Math.PI*2),e.fill(),e.fillStyle="#050407",e.beginPath(),e.ellipse(i,s+44,96,68,0,0,Math.PI),e.fill()):(e.fillStyle=r===2?"#3f1e5a":"#6a479e",e.beginPath(),e.ellipse(i-78,s-170,34,96,-.45,0,Math.PI*2),e.ellipse(i+78,s-170,34,96,.45,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(i,s+70,114,146,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(i,s-52,86,82,0,0,Math.PI*2),e.fill(),e.fillStyle=r===2?"#cfc8bc":"#f2efe8",e.beginPath(),e.ellipse(i-24,s-60,36,28,-.12,0,Math.PI*2),e.ellipse(i+24,s-60,36,28,.12,0,Math.PI*2),e.ellipse(i,s-34,54,34,0,0,Math.PI*2),e.fill(),e.fillStyle="#09090c",e.beginPath(),e.arc(i-28,s-58,r===2?13:9,0,Math.PI*2),e.arc(i+28,s-58,r===2?13:9,0,Math.PI*2),e.fill(),r>=1&&(e.fillStyle=r===2?"#ff2c32":"#ffffff",e.beginPath(),e.arc(i-28,s-58,3.5,0,Math.PI*2),e.arc(i+28,s-58,3.5,0,Math.PI*2),e.fill()),e.fillStyle="#07070a",e.beginPath(),e.ellipse(i,s-22,r===2?44:32,r===2?36:20,0,0,Math.PI),e.fill()),e.fillStyle=r>=2?"#df3636":"#14181e",e.font="800 46px serif";const o=["紫のうさぎ","名前を呼んで","まだ帰れない","振り向くな","逃がさない"];e.fillText(o[r],256,845),e.fillStyle=r>=2?"#c47a7a":"#2a3238",e.font="700 22px sans-serif";const a=["WELCOME TO SHINJUKU // 東西自由通路","東改札の向こうでお待ちしています","残高 ¥1,000 が足りません","SHINJUKU STATION B1F // 00:47","もう すぐ うしろ"];e.fillText(a[r],256,908);for(let l=0;l<1024;l+=6)e.fillStyle=r>=2?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.05)",e.fillRect(0,l,512,2);return Ut(t,1,1,!0)}function Rx(r){return yh(r===0?0:r===1?1:4)}function Cx(){const[r,t]=wt(768,576);t.fillStyle="#12181e",t.fillRect(0,0,768,576),t.strokeStyle="#80c342",t.lineWidth=6,t.strokeRect(8,8,752,560),t.fillStyle="#146837",t.fillRect(14,14,740,62),t.fillStyle="#ffffff",t.font="italic 900 32px sans-serif",t.textAlign="left",t.fillText("JR",32,56),t.font="800 28px sans-serif",t.fillText("新宿駅 B1F 構内案内図   Shinjuku Station B1F Map",92,55),t.fillStyle="#2d4b64",t.fillRect(54,102,660,92),t.strokeStyle="#5ab4e8",t.lineWidth=2,t.strokeRect(54,102,660,92),t.fillStyle="#24d0e8",t.fillRect(195,96,360,10),t.fillStyle="#9cf4ff",t.textAlign="center",t.font="bold 14px sans-serif",t.fillText("新宿ウォール456 (W45.6m LEDビジョン)",375,91),t.fillStyle="#ffffff",t.font="bold 20px sans-serif",t.fillText("← 西口広場          東 西 自 由 通 路 (幅員25m)          アルプス広場・東口 →",384,142),t.fillStyle="#a478e8";for(const n of[118,158])t.fillRect(n,122,14,14),t.fillRect(n,162,14,14);for(const n of[224,288,352,416,480])t.fillRect(n,162,16,14);t.fillStyle="#1e7844",t.fillRect(636,108,74,80),t.fillStyle="#9ef8c0",t.font="bold 14px sans-serif",t.fillText("東口出口",673,142),t.fillText("(歌舞伎町)",673,162),t.fillStyle="#22382c",t.fillRect(114,196,520,42),t.fillStyle="#8ef0b0",t.font="bold 15px sans-serif",t.fillText("西改札",156,222),t.fillText("東改札",572,222),t.fillStyle="#f2f6f0",t.fillRect(230,198,260,38),t.fillStyle="#0d6834",t.font="bold 15px sans-serif",t.fillText("きっぷうりば / みどりの窓口 Ticket Office",360,222),t.fillStyle="#1f2e26",t.fillRect(114,240,520,168);const e=[["15・16番線","山手・総武線","#7ac142",162],["13・14番線","山手・総武線","#f2c700",262],["11・12番線","中央線(高尾)","#f15a22",362],["9・10番線","中央線(特急)","#2888d8",462],["7・8番線","中央線(東京)","#f15a22",562]];for(const[n,i,s,o]of e)t.fillStyle="#14181c",t.fillRect(o-38,264,76,118),t.fillStyle=s,t.fillRect(o-38,264,76,14),t.fillStyle="#ffffff",t.font="bold 14px sans-serif",t.fillText(n,o,314),t.fillStyle="#b8c4cc",t.font="600 11px sans-serif",t.fillText(i,o,342);return t.fillStyle="#253830",t.fillRect(54,410,660,74),t.fillStyle="#ffffff",t.font="bold 19px sans-serif",t.fillText("← 中央西改札 (小田急・京王)          中 央 通 路          中央東改札 (ルミネエスト) →",384,454),t.fillStyle="#24303c",t.fillRect(54,196,46,214),t.fillRect(648,196,66,214),t.fillStyle="#4ae0d6",t.beginPath(),t.arc(76,530,9,0,Math.PI*2),t.fill(),t.fillStyle="#e8ece6",t.textAlign="left",t.font="bold 18px sans-serif",t.fillText("Suicaチャージ機 (全5箇所で ¥1,000 チャージ → 東口非常シャッター解錠)",98,536),Ut(r,1,1,!0)}function Px(r){const[t,e]=wt(512,384);return vh(e,r,!1,0),{texture:Ut(t,1,1,!0),ctx:e}}function vh(r,t,e,n){r.fillStyle=e?"#eaf7ee":"#eef3f0",r.fillRect(0,0,512,384),r.fillStyle=e?"#167c3c":"#1b8e3e",r.fillRect(0,0,512,56),r.fillStyle="#ffffff",r.textAlign="left",r.font="800 24px sans-serif",r.fillText("Suica チャージ  /  IC Charge",18,37),r.textAlign="right",r.font="600 15px monospace",r.fillStyle="#d6f4dc",r.fillText("00:47  JR新宿",494,35),["きっぷ","チャージ","履歴印字","English"].forEach((s,o)=>{const a=70+o*72;r.fillStyle=o===1?"#209440":"#d2dad6",r.fillRect(14,a,108,60),r.strokeStyle=o===1?"#12642a":"#96a09a",r.lineWidth=2.5,r.strokeRect(14,a,108,60),r.fillStyle=o===1?"#ffffff":"#26302a",r.textAlign="center",r.font="700 17px sans-serif",r.fillText(s,68,a+37)}),r.fillStyle="#ffffff",r.fillRect(138,70,358,294),r.strokeStyle=e?"#1a8e42":"#40a848",r.lineWidth=6,r.strokeRect(138,70,358,294),r.fillStyle="#526058",r.textAlign="center",r.font="600 15px sans-serif",r.fillText(t,317,102),e?(r.fillStyle="#157e3a",r.font="900 40px sans-serif",r.fillText("チャージ完了",317,196),r.fillStyle="#1e3026",r.font="700 24px monospace",r.fillText("+¥200  COMPLETED",317,246),r.fillStyle="#1d8a42",r.fillRect(184,286,266,44),r.fillStyle="#ffffff",r.font="700 18px sans-serif",r.fillText("カードをお取りください",317,315)):n>0?(r.fillStyle="#b8760a",r.font="800 32px sans-serif",r.fillText("ICカード書込中…",317,174),r.fillStyle="#dce4e0",r.fillRect(168,206,298,34),r.fillStyle="#22a64c",r.fillRect(172,210,Math.round(290*Math.min(1,n)),26),r.fillStyle="#1c2822",r.font="800 24px monospace",r.fillText(`${Math.round(n*100)}%`,317,284),r.fillStyle="#c43228",r.font="700 15px sans-serif",r.fillText("カードを抜かないでください",317,326)):(Os(r,186,126,76,52),r.fillStyle="#84cc3c",r.fillRect(284,124,96,58),r.fillStyle="#e8ece6",r.fillRect(284,162,96,20),r.fillStyle="#163618",r.textAlign="left",r.font="800 20px sans-serif",r.fillText("Suica",294,152),r.fillStyle="#2486c8",r.fillRect(392,128,62,50),r.fillStyle="#ffffff",r.font="700 13px sans-serif",r.fillText("IC",416,158),r.textAlign="center",r.fillStyle="#14201a",r.font="800 26px sans-serif",r.fillText("Suicaをホルダーへ入れてください",317,232),r.fillStyle="#1d923c",r.fillRect(176,260,282,54),r.fillStyle="#ffffff",r.font="800 24px sans-serif",r.fillText("¥200 チャージ（長押し）",317,296),r.fillStyle="#56645c",r.font="600 14px sans-serif",r.fillText("HOLD [E] / 操作長押しでICチャージ",317,344))}function Tc(r){const[t,e]=wt(256,128);return e.fillStyle="#101418",e.fillRect(0,0,256,128),e.strokeStyle=r?"#2ed87c":"#d63333",e.lineWidth=6,e.strokeRect(6,6,244,116),e.textAlign="center",e.fillStyle=r?"#48f296":"#f24a4a",e.font="700 28px sans-serif",e.fillText(r?"→ 東口シャッター 解錠OK":"× 残高不足 (¥1,000必要)",128,56),e.fillStyle="#d7dad8",e.font="600 16px sans-serif",e.fillText(r?"ICタッチで地上出口(歌舞伎町)へ":"新宿駅構内5か所でチャージ必要",128,96),Ut(t,1,1,!0)}function Ix(){const[r,t]=wt(1024,224);return Mh(t,0,0,!1),{texture:Ut(r,1,1,!0),ctx:t}}function Mh(r,t,e,n){r.fillStyle="#161a1e",r.fillRect(0,0,1024,224),r.strokeStyle="#383e44",r.lineWidth=6,r.strokeRect(3,3,1018,218);const i=[{line:"中央・総武線(各停)",sub:"水道橋・秋葉原・三鷹",color:"#e8be00",trackA:"各停 00:14 千葉 13",trackB:"各停 00:16 三鷹 16"},{line:"中央線(快速)",sub:"四ツ谷・東京・高尾",color:"#eb5a1e",trackA:"快速 00:14 東京  8",trackB:"快速 00:17 高尾 12"},{line:"中央本線(特急)",sub:"甲府・松本・河口湖",color:"#0074be",trackA:"かいじ 終電終了  9",trackB:"あずさ 終電終了 10"},{line:"山手線",sub:"渋谷・品川・池袋・上野",color:"#6fba2c",trackA:"内回り 00:15 品川 14",trackB:"外回り 00:15 池袋 15"}],s=Math.sin(e*4.5)>0,o=t>=2&&Math.sin(e*17.3)>.72;i.forEach((a,l)=>{const c=12+l*252;r.fillStyle="#0a0c0e",r.fillRect(c,12,242,200),r.strokeStyle="#2c3238",r.lineWidth=3,r.strokeRect(c,12,242,200),r.fillStyle="#242a30",r.fillRect(c+4,16,234,48),r.fillStyle=a.color,r.fillRect(c+8,22,14,36),r.fillStyle="#ffffff",r.textAlign="left",r.font="bold 17px sans-serif",r.fillText(a.line,c+28,38),r.fillStyle="#b4bec6",r.font="600 12px sans-serif",r.fillText(a.sub,c+28,56),r.font="700 20px monospace",n?(r.fillStyle=s?"#46f28a":"#289a56",r.fillText("東口 非常解錠OK",c+16,112),r.fillStyle="#f0c440",r.fillText("歌舞伎町出口へ!",c+16,168)):o||t>=4?(r.fillStyle="#ff3434",r.fillText("00:47 うしろにいる",c+14,112),r.fillStyle=s?"#ff5834":"#a82222",r.fillText("00:47 逃げられない",c+14,168)):t>=2?(r.fillStyle="#f2a434",r.fillText(a.trackA,c+14,112),r.fillStyle="#e84838",r.fillText(`回送  残${5-t}箇所`,c+14,168)):(r.fillStyle="#4ad87a",r.fillText(a.trackA,c+14,112),r.fillStyle="#f0a638",r.fillText(a.trackB,c+14,168))}),r.fillStyle="rgba(0,0,0,0.34)";for(let a=66;a<208;a+=4)r.fillRect(12,a,1e3,1)}function Lx(){const[r,t]=wt(256,256);t.clearRect(0,0,256,256);const e=[[128,128,72],[88,114,52],[166,138,56],[122,82,46],[144,174,44],[76,148,36]];for(const[i,s,o]of e){const a=t.createRadialGradient(i,s,o*.25,i,s,o);a.addColorStop(0,"rgba(255,255,255,0.92)"),a.addColorStop(.68,"rgba(255,255,255,0.72)"),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,t.beginPath(),t.arc(i,s,o,0,Math.PI*2),t.fill()}const n=new ni(r);return n.needsUpdate=!0,n}function Dx(){const[r,t]=wt(128,128);t.clearRect(0,0,128,128),t.strokeStyle="rgba(215,240,245,0.92)",t.lineWidth=3,t.beginPath(),t.arc(64,64,50,0,Math.PI*2),t.stroke(),t.strokeStyle="rgba(180,218,226,0.48)",t.lineWidth=2,t.beginPath(),t.arc(64,64,34,0,Math.PI*2),t.stroke();const e=new ni(r);return e.needsUpdate=!0,e}function Nx(){const[r,t]=wt(128,128),e=t.createRadialGradient(64,24,6,64,72,62);e.addColorStop(0,"rgba(225,245,242,0.22)"),e.addColorStop(.35,"rgba(185,222,220,0.08)"),e.addColorStop(.75,"rgba(160,200,204,0.02)"),e.addColorStop(1,"rgba(160,200,204,0.0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const n=new ni(r);return n.needsUpdate=!0,n}function Ux(r){const t=new ya(r),e=new Ba;e.background=new rt(725014);const n=new I(new J(28,10,24),new _e({color:1251616,side:Ve}));e.add(n);const i=new I(new _t(24,20),new _e({color:2896440,side:Ee}));i.position.set(0,4.85,0),i.rotation.x=Math.PI/2,e.add(i);const s=new yi(.28,10),o=new _e({color:10136244,side:Ee});for(const c of[-8,0,8])for(const h of[-4,4]){const u=new I(s,o);u.position.set(c,4.78,h),u.rotation.x=Math.PI/2,e.add(u)}const a=[[0,1.8,-11.5,18,2.2,1726584,0],[0,3.6,-11.2,20,.35,2380948,0],[0,1.8,11.5,14,2.4,1719928,Math.PI],[13.5,1.8,0,6,1.8,1465908,-Math.PI/2],[-13.5,1.8,0,6,1.8,1465908,Math.PI/2]];for(const[c,h,u,f,d,g,x]of a){const m=new I(new _t(f,d),new _e({color:g,side:Ee}));m.position.set(c,h,u),m.rotation.y=x,e.add(m)}const l=t.fromScene(e,.045);return t.dispose(),l.texture}class Fx{root=new Wt;textures;terminals=[];closets=[];notes=[];coinPickups=[];flickerLights=[];wall456Mat;wall456PoolMats=[];coveLineMat;lightBoxTopMat;lightBoxMidMat;lightBoxBotMat;signageMats=[];signagePoolMats=[];posterMats=[];cctvCameras=[];puddles=[];sparks=[];sparkGeo=new J(.01,.01,.11);sparkMat=new _e({color:16768921,transparent:!0,opacity:.96});brokenLampTimer=2.8;gatePaddles=[];centerPaddleMat;gateDisplayMat;exitLight;exitShutter;concourseShadowSpot;nearestTerminalLight;dynamicEventLight;departureBoardTex;departureBoardCtx;departureAccum=0;photoBoothFlashTimer=0;photoBoothShadowMesh;phantomTrainTimer=0;wall456FlashTimer=0;payphoneRingActive=!1;smokeLedMats=[];dustPoints;currentSignageStage=0;exitUnlocked=!1;shutterOpenProgress=0;floorPoolGeo=new _t(1,1);constructor(t){this.textures=Xg(),this.nearestTerminalLight=new vi(4972712,2.2,9.5,1.9),this.nearestTerminalLight.position.set(30,1.6,20),this.dynamicEventLight=new vi(15661311,0,22,1.5),this.dynamicEventLight.position.set(28,1.5,32),this.root.add(this.nearestTerminalLight,this.dynamicEventLight),this.wall456Mat=new $({map:this.textures.wall456Stages[0],emissive:new rt(16777215),emissiveMap:this.textures.wall456Stages[0],emissiveIntensity:.56,roughness:.28,metalness:.04}),this.coveLineMat=new $({color:7133428,emissive:new rt(2660576),emissiveIntensity:1.05,roughness:.22}),this.lightBoxTopMat=new $({color:6472940,emissive:new rt(2261708),emissiveIntensity:.85,roughness:.28}),this.lightBoxMidMat=new $({color:3569368,emissive:new rt(1461432),emissiveIntensity:.92,roughness:.28}),this.lightBoxBotMat=new $({color:6078696,emissive:new rt(1998020),emissiveIntensity:.85,roughness:.28}),this.buildArchitecture(),this.buildShinjukuWall456AndMidoriFacade(),this.buildFourShinjukuTicketGates(),this.buildTactileAndFloorGuides(),this.buildLightingFixtures(),this.buildAlpsPedestal(),this.buildEastExitPortal(),this.buildChargeTerminals(),this.buildHidingSpots(),this.buildShinjukuPropsAndSignage(),this.buildRealismClutter(),this.buildNotesAndCoins(),this.buildDustMotes(),t.add(this.root)}addFloorGlowPool(t,e,n,i,s,o){const a=new _e({map:this.textures.lightShaftSoft,color:s,transparent:!0,opacity:o*.45,blending:ji,depthWrite:!1}),l=new I(this.floorPoolGeo,a);return l.rotation.x=-Math.PI/2,l.position.set(t,.011,e),l.scale.set(n,i,1),this.root.add(l),a}isPointOnPuddle(t,e){for(const n of this.puddles){const i=(t-n.x)/n.rx,s=(e-n.z)/n.rz;if(i*i+s*s<.85)return!0}return!1}triggerDominoBlowout(t,e,n,i,s=11){const o=this.flickerLights.filter(a=>a.killedTimer<=.5&&a.blowoutDelay<=0).map(a=>({fl:a,dFrom:Math.hypot(a.x-t,a.z-e),dTo:Math.hypot(a.x-n,a.z-i)})).filter(a=>a.dFrom<22||a.dTo<16).sort((a,l)=>a.dFrom-l.dFrom).slice(0,3);return o.length===0?!1:(o.forEach((a,l)=>{l===0?(a.fl.killedTimer=s,this.spawnSparks(a.fl.x,a.fl.y-.14,a.fl.z,22)):a.fl.blowoutDelay=l*.24}),!0)}triggerPhotoBoothFlash(){this.photoBoothFlashTimer=.42,this.photoBoothShadowMesh.visible=!0}triggerPhantomTrain(){this.phantomTrainTimer=5.2}triggerWall456SubliminalFlash(){this.wall456FlashTimer=.34;const t=this.textures.wall456Stages[4];this.wall456Mat.map=t,this.wall456Mat.emissiveMap=t,this.wall456Mat.emissiveIntensity=.82,this.wall456Mat.needsUpdate=!0}setPayphoneRinging(t){this.payphoneRingActive=t}spawnSparks(t,e,n,i=12){for(let s=0;s<i&&this.sparks.length<56;s++){const o=new I(this.sparkGeo,this.sparkMat);o.position.set(t+(Math.random()-.5)*.45,e,n+(Math.random()-.5)*.25);const a=Math.random()*Math.PI*2,l=.9+Math.random()*2.6;this.root.add(o),this.sparks.push({mesh:o,vx:Math.cos(a)*l,vy:-.35-Math.random()*1.4,vz:Math.sin(a)*l,life:.48+Math.random()*.58})}}buildArchitecture(){const t=Jn*F,e=Mi*F,n=new $({map:this.textures.floorTerrazzo,normalMap:this.textures.floorNormal,normalScale:new Et(.62,.62),roughnessMap:this.textures.floorRoughness,roughness:.74,metalness:.08,envMapIntensity:.78}),i=new I(new _t(t,e),n);i.rotation.x=-Math.PI/2,i.position.set(t*.5,0,e*.5),i.receiveShadow=!0,this.root.add(i);const s=new $({map:this.textures.ceilingLouver,normalMap:this.textures.ceilingNormal,normalScale:new Et(.55,.55),roughness:.68,metalness:.08,envMapIntensity:.58}),o=new $({map:this.textures.wallTile,normalMap:this.textures.wallNormal,normalScale:new Et(.7,.7),roughnessMap:this.textures.wallRoughness,roughness:.66,metalness:.06,envMapIntensity:.68}),a=new $({map:this.textures.pillarMetal,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.36,.36),roughness:.36,metalness:.34,envMapIntensity:.92}),l=new $({color:2237995,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.4,.4),roughness:.32,metalness:.78,envMapIntensity:1.35}),c=new J(F,Xt,F),h=new _t(F,F);for(let v=0;v<Mi;v++)for(let _=0;_<Jn;_++){const A=Bs[v][_],E=(_+.5)*F,w=(v+.5)*F;if(A===1){if(v===5&&_>=9&&_<=11)continue;const M=new I(c,o);M.position.set(E,Xt*.5,w),M.receiveShadow=!0,this.root.add(M);continue}const C=Ao(_,v)?Xt:ge,T=new I(h,s);if(T.rotation.x=Math.PI/2,T.position.set(E,C,w),this.root.add(T),Ao(_,v)){const M=Xt-ge,P=ge+M*.5,z=[[-1,0,E-F*.5,w,Math.PI/2],[1,0,E+F*.5,w,Math.PI/2],[0,-1,E,w-F*.5,0],[0,1,E,w+F*.5,0]];for(const[k,q,K,Y,et]of z){const U=_+k,X=v+q;if(U>=0&&U<Jn&&X>=0&&X<Mi&&Bs[X][U]!==1&&!Ao(U,X)){const Z=new I(new J(F,M,.18),o);Z.position.set(K,P,Y),Z.rotation.y=et,this.root.add(Z)}}}if(A===2)this.buildJAdVisionLightColumn(E,w,a,l,o);else if(A===4){const M=Ma.find(P=>P.col===_)||Ma[0];this.buildAuthenticPlatformStairCell(E,w,v===7,M,l,o)}}const u=new I(new J(54,.42,1.85),o);u.position.set(35,Xt-.21,3.5*F),this.root.add(u);const f=new I(new J(53.8,.045,.08),this.coveLineMat);f.position.set(35,Xt-.41,3.5*F-.92),this.root.add(f);const d=new be({color:14214378,transparent:!0,opacity:.34,roughness:.08,metalness:.1,clearcoat:1});for(const v of[24,40,56]){const _=new I(new J(.12,.08,15.6),l);_.position.set(v,Xt-.04,2.5*F);const A=new I(new J(.03,.48,15.6),d);A.position.set(v,Xt-.28,2.5*F),this.root.add(_,A)}const g=new $({color:1580064,roughness:.72,metalness:.35}),x=new $({color:14210766,roughness:.48});for(const v of[6.4,17.6]){const _=new I(new J(64,.03,.14),g);_.position.set(42,Xt-.015,v),this.root.add(_)}const m=new Pe(.065,.08,.045,10),p=new Kn(.012,6,6),y=[[18,Xt,8.2],[34,Xt,8.2],[50,Xt,8.2],[66,Xt,8.2],[24,ge,26],[54,ge,26],[42,ge,47]];for(const[v,_,A]of y){const E=new I(m,x);E.position.set(v,_-.025,A);const w=new _e({color:14164006}),C=new I(p,w);C.position.set(v+.04,_-.048,A),this.root.add(E,C),this.smokeLedMats.push(w)}}buildJAdVisionLightColumn(t,e,n,i,s){const c=new I(new J(1.76,Xt-2.95,1.3800000000000001),s);c.position.set(t,2.95+(Xt-2.95)*.5,e),this.root.add(c);const h=new I(new J(1.92-.04,.08,1.54-.04),i);h.position.set(t,2.95+.04,e),this.root.add(h);const u=new I(new J(1.92,2.95-.16,1.54),n);u.position.set(t,.16+(2.95-.16)*.5,e),u.castShadow=!0,u.receiveShadow=!0,this.root.add(u);const f=new J(.04,2.95-.16,.04);for(const w of[-1.92*.5,1.92*.5])for(const C of[-1.54*.5,1.54*.5]){const T=new I(f,i);T.position.set(t+w,.16+(2.95-.16)*.5,e+C),this.root.add(T)}const d=new I(new J(1.92+.03,.16,1.54+.03),i);d.position.set(t,.08,e),this.root.add(d);const g=new $({map:this.textures.signageStages[0],emissive:new rt(16777215),emissiveMap:this.textures.signageStages[0],emissiveIntensity:.54,roughness:.24,metalness:.04});this.signageMats.push(g);const x=new _t(.88,1.58),m=new J(.94,1.64,.03),p=new _t(.34,.72),y=new _t(.34,.62),v=new J(.11,.24,.035);for(const[w,C]of[[-1.54*.5,Math.PI],[1.54*.5,0]]){const T=new Wt;T.position.set(t,0,e+w),T.rotation.y=C;const M=new I(m,i);M.position.set(0,1.56,.015);const P=new I(x,g);P.position.set(0,1.56,.033),T.add(M,P);for(const z of[-.68,.68]){const k=new I(p,this.lightBoxTopMat);k.position.set(z,2.38,.018);const q=new I(y,this.lightBoxMidMat);q.position.set(z,1.62,.018);const K=new I(p,this.lightBoxBotMat);K.position.set(z,.86,.018);const Y=new I(v,i);Y.position.set(z,1.62,.022),T.add(k,q,K,Y)}this.root.add(T)}const _=new _t(.18,.72),A=new _t(.18,.62);for(const[w,C]of[[1.92*.5,Math.PI/2],[-1.92*.5,-Math.PI/2]]){const T=new Wt;T.position.set(t+w,0,e),T.rotation.y=C;const M=new I(m,i);M.position.set(0,1.56,.015);const P=new I(x,g);P.position.set(0,1.56,.033),T.add(M,P);for(const z of[-.59,.59]){const k=new I(_,this.lightBoxTopMat);k.position.set(z,2.38,.018);const q=new I(A,this.lightBoxMidMat);q.position.set(z,1.62,.018);const K=new I(_,this.lightBoxBotMat);K.position.set(z,.86,.018),T.add(k,q,K)}this.root.add(T)}const E=this.addFloorGlowPool(t,e,5.8,5.8,3708144,.34);this.signagePoolMats.push(E)}buildShinjukuWall456AndMidoriFacade(){const t=new $({color:1843238,roughness:.38,metalness:.76}),e=new $({color:14473939,roughness:.42,metalness:.14}),n=Vn.xEnd-Vn.xStart,i=(Vn.xStart+Vn.xEnd)*.5,s=Vn.z,o=new I(new J(n+.6,.38,.16),t);o.position.set(i,.19,s+.04),this.root.add(o);const a=new I(new J(n+.5,2.15,.12),t);a.position.set(i,1.38,s+.02),this.root.add(a);const l=new I(new _t(n,Vn.height),this.wall456Mat);l.position.set(i,1.24,s+.09),this.root.add(l);const c=new I(new J(n+1.2,.24,.58),e);c.position.set(i,2.48,s+.26),this.root.add(c);const h=new I(new J(n+1,.055,.08),this.coveLineMat);h.position.set(i,2.49,s+.54),this.root.add(h);const u=new J(.36,.2,.08);for(let X=0;X<10;X++){const Z=Vn.xStart+2.2+X*4.55,Q=new I(u,t);Q.position.set(Z,2.24,s+.08),this.root.add(Q)}const f=new I(new J(.95,2.15,.06),new $({color:11054772,roughness:.35,metalness:.65}));f.position.set(Vn.xEnd+.85,1.08,s+.04),this.root.add(f);for(let X=24;X<=62;X+=7.6){const Z=this.addFloorGlowPool(X,s+2.6,8.8,5.2,3717364,.34);this.wall456PoolMats.push(Z)}const d=5*F,g=new I(new _t(11.2,2.35),new $({map:this.textures.ticketMachineFront,emissive:new rt(14479592),emissiveMap:this.textures.ticketMachineFront,emissiveIntensity:.28,roughness:.42}));g.position.set(30,1.18,d-.05),g.rotation.y=Math.PI,this.root.add(g);const x=new I(new _t(11,.82),new $({map:this.textures.fareTableHeader,emissive:new rt(16777215),emissiveMap:this.textures.fareTableHeader,emissiveIntensity:.44,roughness:.34}));x.position.set(30,2.64,d-.18),x.rotation.y=Math.PI,x.rotation.x=.22,this.root.add(x),this.addFloorGlowPool(30,d-1.6,10.5,3.6,12903148,.22);const m=new $({color:2498333,roughness:.46,metalness:.16}),p=new $({color:943668,roughness:.48,metalness:.12}),y=new be({color:12113116,transparent:!0,opacity:.32,roughness:.08,metalness:.1,reflectivity:.85,clearcoat:.85}),v=new $({map:this.textures.midoriHeader,emissive:new rt(16777215),emissiveMap:this.textures.midoriHeader,emissiveIntensity:.48,roughness:.3}),_=new I(new J(11.96,.56,.18),t);_.position.set(42,2.66,d-.04);const A=new I(new _t(11.86,.5),v);A.position.set(42,2.66,d-.135),A.rotation.y=Math.PI,this.root.add(_,A);const E=new I(new J(11.96,Xt-2.94,.22),p);E.position.set(42,2.94+(Xt-2.94)*.5,d-.02),this.root.add(E);const w=new $({color:10134184,normalMap:this.textures.brushedMetalNormal,roughness:.38,metalness:.72});for(const X of[39.1,44.9]){const Z=new I(new J(4.4,.4,.04),w);Z.position.set(X,3.46,d-.14),this.root.add(Z)}const C=new I(new J(2.8,2.38,.22),m);C.position.set(37.4,1.19,d+.05);const T=new I(new J(2.8,2.38,.22),m);T.position.set(46.6,1.19,d+.05),this.root.add(C,T);const M=new I(new J(6.4,2.34,.06),y);M.position.set(42,1.17,d+.12),this.root.add(M);for(const X of[38.84,40.42,42,43.58,45.16]){const Z=new I(new J(.08,2.36,.11),w);Z.position.set(X,1.18,d+.12),this.root.add(Z)}const P=new I(new J(11.96,3.8,.2),new $({color:14210508,emissive:new rt(10131080),emissiveIntensity:.28,roughness:.48}));P.position.set(42,1.9,d+3.9);const z=new I(new J(.22,3.8,4),m);z.position.set(47.9,1.9,d+2);const k=new I(new J(8.6,1.05,.8),new $({color:12760740,emissive:new rt(6708816),emissiveIntensity:.24,roughness:.44}));k.position.set(42,.525,d+2.55);const q=new I(new _t(7.6,.85),new $({color:949314,emissive:new rt(1010232),emissiveIntensity:.52}));q.position.set(42,2,d+3.78),q.rotation.y=Math.PI,this.root.add(P,z,k,q);const K=new Wt;K.position.set(36.45,0,d-.42);const Y=new I(new J(.62,.14,.56),t);Y.position.y=.07;const et=new I(new J(.54,1.62,.12),t);et.position.y=.95;const U=new I(new _t(.46,1.38),new $({color:2929764,emissive:new rt(1210428),emissiveIntensity:.68}));U.position.set(0,.98,-.065),U.rotation.y=Math.PI,K.add(Y,et,U),this.root.add(K),this.addFloorGlowPool(42,d-.9,11.4,3.4,14213076,.22)}buildFourShinjukuTicketGates(){const t=new $({color:12239562,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.38,.38),roughness:.28,metalness:.82,envMapIntensity:1.05}),e=new $({color:1448480,roughness:.34,metalness:.45}),n=new $({color:4104248,roughness:.34,metalness:.16}),i=new $({color:4113636,emissive:new rt(1607864),emissiveIntensity:.95,roughness:.22}),s=new $({map:this.textures.turnstileFrontArrow,emissive:new rt(6615208),emissiveMap:this.textures.turnstileFrontArrow,emissiveIntensity:.58,roughness:.28}),o=new $({color:14869728,roughness:.26,metalness:.06,envMapIntensity:.85}),a=new $({color:1974564,roughness:.48,metalness:.14}),l=new _t(.19,.44),c=(f,d,g=0)=>{const x=new Wt;x.position.set(f,0,d),x.rotation.y=g;const m=new I(new J(.26,.92,1.46),t);m.position.y=.46,m.castShadow=!0,x.add(m);for(const y of[-.71,.71]){const v=new I(new J(.27,.84,.14),n);v.position.set(0,.45,y),x.add(v);const _=new I(l,s);_.position.set(0,.62,y+(y>0?.072:-.072)),y<0&&(_.rotation.y=Math.PI),x.add(_)}const p=new I(new J(.28,.06,1.5),e);p.position.y=.94,x.add(p);for(const y of[-.52,.52]){const v=new I(new J(.18,.03,.22),i);v.position.set(0,.975,y),v.rotation.x=y>0?.22:-.22,x.add(v)}this.root.add(x)},h=(f,d,g,x)=>{const m=new I(new _t(12,2.8),a);m.rotation.x=-Math.PI/2,m.position.set(f,.006,d),this.root.add(m);const p=new $({map:g,emissive:new rt(16777215),emissiveMap:g,emissiveIntensity:.48,roughness:.34}),y=new I(new J(12,.76,.34),e);y.position.set(f,3.26,d);const v=new I(new _t(11.88,.7),p);v.position.set(f,3.26,d-.175),v.rotation.y=Math.PI;const _=new I(new _t(11.88,.7),p);_.position.set(f,3.26,d+.175),this.root.add(y,v,_);const A=f-1.1,E=new I(new J(1.18,2.9,1.18),o);E.position.set(A,1.45,d),this.root.add(E);const w=new $({map:x,emissive:new rt(16777215),emissiveMap:x,emissiveIntensity:.46,roughness:.32}),C=new I(new _t(.92,.92),w);C.position.set(A,1.72,d-.596),C.rotation.y=Math.PI;const T=new I(new _t(.92,.92),w);T.position.set(A,1.72,d+.596),this.root.add(C,T);for(const M of[-5.2,-4.1,-2.1,.2,2.8,4,5.2])c(f+M,d,0);this.addFloorGlowPool(f,d,11.5,4.2,3981416,.2)};h(18,5.1*F,this.textures.gateHeaderWest,this.textures.gatePillarWest),h(66,5.1*F,this.textures.gateHeaderEast,this.textures.gatePillarEast);const u=(f,d,g,x)=>{const m=new I(new _t(2.4,7.8),a);m.rotation.x=-Math.PI/2,m.position.set(f,.006,d),this.root.add(m);const p=new $({map:g,emissive:new rt(16777215),emissiveMap:g,emissiveIntensity:.48,roughness:.34}),y=new I(new J(.32,.72,7.8),e);y.position.set(f,3.18,d);const v=new I(new _t(7.68,.66),p);v.position.set(f+(x?-.165:.165),3.18,d),v.rotation.y=x?-Math.PI/2:Math.PI/2,this.root.add(y,v);for(const _ of[-3.4,-2.3,2.3,3.4])c(f,d+_,Math.PI/2)};u(2.5*F,12*F,this.textures.gateHeaderCentralWest,!1),u(18.5*F,12*F,this.textures.gateHeaderCentralEast,!0)}buildAuthenticPlatformStairCell(t,e,n,i,s,o){const a=new Wt;a.position.set(t,0,e),a.rotation.y=n?Math.PI:0;const l=new $({color:1711650,roughness:.44,metalness:.24}),c=new $({color:12239562,roughness:.28,metalness:.82}),h=this.textures.platformNumPlaques.get(i.numLeft),u=this.textures.platformNumPlaques.get(i.numRight);for(const[A,E]of[[-1.52,h],[1.52,u]]){const w=new I(new J(.74,ge,.82),l);w.position.set(A,ge*.5,1.46),w.castShadow=!0,a.add(w);const C=new $({map:E,emissive:new rt(16777215),emissiveMap:E,emissiveIntensity:.28,roughness:.38}),T=new I(new _t(.68,1.92),C);T.position.set(A,1.72,1.876),a.add(T)}for(const A of[-1.72,1.72]){const E=new I(new J(.24,ge,3.6),o);E.position.set(A,ge*.5,-.05),a.add(E)}const f=new I(new _t(3.2,ge),new _e({color:329482}));f.position.set(0,ge*.5,-1.72),a.add(f);const d=this.textures.platformStairHeaders.get(i.id),g=new $({map:d,emissive:new rt(16777215),emissiveMap:d,emissiveIntensity:.52,roughness:.32}),x=new I(new J(3.56,.64,.18),s);x.position.set(0,2.86,1.82);const m=new I(new _t(3.48,.58),g);m.position.set(0,2.86,1.916),a.add(x,m);const p=new $({color:4343886,roughness:.72}),y=new $({color:1722488,roughness:.48}),v=new $({color:14460946,roughness:.52});for(let A=0;A<10;A++){const E=.12+A*.23,w=1.45-A*.31,C=new I(new J(2.3,.12,.32),p);C.position.set(0,E,w);const T=new I(new _t(2.26,.18),y);T.position.set(0,E-.08,w+.162);const M=new I(new J(2.28,.025,.045),v);M.position.set(0,E+.062,w+.14),a.add(C,T,M)}for(const A of[-1.08,0,1.08]){const E=new I(new Pe(.022,.022,3.6,8),c);E.position.set(A,1.75,.05),E.rotation.x=.64,a.add(E)}const _=new Pe(.02,.02,2.5,6);for(let A=-1;A<=1;A+=.25){const E=new I(_,s);E.position.set(A,1.25,1.65),a.add(E)}this.addFloorGlowPool(t,e+(n?-2.2:2.2),5.2,4.2,i.glowColor,.2),this.root.add(a)}buildTactileAndFloorGuides(){const t=new $({map:this.textures.tactileLine,normalMap:this.textures.tactileLineNormal,normalScale:new Et(.75,.75),roughness:.62}),e=new $({map:this.textures.tactileDots,roughness:.62}),n=new $({color:5394508,roughness:.56}),i=(o,a,l=.64,c=.64)=>{const h=new I(new _t(l,c),e);h.rotation.x=-Math.PI/2,h.position.set(o,.009,a),h.receiveShadow=!0,this.root.add(h)},s=(o,a,l,c)=>{const h=Math.abs(l-o)>Math.abs(c-a),u=Math.hypot(l-o,c-a),f=h?new _t(u,.62):new _t(.62,u),d=new I(f,n);d.rotation.x=-Math.PI/2,d.position.set((o+l)*.5,.006,(a+c)*.5),this.root.add(d);const g=Math.max(1,Math.round(u/.56));for(let x=0;x<g;x++){const m=(x+.5)/g,p=new I(new _t(.42,.52),t);p.rotation.x=-Math.PI/2,h&&(p.rotation.z=Math.PI/2),p.position.set(o+(l-o)*m,.008,a+(c-a)*m),p.receiveShadow=!0,this.root.add(p)}};s(6,10.6,74,10.6),s(18,10.6,18,48),s(30,10.6,30,19.2),s(43,10.6,43,19.2),s(66,10.6,66,48),s(66,9,74.8,9),i(18,10.6),i(30,10.6),i(43,10.6),i(66,10.6),i(74.4,9,.65,2.4),s(14,25.8,68,25.8),s(6,46.8,78,46.8),s(6,10.6,6,46.8),s(78,18,78,46.8)}buildLightingFixtures(){const t=[{x:16,z:10,h:Xt,intensity:4.8,hasLight:!0,haze:!0,circular:!0},{x:30,z:9.5,h:Xt,intensity:5.4,hasLight:!0,haze:!0,circular:!0},{x:44,z:9.5,h:Xt,intensity:6,hasLight:!0,haze:!0,circular:!0},{x:58,z:9.5,h:Xt,intensity:5.4,hasLight:!0,haze:!0,circular:!0},{x:70,z:9.5,h:Xt,intensity:4.6,hasLight:!0,haze:!0,circular:!0},{x:24,z:34,h:ge,intensity:4.6,hasLight:!0,haze:!0},{x:56,z:34,h:ge,intensity:4.6,hasLight:!0,haze:!0},{x:18,z:48,h:ge,intensity:4,haze:!0},{x:42,z:48,h:ge,intensity:4.4,emergency:!0,haze:!0},{x:66,z:48,h:ge,intensity:4,haze:!0},{x:6,z:28,h:ge,intensity:3.6},{x:78,z:28,h:ge,intensity:3.6}],e=new $({color:9344154,roughness:.48,metalness:.55}),n=new yi(.22,16),i=new Va(.22,.27,16),s=new _t(.84,.84),o=new J(.94,.05,.94);t.forEach((h,u)=>{const f=h.emergency?15644260:14215912,d=new $({color:f,emissive:new rt(f),emissiveIntensity:1.05,roughness:.24});if(h.circular)for(const p of[-3.4,0,3.8]){const y=new I(i,e);y.rotation.x=Math.PI/2,y.position.set(h.x,h.h-.015,h.z+p);const v=new I(n,d);v.rotation.x=Math.PI/2,v.position.set(h.x,h.h-.018,h.z+p),this.root.add(y,v)}else{const p=new I(o,e);p.position.set(h.x,h.h-.025,h.z);const y=new I(s,d);y.rotation.x=Math.PI/2,y.position.set(h.x,h.h-.052,h.z),this.root.add(p,y)}let g=null;h.hasLight&&(g=new vi(h.emergency?15904082:13033188,h.intensity,21,1.85),g.position.set(h.x,h.h-.45,h.z),this.root.add(g));let x=null;if(h.haze){x=new ih({map:this.textures.lightShaftSoft,color:h.emergency?15250536:10931928,transparent:!0,opacity:.06,blending:ji,depthWrite:!1});const p=new df(x);p.position.set(h.x,h.h-.16,h.z),p.scale.set(1.25,.48,1),this.root.add(p)}const m=this.addFloorGlowPool(h.x,h.z,5.4,4.6,h.emergency?15773012:10536142,.18);this.flickerLights.push({light:g,tubeMat:d,glowMat:x,floorPoolMat:m,baseIntensity:h.intensity,x:h.x,z:h.z,y:h.h,phase:u*1.93+.4,emergency:h.emergency,killedTimer:0,blowoutDelay:0})});const a=new $({color:14477542,emissive:new rt(12375764),emissiveIntensity:.85}),l=new $({color:3949128,roughness:.55,metalness:.42});let c=0;for(let h=10;h<=72;h+=6.2)for(const u of[5.8,9.2,12.8,16.8]){const f=c++%3!==1,d=new I(i,e);d.rotation.x=Math.PI/2,d.position.set(h,Xt-.015,u);const g=new I(n,f?a:l);g.rotation.x=Math.PI/2,g.position.set(h,Xt-.018,u),this.root.add(d,g)}this.concourseShadowSpot=new Gr(13361896,11.5,28,Math.PI*.44,.78,1.55),this.concourseShadowSpot.position.set(Be.x-2,Xt-.18,Be.z),this.concourseShadowSpot.target.position.set(Be.x+2.5,0,Be.z),this.concourseShadowSpot.castShadow=!0,this.concourseShadowSpot.shadow.mapSize.set(512,512),this.concourseShadowSpot.shadow.camera.near=.8,this.concourseShadowSpot.shadow.camera.far=26,this.concourseShadowSpot.shadow.bias=-.0012,this.root.add(this.concourseShadowSpot,this.concourseShadowSpot.target)}buildAlpsPedestal(){const t=new Wt;t.position.set(Be.x,0,Be.z),t.rotation.y=-Math.PI/2;const e=new $({color:1975080,roughness:.28,metalness:.3,envMapIntensity:.95}),n=new $({color:12229714,roughness:.26,metalness:.86}),i=new I(new J(2.05,.24,2.05),e);i.position.y=.12,i.castShadow=!0,i.receiveShadow=!0,t.add(i);const s=new I(new J(1.65,.56,1.65),e);s.position.y=.52,s.castShadow=!0,s.receiveShadow=!0,t.add(s);const o=new I(new J(1.7,.04,1.7),n);o.position.y=.8,t.add(o);const a=new I(new _t(1.18,.54),new $({map:this.textures.pedestalPlaque,roughness:.42}));a.position.set(0,.5,.835),t.add(a);const l=new be({color:12379886,transparent:!0,opacity:.55,roughness:.05,metalness:.2,reflectivity:1,side:Ee}),c=[[.65,-1.25,.34,.4],[-.85,-1.1,.26,1.1],[.22,-1.55,.22,2.2],[-.4,-1.45,.3,.8],[1.15,-.7,.24,1.7]];for(const[f,d,g,x]of c){const m=new I(new yi(g,3),l);m.rotation.x=-Math.PI/2,m.rotation.z=x,m.position.set(f,.015,d),t.add(m)}const h=[[-1.4,1.4,!1],[1.4,1.4,!1],[-1.4,-1.4,!1],[1.4,-1.4,!0]];for(const[f,d,g]of h){const x=new Wt,m=new I(new Pe(.14,.16,.04,12),n);m.position.y=.02;const p=new I(new Pe(.025,.025,.88,8),n);p.position.y=.46,p.castShadow=!0;const y=new I(new Kn(.046,10,10),n);y.position.y=.92,x.add(m,p,y),x.position.set(f,0,d),g&&(x.rotation.z=-Math.PI/2+.06,x.rotation.y=.6,x.position.set(f+.32,.05,d-.25)),t.add(x)}const u=new $({color:5120632,emissive:new rt(1837104),emissiveIntensity:.45,transparent:!0,opacity:.78,roughness:.22});for(let f=0;f<8;f++){const d=new I(new yi(.17,12),u);d.rotation.x=-Math.PI/2,d.scale.set(.85,1.38,1),d.position.set((f%2===0?-.24:.24)+f*.03,.013,-1.4-f*.92),t.add(d)}this.root.add(t)}buildEastExitPortal(){const t=Xn,e=qn,n=new $({color:11186874,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.45,.45),roughness:.28,metalness:.84,envMapIntensity:1.05}),i=new $({color:1777702,roughness:.38,metalness:.42}),s=new $({color:4104248,roughness:.32,metalness:.16}),o=new $({color:13645880,emissive:new rt(5378578),emissiveIntensity:.55,roughness:.34}),a=new $({color:4114664,emissive:new rt(1738932),emissiveIntensity:.95,roughness:.22}),l=[5.4,7,7.9,10.1,11,12.6];for(const v of l){const _=new Wt;_.position.set(t,0,v),_.rotation.y=-Math.PI/2;const A=new I(new J(.32,.94,1.38),n);A.position.y=.47,A.castShadow=!0,_.add(A);for(const C of[-.67,.67]){const T=new I(new J(.33,.84,.14),s);T.position.set(0,.45,C),_.add(T)}const E=new I(new J(.34,.06,1.4),i);E.position.y=.96,_.add(E);const w=new I(new J(.22,.04,.24),a);w.position.set(0,.99,.46),w.rotation.x=.24,_.add(w),this.root.add(_)}this.centerPaddleMat=new $({color:13645880,emissive:new rt(5378578),emissiveIntensity:.55,roughness:.34});const c=(v,_,A)=>{const E=(_-v-.34)*.48,w=A?this.centerPaddleMat:o,C=new Wt;C.position.set(t,.58,v+.17);const T=new I(new J(.05,.58,E),w);T.position.z=E*.5,C.add(T);const M=new Wt;M.position.set(t,.58,_-.17);const P=new I(new J(.05,.58,E),w);P.position.z=-E*.5,M.add(P),this.root.add(C,M),A&&this.gatePaddles.push({leftPivot:C,rightPivot:M})};c(5.4,7,!1),c(7.9,10.1,!0),c(11,12.6,!1);const h=Tc(!1);this.gateDisplayMat=new $({map:h,emissive:new rt(16777215),emissiveMap:h,emissiveIntensity:.72,roughness:.72});const u=new I(new J(.18,.82,2.45),new $({color:1448478,roughness:.5}));u.position.set(t,2.68,e);const f=new I(new _t(2.32,.72),this.gateDisplayMat);f.position.set(t-.095,2.68,e),f.rotation.y=-Math.PI/2,this.root.add(u,f);const d=new $({map:this.textures.signEmergencyExit,emissive:new rt(5430418),emissiveMap:this.textures.signEmergencyExit,emissiveIntensity:.78,roughness:.32}),g=new I(new J(.12,.44,1.18),i);g.position.set(t+.1,3.55,e);const x=new I(new _t(1.12,.4),d);x.position.set(t+.03,3.55,e),x.rotation.y=-Math.PI/2,this.root.add(g,x),this.exitLight=new vi(14695227,5.2,14,1.85),this.exitLight.position.set(t-.9,2.35,e),this.root.add(this.exitLight);const m=new $({map:this.textures.shutterMetal,normalMap:this.textures.shutterNormal,normalScale:new Et(.85,.85),roughness:.46,metalness:.72});this.exitShutter=new I(new J(.22,Xt,12.2),m),this.exitShutter.position.set(t+1.85,Xt*.5,e),this.root.add(this.exitShutter);const p=new $({color:8160138,roughness:.65});for(let v=0;v<8;v++){const _=new I(new J(.36,.22,6.2),p);_.position.set(t+2.3+v*.28,.11+v*.22,e),this.root.add(_)}const y=new I(new _t(6.6,Xt),new _e({color:7250104}));y.position.set(Jn*F-.15,Xt*.5,e),y.rotation.y=-Math.PI/2,this.root.add(y)}buildChargeTerminals(){const t=new $({color:13686490,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.35,.35),roughness:.34,metalness:.58,envMapIntensity:.88}),e=new $({color:1843494,roughness:.38,metalness:.72}),n=new $({color:15265006,roughness:.4,metalness:.15}),i=new $({color:4870744,map:this.textures.chargeMachineHeader,emissive:new rt(16777215),emissiveMap:this.textures.chargeMachineHeader,emissiveIntensity:.66,roughness:.78,metalness:.04}),s=new $({color:12371146,map:this.textures.chargeMachineLowerDeck,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.28,.28),roughness:.44,metalness:.42});for(const o of Gg){const a=new Wt;a.position.set(o.x,0,o.z),a.rotation.y=o.rotY;const l=new I(new J(.86,.12,.62),e);l.position.set(0,.06,0),a.add(l);const c=new I(new J(.86,1.78,.6),t);c.position.set(0,1.01,-.01),c.castShadow=!0,c.receiveShadow=!0,a.add(c);const h=new I(new J(.88,.44,.66),e);h.position.set(0,1.72,.02);const u=new I(new _t(.84,.4),i);u.position.set(0,1.72,.355),a.add(h,u);const f=new I(new J(.62,.46,.04),e);f.position.set(.06,1.24,.295),f.rotation.x=-.14,a.add(f);const{texture:d,ctx:g}=Px(o.zone),x=new $({color:4344402,map:d,emissive:new rt(16777215),emissiveMap:d,emissiveIntensity:.7,roughness:.72,metalness:.05}),m=new I(new _t(.56,.41),x);m.position.set(.06,1.24,.318),m.rotation.x=-.14,a.add(m);for(let P=0;P<4;P++){const z=new I(new J(.065,.055,.03),n);z.position.set(-.33,1.38-P*.088,.302),a.add(z)}const p=new I(new J(.84,.12,.24),t);p.position.set(0,.94,.36),p.rotation.x=.2,a.add(p);const y=new I(new J(.24,.04,.18),e);y.position.set(-.22,1.005,.37),y.rotation.x=.2;const v=new $({color:2788996,emissive:new rt(1943706),emissiveIntensity:.74,roughness:.46}),_=new I(new J(.19,.02,.13),v);_.position.set(-.22,1.022,.375),_.rotation.x=.2,a.add(y,_);const A=new I(new J(.16,.05,.14),e);A.position.set(.04,1.005,.37),A.rotation.x=.2;const E=new I(new J(.18,.04,.14),e);E.position.set(.26,1.005,.37),E.rotation.x=.2,a.add(A,E);const w=new I(new _t(.8,.78),s);w.position.set(0,.51,.296),a.add(w);const C=o.x+Math.sin(o.rotY)*1,T=o.z+Math.cos(o.rotY)*1,M=this.addFloorGlowPool(C,T,3.2,3.2,3856040,.28);this.root.add(a),this.terminals.push({def:o,group:a,screenTex:d,screenCtx:g,padMat:v,floorGlowMat:M,charged:!1,progress:0})}}buildHidingSpots(){const t=new $({color:3029830,roughness:.44,metalness:.68,envMapIntensity:1.15}),e=new $({color:724497,roughness:.92}),n=new $({color:1712166,roughness:.42,metalness:.72}),i=new $({color:14069828,emissive:new rt(5389842),emissiveIntensity:.65,roughness:.36}),s=new $({color:1465914,roughness:.36,metalness:.52}),o=new be({color:11196616,transparent:!0,opacity:.32,roughness:.14,clearcoat:1});for(const a of _h){const l=new Wt;if(l.position.set(a.x,0,a.z),l.rotation.y=a.rotY,a.kind==="phonebooth"){const c=new I(new J(1.06,2.38,.06),s);c.position.set(0,1.19,-.48);const h=new I(new J(.05,2.32,.96),o);h.position.set(-.5,1.16,0);const u=new I(new J(.05,2.32,.96),o);u.position.set(.5,1.16,0);const f=new I(new J(1.12,.24,1.06),s);f.position.set(0,2.38,0);const d=new $({map:this.textures.signPayphone,emissive:new rt(8976052),emissiveMap:this.textures.signPayphone,emissiveIntensity:1.35}),g=new I(new _t(.94,.22),d);g.position.set(0,2.38,.54);const x=new I(new J(.28,.36,.2),new $({color:1737800,roughness:.32,metalness:.22}));x.position.set(-.18,1.32,-.34);const m=new Wt;m.position.set(-.48,0,.48);const p=new I(new J(.96,1.16,.04),s);p.position.set(.48,.58,0);const y=new I(new J(.96,.44,.04),s);y.position.set(.48,2.08,0);const v=new I(new J(.86,.72,.03),o);v.position.set(.48,1.52,0);const _=new I(new J(.05,.22,.07),i);_.position.set(.84,1.1,.04),m.add(p,y,v,_);const A=this.addFloorGlowPool(a.x+.85,a.z,3.6,3.6,4907152,.36);l.add(c,h,u,f,g,x,m),this.root.add(l),this.closets.push({def:a,group:l,doorPivot:m,doorAngle:0,targetAngle:0,phoneGlowMat:A})}else{const c=new I(new J(.98,2.26,.06),e);c.position.set(0,1.13,-.45);const h=new I(new J(.06,2.26,.94),t);h.position.set(-.47,1.13,0);const u=new I(new J(.06,2.26,.94),t);u.position.set(.47,1.13,0);const f=new I(new J(1,.06,.96),t);f.position.set(0,2.25,0);const d=new Wt;d.position.set(-.45,0,.45);const g=new I(new J(.9,1.34,.04),t);g.position.set(.45,.67,0);const x=new I(new J(.9,.48,.04),t);x.position.set(.45,2.01,0),d.add(g,x);for(const y of[1.44,1.56,1.68]){const v=new I(new J(.78,.022,.045),n);v.position.set(.45,y,0),v.rotation.x=.2,d.add(v)}const m=new I(new J(.04,.16,.07),i);m.position.set(.79,1.08,.04);const p=new I(new J(.28,.06,.05),i);p.position.set(.45,1.85,.02),d.add(m,p),l.add(c,h,u,f,d),this.root.add(l),this.closets.push({def:a,group:l,doorPivot:d,doorAngle:0,targetAngle:0})}}}buildShinjukuPropsAndSignage(){const t=new $({map:this.textures.lockerMetal,roughness:.4,metalness:.65,envMapIntensity:1.2}),e=new $({color:2106924,roughness:.46,metalness:.72}),n=new I(new _t(5.6,2.25),new $({map:this.textures.fareAdjustFront,emissive:new rt(16773304),emissiveMap:this.textures.fareAdjustFront,emissiveIntensity:.42,roughness:.35}));n.position.set(27.8,1.14,6*F+.05),this.root.add(n);const i=new I(new _t(3.4,.56),new $({map:this.textures.fareAdjustSign,emissive:new rt(16777215),emissiveMap:this.textures.fareAdjustSign,emissiveIntensity:.44,roughness:.34}));i.position.set(27.8,2.65,6*F+.08),this.root.add(i),this.addFloorGlowPool(27.8,6*F+1.5,6.2,3.2,15254584,.2);for(const U of[19,21.2,23.4,34.5,36.7]){const X=new I(new J(.56,2.1,1.9),t);X.position.set(7.72,1.05,U),this.root.add(X)}const s=new $({map:this.textures.vendingFront,emissive:new rt(13427950),emissiveMap:this.textures.vendingFront,emissiveIntensity:.58,roughness:.32,metalness:.24}),o=new $({color:11186872,roughness:.46,metalness:.38}),a=[s,o,o,o,o,o];for(const U of[39.5,41.1]){const X=new I(new J(.84,1.98,1.26),a);X.position.set(4.44,.99,U),this.root.add(X)}this.addFloorGlowPool(5.6,40.3,4.2,4.8,9229035,.26);const l=new Wt;l.position.set(Yn.x,0,Yn.z);const c=new I(new J(1.55,2.25,1.25),new $({color:1977400,roughness:.44,metalness:.48}));c.position.y=1.125,l.add(c);const h=new I(new _t(1.42,.48),new $({map:this.textures.signPhotoBooth,emissive:new rt(8969458),emissiveMap:this.textures.signPhotoBooth,emissiveIntensity:.72}));h.position.set(0,1.96,-.635),h.rotation.y=Math.PI,l.add(h);const u=new $({color:1317412,roughness:.92,side:Ee}),f=new I(new _t(.62,1.62),u);f.position.set(.22,.86,-.64),f.rotation.y=Math.PI,l.add(f),this.photoBoothShadowMesh=new I(new Pe(.24,.34,1.55,10),new _e({color:328200})),this.photoBoothShadowMesh.position.set(-.22,.85,-.52),this.photoBoothShadowMesh.visible=!1,l.add(this.photoBoothShadowMesh),this.addFloorGlowPool(Yn.x,Yn.z-1.1,3.2,3.2,6998248,.24),this.root.add(l);const d=new $({color:5657678,roughness:.68}),g=new Wt;g.position.set(8.6*F,0,8.5*F);const x=new I(new J(2.6,.08,.58),d);x.position.y=.48;const m=new I(new J(2.6,.36,.06),d);m.position.set(0,.74,-.26),g.add(x,m);for(const U of[-1,0,1]){const X=new I(new J(.08,.48,.5),e);X.position.set(U,.24,0),g.add(X)}this.root.add(g);const p=new I(new J(2.4,.82,.9),new $({color:6836798,roughness:.48}));p.position.set(11.2*F,.41,6.2*F),this.root.add(p);const y=new $({color:5817514,emissive:new rt(2265716),emissiveIntensity:.68,roughness:.26});for(const U of[10.9*F,11.5*F]){const X=new I(new J(.44,.32,.38),e);X.position.set(U,.96,6.2*F);const Z=new I(new _t(.36,.24),y);Z.position.set(U,.96,6.2*F-.2),Z.rotation.y=Math.PI,this.root.add(X,Z)}const v=new I(new _t(6.8,2.85),new $({map:this.textures.newDaysShutter,emissive:new rt(8569480),emissiveMap:this.textures.newDaysShutter,emissiveIntensity:.16,roughness:.5,metalness:.5}));v.position.set(19*F+.04,1.44,6.5*F),v.rotation.y=Math.PI/2,this.root.add(v);const _=new $({map:this.textures.stationMap,emissive:new rt(16777215),emissiveMap:this.textures.stationMap,emissiveIntensity:.42,roughness:.35}),A=(U,X,Z,Q)=>{const ct=new I(new J(2.48,1.88,.06),e);ct.position.set(U,X,Z),ct.rotation.y=Q;const pt=new I(new _t(2.38,1.78),_);pt.position.set(U+Math.sin(Q)*.036,X,Z+Math.cos(Q)*.036),pt.rotation.y=Q,this.root.add(ct,pt)};A(14.5*F,1.72,1*F+.06,0),A(11*F,1.72,13*F-.06,Math.PI);const E=(U,X,Z,Q,ct,pt=3.35,W=.74)=>{const ot=new Wt;ot.position.set(X,Q,Z),ot.rotation.y=ct;const gt=new I(new J(pt,W,.14),e),ht=new $({map:U,emissive:new rt(16777215),emissiveMap:U,emissiveIntensity:.42,roughness:.34}),Rt=new I(new _t(pt-.08,W-.06),ht);Rt.position.z=.075;const jt=new I(new _t(pt-.08,W-.06),ht);jt.position.z=-.075,jt.rotation.y=Math.PI;const Dt=new Pe(.02,.02,.9,6),pe=new I(Dt,e);pe.position.set(-pt*.38,W*.5+.35,0);const he=new I(Dt,e);he.position.set(pt*.38,W*.5+.35,0),ot.add(gt,Rt,jt,pe,he),this.root.add(ot)};E(this.textures.signEastExit,48,9.2,3.55,Math.PI/2,3.65,.78),E(this.textures.signWestPassage,26,9.2,3.55,Math.PI/2,3.65,.78),E(this.textures.signMidoriTicket,39,12.6,3.25,Math.PI/2,2.35,.58),E(this.textures.signMidoriTicket,49,12.6,3.25,Math.PI/2,2.35,.58),E(this.textures.signCentralEast,64,14.5,3.45,0,3.35,.72),E(this.textures.signMetroPromenade,42,48,3.05,Math.PI/2,3.5,.72);const w=Ix();this.departureBoardTex=w.texture,this.departureBoardCtx=w.ctx;const C=new $({map:this.departureBoardTex,emissive:new rt(16777215),emissiveMap:this.departureBoardTex,emissiveIntensity:.72,roughness:.34}),T=new Wt;T.position.set(57.5,3.42,11.5),T.rotation.y=-Math.PI/2;const M=new I(new J(4.4,.98,.2),e),P=new I(new _t(4.32,.9),C);P.position.z=.105;const z=new I(new _t(4.32,.9),C);z.position.z=-.105,z.rotation.y=Math.PI,T.add(M,P,z),this.root.add(T);const k=new $({map:this.textures.clockFace,emissive:new rt(10405982),emissiveMap:this.textures.clockFace,emissiveIntensity:.45,roughness:.34}),q=(U,X,Z,Q)=>{const ct=new Wt,pt=new I(new J(.68,.56,.14),new $({color:1334834,roughness:.44})),W=new I(new _t(.56,.5),k);W.position.z=.075;const ot=new I(new _t(.56,.5),k);ot.position.z=-.075,ot.rotation.y=Math.PI,ct.add(pt,W,ot),ct.position.set(U,X,Z),ct.rotation.y=Q,this.root.add(ct)};q(44.5,3.62,12.2,Math.PI/2),q(66,3.15,22.8,0);const K=[[14,4.06,0],[68,4.06,0],[24,51.94,Math.PI],[56,51.94,Math.PI],[4.06,26,Math.PI/2],[79.94,34,-Math.PI/2]],Y=new _t(1.18,1.72),et=new J(1.26,1.8,.04);for(const[U,X,Z]of K){const Q=new $({map:this.textures.posterStages[0],emissive:new rt(16777215),emissiveMap:this.textures.posterStages[0],emissiveIntensity:.22,roughness:.46});this.posterMats.push(Q);const ct=new Wt;ct.position.set(U,1.76,X),ct.rotation.y=Z;const pt=new I(et,e);pt.position.z=-.025,ct.add(pt,new I(Y,Q)),this.root.add(ct)}}buildRealismClutter(){const t=new $({color:9081498,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.45,.45),roughness:.32,metalness:.82,envMapIntensity:.95}),e=new $({color:1777700,roughness:.5,metalness:.36});for(const[U,X]of[[24.8,18.8],[54.2,18.8],[4.7,42.2],[75.2,28.4]]){const Z=new Wt;Z.position.set(U,0,X);const Q=new I(new J(.46,.84,.36),t);Q.position.y=.42,Q.castShadow=!0;const ct=new I(new J(.48,.14,.38),e);ct.position.y=.91;const pt=new I(new yi(.08,12),e);pt.position.set(0,.72,.185),Z.add(Q,ct,pt),this.root.add(Z)}const n=new $({map:this.textures.wetFloorSign,roughness:.48}),i=(U,X,Z,Q)=>{const ct=new Wt,pt=new I(new J(.34,.62,.03),n);pt.position.set(0,.31,.11),pt.rotation.x=-.22;const W=new I(new J(.34,.62,.03),n);W.position.set(0,.31,-.11),W.rotation.x=.22,ct.add(pt,W),ct.position.set(U,0,X),ct.rotation.y=Z,Q&&(ct.rotation.z=Math.PI/2-.12,ct.position.y=.18),this.root.add(ct)};i(54.8,11.8,.42,!1),i(7.1,26.5,-.7,!0);const s=new $({map:this.textures.barricadePanel,roughness:.48,metalness:.14}),o=(U,X,Z)=>{const Q=new Wt;Q.position.set(U,0,X),Q.rotation.y=Z;const ct=new I(new J(1.56,.78,.05),s);ct.position.y=.56,ct.castShadow=!0,Q.add(ct);for(const pt of[-.68,.68]){const W=new I(new Pe(.02,.02,.94,6),t);W.position.set(pt,.46,.12),W.rotation.x=-.22;const ot=new I(new Pe(.02,.02,.94,6),t);ot.position.set(pt,.46,-.12),ot.rotation.x=.22,Q.add(W,ot)}this.root.add(Q)};o(7.4,5.2,.16),o(71.5,16.4,-.35);const a=new $({map:this.textures.fireAlarmBox,emissive:new rt(7213076),emissiveMap:this.textures.fireAlarmBox,emissiveIntensity:.42,roughness:.36}),l=new _e({color:16721956});for(const[U,X,Z]of[[19.2,4.08,0],[66.4,4.08,0],[21.4,24.08,0],[48.2,51.92,Math.PI]]){const Q=new Wt;Q.position.set(U,1.38,X),Q.rotation.y=Z;const ct=new I(new J(.22,.44,.06),a),pt=new I(new Kn(.026,8,8),l);pt.position.set(0,.13,.036),Q.add(ct,pt),this.root.add(Q)}const c=new Wt;c.position.set(47.6,.14,8.9),c.rotation.set(.08,.85,Math.PI*.47);const h=new be({color:14477034,transparent:!0,opacity:.36,roughness:.14,side:Ee}),u=new I(new kr(.46,.36,8,1,!0),h);u.position.y=.24;const f=new I(new Pe(.008,.008,.82,6),t);f.position.y=-.05;const d=new I(new Ur(.05,.012,6,10,Math.PI),new $({color:14605268,roughness:.5}));d.position.set(.05,-.46,0),d.rotation.z=Math.PI,c.add(u,f,d),this.root.add(c);const g=new Wt;g.position.set(8.6*F+1.55,.2,8.5*F+.12),g.rotation.y=-.38;const x=new $({color:1578778,roughness:.52,metalness:.12}),m=new I(new J(.42,.32,.12),x),p=new I(new Ur(.055,.012,6,10,Math.PI),x);p.position.y=.16;const y=new I(new J(.05,.03,.13),t);y.position.y=.04,g.add(m,p,y),this.root.add(g);const v=new $({color:6997130,roughness:.72,side:Ee}),_=new $({color:13947076,roughness:.88,side:Ee}),A=[[18.8,17.6,.5],[19.4,18.2,-.9],[46.2,10.6,1.2],[58.2,10.2,-.4],[65.2,18.4,.7]];for(const[U,X,Z]of A){const Q=new I(new _t(.085,.055),v);Q.rotation.x=-Math.PI/2,Q.rotation.z=Z,Q.position.set(U,.014,X),this.root.add(Q)}for(const[U,X,Z]of[[25.5,16.4,.3],[52.8,12.2,-.6],[34.8,36.2,1.1]]){const Q=new I(new _t(.32,.24),_);Q.rotation.x=-Math.PI/2,Q.rotation.z=Z,Q.position.set(U,.013,X),this.root.add(Q)}const E=new $({map:this.textures.clawDragDecal,transparent:!0,roughness:.55,depthWrite:!1});for(const[U,X,Z]of[[7.92,26.8,-Math.PI/2],[44.2,51.92,Math.PI],[69.5,24.08,0]]){const Q=new I(new _t(1.8,.9),E);Q.position.set(U,1.32,X),Q.rotation.y=Z,this.root.add(Q)}const w=new be({color:1318180,alphaMap:this.textures.puddleAlpha,roughness:.03,metalness:.18,reflectivity:.85,clearcoat:.9,clearcoatRoughness:.03,transparent:!0,opacity:.38,envMapIntensity:1.65,depthWrite:!1}),C=new _e({color:11588828,transparent:!0,opacity:.65}),T=new Pe(.005,.009,.11,5);[[48.5,8.6,1.9,1.35,Xt],[62.2,10.2,1.85,1.3,Xt],[22.4,9.4,1.7,1.2,Xt],[34.2,34.6,2,1.2,ge],[52.4,48.2,1.6,1.15,ge]].forEach(([U,X,Z,Q,ct],pt)=>{const W=new I(new _t(Z*2.2,Q*2.2),w);W.rotation.x=-Math.PI/2,W.rotation.z=pt*1.17,W.position.set(U,.012,X),this.root.add(W);const ot=new _e({map:this.textures.rippleRing,color:11195100,transparent:!0,opacity:0,blending:ji,depthWrite:!1}),gt=new I(new _t(.9,.9),ot);gt.rotation.x=-Math.PI/2,gt.position.set(U,.015,X),this.root.add(gt);const ht=new I(T,C);ht.position.set(U,ct-.2,X),ht.visible=!1,this.root.add(ht),this.puddles.push({x:U,z:X,rx:Z,rz:Q,rippleMat:ot,rippleMesh:gt,ripplePhase:1,dripMesh:ht,dripY:ct-.2,dripStartY:ct-.15,dripCooldown:.7+pt*1.1})});const P=new $({map:this.textures.fireHydrant,normalMap:this.textures.brushedMetalNormal,normalScale:new Et(.25,.25),roughness:.36,metalness:.55}),z=new $({color:7215131,roughness:.42,metalness:.62}),k=new _e({color:16721956});for(const[U,X,Z]of[[8.08,28,Math.PI/2],[71.92,32,-Math.PI/2],[38,51.92,Math.PI]]){const Q=new Wt;Q.position.set(U,1.16,X),Q.rotation.y=Z;const ct=new I(new J(.68,1.44,.14),z),pt=new I(new _t(.66,1.42),P);pt.position.z=.072;const W=new I(new Kn(.044,10,10),k);W.position.set(-.12,.48,.088),Q.add(ct,pt,W),this.root.add(Q)}const q=new $({map:this.textures.floorGrate,normalMap:this.textures.floorGrateNormal,normalScale:new Et(1.1,1.1),roughness:.48,metalness:.8});for(const[U,X,Z,Q,ct]of[[74.2,9,2.8,.4,Math.PI/2],[39.2,12.2,.75,.75,0],[4.55,26.2,1.8,.38,Math.PI/2],[42,51.3,2.4,.38,0]]){const pt=new I(new _t(Z,Q),q);pt.rotation.x=-Math.PI/2,pt.rotation.z=ct,pt.position.set(U,.01,X),this.root.add(pt)}[[36,Xt-.32,12.2],[54,Xt-.32,12.2],[26,ge-.3,25.5],[58,ge-.3,45.5]].forEach(([U,X,Z],Q)=>{const ct=new Wt;ct.position.set(U,X,Z);const pt=new I(new Pe(.025,.025,.32,8),e);pt.position.y=.16,ct.add(pt);const W=new Wt,ot=new I(new J(.14,.12,.28),t),gt=new I(new Pe(.04,.045,.08,12),e);gt.rotation.x=Math.PI/2,gt.position.z=.16;const ht=new _e({color:16720418}),Rt=new I(new Kn(.017,6,6),ht);Rt.position.set(.045,.035,.145),W.add(ot,gt,Rt),ct.add(W),this.root.add(ct),this.cctvCameras.push({headPivot:W,ledMat:ht,worldX:U,worldZ:Z,phase:Q*1.4})});const Y=new I(new _t(2.6,1.3),new $({map:this.textures.graffitiDonotLook,transparent:!0,roughness:.78,depthWrite:!1}));Y.position.set(4.06,1.55,32),Y.rotation.y=Math.PI/2,this.root.add(Y);const et=new I(new _t(2.8,1.35),new $({map:this.textures.graffitiSound,transparent:!0,roughness:.78,depthWrite:!1}));et.position.set(42,1.5,51.94),et.rotation.y=Math.PI,this.root.add(et)}buildNotesAndCoins(){const t=new _t(.28,.36);for(const i of Sa){const s=new I(t,new $({color:16051936,emissive:new rt(4603180),emissiveIntensity:.65,roughness:.85,side:Ee}));s.position.set(i.x,i.y,i.z),i.vertical?s.rotation.y=i.rotY:(s.rotation.x=-Math.PI/2,s.rotation.z=i.rotY),this.root.add(s),this.notes.push({def:i,mesh:s,read:!1})}const e=new Pe(.088,.088,.02,16),n=new $({color:15396594,emissive:new rt(5396580),emissiveIntensity:.72,roughness:.14,metalness:.96});for(const i of Hg){const s=new I(e,n);s.position.set(i.x,i.y,i.z),this.root.add(s),this.coinPickups.push({def:i,mesh:s,collected:!1})}}buildDustMotes(){const e=new Float32Array(1080);for(let l=0;l<360;l++)e[l*3]=4+Math.random()*76,e[l*3+1]=.25+Math.random()*3.9,e[l*3+2]=4+Math.random()*50;const n=document.createElement("canvas");n.width=64,n.height=64;const i=n.getContext("2d"),s=i.createRadialGradient(32,32,1,32,32,28);s.addColorStop(0,"rgba(225,240,238,0.65)"),s.addColorStop(.45,"rgba(195,220,218,0.22)"),s.addColorStop(1,"rgba(195,220,218,0)"),i.fillStyle=s,i.fillRect(0,0,64,64);const o=new De;o.setAttribute("position",new Oe(e,3));const a=new Ga({color:12375248,map:new ni(n),size:.055,transparent:!0,opacity:.22,alphaTest:.01,depthWrite:!1});this.dustPoints=new lh(o,a),this.root.add(this.dustPoints)}updateTerminalVisual(t){vh(t.screenCtx,t.def.zone,t.charged,t.progress),t.screenTex.needsUpdate=!0,t.charged?(t.padMat.color.setHex(3856516),t.padMat.emissive.setHex(2072154),t.floorGlowMat.color.setHex(3856516),t.floorGlowMat.opacity=.28):t.progress>0?(t.padMat.color.setHex(15912018),t.padMat.emissive.setHex(13146660),t.floorGlowMat.color.setHex(15912018),t.floorGlowMat.opacity=.56):(t.padMat.color.setHex(4972758),t.padMat.emissive.setHex(2540730),t.floorGlowMat.color.setHex(4972758),t.floorGlowMat.opacity=.42)}setSignageCorruptionStage(t){const e=Math.max(0,Math.min(4,t));if(e===this.currentSignageStage)return;this.currentSignageStage=e;const n=this.textures.wall456Stages[e];this.wall456Mat.map=n,this.wall456Mat.emissiveMap=n,this.wall456Mat.emissiveIntensity=e>=4?.82:.56,this.wall456Mat.needsUpdate=!0;const i=this.textures.signageStages[e];for(const l of this.signageMats)l.map=i,l.emissiveMap=i,l.emissiveIntensity=e>=4?.78:.54,l.needsUpdate=!0;e===0?(this.coveLineMat.color.setHex(7133428),this.coveLineMat.emissive.setHex(2660576),this.lightBoxTopMat.color.setHex(6472940),this.lightBoxTopMat.emissive.setHex(2261708),this.lightBoxMidMat.color.setHex(3569368),this.lightBoxMidMat.emissive.setHex(1461432),this.lightBoxBotMat.color.setHex(6078696),this.lightBoxBotMat.emissive.setHex(1998020)):e===1?(this.coveLineMat.color.setHex(8955118),this.coveLineMat.emissive.setHex(3954898),this.lightBoxTopMat.color.setHex(5934312),this.lightBoxTopMat.emissive.setHex(2641092),this.lightBoxMidMat.color.setHex(4206760),this.lightBoxMidMat.emissive.setHex(2233976),this.lightBoxBotMat.color.setHex(5934312),this.lightBoxBotMat.emissive.setHex(2641092)):e===2?(this.coveLineMat.color.setHex(11950816),this.coveLineMat.emissive.setHex(8134838),this.lightBoxTopMat.color.setHex(10635480),this.lightBoxTopMat.emissive.setHex(6822048),this.lightBoxMidMat.color.setHex(6034568),this.lightBoxMidMat.emissive.setHex(4065888),this.lightBoxBotMat.color.setHex(10635480),this.lightBoxBotMat.emissive.setHex(6822048)):(this.coveLineMat.color.setHex(15609912),this.coveLineMat.emissive.setHex(12718618),this.lightBoxTopMat.color.setHex(14426666),this.lightBoxTopMat.emissive.setHex(11406358),this.lightBoxMidMat.color.setHex(9308690),this.lightBoxMidMat.emissive.setHex(6817292),this.lightBoxBotMat.color.setHex(14426666),this.lightBoxBotMat.emissive.setHex(11406358));const s=e>=3?13115946:e===2?8137396:2784468;for(const l of this.signagePoolMats)l.color.setHex(s),l.opacity=e>=4?.24:.14;for(const l of this.wall456PoolMats)l.color.setHex(s),l.opacity=e>=4?.24:.14;const o=e===0?0:e<=2?1:2,a=this.textures.posterStages[o];for(const l of this.posterMats)l.map=a,l.emissiveMap=a,l.needsUpdate=!0}setExitReady(t){const e=Tc(t);this.gateDisplayMat.map=e,this.gateDisplayMat.emissiveMap=e,this.gateDisplayMat.needsUpdate=!0,this.exitLight.color.setHex(t?3595398:14695227),this.exitLight.intensity=t?6.8:5.2,this.centerPaddleMat.color.setHex(t?3197044:13645880),this.centerPaddleMat.emissive.setHex(t?1338426:5378578)}unlockExitShutter(){this.exitUnlocked=!0}resetVisuals(){this.exitUnlocked=!1,this.shutterOpenProgress=0,this.exitShutter.position.y=Xt*.5,this.dynamicEventLight.intensity=0,this.photoBoothFlashTimer=0,this.photoBoothShadowMesh.visible=!1,this.phantomTrainTimer=0,this.wall456FlashTimer=0,this.payphoneRingActive=!1;for(const t of this.gatePaddles)t.leftPivot.rotation.y=0,t.rightPivot.rotation.y=0;this.setExitReady(!1),this.setSignageCorruptionStage(0);for(const t of this.flickerLights)t.killedTimer=0,t.blowoutDelay=0;for(const t of this.terminals)t.charged=!1,t.progress=0,this.updateTerminalVisual(t);for(const t of this.closets)t.doorAngle=0,t.targetAngle=0,t.doorPivot.rotation.y=0;for(const t of this.notes)t.read=!1;for(const t of this.coinPickups)t.collected=!1,t.mesh.visible=!0}update(t,e,n,i,s,o){if(this.departureAccum+=t,this.departureAccum>=.16&&(this.departureAccum=0,Mh(this.departureBoardCtx,n,e,n>=this.terminals.length),this.departureBoardTex.needsUpdate=!0),this.wall456FlashTimer>0&&(this.wall456FlashTimer-=t,this.wall456FlashTimer<=0)){const l=this.textures.wall456Stages[this.currentSignageStage];this.wall456Mat.map=l,this.wall456Mat.emissiveMap=l,this.wall456Mat.emissiveIntensity=this.currentSignageStage>=4?.82:.56,this.wall456Mat.needsUpdate=!0}for(let l=0;l<this.smokeLedMats.length;l++){const c=Math.sin(e*1.8+l*1.7)>.92?16721452:2754570;this.smokeLedMats[l].color.setHex(c)}if(o&&this.terminals.length>0){let l=this.terminals[0],c=1/0;for(const f of this.terminals){const d=Math.hypot(f.def.x-o.x,f.def.z-o.z);d<c&&(c=d,l=f)}const h=l.def.x+Math.sin(l.def.rotY)*1.15,u=l.def.z+Math.cos(l.def.rotY)*1.15;this.nearestTerminalLight.position.set(h,1.55,u),l.charged?(this.nearestTerminalLight.color.setHex(3856516),this.nearestTerminalLight.intensity=1.6):l.progress>0?(this.nearestTerminalLight.color.setHex(15912018),this.nearestTerminalLight.intensity=3.2):(this.nearestTerminalLight.color.setHex(4972712),this.nearestTerminalLight.intensity=2.4)}for(let l=0;l<this.flickerLights.length;l++){const c=this.flickerLights[l];if(c.blowoutDelay>0&&(c.blowoutDelay-=t,c.blowoutDelay<=0&&(c.killedTimer=10.5,this.spawnSparks(c.x,c.y-.14,c.z,20))),c.killedTimer>0){c.killedTimer=Math.max(0,c.killedTimer-t);const x=c.killedTimer<1.2&&Math.sin(e*52+c.phase)>.85?.35:.01;c.light&&(c.light.intensity=x),c.tubeMat.emissiveIntensity=x*.9,c.glowMat&&(c.glowMat.opacity=x*.04),c.floorPoolMat&&(c.floorPoolMat.opacity=x*.04);continue}if(s>0){c.light&&(c.light.intensity=.02),c.tubeMat.emissiveIntensity=.04,c.glowMat&&(c.glowMat.opacity=.005),c.floorPoolMat&&(c.floorPoolMat.opacity=.005);continue}const h=Math.hypot(i.x-c.x,i.z-c.z),u=Math.max(0,1-h/14.5),f=Math.max(.46,1-n*.09);let d=1;const g=Math.sin(e*19+c.phase)*Math.sin(e*43+c.phase*2.1);if(u>.12?d=Math.sin(e*43+c.phase*5)>.44-u*.55?.02+Math.random()*.14:.42+Math.abs(g)*.46:n>=1&&(l+n)%3===0&&g>.72&&(d=.16),n>=5&&l%2===1){const x=.44+.56*Math.sin(e*7.2+c.phase);c.light&&(c.light.color.setHex(14166064),c.light.intensity=c.baseIntensity*.95*x),c.tubeMat.emissive.setHex(14166064),c.tubeMat.emissiveIntensity=1.15*x,c.glowMat&&(c.glowMat.color.setHex(14170682),c.glowMat.opacity=.08*x),c.floorPoolMat&&(c.floorPoolMat.color.setHex(14167598),c.floorPoolMat.opacity=.12*x)}else{const x=c.emergency?15904082:13033188;c.light&&(c.light.color.setHex(x),c.light.intensity=c.baseIntensity*f*d),c.tubeMat.emissive.setHex(c.emergency?15644260:14215912),c.tubeMat.emissiveIntensity=1.05*d,c.glowMat&&(c.glowMat.color.setHex(c.emergency?15250536:10931928),c.glowMat.opacity=.06*f*d),c.floorPoolMat&&(c.floorPoolMat.color.setHex(x),c.floorPoolMat.opacity=.08*f*d)}}if(s>0)this.concourseShadowSpot.intensity=0;else{const l=Math.hypot(i.x-Be.x,i.z-Be.z)<11.5&&Math.sin(e*41)>.58?.16:1;this.concourseShadowSpot.intensity=11.5*Math.max(.48,1-n*.09)*l}if(this.photoBoothFlashTimer>0)this.photoBoothFlashTimer=Math.max(0,this.photoBoothFlashTimer-t),this.dynamicEventLight.position.set(Yn.x-.15,1.35,Yn.z-.9),this.dynamicEventLight.color.setHex(15661311),this.dynamicEventLight.intensity=this.photoBoothFlashTimer/.42*24,this.photoBoothFlashTimer<=.04&&(this.photoBoothShadowMesh.visible=!1);else if(this.phantomTrainTimer>0){this.phantomTrainTimer=Math.max(0,this.phantomTrainTimer-t);const l=1-this.phantomTrainTimer/5.2,c=Math.sin(l*Math.PI),h=.55+.45*Math.sin(e*28);this.dynamicEventLight.color.setHex(14218495),this.dynamicEventLight.position.set(28,1.8,22+l*24),this.dynamicEventLight.intensity=c*h*22}else this.exitUnlocked?(this.dynamicEventLight.color.setHex(10017008),this.dynamicEventLight.position.set(Xn+2.5,2.6,qn),this.dynamicEventLight.intensity=this.shutterOpenProgress*18):this.dynamicEventLight.intensity=0;for(const l of this.closets)l.phoneGlowMat&&(l.phoneGlowMat.opacity=this.payphoneRingActive?.36+Math.abs(Math.sin(e*18))*.48:.32+Math.sin(e*1.4)*.05),l.doorAngle+=(l.targetAngle-l.doorAngle)*Math.min(1,t*8),l.doorPivot.rotation.y=l.doorAngle;this.brokenLampTimer-=t,this.brokenLampTimer<=0&&(this.brokenLampTimer=3.2+Math.random()*4.8,this.spawnSparks(6,ge-.26,26,8));for(let l=this.sparks.length-1;l>=0;l--){const c=this.sparks[l];if(c.life-=t,c.life<=0){this.root.remove(c.mesh),this.sparks.splice(l,1);continue}c.vy-=9.5*t,c.mesh.position.x+=c.vx*t,c.mesh.position.y+=c.vy*t,c.mesh.position.z+=c.vz*t,c.mesh.position.y<.02&&(c.mesh.position.y=.02,c.vy=Math.abs(c.vy)*.35,c.vx*=.6,c.vz*=.6),c.mesh.rotation.x+=t*14,c.mesh.rotation.z+=t*11}for(const l of this.puddles)if(l.dripCooldown>0?(l.dripCooldown-=t,l.dripCooldown<=0&&(l.dripY=l.dripStartY,l.dripMesh.position.y=l.dripY,l.dripMesh.visible=!0)):(l.dripY-=t*7.8,l.dripMesh.position.y=l.dripY,l.dripY<=.04&&(l.dripMesh.visible=!1,l.dripCooldown=2.4+Math.random()*4,l.ripplePhase=0)),l.ripplePhase<1){l.ripplePhase=Math.min(1,l.ripplePhase+t*.85);const c=.2+l.ripplePhase*1.5;l.rippleMesh.scale.set(c,c,1),l.rippleMat.opacity=(1-l.ripplePhase)*.6}else l.rippleMat.opacity=0;if(o)for(const l of this.cctvCameras){let c=Math.atan2(o.x-l.worldX,o.z-l.worldZ)-l.headPivot.rotation.y;for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;l.headPivot.rotation.y+=c*Math.min(1,t*1.45),l.headPivot.rotation.x=.35,l.ledMat.color.setHex(Math.sin(e*3.5+l.phase)>0?16720418:3409928)}if(n>=this.terminals.length&&!this.exitUnlocked){const l=.6+.4*Math.sin(e*7.5);this.exitLight.intensity=8.2+l*5.8}if(this.exitUnlocked&&this.shutterOpenProgress<1){this.shutterOpenProgress=Math.min(1,this.shutterOpenProgress+t*.55);const l=1-Math.pow(1-this.shutterOpenProgress,2);this.exitShutter.position.y=Xt*.5+l*(Xt-.55);for(const c of this.gatePaddles)c.leftPivot.rotation.y=-l*1.42,c.rightPivot.rotation.y=l*1.42}for(const l of this.coinPickups)l.collected||(l.mesh.rotation.y=e*1.6,l.mesh.position.y=l.def.y+Math.sin(e*3)*.015);const a=this.dustPoints.geometry.getAttribute("position");for(let l=0;l<a.count;l++){let c=a.getY(l)-t*.04;c<.2&&(c=4.1),a.setY(l,c)}a.needsUpdate=!0}}function bc(r,t){if(t===hu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(t===ma||t===Wc){let e=r.getIndex();if(e===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),e=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=e.count-2,i=[];if(t===ma)for(let o=1;o<=n;o++)i.push(e.getX(0)),i.push(e.getX(o)),i.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(e.getX(o)),i.push(e.getX(o+1)),i.push(e.getX(o+2))):(i.push(e.getX(o+2)),i.push(e.getX(o+1)),i.push(e.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),r}class Bx extends us{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Hx(e)}),this.register(function(e){return new Vx(e)}),this.register(function(e){return new Jx(e)}),this.register(function(e){return new Qx(e)}),this.register(function(e){return new t_(e)}),this.register(function(e){return new Xx(e)}),this.register(function(e){return new qx(e)}),this.register(function(e){return new Yx(e)}),this.register(function(e){return new jx(e)}),this.register(function(e){return new Gx(e)}),this.register(function(e){return new Kx(e)}),this.register(function(e){return new Wx(e)}),this.register(function(e){return new $x(e)}),this.register(function(e){return new Zx(e)}),this.register(function(e){return new kx(e)}),this.register(function(e){return new e_(e)}),this.register(function(e){return new n_(e)})}load(t,e,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Is.extractUrlBase(t);o=Is.resolveURL(c,this.path)}else o=Is.extractUrlBase(t);this.manager.itemStart(t);const a=function(c){i?i(c):console.error(c),s.manager.itemError(t),s.manager.itemEnd(t)},l=new fh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,function(c){try{s.parse(c,o,function(h){e(h),s.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof t=="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(l.decode(new Uint8Array(t,0,4))===Sh){try{o[Yt.KHR_BINARY_GLTF]=new i_(t)}catch(u){i&&i(u);return}s=JSON.parse(o[Yt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new g_(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],f=s.extensionsRequired||[];switch(u){case Yt.KHR_MATERIALS_UNLIT:o[u]=new zx;break;case Yt.KHR_DRACO_MESH_COMPRESSION:o[u]=new s_(s,this.dracoLoader);break;case Yt.KHR_TEXTURE_TRANSFORM:o[u]=new r_;break;case Yt.KHR_MESH_QUANTIZATION:o[u]=new o_;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,s){n.parse(t,e,i,s)})}}function Ox(){let r={};return{get:function(t){return r[t]},add:function(t,e){r[t]=e},remove:function(t){delete r[t]},removeAll:function(){r={}}}}const Yt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class kx{constructor(t){this.parser=t,this.name=Yt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const s=e[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const s=e.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t];let c;const h=new rt(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Xe);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Gf(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new vi(h),c.distance=u;break;case"spot":c=new Gr(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Pn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=e.createUniqueName(l.name||"light_"+t),i=Promise.resolve(c),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,s=n.json.nodes[t],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(e.cache,a,l)})}}class zx{constructor(){this.name=Yt.KHR_MATERIALS_UNLIT}getMaterialType(){return _e}extendParams(t,e,n){const i=[];t.color=new rt(1,1,1),t.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],Xe),t.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",s.baseColorTexture,Me))}return Promise.all(i)}}class Gx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(e.emissiveIntensity=s),Promise.resolve()}}class Hx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Et(a,a)}return Promise.all(s)}}class Vx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Wx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Xx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];e.sheenColor=new rt(0,0,0),e.sheenRoughness=0,e.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],Xe)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,Me)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class qx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Yx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return e.attenuationColor=new rt().setRGB(a[0],a[1],a[2],Xe),Promise.all(s)}}class jx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Kx{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return e.specularColor=new rt().setRGB(a[0],a[1],a[2],Xe),o.specularColorTexture!==void 0&&s.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,Me)),Promise.all(s)}}class Zx{constructor(t){this.parser=t,this.name=Yt.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(s)}}class $x{constructor(t){this.parser=t,this.name=Yt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:be}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Jx{constructor(t){this.parser=t,this.name=Yt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,s.source,o)}}class Qx{constructor(t){this.parser=t,this.name=Yt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class t_{constructor(t){this.parser=t,this.name=Yt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class e_{constructor(t){this.name=Yt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,i.mode,i.filter),d})})}else return null}}class n_{constructor(t){this.name=Yt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==en.TRIANGLES&&c.mode!==en.TRIANGLE_STRIP&&c.mode!==en.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],f=c[0].count,d=[];for(const g of u){const x=new kt,m=new D,p=new pn,y=new D(1,1,1),v=new _f(g.geometry,g.material,f);for(let _=0;_<f;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&y.fromBufferAttribute(l.SCALE,_),v.setMatrixAt(_,x.compose(m,p,y));for(const _ in l)if(_==="_COLOR_0"){const A=l[_];v.instanceColor=new xa(A.array,A.itemSize,A.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);fe.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),d.push(v)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}}const Sh="glTF",ws=12,Ec={JSON:1313821514,BIN:5130562};class i_{constructor(t){this.name=Yt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,ws),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Sh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ws,s=new DataView(t,ws);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Ec.JSON){const c=new Uint8Array(t,ws+o,a);this.content=n.decode(c)}else if(l===Ec.BIN){const c=ws+o;this.body=t.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class s_{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Yt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,s=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Ta[h]||h.toLowerCase();a[u]=o[h]}for(const h in t.attributes){const u=Ta[h]||h.toLowerCase();if(o[h]!==void 0){const f=n.accessors[t.attributes[h]],d=$i[f.componentType];c[u]=d.name,l[u]=f.normalized===!0}}return e.getDependency("bufferView",s).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(d){for(const g in d.attributes){const x=d.attributes[g],m=l[g];m!==void 0&&(x.normalized=m)}u(d)},a,c,Xe,f)})})}}class r_{constructor(){this.name=Yt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class o_{constructor(){this.name=Yt.KHR_MESH_QUANTIZATION}}class Th extends ks{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i*3+i;for(let o=0;o!==i;o++)e[o]=n[s+o];return e}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-e,u=(n-e)/h,f=u*u,d=f*u,g=t*c,x=g-c,m=-2*d+3*f,p=d-f,y=1-m,v=p-f+u;for(let _=0;_!==a;_++){const A=o[x+_+a],E=o[x+_+l]*h,w=o[g+_+a],C=o[g+_]*h;s[_]=y*A+v*E+m*w+p*C}return s}}const a_=new pn;class l_ extends Th{interpolate_(t,e,n,i){const s=super.interpolate_(t,e,n,i);return a_.fromArray(s).normalize().toArray(s),s}}const en={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},$i={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wc={9728:We,9729:Le,9984:Dc,9985:Sr,9986:As,9987:In},Ac={33071:Zn,33648:Cr,10497:ti},Ro={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ta={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Wn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},c_={CUBICSPLINE:void 0,LINEAR:Ns,STEP:Ds},Co={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function h_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new $({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:xn})),r.DefaultMaterial}function di(r,t,e){for(const n in e.extensions)r[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Pn(r,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(r.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function u_(r,t,e){let n=!1,i=!1,s=!1;for(let c=0,h=t.length;c<h;c++){const u=t[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,h=t.length;c<h;c++){const u=t[c];if(n){const f=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):r.attributes.position;o.push(f)}if(i){const f=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],f=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function f_(r,t){if(r.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)r.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(r.morphTargetInfluences.length===e.length){r.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)r.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function d_(r){let t;const e=r.extensions&&r.extensions[Yt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Po(e.attributes):t=r.indices+":"+Po(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)t+=":"+Po(r.targets[n]);return t}function Po(r){let t="";const e=Object.keys(r).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+r[e[n]]+";";return t}function ba(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function p_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const m_=new kt;class g_{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new Ox,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Ff(this.options.manager):this.textureLoader=new Hf(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new fh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return di(s,a,i),Pn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=e.length;i<s;i++){const o=e[i].joints;for(let a=0,l=o.length;a<l;a++)t[o[a]].isBone=!0}for(let i=0,s=t.length;i<s;i++){const o=t[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const s=t(e[i]);s&&n.push(s)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(s,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Yt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Is.resolveURL(e.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,s=e.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const o=Ro[i.type],a=$i[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Oe(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Ro[i.type],c=$i[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let x,m;if(d&&d!==u){const p=Math.floor(f/d),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let v=e.cache.get(y);v||(x=new c(a,p*d,i.count*d/h),v=new nh(x,d/h),e.cache.add(y,v)),m=new Fs(v,l,f%d/h,g)}else a===null?x=new c(i.count*l):x=new c(a,f,i.count*l),m=new Oe(x,l,g);if(i.sparse!==void 0){const p=Ro.SCALAR,y=$i[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,A=new y(o[1],v,i.sparse.count*p),E=new c(o[2],_,i.sparse.count*l);a!==null&&(m=new Oe(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,C=A.length;w<C;w++){const T=A[w];if(m.setX(T,E[w*l]),l>=2&&m.setY(T,E[w*l+1]),l>=3&&m.setZ(T,E[w*l+2]),l>=4&&m.setW(T,E[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){const e=this.json,n=this.options,s=e.textures[t].source,o=e.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(t,s,a)}loadTextureImage(t,e,n){const i=this,s=this.json,o=s.textures[t],a=s.images[e],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return h.magFilter=wc[f.magFilter]||Le,h.minFilter=wc[f.minFilter]||In,h.wrapS=Ac[f.wrapS]||ti,h.wrapT=Ac[f.wrapT]||ti,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==We&&h.minFilter!==Le,i.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(t,e){const n=this,i=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const o=i.images[t],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const f=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(f,d){let g=f;e.isImageBitmapLoader===!0&&(g=function(x){const m=new we(x);m.needsUpdate=!0,f(m)}),e.load(Is.resolveURL(u,s.path),g,void 0,d)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Pn(u,o),u.userData.mimeType=o.mimeType||p_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Yt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Yt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Yt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Ga,mn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new ah,mn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}t.material=n}getMaterialType(){return $}loadMaterial(t){const e=this,n=this.json,i=this.extensions,s=n.materials[t];let o;const a={},l=s.extensions||{},c=[];if(l[Yt.KHR_MATERIALS_UNLIT]){const u=i[Yt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,s,e))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new rt(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Xe),a.opacity=f[3]}u.baseColorTexture!==void 0&&c.push(e.assignTexture(a,"map",u.baseColorTexture,Me)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}s.doubleSided===!0&&(a.side=Ee);const h=s.alphaMode||Co.OPAQUE;if(h===Co.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Co.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==_e&&(c.push(e.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Et(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==_e&&(c.push(e.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==_e){const u=s.emissiveFactor;a.emissive=new rt().setRGB(u[0],u[1],u[2],Xe)}return s.emissiveTexture!==void 0&&o!==_e&&c.push(e.assignTexture(a,"emissiveMap",s.emissiveTexture,Me)),Promise.all(c).then(function(){const u=new o(a);return s.name&&(u.name=s.name),Pn(u,s),e.associations.set(u,{materials:t}),s.extensions&&di(i,u,s),u})}createUniqueName(t){const e=oe.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Yt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(l){return Rc(l,a,e)})}const o=[];for(let a=0,l=t.length;a<l;a++){const c=t[a],h=d_(c),u=i[h];if(u)o.push(u.promise);else{let f;c.extensions&&c.extensions[Yt.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=Rc(new De,c,e),i[h]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){const e=this,n=this.json,i=this.extensions,s=n.meshes[t],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?h_(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,g=h.length;d<g;d++){const x=h[d],m=o[d];let p;const y=c[d];if(m.mode===en.TRIANGLES||m.mode===en.TRIANGLE_STRIP||m.mode===en.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new mf(x,y):new I(x,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===en.TRIANGLE_STRIP?p.geometry=bc(p.geometry,Wc):m.mode===en.TRIANGLE_FAN&&(p.geometry=bc(p.geometry,ma));else if(m.mode===en.LINES)p=new Mf(x,y);else if(m.mode===en.LINE_STRIP)p=new za(x,y);else if(m.mode===en.LINE_LOOP)p=new Sf(x,y);else if(m.mode===en.POINTS)p=new lh(x,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&f_(p,s),p.name=e.createUniqueName(s.name||"mesh_"+t),Pn(p,s),m.extensions&&di(i,p,m),e.assignFinalMaterial(p),u.push(p)}for(let d=0,g=u.length;d<g;d++)e.associations.set(u[d],{meshes:t,primitives:d});if(u.length===1)return s.extensions&&di(i,u[0],s),u[0];const f=new Wt;s.extensions&&di(i,f,s),e.associations.set(f,{meshes:t});for(let d=0,g=u.length;d<g;d++)f.add(u[d]);return f})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new He(Bu.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new Hr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Pn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,s=e.joints.length;i<s;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const f=new kt;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new Oa(a,l)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],s=i.name?i.name:"animation_"+t,o=[],a=[],l=[],c=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){const d=i.channels[u],g=i.samplers[d.sampler],x=d.target,m=x.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",y)),c.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const f=u[0],d=u[1],g=u[2],x=u[3],m=u[4],p=[];for(let y=0,v=f.length;y<v;y++){const _=f[y],A=d[y],E=g[y],w=x[y],C=m[y];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const T=n._createAnimationTracks(_,A,E,w,C);if(T)for(let M=0;M<T.length;M++)p.push(T[M])}return new Fr(s,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],s=n._loadNodeShallow(t),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],f=c[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,m_)});for(let d=0,g=u.length;d<g;d++)h.add(u[d]);return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const s=e.nodes[t],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){a.push(c)}),this.nodeCache[t]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new rh:c.length>1?h=new Wt:c.length===1?h=c[0]:h=new fe,h!==c[0])for(let u=0,f=c.length;u<f;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Pn(h,s),s.extensions&&di(n,h,s),s.matrix!==void 0){const u=new kt;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,s=new Wt;n.name&&(s.name=i.createUniqueName(n.name)),Pn(s,n),n.extensions&&di(e,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[f,d]of i.associations)(f instanceof mn||f instanceof we)&&u.set(f,d);return h.traverse(f=>{const d=i.associations.get(f);d!=null&&u.set(f,d)}),u};return i.associations=c(s),s})}_createAnimationTracks(t,e,n,i,s){const o=[],a=t.name?t.name:t.uuid,l=[];Wn[s.path]===Wn.weights?t.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Wn[s.path]){case Wn.weights:c=rs;break;case Wn.rotation:c=os;break;case Wn.position:case Wn.scale:c=as;break;default:switch(n.itemSize){case 1:c=rs;break;case 2:case 3:default:c=as;break}break}const h=i.interpolation!==void 0?c_[i.interpolation]:Ns,u=this._getArrayFromAccessor(n);for(let f=0,d=l.length;f<d;f++){const g=new c(l[f]+"."+Wn[s.path],e.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=ba(e.constructor),i=new Float32Array(e.length);for(let s=0,o=e.length;s<o;s++)i[s]=e[s]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof os?l_:Th;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function x_(r,t,e){const n=t.attributes,i=new Un;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),a.normalized){const h=ba($i[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=t.targets;if(s!==void 0){const a=new D,l=new D;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const f=e.json.accessors[u.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const x=ba($i[f.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new vn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Rc(r,t,e){const n=t.attributes,i=[];function s(o,a){return e.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Ta[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(t.indices!==void 0&&!r.index){const o=e.getDependency("accessor",t.indices).then(function(a){r.setIndex(a)});i.push(o)}return Qt.workingColorSpace!==Xe&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qt.workingColorSpace}" not supported.`),Pn(r,t),x_(r,t,e),Promise.all(i).then(function(){return t.targets!==void 0?u_(r,t.targets,e):r})}class __{root=new Wt;model=null;state="INTRO_SIT";loaded=!1;mixer=null;actions=new Map;activeClip=null;headBone=null;mouthBone=null;spineBone=null;earLeftBone=null;earRightBone=null;eyeGlintMat;eyeGlints=[];jumpscareLight;path=[];pathRecalcTimer=0;stateTimer=0;footstepTimer=0;leapCooldown=4;stareCooldown=7;peekCooldown=10;closetInspectCooldown=0;closetScratchPlayed=!1;closetBreathDanger=0;performCooldown=16;lastSeenPlayerPos=null;loseSightTimer=0;sawPlayerRecentlyTimer=0;targetCloset=null;currentWaypointIdx=0;difficulty="normal";lungeDir=new Et(0,1);peekLeanSide=1;peekSpottedFlash=!1;headTrackYaw=0;headTrackPitch=0;headTiltZ=0;twitchTimer=0;earTwitchL=0;earTwitchR=0;constructor(t){this.root.position.set(Vi.x,0,Vi.z),this.root.rotation.y=Vi.rotY,this.eyeGlintMat=new _e({color:16765654,transparent:!0,opacity:0}),this.jumpscareLight=new vi(16765124,0,6.2,1.5),this.jumpscareLight.position.set(0,1.18,1.05),this.root.add(this.jumpscareLight),t.add(this.root)}async load(t,e){const i=await new Bx().loadAsync(t);this.model=i.scene;const s=[];if(this.model.traverse(o=>{if(o.isBone){const a=o;a.name==="Head"?this.headBone=a:a.name==="Mouth"?this.mouthBone=a:a.name==="Spine"?this.spineBone=a:/^Ear1[._]?L$/i.test(a.name)?this.earLeftBone=a:/^Ear1[._]?R$/i.test(a.name)&&(this.earRightBone=a)}if(o.isMesh){const a=o;if(a.castShadow=!0,a.receiveShadow=!0,a.frustumCulled=!1,a.name==="Eye_L"||a.name==="Eye_R"){a.material=new be({color:328968,roughness:.015,metalness:.1,clearcoat:1,clearcoatRoughness:.012,reflectivity:1,envMapIntensity:3.8}),s.push(a);return}if(a.name==="Mouth"){a.material=new $({color:196867,roughness:.99,metalness:0,envMapIntensity:.04});return}if(a.name==="Nose"){a.material=new be({color:789006,roughness:.15,metalness:.05,clearcoat:.9,envMapIntensity:2});return}if(a.name==="FacePanel"){a.material=new be({map:e.faceGrime,color:12762288,normalMap:e.suitNormal,normalScale:new Et(1.05,1.05),roughness:.92,metalness:.02,sheen:.42,sheenRoughness:.82,sheenColor:new rt(12893874),envMapIntensity:.52});return}a.material=new be({map:e.suitGrime,color:7752360,normalMap:e.suitNormal,normalScale:new Et(1.65,1.65),roughness:.91,metalness:.02,sheen:.68,sheenRoughness:.78,sheenColor:new rt(8938174),envMapIntensity:.62})}}),this.root.add(this.model),this.root.updateMatrixWorld(!0),this.headBone&&s.length>0){const o=new Kn(.0062,8,8);for(const a of s){a.geometry.computeBoundingBox();const l=a.geometry.boundingBox;if(!l)continue;const h=new D((l.min.x+l.max.x)*.5,(l.min.y+l.max.y)*.5,l.max.z+.0025).applyMatrix4(a.matrixWorld),u=this.headBone.worldToLocal(h.clone()),f=new I(o,this.eyeGlintMat);f.position.copy(u),this.headBone.add(f),this.eyeGlints.push(f)}}this.mixer=new nd(this.model);for(const o of["Walk","Run","Leap","Sit","Dance","Spin","Jump"]){const a=Fr.findByName(i.animations,o);if(a){const l=this.mixer.clipAction(a);l.setLoop(Vc,1/0),this.actions.set(o,l)}}this.loaded=!0,this.playClip("Sit",.01,.6)}setDifficulty(t){this.difficulty=t}reset(){this.root.position.set(Vi.x,0,Vi.z),this.root.rotation.y=Vi.rotY,this.state="INTRO_SIT",this.path=[],this.pathRecalcTimer=0,this.stateTimer=0,this.footstepTimer=0,this.leapCooldown=4,this.stareCooldown=7,this.peekCooldown=8,this.closetInspectCooldown=0,this.closetScratchPlayed=!1,this.closetBreathDanger=0,this.performCooldown=16,this.lastSeenPlayerPos=null,this.loseSightTimer=0,this.sawPlayerRecentlyTimer=0,this.targetCloset=null,this.currentWaypointIdx=0,this.headTrackYaw=0,this.headTrackPitch=0,this.headTiltZ=0,this.jumpscareLight.intensity=0,this.eyeGlintMat.opacity=0,this.playClip("Sit",.15,.55)}playClip(t,e=.22,n=1){const i=this.actions.get(t);if(!i)return;if(this.activeClip===t){i.timeScale=n;return}const s=this.activeClip?this.actions.get(this.activeClip):null;i.reset(),i.enabled=!0,i.setEffectiveWeight(1),i.timeScale=n,i.play(),s&&s!==i&&s.crossFadeTo(i,e,!1),this.activeClip=t}updateTitleShowcase(t,e){if(!(!this.loaded||!this.mixer)){if(this.root.position.set(46.8,0,10.1),this.root.rotation.y=-Math.PI*.56+Math.sin(e*.34)*.22,this.jumpscareLight.intensity=0,e%16<10?this.playClip("Sit",.5,.42):this.playClip("Dance",.5,.5),this.eyeGlintMat.color.setHex(16732760),this.eyeGlintMat.opacity=.34+.24*Math.sin(e*2.4),this.mixer.update(t),this.spineBone&&(this.spineBone.rotation.x+=Math.sin(e*1.9)*.032),this.earLeftBone&&this.earRightBone){const n=Math.sin(e*13)>.96?.18:0;this.earLeftBone.rotation.z+=Math.sin(e*.8)*.04+n,this.earRightBone.rotation.z-=Math.sin(e*.8+.7)*.04}this.headBone&&(this.headBone.rotation.y+=Math.sin(e*.85)*.14,this.headBone.rotation.x+=.08,this.headBone.rotation.z+=Math.sin(e*.42)*.16)}}hearSound(t,e,n){if(this.state==="JUMPSCARE")return;const i=Math.hypot(t-this.root.position.x,e-this.root.position.z);n==="medium"&&i>20||(this.state==="INTRO_SIT"&&(this.state="INVESTIGATE"),!(this.state==="CHASE"&&this.loseSightTimer<1.2&&n!=="high")&&(this.lastSeenPlayerPos={x:t,z:e},this.state!=="CHASE"&&this.state!=="LEAP_LUNGE"&&this.state!=="SEARCH_CLOSET"&&this.state!=="CLOSET_INSPECT"&&(n==="high"&&i>5?(this.state="ALERT_HOP",this.stateTimer=.68,this.playClip("Jump",.15,1.48)):(this.state="INVESTIGATE",this.playClip("Walk",.2,1.38)),this.path=fi({x:this.root.position.x,z:this.root.position.z},{x:t,z:e}),this.pathRecalcTimer=.85)))}notifyPlayerEnteredCloset(t){if(this.state==="JUMPSCARE")return;if(this.sawPlayerRecentlyTimer>0){this.targetCloset=t,this.state="SEARCH_CLOSET",this.stateTimer=0,this.path=fi({x:this.root.position.x,z:this.root.position.z},{x:t.exitX,z:t.exitZ}),this.playClip("Run",.18,1.32);return}const e=Math.hypot(t.exitX-this.root.position.x,t.exitZ-this.root.position.z);this.closetInspectCooldown<=0&&e<16.5&&(this.state==="CHASE"||this.state==="INVESTIGATE"||this.state==="ALERT_HOP"||this.state==="PEEK_CORNER")&&(this.targetCloset=t,this.state="CLOSET_INSPECT",this.stateTimer=0,this.closetScratchPlayed=!1,this.closetBreathDanger=0,this.closetInspectCooldown=22,this.path=fi({x:this.root.position.x,z:this.root.position.z},{x:t.exitX,z:t.exitZ}),this.playClip("Walk",.24,1.15))}triggerJumpscarePose(t,e){this.state="JUMPSCARE",this.stateTimer=0;const n=-Math.sin(e),i=-Math.cos(e);this.root.position.set(t.x+n*1,0,t.z+i*1),this.root.rotation.y=Math.atan2(t.x-this.root.position.x,t.z-this.root.position.z),this.playClip("Leap",.04,1.48),this.eyeGlintMat.opacity=1}update(t,e,n,i,s,o){const a=this.root.position.x,l=this.root.position.z,c=Math.hypot(i.x-a,i.z-l),h=Math.cos(i.yaw),u=-Math.sin(i.yaw),f=(a-i.x)/Math.max(.01,c)*h+(l-i.z)/Math.max(.01,c)*u,d={caughtPlayer:!1,ripClosetId:null,distance:c,panValue:f,fearLevel:0,isChasing:this.state==="CHASE"||this.state==="LEAP_LUNGE",isInspectingCloset:this.state==="CLOSET_INSPECT"&&this.stateTimer>.2,justSpotted:!1,justStareFroze:!1,justKilledLight:!1,justPeeked:!1,justInspectingCloset:!1,justScratchedCloset:!1,wokeFromIntro:!1,stepShake:0};if(!this.loaded||!this.mixer)return d;if(this.state==="JUMPSCARE"){this.stateTimer+=t;const E=this.stateTimer<.14,w=!E&&Math.sin(e*56)>0;return this.jumpscareLight.color.setHex(w?16718884:16773336),this.jumpscareLight.intensity=E?5.2:w?4.4:3,this.eyeGlintMat.color.setHex(16715802),this.eyeGlintMat.opacity=1,this.mixer.update(E?t*.18:t*1.18),this.mouthBone&&this.mouthBone.scale.set(1.48,1.24,2.25),this.headBone&&(this.headBone.rotation.z+=Math.sin(e*52)*(E?.06:.3)),d.fearLevel=1,d.isChasing=!0,d}this.jumpscareLight.intensity=0,this.leapCooldown=Math.max(0,this.leapCooldown-t),this.stareCooldown=Math.max(0,this.stareCooldown-t),this.peekCooldown=Math.max(0,this.peekCooldown-t),this.closetInspectCooldown=Math.max(0,this.closetInspectCooldown-t),this.performCooldown=Math.max(0,this.performCooldown-t),this.sawPlayerRecentlyTimer=Math.max(0,this.sawPlayerRecentlyTimer-t);const g=this.evaluateVision(i,c,n,s),x=this.difficulty==="nightmare",m=(x?3.55:2.85)+n*.26,p=(x?6:5.2)+n*.34,y=(x?4.4:3.7)+n*.24;g.canSee&&(this.lastSeenPlayerPos={x:i.x,z:i.z},this.loseSightTimer=0,this.sawPlayerRecentlyTimer=1.6),!i.hiddenCloset&&i.sprinting&&c<(x?16:12.5)&&this.hearSound(i.x,i.z,"medium");const v=Math.atan2(i.x-a,i.z-l);switch(this.state){case"INTRO_SIT":{this.playClip("Sit",.2,.5),this.smoothRotateY(v,t*1.6),(c<17.5||g.playerAimingAtRabbit&&c<24&&i.flashlightOn||n>0)&&(this.state="STARE_FREEZE",this.stateTimer=0,d.wokeFromIntro=!0,this.playClip("Sit",.1,.05));break}case"PATROL":{if(g.canSee){this.stareCooldown<=0&&c>6&&c<21?(this.state="STARE_FREEZE",this.stateTimer=0,this.stareCooldown=x?11:14,d.justStareFroze=!0,this.playClip("Sit",.15,.06)):this.enterChase(i,d);break}if(this.peekCooldown<=0&&!i.hiddenCloset&&c>8.5&&c<24&&s.hasLineOfSight(a,l,i.x,i.z)){for(const E of Vg)if(Math.hypot(a-E.x,l-E.z)<3.1){this.state="PEEK_CORNER",this.stateTimer=0,this.peekSpottedFlash=!1,this.peekCooldown=x?12:16,this.peekLeanSide=Math.random()<.5?1:-1,this.playClip("Sit",.25,.08),d.justPeeked=!0;break}if(this.state==="PEEK_CORNER")break}if(this.performCooldown<=0&&c>10&&c<24&&Math.random()<.012){this.state="EERIE_DANCE",this.stateTimer=5.5+Math.random()*4,this.performCooldown=28,this.playClip(Math.random()<.55?"Dance":"Spin",.35,.72);break}if(this.path.length===0){this.currentWaypointIdx=(this.currentWaypointIdx+1+Math.floor(Math.random()*3))%yr.length;const E=yr[this.currentWaypointIdx];this.path=fi({x:a,z:l},E)}this.playClip("Walk",.25,1.05+n*.06),this.followPath(m,t,s,o,c,f,!1,d);break}case"PEEK_CORNER":{if(this.stateTimer+=t,this.smoothRotateY(v,t*4.5),g.playerAimingAtRabbit&&i.flashlightOn&&(this.peekSpottedFlash=!0),c<7.5){this.enterChase(i,d);break}if(this.peekSpottedFlash&&this.stateTimer>.85){Math.random()<.58?(this.state="STARE_FREEZE",this.stateTimer=0,this.stareCooldown=16,d.justStareFroze=!0):(this.state="INVESTIGATE",this.lastSeenPlayerPos={x:i.x,z:i.z},this.path=fi({x:a,z:l},yr[Math.floor(Math.random()*yr.length)]),this.playClip("Run",.16,1.25));break}this.stateTimer>4.2&&(this.state="PATROL",this.path=[]);break}case"EERIE_DANCE":{this.stateTimer-=t,g.canSee||c<9.5?this.enterChase(i,d):this.stateTimer<=0&&(this.state="PATROL");break}case"ALERT_HOP":{this.stateTimer-=t,this.lastSeenPlayerPos&&this.smoothRotateY(Math.atan2(this.lastSeenPlayerPos.x-a,this.lastSeenPlayerPos.z-l),t*8),g.canSee?this.enterChase(i,d):this.stateTimer<=0&&(this.state="INVESTIGATE",this.playClip("Walk",.18,1.38));break}case"INVESTIGATE":{if(g.canSee){this.enterChase(i,d);break}this.playClip("Walk",.22,1.32),(this.followPath(y,t,s,o,c,f,!1,d)||this.path.length===0)&&(this.state="PATROL",this.path=[]);break}case"STARE_FREEZE":{this.stateTimer+=t,this.smoothRotateY(v,t*6),this.stateTimer>.42&&this.stateTimer-t<=.42&&(d.justKilledLight=!0),(this.stateTimer>(x?1.15:1.45)||c<5.5)&&this.enterChase(i,d);break}case"CHASE":{if(d.isChasing=!0,i.hiddenCloset&&this.sawPlayerRecentlyTimer<=0){this.state="INVESTIGATE";break}if(!g.canSee&&(this.loseSightTimer+=t,this.loseSightTimer>(x?5.6:4.2))){this.state="INVESTIGATE";break}if(c<1.38&&!i.hiddenCloset){d.caughtPlayer=!0;break}if(this.leapCooldown<=0&&c>3.2&&c<6.4&&g.canSee){this.state="LEAP_LUNGE",this.stateTimer=.56,this.leapCooldown=x?5.5:8;const E=Math.max(.01,c);this.lungeDir.set((i.x-a)/E,(i.z-l)/E),this.playClip("Leap",.08,1.5);break}this.pathRecalcTimer-=t,this.pathRecalcTimer<=0&&this.lastSeenPlayerPos&&(this.pathRecalcTimer=.38,this.path=fi({x:a,z:l},this.lastSeenPlayerPos)),this.playClip("Run",.14,1.24+n*.06),this.followPath(p,t,s,o,c,f,!0,d);break}case"LEAP_LUNGE":{d.isChasing=!0,this.stateTimer-=t;const E=p*1.48,w=s.resolveCircle(a+this.lungeDir.x*E*t,l+this.lungeDir.y*E*t,.54);if(this.root.position.set(w.x,0,w.z),this.smoothRotateY(Math.atan2(this.lungeDir.x,this.lungeDir.y),t*12),Math.hypot(i.x-w.x,i.z-w.z)<1.42&&!i.hiddenCloset){d.caughtPlayer=!0;break}this.stateTimer<=0&&(this.state="CHASE",this.playClip("Run",.15,1.3));break}case"SEARCH_CLOSET":{if(d.isChasing=!0,!this.targetCloset||!i.hiddenCloset){this.state="PATROL";break}this.playClip("Run",.15,1.35),(this.followPath(p*.96,t,s,o,c,f,!0,d)||Math.hypot(a-this.targetCloset.exitX,l-this.targetCloset.exitZ)<1.1)&&(d.caughtPlayer=!0,d.ripClosetId=this.targetCloset.id);break}case"CLOSET_INSPECT":{if(!this.targetCloset||!i.hiddenCloset){this.state="PATROL";break}if(Math.hypot(a-this.targetCloset.exitX,l-this.targetCloset.exitZ)>.78&&this.stateTimer===0)this.playClip("Walk",.2,1.08),this.followPath(y*.85,t,s,o,c,f,!1,d);else{if(this.stateTimer===0&&(d.justInspectingCloset=!0),this.stateTimer+=t,d.isInspectingCloset=!0,this.root.position.lerp(new D(this.targetCloset.exitX,0,this.targetCloset.exitZ),Math.min(1,t*6)),this.smoothRotateY(Math.atan2(this.targetCloset.insideX-a,this.targetCloset.insideZ-l),t*8),this.playClip("Sit",.25,.14),!this.closetScratchPlayed&&this.stateTimer>1.55&&(this.closetScratchPlayed=!0,d.justScratchedCloset=!0),i.flashlightOn){d.caughtPlayer=!0,d.ripClosetId=this.targetCloset.id;break}if(i.holdingBreath)this.closetBreathDanger=Math.max(0,this.closetBreathDanger-t*.6);else if(this.closetBreathDanger+=t,this.closetBreathDanger>(x?1.55:2.25)){d.caughtPlayer=!0,d.ripClosetId=this.targetCloset.id;break}this.stateTimer>4.6&&(this.state="PATROL",this.targetCloset=null,this.path=[])}break}}this.mixer.update(t),this.applyProceduralHorrorBones(t,e,c,v,g.playerAimingAtRabbit);let _=Math.max(0,1-c/22);d.isChasing&&(_=Math.max(_,.78)),(this.state==="STARE_FREEZE"||this.state==="CLOSET_INSPECT")&&(_=Math.max(_,.88)),this.state==="PEEK_CORNER"&&g.playerAimingAtRabbit&&(_=Math.max(_,.72)),d.fearLevel=Math.min(1,_);const A=this.state==="CHASE"||this.state==="LEAP_LUNGE"||this.state==="STARE_FREEZE"||this.state==="CLOSET_INSPECT"||this.state==="PEEK_CORNER"||c<22||g.playerAimingAtRabbit&&i.flashlightOn;return this.eyeGlintMat.color.setHex(this.state==="CHASE"||this.state==="STARE_FREEZE"||this.state==="CLOSET_INSPECT"?16718372:16769252),this.eyeGlintMat.opacity+=((A?.96:.28)-this.eyeGlintMat.opacity)*Math.min(1,t*8),d}applyProceduralHorrorBones(t,e,n,i,s){if(this.twitchTimer-=t,this.twitchTimer<=0&&(this.twitchTimer=.65+Math.random()*1.9,this.earTwitchL=(Math.random()-.5)*.34,this.earTwitchR=(Math.random()-.5)*.34),this.earTwitchL*=Math.max(0,1-t*5),this.earTwitchR*=Math.max(0,1-t*5),this.earLeftBone&&(this.earLeftBone.rotation.z+=this.earTwitchL),this.earRightBone&&(this.earRightBone.rotation.z+=this.earTwitchR),this.spineBone)if(this.state==="PEEK_CORNER"){const o=Math.min(1,this.stateTimer*2.4)*.46*this.peekLeanSide;this.spineBone.rotation.z+=o,this.spineBone.rotation.x+=.14}else this.state==="CLOSET_INSPECT"?this.spineBone.rotation.x+=.3+Math.sin(e*3.4)*.06:this.state==="CHASE"&&(this.spineBone.rotation.x+=.24);if(this.headBone){let o=i-this.root.rotation.y;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;const a=n<24?Math.max(-.85,Math.min(.85,o)):0,l=this.state==="STARE_FREEZE"&&Math.sin(e*43)>.78?(Math.random()-.5)*.14:0,c=this.state==="STARE_FREEZE"?.62*Math.sign(Math.sin(e*.7)||1)+l:this.state==="PEEK_CORNER"?.38*this.peekLeanSide:this.state==="CLOSET_INSPECT"?Math.sin(e*2.5)*.34:s?.24:Math.sin(e*.9)*.08;this.headTrackYaw+=(a-this.headTrackYaw)*Math.min(1,t*6),this.headTiltZ+=(c-this.headTiltZ)*Math.min(1,t*7),this.headBone.rotation.y+=this.headTrackYaw,this.headBone.rotation.z+=this.headTiltZ}if(this.mouthBone){const o=this.state==="STARE_FREEZE"?1.65:this.state==="CHASE"||this.state==="LEAP_LUNGE"?1.52+Math.sin(e*14)*.18:this.state==="CLOSET_INSPECT"?1.45+Math.sin(e*6)*.12:1;this.mouthBone.scale.set(1+(o-1)*.35,1+(o-1)*.25,o)}}evaluateVision(t,e,n,i){const s=this.root.position.x-t.x,o=this.root.position.z-t.z,a=Math.max(.01,Math.hypot(s,o)),l=-Math.sin(t.yaw),c=-Math.cos(t.yaw),u=s/a*l+o/a*c>.84;if(t.hiddenCloset)return{canSee:!1,playerAimingAtRabbit:u};const f=this.difficulty==="nightmare";let d=t.flashlightOn?f?23:19:t.crouching?f?8.5:6.2:f?13.5:10.5;if(d+=n*1.1,e>d)return{canSee:!1,playerAimingAtRabbit:u};if(!i.hasLineOfSight(this.root.position.x,this.root.position.z,t.x,t.z))return{canSee:!1,playerAimingAtRabbit:u};const x=Math.sin(this.root.rotation.y),m=Math.cos(this.root.rotation.y),p=-s/a*x+-o/a*m;return{canSee:e<4.5||p>.18||t.flashlightOn&&u&&e<18,playerAimingAtRabbit:u}}enterChase(t,e){const n=this.state==="CHASE"||this.state==="LEAP_LUNGE";this.state="CHASE",this.lastSeenPlayerPos={x:t.x,z:t.z},this.loseSightTimer=0,this.path=fi({x:this.root.position.x,z:this.root.position.z},this.lastSeenPlayerPos),this.pathRecalcTimer=.35,n||(e.justSpotted=!0),this.playClip("Run",.12,1.3)}followPath(t,e,n,i,s,o,a,l){if(this.path.length===0)return!0;const c=this.path[0],h=c.x-this.root.position.x,u=c.z-this.root.position.z,f=Math.hypot(h,u);if(f<.42)return this.path.shift(),this.path.length===0;const d=Math.min(f,t*e),g=this.root.position.x+h/f*d,x=this.root.position.z+u/f*d,m=n.resolveCircle(g,x,.54);return this.root.position.set(m.x,0,m.z),this.smoothRotateY(Math.atan2(h,u),e*(a?10:6)),this.footstepTimer-=e,this.footstepTimer<=0&&(this.footstepTimer=a?.3:.54,i.playRabbitStep(s,o,a),s<14&&(l.stepShake=Math.max(l.stepShake,(1-s/14)*(a?.24:.1)))),!1}smoothRotateY(t,e){let n=t-this.root.rotation.y;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;this.root.rotation.y+=n*Math.min(1,e)}}class y_{ctx=null;masterGain=null;reverbSend=null;ambienceGain=null;chaseGain=null;chaseOsc1=null;chaseOsc2=null;dreadHumGain=null;noiseBuffer=null;muted=!1;initialized=!1;heartbeatTimer=0;heartbeatPulseValue=0;dripTimer=3.8;melodyTimer=18;breathTimer=0;rabbitBreathTimer=0;unlock(){if(this.initialized){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{});return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t;const e=this.ctx.createDynamicsCompressor();e.threshold.value=-8,e.knee.value=12,e.ratio.value=8,e.attack.value=.004,e.release.value=.16,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.muted?0:.88,this.masterGain.connect(e),e.connect(this.ctx.destination);const n=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,n,this.ctx.sampleRate);const i=this.noiseBuffer.getChannelData(0);for(let l=0;l<n;l++)i[l]=Math.random()*2-1;const s=this.ctx.createConvolver();s.buffer=this.createSubwayImpulse(2.1,2.5);const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.value=2800;const a=this.ctx.createGain();a.gain.value=.48,this.reverbSend=this.ctx.createGain(),this.reverbSend.gain.value=1,this.reverbSend.connect(s).connect(o).connect(a).connect(this.masterGain),this.startAmbience(),this.initialized=!0}createSubwayImpulse(t,e){const n=this.ctx,i=Math.floor(n.sampleRate*t),s=n.createBuffer(2,i,n.sampleRate);for(let o=0;o<2;o++){const a=s.getChannelData(o);for(let l=0;l<i;l++){const c=l/i,h=l<n.sampleRate*.09?l%680<6?.55:.16:1;a[l]=(Math.random()*2-1)*Math.pow(1-c,e)*h}}return s}setMuted(t){this.muted=t,this.masterGain&&this.ctx&&this.masterGain.gain.setTargetAtTime(t?0:.88,this.ctx.currentTime,.04)}isMuted(){return this.muted}getHeartbeatPulse(){return this.heartbeatPulseValue}connectOutput(t,e=.55){if(this.masterGain&&(t.connect(this.masterGain),this.reverbSend&&e>0&&this.ctx)){const n=this.ctx.createGain();n.gain.value=e,t.connect(n).connect(this.reverbSend)}}panNode(t){const e=this.ctx;if(typeof e.createStereoPanner=="function"){const n=e.createStereoPanner();return n.pan.value=Math.max(-1,Math.min(1,t)),n}return e.createGain()}startAmbience(){if(!this.ctx||!this.masterGain||!this.noiseBuffer)return;this.ambienceGain=this.ctx.createGain(),this.ambienceGain.gain.value=.26,this.ambienceGain.connect(this.masterGain);const t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer,t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.value=98;const n=this.ctx.createGain();n.gain.value=.62,t.connect(e).connect(n).connect(this.ambienceGain),t.start();const i=this.ctx.createOscillator();i.type="sine",i.frequency.value=50;const s=this.ctx.createGain();s.gain.value=.08,i.connect(s).connect(this.ambienceGain),i.start();const o=this.ctx.createOscillator();o.type="triangle",o.frequency.value=34.6;const a=this.ctx.createGain();a.gain.value=.16,o.connect(a).connect(this.ambienceGain),o.start(),this.chaseGain=this.ctx.createGain(),this.chaseGain.gain.value=0;const l=this.ctx.createBiquadFilter();l.type="bandpass",l.frequency.value=265,l.Q.value=4.5,this.chaseOsc1=this.ctx.createOscillator(),this.chaseOsc1.type="sawtooth",this.chaseOsc1.frequency.value=65.4,this.chaseOsc2=this.ctx.createOscillator(),this.chaseOsc2.type="sawtooth",this.chaseOsc2.frequency.value=69.5,this.chaseOsc1.connect(l),this.chaseOsc2.connect(l),l.connect(this.chaseGain),this.connectOutput(this.chaseGain,.8),this.chaseOsc1.start(),this.chaseOsc2.start(),this.dreadHumGain=this.ctx.createGain(),this.dreadHumGain.gain.value=0;const c=this.ctx.createOscillator();c.type="sine",c.frequency.value=28;const h=this.ctx.createOscillator();h.type="sine",h.frequency.value=31.5,c.connect(this.dreadHumGain),h.connect(this.dreadHumGain),this.dreadHumGain.connect(this.masterGain),c.start(),h.start()}updateContinuous(t,e,n,i,s){if(this.heartbeatPulseValue=Math.max(0,this.heartbeatPulseValue-t*3.4),!this.ctx||!this.initialized)return;const o=this.ctx.currentTime;if(this.chaseGain&&this.chaseOsc1&&this.chaseOsc2){const l=i?n?.25:e*.09:0;this.chaseGain.gain.setTargetAtTime(l,o,.16);const c=Math.sin(o*9.2)*4.8;this.chaseOsc1.frequency.setTargetAtTime(n?73.4+c:55,o,.14),this.chaseOsc2.frequency.setTargetAtTime(n?78.2-c*.7:58.6,o,.14)}if(this.dreadHumGain){const l=i?Math.max(0,e-.14)*.28:0;this.dreadHumGain.gain.setTargetAtTime(l,o,.2)}if(!i)return;const a=s?.holdingBreath?Math.max(e,.62):e;if(a>.14){const l=60+a*108;this.heartbeatTimer-=t,this.heartbeatTimer<=0&&(this.heartbeatTimer=60/l,this.heartbeatPulseValue=.48+a*.52,this.playHeartbeat(.15+a*.44))}if(s&&!s.holdingBreath&&(s.exhausted||s.hiding&&e>.3)&&(this.breathTimer-=t,this.breathTimer<=0&&(this.breathTimer=s.exhausted?.72:1.1,this.playHumanBreath(s.exhausted?.18:.09))),s&&s.rabbitDist<8.5&&(this.rabbitBreathTimer-=t,this.rabbitBreathTimer<=0)){this.rabbitBreathTimer=1.45+Math.random()*.9;const l=Math.max(.05,(1-s.rabbitDist/8.5)*.26);this.playRabbitSniff(l,s.rabbitPan)}this.dripTimer-=t,this.dripTimer<=0&&(this.dripTimer=3.2+Math.random()*5.2,this.playWaterDrip((Math.random()-.5)*1.4)),this.melodyTimer-=t,this.melodyTimer<=0&&!n&&(this.melodyTimer=26+Math.random()*24,this.playShinjukuDepartureMelody(.11+e*.06))}playHeartbeat(t){if(!this.ctx||!this.masterGain)return;const e=this.ctx.currentTime,n=(i,s,o)=>{const a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type="sine",a.frequency.setValueAtTime(s,e+i),a.frequency.exponentialRampToValueAtTime(28,e+i+.14),l.gain.setValueAtTime(.001,e+i),l.gain.linearRampToValueAtTime(o,e+i+.015),l.gain.exponentialRampToValueAtTime(.001,e+i+.17),a.connect(l).connect(this.masterGain),a.start(e+i),a.stop(e+i+.19)};n(0,62,t),n(.16,52,t*.68)}playHumanBreath(t){if(!this.ctx||!this.noiseBuffer)return;const e=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.noiseBuffer;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.setValueAtTime(740,e),i.Q.value=2.6;const s=this.ctx.createGain();s.gain.setValueAtTime(.001,e),s.gain.linearRampToValueAtTime(t,e+.14),s.gain.exponentialRampToValueAtTime(.001,e+.44),n.connect(i).connect(s),this.connectOutput(s,.18),n.start(e),n.stop(e+.48)}playBreathGasp(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime,e=this.ctx.createBufferSource();e.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1150,t),n.frequency.exponentialRampToValueAtTime(520,t+.34),n.Q.value=3.2;const i=this.ctx.createGain();i.gain.setValueAtTime(.001,t),i.gain.linearRampToValueAtTime(.32,t+.06),i.gain.exponentialRampToValueAtTime(.001,t+.38),e.connect(n).connect(i),this.connectOutput(i,.35),e.start(t),e.stop(t+.4)}playRabbitSniff(t,e=0){if(!this.ctx||!this.noiseBuffer)return;const n=this.ctx.currentTime,i=this.ctx.createBufferSource();i.buffer=this.noiseBuffer;const s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(420,n),s.frequency.linearRampToValueAtTime(680,n+.25),s.Q.value=5.5;const o=this.ctx.createGain();o.gain.setValueAtTime(.001,n),o.gain.linearRampToValueAtTime(t,n+.1),o.gain.exponentialRampToValueAtTime(.001,n+.42);const a=this.panNode(e);i.connect(s).connect(o).connect(a),this.connectOutput(a,.65),i.start(n),i.stop(n+.46)}playWaterDrip(t=0){if(!this.ctx)return;const e=this.ctx.currentTime,n=this.ctx.createOscillator();n.type="sine",n.frequency.setValueAtTime(1450+Math.random()*550,e),n.frequency.exponentialRampToValueAtTime(520,e+.075);const i=this.ctx.createGain();i.gain.setValueAtTime(.001,e),i.gain.linearRampToValueAtTime(.07,e+.006),i.gain.exponentialRampToValueAtTime(5e-4,e+.09);const s=this.panNode(t);n.connect(i).connect(s),this.connectOutput(s,.85),n.start(e),n.stop(e+.11)}playShinjukuDepartureMelody(t=.12){if(!this.ctx)return;const e=this.ctx.currentTime;[659.25,783.99,622.25,587.33,493.88,466.16].forEach((i,s)=>{const o=e+s*.44,a=this.ctx.createOscillator();a.type="triangle";const l=(Math.random()-.5)*18-s*4;a.frequency.setValueAtTime(i,o),a.detune.setValueAtTime(l,o);const c=this.ctx.createGain();c.gain.setValueAtTime(.001,o),c.gain.linearRampToValueAtTime(t,o+.025),c.gain.exponentialRampToValueAtTime(8e-4,o+.68),a.connect(c),this.connectOutput(c,.95),a.start(o),a.stop(o+.72)})}playPhantomTrain(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime,e=5.2,n=this.ctx.createBufferSource();n.buffer=this.noiseBuffer,n.loop=!0;const i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(90,t),i.frequency.linearRampToValueAtTime(520,t+e*.48),i.frequency.exponentialRampToValueAtTime(80,t+e);const s=this.ctx.createGain();s.gain.setValueAtTime(.001,t),s.gain.linearRampToValueAtTime(.42,t+e*.45),s.gain.exponentialRampToValueAtTime(.001,t+e);const o=this.panNode(-.9);"pan"in o&&(o.pan.setValueAtTime(-.95,t),o.pan.linearRampToValueAtTime(.95,t+e)),n.connect(i).connect(s).connect(o),this.connectOutput(o,.85),n.start(t),n.stop(t+e+.1);for(let a=0;a<10;a++){const l=t+.55+a*.42,c=this.ctx.createOscillator();c.type="square",c.frequency.setValueAtTime(115+a%2*28,l),c.frequency.exponentialRampToValueAtTime(42,l+.08);const h=this.ctx.createGain(),u=Math.sin((a+1)/11*Math.PI);h.gain.setValueAtTime(.14*u,l),h.gain.exponentialRampToValueAtTime(.001,l+.1),c.connect(h),this.connectOutput(h,.7),c.start(l),c.stop(l+.12)}}playPayphoneRing(t=-.5){if(!this.ctx)return;const e=this.ctx.currentTime,n=i=>{for(let s=0;s<14;s++){const o=e+i+s*.055,a=this.ctx.createOscillator(),l=this.ctx.createOscillator();a.type="sine",l.type="sine",a.frequency.setValueAtTime(1480,o),l.frequency.setValueAtTime(1920,o);const c=this.ctx.createGain();c.gain.setValueAtTime(.075,o),c.gain.exponentialRampToValueAtTime(.001,o+.048);const h=this.panNode(t);a.connect(c),l.connect(c),c.connect(h),this.connectOutput(h,.9),a.start(o),l.start(o),a.stop(o+.05),l.stop(o+.05)}};n(0),n(1.45)}playPhotoBoothFlash(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime,e=this.ctx.createBufferSource();e.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="highpass",n.frequency.value=1800;const i=this.ctx.createGain();i.gain.setValueAtTime(.38,t),i.gain.exponentialRampToValueAtTime(.001,t+.09),e.connect(n).connect(i),this.connectOutput(i,.55),e.start(t),e.stop(t+.12);const s=this.ctx.createOscillator();s.type="sine",s.frequency.setValueAtTime(1100,t+.06),s.frequency.exponentialRampToValueAtTime(5400,t+1.25);const o=this.ctx.createGain();o.gain.setValueAtTime(.001,t+.06),o.gain.linearRampToValueAtTime(.055,t+.2),o.gain.exponentialRampToValueAtTime(5e-4,t+1.3),s.connect(o),this.connectOutput(o,.45),s.start(t+.06),s.stop(t+1.35)}playPlayerStep(t,e,n){if(!this.ctx||!this.noiseBuffer)return;const i=this.ctx.currentTime,s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const o=this.ctx.createBiquadFilter();o.type=n?"bandpass":"lowpass",o.frequency.value=n?1750:t?680:e?340:480;const a=this.ctx.createGain(),l=(e?.05:t?.22:.12)*(n?1.3:1);a.gain.setValueAtTime(l,i),a.gain.exponentialRampToValueAtTime(.001,i+(n?.14:.08)),s.connect(o).connect(a),this.connectOutput(a,.35),s.start(i),s.stop(i+.16)}playRabbitStep(t,e,n){if(!this.ctx||t>26)return;const i=this.ctx.currentTime,s=Math.pow(Math.max(0,1-t/26),1.65),o=this.ctx.createOscillator();o.type="sine",o.frequency.setValueAtTime(n?102:76,i),o.frequency.exponentialRampToValueAtTime(28,i+.16);const a=this.ctx.createGain();a.gain.setValueAtTime(s*(n?.6:.36),i),a.gain.exponentialRampToValueAtTime(.001,i+.19);const l=this.panNode(e);o.connect(a).connect(l),this.connectOutput(l,.72),o.start(i),o.stop(i+.22)}playFlashlightClick(){if(!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator();e.type="square",e.frequency.setValueAtTime(2100,t),e.frequency.exponentialRampToValueAtTime(620,t+.025);const n=this.ctx.createGain();n.gain.setValueAtTime(.14,t),n.gain.exponentialRampToValueAtTime(.001,t+.03),e.connect(n),this.connectOutput(n,.12),e.start(t),e.stop(t+.04)}playPaperRustle(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime,e=this.ctx.createBufferSource();e.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="highpass",n.frequency.value=1600;const i=this.ctx.createGain();i.gain.setValueAtTime(.11,t),i.gain.exponentialRampToValueAtTime(.001,t+.16),e.connect(n).connect(i),this.connectOutput(i,.18),e.start(t),e.stop(t+.18)}playCoinClink(t=.26,e=0){if(!this.ctx)return;const n=this.ctx.currentTime;[3420,4880,6210].forEach((i,s)=>{const o=n+s*.06,a=this.ctx.createOscillator();a.type="sine",a.frequency.setValueAtTime(i,o);const l=this.ctx.createGain();l.gain.setValueAtTime(t*(1-s*.22),o),l.gain.exponentialRampToValueAtTime(.001,o+.26);const c=this.panNode(e);a.connect(l).connect(c),this.connectOutput(c,.78),a.start(o),a.stop(o+.28)})}playLockerDoor(t){if(!this.ctx||!this.noiseBuffer)return;const e=this.ctx.currentTime,n=this.ctx.createOscillator();n.type="sawtooth",n.frequency.setValueAtTime(t?185:140,e),n.frequency.exponentialRampToValueAtTime(62,e+.2);const i=this.ctx.createGain();i.gain.setValueAtTime(.16,e),i.gain.exponentialRampToValueAtTime(.001,e+.22),n.connect(i),this.connectOutput(i,.62),n.start(e),n.stop(e+.24)}playLockerScratch(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime,e=this.ctx.createBufferSource();e.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(2600,t),n.frequency.linearRampToValueAtTime(1450,t+.65),n.Q.value=9;const i=this.ctx.createGain();i.gain.setValueAtTime(.001,t),i.gain.linearRampToValueAtTime(.32,t+.07),i.gain.exponentialRampToValueAtTime(.001,t+.72),e.connect(n).connect(i),this.connectOutput(i,.75),e.start(t),e.stop(t+.76)}playChargeTick(t){if(!this.ctx)return;const e=this.ctx.currentTime,n=this.ctx.createOscillator();n.type="sine",n.frequency.setValueAtTime(680+t*560,e);const i=this.ctx.createGain();i.gain.setValueAtTime(.12,e),i.gain.exponentialRampToValueAtTime(.001,e+.08),n.connect(i),this.connectOutput(i,.42),n.start(e),n.stop(e+.09)}playChargeComplete(){if(!this.ctx)return;const t=this.ctx.currentTime;[1318.5,1760].forEach((e,n)=>{const i=t+n*.11,s=this.ctx.createOscillator();s.type="sine",s.frequency.setValueAtTime(e,i);const o=this.ctx.createGain();o.gain.setValueAtTime(.22,i),o.gain.exponentialRampToValueAtTime(.001,i+.24),s.connect(o),this.connectOutput(o,.7),s.start(i),s.stop(i+.26)})}playDistortedPAChime(){if(!this.ctx)return;const t=this.ctx.currentTime;[523.25,659.25,783.99,508].forEach((e,n)=>{const i=t+n*.34,s=this.ctx.createOscillator();s.type="triangle",s.frequency.setValueAtTime(e,i),s.frequency.linearRampToValueAtTime(e*(n===3?.86:.96),i+.38);const o=this.ctx.createGain();o.gain.setValueAtTime(.18,i),o.gain.exponentialRampToValueAtTime(.001,i+.56),s.connect(o),this.connectOutput(o,.92),s.start(i),s.stop(i+.6)})}playBlackoutThunk(){if(!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator();e.type="sine",e.frequency.setValueAtTime(92,t),e.frequency.exponentialRampToValueAtTime(22,t+.36);const n=this.ctx.createGain();n.gain.setValueAtTime(.55,t),n.gain.exponentialRampToValueAtTime(.001,t+.42),e.connect(n),this.connectOutput(n,.85),e.start(t),e.stop(t+.45)}playLightBlowout(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime,e=this.ctx.createBufferSource();e.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.value=3200;const i=this.ctx.createGain();i.gain.setValueAtTime(.42,t),i.gain.exponentialRampToValueAtTime(.001,t+.24),e.connect(n).connect(i),this.connectOutput(i,.72),e.start(t),e.stop(t+.28)}playNeckCrack(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime;[0,.09].forEach((e,n)=>{const i=this.ctx.createBufferSource();i.buffer=this.noiseBuffer;const s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.value=n===0?1400:980,s.Q.value=5;const o=this.ctx.createGain();o.gain.setValueAtTime(.38,t+e),o.gain.exponentialRampToValueAtTime(.001,t+e+.065),i.connect(s).connect(o),this.connectOutput(o,.55),i.start(t+e),i.stop(t+e+.08)})}playStareChill(){if(!this.ctx)return;const t=this.ctx.currentTime;[418,434].forEach(e=>{const n=this.ctx.createOscillator();n.type="sawtooth",n.frequency.setValueAtTime(e,t),n.frequency.exponentialRampToValueAtTime(e*1.42,t+1.15);const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.value=1100;const s=this.ctx.createGain();s.gain.setValueAtTime(.001,t),s.gain.linearRampToValueAtTime(.14,t+.2),s.gain.exponentialRampToValueAtTime(.001,t+1.25),n.connect(i).connect(s),this.connectOutput(s,.85),n.start(t),n.stop(t+1.3)})}playSpotStinger(){if(!this.ctx)return;const t=this.ctx.currentTime;[146.8,155.6,587.3,622.3].forEach(e=>{const n=this.ctx.createOscillator();n.type="sawtooth",n.frequency.setValueAtTime(e,t),n.frequency.exponentialRampToValueAtTime(e*.92,t+.85);const i=this.ctx.createGain();i.gain.setValueAtTime(.16,t),i.gain.exponentialRampToValueAtTime(.001,t+.9),n.connect(i),this.connectOutput(i,.82),n.start(t),n.stop(t+.95)})}playPhantomWhisper(t){if(!this.ctx||!this.noiseBuffer)return;const e=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.noiseBuffer;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.setValueAtTime(1700,e),i.frequency.linearRampToValueAtTime(980,e+.75),i.Q.value=7.5;const s=this.ctx.createGain();s.gain.setValueAtTime(.001,e),s.gain.linearRampToValueAtTime(.24,e+.15),s.gain.exponentialRampToValueAtTime(.001,e+.88);const o=this.panNode(t);n.connect(i).connect(s).connect(o),this.connectOutput(o,.82),n.start(e),n.stop(e+.92)}playPhantomScare(t){if(!this.ctx)return;const e=this.ctx.currentTime,n=this.ctx.createOscillator();n.type="sawtooth",n.frequency.setValueAtTime(220,e),n.frequency.exponentialRampToValueAtTime(62,e+.52);const i=this.ctx.createGain();i.gain.setValueAtTime(.22,e),i.gain.exponentialRampToValueAtTime(.001,e+.56);const s=this.panNode(t);n.connect(i).connect(s),this.connectOutput(s,.88),n.start(e),n.stop(e+.6)}playGateError(){if(!this.ctx)return;const t=this.ctx.currentTime;[0,.16].forEach(e=>{const n=this.ctx.createOscillator();n.type="square",n.frequency.setValueAtTime(240,t+e);const i=this.ctx.createGain();i.gain.setValueAtTime(.16,t+e),i.gain.exponentialRampToValueAtTime(.001,t+e+.12),n.connect(i),this.connectOutput(i,.45),n.start(t+e),n.stop(t+e+.14)})}playGateUnlockAndShutter(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime;[880,1174.6,1567.9].forEach((s,o)=>{const a=t+o*.11,l=this.ctx.createOscillator();l.type="sine",l.frequency.setValueAtTime(s,a);const c=this.ctx.createGain();c.gain.setValueAtTime(.2,a),c.gain.exponentialRampToValueAtTime(.001,a+.32),l.connect(c),this.connectOutput(c,.72),l.start(a),l.stop(a+.36)});const e=this.ctx.createBufferSource();e.buffer=this.noiseBuffer,e.loop=!0;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.value=320;const i=this.ctx.createGain();i.gain.setValueAtTime(.001,t+.2),i.gain.linearRampToValueAtTime(.32,t+.45),i.gain.exponentialRampToValueAtTime(.001,t+2.4),e.connect(n).connect(i),this.connectOutput(i,.8),e.start(t+.2),e.stop(t+2.5)}playJumpscare(){if(!this.ctx||!this.noiseBuffer)return;const t=this.ctx.currentTime;[98,104,311,622,932,1396].forEach((s,o)=>{const a=this.ctx.createOscillator();a.type=o%2===0?"sawtooth":"square",a.frequency.setValueAtTime(s,t),a.frequency.exponentialRampToValueAtTime(s*(o<2?.55:1.18),t+1.35);const l=this.ctx.createGain();l.gain.setValueAtTime(.22,t),l.gain.exponentialRampToValueAtTime(.001,t+1.42),a.connect(l),this.connectOutput(l,.75),a.start(t),a.stop(t+1.45)});const e=this.ctx.createBufferSource();e.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.value=1800;const i=this.ctx.createGain();i.gain.setValueAtTime(.55,t),i.gain.exponentialRampToValueAtTime(.001,t+1.25),e.connect(n).connect(i),this.connectOutput(i,.65),e.start(t),e.stop(t+1.3)}playVictoryChord(){if(!this.ctx)return;const t=this.ctx.currentTime;[261.63,329.63,392,523.25].forEach(e=>{const n=this.ctx.createOscillator();n.type="sine",n.frequency.setValueAtTime(e,t);const i=this.ctx.createGain();i.gain.setValueAtTime(.001,t),i.gain.linearRampToValueAtTime(.11,t+.35),i.gain.exponentialRampToValueAtTime(.001,t+2.8),n.connect(i),this.connectOutput(i,.9),n.start(t),n.stop(t+2.9)})}}class v_{constructor(t,e){this.canvas=t,this.cb=e,this.containerEl=document.getElementById("touch-controls"),this.joyZoneEl=document.getElementById("touch-joystick-zone"),this.joyBaseEl=document.getElementById("touch-joystick-base"),this.joyKnobEl=document.getElementById("touch-joystick-knob"),this.btnInteract=document.getElementById("touch-btn-interact"),this.interactLabelEl=document.getElementById("touch-interact-label"),this.btnLight=document.getElementById("touch-btn-light"),this.btnCrouch=document.getElementById("touch-btn-crouch"),this.btnSprint=document.getElementById("touch-btn-sprint"),this.btnCoin=document.getElementById("touch-btn-coin"),this.btnMap=document.getElementById("touch-btn-map"),this.btnBreath=document.getElementById("touch-btn-breath"),this.refreshVisibility(),window.addEventListener("resize",()=>this.refreshVisibility()),this.bindJoystick(),this.bindCanvasLook(),this.bindButtons()}state={moveX:0,moveY:0,autoSprint:!1,sprintHeld:!1,interactHeld:!1,holdBreathHeld:!1};mode="auto";enabled=!1;active=!1;moveTouchId=null;lookTouchId=null;lastLookX=0;lastLookY=0;sprintToggled=!1;joyOriginX=0;joyOriginY=0;containerEl;joyZoneEl;joyBaseEl;joyKnobEl;btnInteract;interactLabelEl;btnLight;btnCrouch;btnSprint;btnCoin;btnMap;btnBreath;setMode(t){this.mode=t,this.refreshVisibility()}refreshVisibility(){const t="ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(pointer: coarse)").matches||window.innerWidth<=900;this.enabled=this.mode==="on"||this.mode==="auto"&&t,document.body.classList.toggle("is-touch-ui",this.enabled),this.containerEl.hidden=!this.enabled}setActive(t){this.active=t,t||this.resetInputs()}resetInputs(){this.moveTouchId=null,this.lookTouchId=null,this.state.moveX=0,this.state.moveY=0,this.state.autoSprint=!1,this.state.sprintHeld=!1,this.state.interactHeld=!1,this.state.holdBreathHeld=!1,this.sprintToggled=!1,this.joyKnobEl.style.transform="translate(-50%, -50%)",this.joyBaseEl.classList.remove("is-sprinting","is-active"),this.btnSprint.classList.remove("is-active"),this.btnInteract.classList.remove("is-pressed"),this.btnBreath.classList.remove("is-pressed")}syncButtonVisuals(t){if(!this.enabled)return;this.btnLight.classList.toggle("is-active",t.flashlightOn),this.btnCrouch.classList.toggle("is-active",t.crouching),this.btnMap.classList.toggle("is-active",t.mapOpen),this.btnSprint.classList.toggle("is-active",this.sprintToggled||this.state.autoSprint),this.btnCoin.textContent=`硬貨 ${t.coins}`,this.btnCoin.classList.toggle("is-empty",t.coins<=0),this.joyZoneEl.classList.toggle("is-hidden-in-locker",t.hiding),this.btnBreath.hidden=!t.hiding,this.btnBreath.classList.toggle("is-active",t.holdingBreath);const e=t.promptKind!==null;this.btnInteract.classList.toggle("is-ready",e);const n={terminal:`長押し
チャージ`,closet:"隠れる","exit-closet":"出る",note:"メモ",coin:"拾う","exit-gate":"改札へ"};this.interactLabelEl.textContent=t.promptKind&&n[t.promptKind]||"操作"}bindJoystick(){const e=(i,s)=>{const o=i-this.joyOriginX,a=s-this.joyOriginY,l=Math.hypot(o,a),c=Math.min(l,44),h=Math.atan2(a,o),u=Math.cos(h)*c,f=Math.sin(h)*c;this.joyKnobEl.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${f}px))`,this.state.moveX=u/44,this.state.moveY=-f/44;const d=l>44*.86&&this.state.moveY>.35;this.state.autoSprint=d,this.joyBaseEl.classList.toggle("is-sprinting",d)};this.joyZoneEl.addEventListener("touchstart",i=>{if(!this.active||!this.enabled||(i.preventDefault(),this.moveTouchId!==null))return;const s=i.changedTouches[0];this.moveTouchId=s.identifier;const o=this.joyBaseEl.getBoundingClientRect();this.joyOriginX=o.left+o.width*.5,this.joyOriginY=o.top+o.height*.5,this.joyBaseEl.classList.add("is-active"),e(s.clientX,s.clientY)},{passive:!1}),window.addEventListener("touchmove",i=>{if(this.moveTouchId!==null){for(const s of Array.from(i.changedTouches))if(s.identifier===this.moveTouchId){e(s.clientX,s.clientY);break}}},{passive:!0});const n=i=>{if(this.moveTouchId!==null){for(const s of Array.from(i.changedTouches))if(s.identifier===this.moveTouchId){this.moveTouchId=null,this.state.moveX=0,this.state.moveY=0,this.state.autoSprint=!1,this.joyKnobEl.style.transform="translate(-50%, -50%)",this.joyBaseEl.classList.remove("is-active","is-sprinting");break}}};window.addEventListener("touchend",n,{passive:!0}),window.addEventListener("touchcancel",n,{passive:!0})}bindCanvasLook(){this.canvas.addEventListener("touchstart",e=>{if(!(!this.active||!this.enabled)){for(const n of Array.from(e.changedTouches))if(this.lookTouchId===null&&n.identifier!==this.moveTouchId){this.lookTouchId=n.identifier,this.lastLookX=n.clientX,this.lastLookY=n.clientY;break}}},{passive:!0}),window.addEventListener("touchmove",e=>{if(!(!this.active||this.lookTouchId===null)){for(const n of Array.from(e.changedTouches))if(n.identifier===this.lookTouchId){const i=n.clientX-this.lastLookX,s=n.clientY-this.lastLookY;this.lastLookX=n.clientX,this.lastLookY=n.clientY,this.cb.onLookDelta(i*1.9,s*1.55);break}}},{passive:!0});const t=e=>{if(this.lookTouchId!==null){for(const n of Array.from(e.changedTouches))if(n.identifier===this.lookTouchId){this.lookTouchId=null;break}}};window.addEventListener("touchend",t,{passive:!0}),window.addEventListener("touchcancel",t,{passive:!0})}bindButtons(){const t=(o,a)=>{o.addEventListener("touchstart",l=>{this.active&&(l.preventDefault(),l.stopPropagation(),a())},{passive:!1}),o.addEventListener("click",l=>{!this.active||l.detail===0||a()})};t(this.btnLight,()=>this.cb.onToggleFlashlight()),t(this.btnCrouch,()=>this.cb.onToggleCrouch()),t(this.btnSprint,()=>{this.sprintToggled=!this.sprintToggled,this.state.sprintHeld=this.sprintToggled}),t(this.btnCoin,()=>this.cb.onTossCoin()),t(this.btnMap,()=>this.cb.onToggleMap());const e=o=>{this.active&&(o.preventDefault(),o.stopPropagation(),this.state.interactHeld=!0,this.btnInteract.classList.add("is-pressed"),this.cb.onInteractTap())},n=()=>{this.state.interactHeld=!1,this.btnInteract.classList.remove("is-pressed")};this.btnInteract.addEventListener("touchstart",e,{passive:!1}),this.btnInteract.addEventListener("touchend",n,{passive:!0}),this.btnInteract.addEventListener("touchcancel",n,{passive:!0}),this.btnInteract.addEventListener("mousedown",e),window.addEventListener("mouseup",n);const i=o=>{this.active&&(o.preventDefault(),o.stopPropagation(),this.state.holdBreathHeld=!0,this.btnBreath.classList.add("is-pressed"))},s=()=>{this.state.holdBreathHeld=!1,this.btnBreath.classList.remove("is-pressed")};this.btnBreath.addEventListener("touchstart",i,{passive:!1}),this.btnBreath.addEventListener("touchend",s,{passive:!0}),this.btnBreath.addEventListener("touchcancel",s,{passive:!0}),this.btnBreath.addEventListener("mousedown",i),window.addEventListener("mouseup",s)}}class M_{constructor(t,e,n,i){this.canvas=t,this.scene=e,this.cb=n,this.flashlight=new Gr(16773598,19,28,Math.PI*.23,.64,1.48),this.flashlight.map=i,this.flashlight.castShadow=!0;const s=window.innerWidth<=900?512:1024;this.flashlight.shadow.mapSize.set(s,s),this.flashlight.shadow.camera.near=.2,this.flashlight.shadow.camera.far=26,this.flashlight.shadow.bias=-9e-4,this.flashlightTarget=new fe,this.flashlight.target=this.flashlightTarget,this.fillLight=new vi(8956092,.62,5.4,2);const o=new kr(1.4,6.4,18,1,!0);o.translate(0,-3.2,0),o.rotateX(Math.PI/2),this.flashlightBeamMat=new sn({uniforms:{uOpacity:{value:.02},uColor:{value:new rt(12769506)}},vertexShader:`
        varying vec2 vUv;
        varying float vFresnel;
        void main() {
          vUv = uv;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vec3 viewDir = normalize(-mvPos.xyz);
          vec3 n = normalize(normalMatrix * normal);
          vFresnel = pow(max(0.0, dot(n, viewDir)), 3.2);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        precision mediump float;
        uniform float uOpacity;
        uniform vec3 uColor;
        varying vec2 vUv;
        varying float vFresnel;
        void main() {
          float nearFade = smoothstep(0.95, 0.52, vUv.y);
          float farFade = smoothstep(0.16, 0.65, vUv.y);
          float alpha = nearFade * farFade * vFresnel * uOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,transparent:!0,depthWrite:!1,blending:ji,side:xn}),this.flashlightBeam=new I(o,this.flashlightBeamMat),this.flashlightBeam.frustumCulled=!1,e.add(this.flashlight,this.flashlightTarget,this.fillLight,this.flashlightBeam),this.touch=new v_(t,{onLookDelta:(a,l)=>this.applyLookDelta(a,l),onInteractTap:()=>this.cb.onInteractTap(),onToggleFlashlight:()=>window.dispatchEvent(new CustomEvent("game:toggle-flashlight")),onToggleCrouch:()=>{this.hiddenCloset||(this.crouching=!this.crouching)},onTossCoin:()=>window.dispatchEvent(new CustomEvent("game:toss-coin")),onToggleMap:()=>window.dispatchEvent(new CustomEvent("game:toggle-map"))}),this.bindEvents()}position=new D(Hn.x,1.62,Hn.z);yaw=Hn.yaw;pitch=0;sensitivity=1;stamina=1;exhausted=!1;breath=1;holdingBreath=!1;breathLockout=0;flashlightOn=!0;crouching=!1;sprinting=!1;hiddenCloset=null;coins=2;coinsTossed=0;pointerLocked=!1;touch;active=!1;keys=new Set;dragging=!1;lastPointerX=0;lastPointerY=0;eyeHeight=1.62;headBobPhase=0;stepAccum=0;strafeRoll=0;cameraShake=0;hideYawBase=0;hideYawOffset=0;flYaw=Hn.yaw;flPitch=0;flashlight;flashlightTarget;fillLight;flashlightBeam;flashlightBeamMat;coinGeo=new Pe(.06,.06,.015,12);coinMat=new $({color:15396594,roughness:.16,metalness:.96});activeCoins=[];addCameraShake(t){this.cameraShake=Math.min(1,Math.max(this.cameraShake,t))}setTouchUIMode(t){this.touch.setMode(t)}setActive(t){this.active=t,this.touch.setActive(t),t||(this.keys.clear(),this.dragging=!1,this.holdingBreath=!1,document.pointerLockElement===this.canvas&&document.exitPointerLock?.())}requestLock(){if(!this.touch.enabled)try{const t=this.canvas.requestPointerLock?.();t&&typeof t.catch=="function"&&t.catch(()=>{})}catch{}}reset(){this.position.set(Hn.x,1.62,Hn.z),this.yaw=Hn.yaw,this.pitch=0,this.flYaw=Hn.yaw,this.flPitch=0,this.stamina=1,this.exhausted=!1,this.breath=1,this.holdingBreath=!1,this.breathLockout=0,this.flashlightOn=!0,this.crouching=!1,this.sprinting=!1,this.hiddenCloset=null,this.coins=2,this.coinsTossed=0,this.eyeHeight=1.62,this.headBobPhase=0,this.keys.clear(),this.touch.resetInputs();for(const t of this.activeCoins)this.scene.remove(t.mesh);this.activeCoins.length=0}isInteractHeld(){return this.keys.has("KeyE")||this.touch.state.interactHeld}isHoldBreathInput(){return this.keys.has("Space")||this.keys.has("KeyB")||this.keys.has("ShiftLeft")||this.touch.state.holdBreathHeld}enterCloset(t){this.hiddenCloset=t,this.crouching=!1,this.sprinting=!1,this.flashlightOn=!1,this.position.set(t.insideX,1.54,t.insideZ),this.hideYawBase=t.rotY+Math.PI,this.hideYawOffset=0,this.yaw=this.hideYawBase,this.pitch=0,this.flYaw=this.yaw,this.flPitch=0}exitCloset(){const t=this.hiddenCloset;return t?(this.hiddenCloset=null,this.holdingBreath=!1,this.position.set(t.exitX,1.62,t.exitZ),this.yaw=t.rotY+Math.PI,t):null}tossCoin(t){if(!this.active||this.hiddenCloset||this.coins<=0)return!1;this.coins--,this.coinsTossed++;const e=new I(this.coinGeo,this.coinMat),n=new D(-Math.sin(this.yaw)*Math.cos(this.pitch),Math.sin(this.pitch),-Math.cos(this.yaw)*Math.cos(this.pitch)).normalize();e.position.copy(this.position).addScaledVector(n,.5);const i=n.multiplyScalar(9.8);return i.y+=2.3,this.scene.add(e),this.activeCoins.push({mesh:e,vel:i,bounced:!1,life:6}),t.playFlashlightClick(),!0}toggleFlashlight(t){this.hiddenCloset||(this.flashlightOn=!this.flashlightOn,t.playFlashlightClick())}hideFlashlight(){this.flashlight.intensity=0,this.fillLight.intensity=0,this.flashlightBeam.visible=!1}bindEvents(){window.addEventListener("keydown",t=>{if(this.active){if(t.code==="Escape"||t.code==="KeyP"){this.cb.onTogglePause();return}this.keys.has(t.code)||(t.code==="KeyE"?this.cb.onInteractTap():t.code==="Space"&&!this.hiddenCloset?this.cb.onInteractTap():t.code==="KeyF"?window.dispatchEvent(new CustomEvent("game:toggle-flashlight")):t.code==="KeyG"?window.dispatchEvent(new CustomEvent("game:toss-coin")):t.code==="KeyM"||t.code==="Tab"?(t.preventDefault(),window.dispatchEvent(new CustomEvent("game:toggle-map"))):(t.code==="KeyC"||t.code==="ControlLeft")&&(this.hiddenCloset||(this.crouching=!this.crouching))),t.code==="Space"&&this.hiddenCloset&&t.preventDefault(),this.keys.add(t.code)}}),window.addEventListener("keyup",t=>this.keys.delete(t.code)),document.addEventListener("pointerlockchange",()=>{this.pointerLocked=document.pointerLockElement===this.canvas}),window.addEventListener("mousemove",t=>{if(this.active){if(this.pointerLocked)this.applyLookDelta(t.movementX,t.movementY);else if(this.dragging){const e=t.clientX-this.lastPointerX,n=t.clientY-this.lastPointerY;this.lastPointerX=t.clientX,this.lastPointerY=t.clientY,this.applyLookDelta(e*1.45,n*1.45)}}}),this.canvas.addEventListener("mousedown",t=>{if(this.active){if(t.button===2){window.dispatchEvent(new CustomEvent("game:toss-coin"));return}t.button===0&&(this.dragging=!0,this.lastPointerX=t.clientX,this.lastPointerY=t.clientY,this.pointerLocked||this.requestLock())}}),window.addEventListener("mouseup",()=>{this.dragging=!1}),this.canvas.addEventListener("contextmenu",t=>{this.active&&t.preventDefault()})}applyLookDelta(t,e){const n=.0022*this.sensitivity;this.hiddenCloset?(this.hideYawOffset=Math.max(-.58,Math.min(.58,this.hideYawOffset-t*n)),this.yaw=this.hideYawBase+this.hideYawOffset,this.pitch=Math.max(-.34,Math.min(.34,this.pitch-e*n))):(this.yaw-=t*n,this.pitch=Math.max(-1.28,Math.min(1.28,this.pitch-e*n)))}update(t,e,n,i,s,o,a,l){const c=2.15*this.sensitivity;this.keys.has("ArrowLeft")&&this.applyLookDelta(-c*t*420,0),this.keys.has("ArrowRight")&&this.applyLookDelta(c*t*420,0),this.breathLockout=Math.max(0,this.breathLockout-t),this.hiddenCloset?this.isHoldBreathInput()&&this.breathLockout<=0&&this.breath>.02?(this.holdingBreath=!0,this.breath=Math.max(0,this.breath-t*.145),this.breath<=.02&&(this.holdingBreath=!1,this.breathLockout=2.2,s.playBreathGasp())):(this.holdingBreath=!1,this.breath=Math.min(1,this.breath+t*.28)):(this.holdingBreath=!1,this.breath=Math.min(1,this.breath+t*.45));let h=0;if(this.hiddenCloset){this.sprinting=!1,this.strafeRoll*=.9,this.stamina=Math.min(1,this.stamina+t*.24);const w=this.holdingBreath?.002:.009+o*.008;n.position.set(this.position.x,1.54+Math.sin(e*(2.4+o*1.6))*w,this.position.z)}else{let w=0,C=0;(this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(w+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(w-=1),this.keys.has("KeyD")&&(C+=1),this.keys.has("KeyA")&&(C-=1),(Math.abs(this.touch.state.moveX)>.05||Math.abs(this.touch.state.moveY)>.05)&&(C+=this.touch.state.moveX,w+=this.touch.state.moveY);const T=Math.hypot(w,C);T>1&&(w/=T,C/=T),h=Math.min(1,T);const M=!this.crouching&&!this.exhausted&&h>.2&&(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.touch.state.sprintHeld||this.touch.state.autoSprint);this.sprinting=M&&this.stamina>.02,this.sprinting?(this.stamina=Math.max(0,this.stamina-t*.21),this.stamina<=.01&&(this.exhausted=!0)):(this.stamina=Math.min(1,this.stamina+t*(h>.1?.13:.24)),this.exhausted&&this.stamina>.3&&(this.exhausted=!1));const P=this.crouching?2.15:this.sprinting?6.15:3.7,z=-Math.sin(this.yaw),k=-Math.cos(this.yaw),q=Math.cos(this.yaw),K=-Math.sin(this.yaw),Y=this.position.x+(z*w+q*C)*P*t,et=this.position.z+(k*w+K*C)*P*t,U=i.resolveCircle(Y,et,.42);this.position.x=U.x,this.position.z=U.z;const X=this.crouching?1.08:1.62;if(this.eyeHeight+=(X-this.eyeHeight)*Math.min(1,t*9),h>.1){const pt=this.sprinting?12.8:this.crouching?5.6:8.4;this.headBobPhase+=t*pt,this.stepAccum+=t*(this.sprinting?2.55:this.crouching?1.15:1.68),this.stepAccum>=1&&(this.stepAccum=0,s.playPlayerStep(this.sprinting,this.crouching,l(this.position.x,this.position.z)))}const Z=h>.1?this.sprinting?.056:this.crouching?.016:.032:0,Q=Math.sin(this.headBobPhase)*Z+Math.sin(e*1.9)*.008,ct=Math.cos(this.headBobPhase*.5)*Z*.45;this.strafeRoll+=(-C*.022-this.strafeRoll)*Math.min(1,t*8),n.position.set(this.position.x+q*ct,this.eyeHeight+Q,this.position.z+K*ct)}this.cameraShake=Math.max(0,this.cameraShake-t*2.4);const u=(Math.random()-.5)*this.cameraShake*.065,f=(Math.random()-.5)*this.cameraShake*.065;n.rotation.order="YXZ",n.rotation.y=this.yaw+u,n.rotation.x=this.pitch+f,n.rotation.z=this.strafeRoll+(Math.random()-.5)*this.cameraShake*.04;const d=Math.min(1,t*11.5);this.flYaw+=(this.yaw-this.flYaw)*d,this.flPitch+=(this.pitch-this.flPitch)*d;const g=Math.sin(this.headBobPhase*.5)*.018*h+Math.sin(e*14)*o*.006,x=Math.cos(this.headBobPhase)*.014*h+Math.cos(e*11)*o*.006,m=-Math.sin(this.flYaw+g)*Math.cos(this.flPitch+x),p=Math.sin(this.flPitch+x),y=-Math.cos(this.flYaw+g)*Math.cos(this.flPitch+x),v=Math.cos(this.yaw),_=-Math.sin(this.yaw);this.flashlight.position.set(n.position.x+v*.16,n.position.y-.14,n.position.z+_*.16),this.flashlightTarget.position.set(this.flashlight.position.x+m*10,this.flashlight.position.y+p*10,this.flashlight.position.z+y*10),this.flashlightTarget.updateMatrixWorld();const A=o>.45&&Math.sin(e*47)*Math.sin(e*29)>.56?.14:1,E=this.flashlightOn&&!this.hiddenCloset;this.flashlight.intensity=E?19*a*A:0,this.fillLight.position.copy(n.position),this.fillLight.intensity=(E?.62:.34)*a,this.flashlightBeam.visible=E,E&&(this.flashlightBeam.position.copy(this.flashlight.position),this.flashlightBeam.lookAt(this.flashlightTarget.position),this.flashlightBeamMat.uniforms.uOpacity.value=.02*A);for(let w=this.activeCoins.length-1;w>=0;w--){const C=this.activeCoins[w];if(C.life-=t,C.life<=0){this.scene.remove(C.mesh),this.activeCoins.splice(w,1);continue}C.vel.y-=13.5*t;const T=C.mesh.position.x+C.vel.x*t,M=C.mesh.position.z+C.vel.z*t,P=i.resolveCircle(T,M,.12);Math.abs(P.x-T)>.01&&(C.vel.x*=-.45),Math.abs(P.z-M)>.01&&(C.vel.z*=-.45),C.mesh.position.x=P.x,C.mesh.position.z=P.z,C.mesh.position.y+=C.vel.y*t,C.mesh.rotation.x+=t*16,C.mesh.rotation.z+=t*12,C.mesh.position.y<=.025&&(C.mesh.position.y=.025,C.vel.y=Math.abs(C.vel.y)*.34,C.vel.x*=.62,C.vel.z*=.62,C.bounced||(C.bounced=!0,s.playCoinClink(.32,0),this.cb.onCoinLand(C.mesh.position.x,C.mesh.position.z)))}}}const Io=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,S_=`
  precision highp float;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  void main() {
    vec3 col = texture2D(tDiffuse, vUv).rgb;
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    float soft = smoothstep(1.12, 2.35, luma);
    vec3 extracted = min(col * soft, vec3(1.65));
    gl_FragColor = vec4(extracted, 1.0);
  }
`,T_=`
  precision highp float;
  uniform sampler2D tDiffuse;
  uniform vec2 uDir;
  varying vec2 vUv;
  void main() {
    vec3 sum = texture2D(tDiffuse, vUv).rgb * 0.227027;
    sum += texture2D(tDiffuse, clamp(vUv + uDir * 1.384615, 0.002, 0.998)).rgb * 0.316216;
    sum += texture2D(tDiffuse, clamp(vUv - uDir * 1.384615, 0.002, 0.998)).rgb * 0.316216;
    sum += texture2D(tDiffuse, clamp(vUv + uDir * 3.230769, 0.002, 0.998)).rgb * 0.070270;
    sum += texture2D(tDiffuse, clamp(vUv - uDir * 3.230769, 0.002, 0.998)).rgb * 0.070270;
    gl_FragColor = vec4(sum, 1.0);
  }
`,b_=`
  precision highp float;
  uniform sampler2D tDiffuse;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uFear;
  uniform float uChase;
  uniform float uGlitch;
  uniform float uExposure;
  uniform float uHeartbeat;
  uniform float uAutoIso;
  uniform float uBreathFog;
  uniform float uImpactFlash;
  uniform float uNear;
  uniform float uFar;
  uniform float uHasDepth;
  uniform float uUltra;
  varying vec2 vUv;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float interleavedNoise(vec2 px) {
    return fract(52.9829189 * fract(dot(px, vec2(0.06711056, 0.00583715))));
  }

  float linearizeDepth(float d) {
    float z = d * 2.0 - 1.0;
    return (2.0 * uNear * uFar) / max(0.0001, (uFar + uNear - z * (uFar - uNear)));
  }

  // ACES Filmic Tone Mapping
  vec3 acesFilm(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  vec2 barrelDistort(vec2 uv, float amt) {
    vec2 c = uv - 0.5;
    float r2 = dot(c, c);
    return 0.5 + c * (1.0 + amt * r2);
  }

  // 10-tap Rotated-Kernel Bilateral Depth SSAO (crisp architectural crease & floor contact occlusion!)
  float computeSSAO(vec2 uv, float centerZ, vec2 px) {
    if (uHasDepth < 0.5 || uUltra < 0.5 || centerZ > 26.0 || centerZ < 0.15) return 1.0;
    float ang = interleavedNoise(uv * uResolution) * 6.2831853;
    float sa = sin(ang);
    float ca = cos(ang);
    mat2 rot = mat2(ca, -sa, sa, ca);

    float screenRad = clamp(0.48 / max(centerZ, 0.65), 0.004, 0.028);
    float aspect = uResolution.x / max(1.0, uResolution.y);
    vec2 radVec = vec2(screenRad / max(0.65, aspect), screenRad);

    vec2 k[10];
    k[0] = vec2( 0.92,  0.14) * 0.36;
    k[1] = vec2(-0.85,  0.32) * 0.46;
    k[2] = vec2( 0.24, -0.91) * 0.54;
    k[3] = vec2(-0.34, -0.82) * 0.64;
    k[4] = vec2( 0.68,  0.65) * 0.74;
    k[5] = vec2(-0.62, -0.68) * 0.82;
    k[6] = vec2(-0.18,  0.96) * 0.90;
    k[7] = vec2( 0.78, -0.58) * 0.98;
    k[8] = vec2( 0.10,  0.52) * 0.42;
    k[9] = vec2(-0.50, -0.15) * 0.58;

    float occ = 0.0;
    float bias = 0.024 + centerZ * 0.0065;
    float maxRange = 0.78 + centerZ * 0.042;

    for (int i = 0; i < 10; i++) {
      vec2 suv = clamp(uv + (rot * k[i]) * radVec, px * 2.0, 1.0 - px * 2.0);
      float sampleZ = linearizeDepth(texture2D(tDepth, suv).x);
      float diff = centerZ - sampleZ;
      float rangeW = 1.0 - smoothstep(maxRange * 0.42, maxRange * 1.35, abs(diff));
      occ += smoothstep(bias, bias + 0.14, diff) * rangeW;
    }

    occ = clamp((occ / 10.0) * 1.32, 0.0, 0.78);
    float distFade = 1.0 - smoothstep(16.0, 26.0, centerZ);
    return 1.0 - occ * 0.62 * distFade;
  }

  // Whisper-subtle horizontal anamorphic glint strictly on intense point emitters
  vec3 sampleAnamorphic(vec2 uv, vec2 px) {
    if (uUltra < 0.5) return vec3(0.0);
    vec3 streak = vec3(0.0);
    float offs[4];
    offs[0] = -14.0; offs[1] = -6.0; offs[2] = 6.0; offs[3] = 14.0;
    for (int i = 0; i < 4; i++) {
      vec3 s = texture2D(tBloom, clamp(uv + vec2(offs[i] * px.x * 1.8, 0.0), 0.002, 0.998)).rgb;
      streak += s;
    }
    return streak * vec3(0.14, 0.22, 0.26) * 0.09;
  }

  void main() {
    vec2 px = 1.0 / max(vec2(1.0), uResolution);
    float distAmt = (uUltra > 0.5 ? 0.028 : 0.015) + uFear * 0.032 + uGlitch * 0.056;
    vec2 uv = barrelDistort(vUv, distAmt);

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.008, 0.011, 0.016, 1.0);
      return;
    }

    // VHS / Electromagnetic interference tearing during terror & jumpscares
    if (uGlitch > 0.015) {
      float band = floor(uv.y * 46.0);
      float tear = hash12(vec2(band, floor(uTime * 30.0)));
      if (tear > 1.0 - uGlitch * 0.34) {
        uv.x = clamp(uv.x + (tear - 0.5) * 0.062 * uGlitch, 0.002, 0.998);
      }
    }

    vec2 centered = uv - 0.5;
    float rad2 = dot(centered, centered);

    // Subtle optic chromatic aberration at lens edges, surging during panic/glitch
    float ca = (0.00055 + uFear * 0.0026 + uGlitch * 0.0085) * (0.25 + rad2 * 2.2);
    vec2 caDir = centered * ca;
    vec3 col;
    col.r = texture2D(tDiffuse, clamp(uv + caDir, 0.002, 0.998)).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, clamp(uv - caDir, 0.002, 0.998)).b;

    // FidelityFX CAS local contrast sharpening (razor-sharp kanji signs, ticket machine buttons & matted plush fur!)
    if (uUltra > 0.5) {
      vec3 nN = texture2D(tDiffuse, clamp(uv + vec2(0.0, px.y), 0.002, 0.998)).rgb;
      vec3 nS = texture2D(tDiffuse, clamp(uv - vec2(0.0, px.y), 0.002, 0.998)).rgb;
      vec3 nE = texture2D(tDiffuse, clamp(uv + vec2(px.x, 0.0), 0.002, 0.998)).rgb;
      vec3 nW = texture2D(tDiffuse, clamp(uv - vec2(px.x, 0.0), 0.002, 0.998)).rgb;
      vec3 blur = (nN + nS + nE + nW) * 0.25;
      float contrast = length(col - blur);
      float sharpAmt = clamp(0.34 - contrast * 0.22, 0.08, 0.34);
      col = max(vec3(0.0), col + (col - blur) * sharpAmt);
    }

    // Bilateral DepthTexture SSAO contact shadows
    float centerZ = uHasDepth > 0.5 ? linearizeDepth(texture2D(tDepth, uv).x) : 10.0;
    float ao = computeSSAO(uv, centerZ, px);
    col *= ao;

    // Controlled tight HDR optical bloom (ZERO blinding whiteout glare!)
    vec3 bloom = texture2D(tBloom, uv).rgb;
    col += bloom * (uUltra > 0.5 ? 0.20 : 0.13);
    col += sampleAnamorphic(uv, px);

    // Subtle dark-room eye adaptation when hiding or flashlight OFF
    float isoBoost = 1.0 + uAutoIso * 0.22;
    col *= uExposure * isoBoost;

    // Soft highlight knee before ACES so white signage stays crisp & readable
    col = col / (1.0 + max(vec3(0.0), col - vec3(1.15)) * 0.32);

    // Cinematic ACES Filmic Tone Mapping
    col = acesFilm(col);

    // Tokyo 00:47 Midnight Underground Shinjuku Film Color Grade (deep slate shadows, natural cool-neutral highlights)
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    vec3 shadowTint = vec3(0.84, 0.94, 1.05);
    vec3 hiTint = vec3(1.01, 1.00, 0.97);
    col *= mix(shadowTint, hiTint, smoothstep(0.06, 0.72, luma));

    // Filmic shadow contrast (deep blacks for authentic midnight horror dread!)
    col = mix(col, smoothstep(0.0, 1.0, col), 0.18);

    // Fear desaturation & blood-crimson chase shift
    float desat = uFear * 0.32 + uChase * 0.14;
    col = mix(col, vec3(luma), desat);
    col = mix(col, col * vec3(1.22, 0.84, 0.84), uChase * 0.36);

    // Cold breath condensation / moisture halo at screen edges when hiding/holding breath
    if (uBreathFog > 0.02) {
      float edgeMask = smoothstep(0.26, 0.80, length(centered * vec2(1.05, 1.28)));
      float breathWave = 0.6 + 0.4 * sin(uTime * 2.1 + uv.x * 5.0);
      float fogAmt = edgeMask * uBreathFog * (0.30 + 0.14 * breathWave);
      col = mix(col, vec3(0.52, 0.62, 0.68), clamp(fogAmt, 0.0, 0.38));
    }

    // Impact / Photo Booth / Lightning flash (controlled, never blinding whiteout)
    col += vec3(0.85, 0.92, 0.98) * uImpactFlash * 0.36;

    // Atmospheric claustrophobic lens vignette + heartbeat crimson rim
    float vigBase = smoothstep(0.88, 0.22, length(centered * vec2(1.14, 1.02)));
    float vigPower = mix(0.32, 0.78, clamp(uFear * 0.72 + uChase * 0.3 + uHeartbeat * 0.25, 0.0, 1.0));
    col *= mix(1.0 - vigPower, 1.0, vigBase);

    float redRim = (1.0 - vigBase) * (uFear * 0.26 + uHeartbeat * 0.32 + uChase * 0.26);
    col += vec3(0.52, 0.025, 0.035) * redRim;

    // Linear -> sRGB display encoding FIRST
    col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));

    // Organic sRGB-space 35mm midnight film grain
    float grainNoise = hash12(uv * uResolution + fract(uTime * 19.7) * 512.0) - 0.5;
    float grainAmt = 0.026 + uAutoIso * 0.028 + uFear * 0.032 + uGlitch * 0.095;
    col = clamp(col + grainNoise * grainAmt, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;class E_{sceneTarget;depthTexture=null;bloomExtractTarget;bloomBlurH;bloomBlurV;quadScene=new Ba;quadCamera=new Hr(-1,1,1,-1,0,1);quadGeo=new _t(2,2);extractMat;blurMat;compositeMat;quadMesh;quality="ultra";hasDepth=!1;constructor(t,e,n,i){const s=Math.max(2,Math.floor(e*i)),o=Math.max(2,Math.floor(n*i)),a=Math.max(2,Math.floor(s*.25)),l=Math.max(2,Math.floor(o*.25)),c=t.capabilities.isWebGL2,h=c?ls:_n;this.sceneTarget=new fn(s,o,{minFilter:Le,magFilter:Le,format:Ye,type:h,depthBuffer:!0}),c&&(this.depthTexture=new Ha(s,o),this.depthTexture.type=ei,this.sceneTarget.depthTexture=this.depthTexture,this.hasDepth=!0);const u={minFilter:Le,magFilter:Le,format:Ye,type:h,depthBuffer:!1};this.bloomExtractTarget=new fn(a,l,u),this.bloomBlurH=new fn(a,l,u),this.bloomBlurV=new fn(a,l,u),this.extractMat=new sn({vertexShader:Io,fragmentShader:S_,uniforms:{tDiffuse:{value:this.sceneTarget.texture}},depthTest:!1,depthWrite:!1}),this.blurMat=new sn({vertexShader:Io,fragmentShader:T_,uniforms:{tDiffuse:{value:null},uDir:{value:new Et(1/a,0)}},depthTest:!1,depthWrite:!1}),this.compositeMat=new sn({vertexShader:Io,fragmentShader:b_,uniforms:{tDiffuse:{value:this.sceneTarget.texture},tDepth:{value:this.depthTexture},tBloom:{value:this.bloomBlurV.texture},uResolution:{value:new Et(s,o)},uTime:{value:0},uFear:{value:0},uChase:{value:0},uGlitch:{value:0},uExposure:{value:1.15},uHeartbeat:{value:0},uAutoIso:{value:0},uBreathFog:{value:0},uImpactFlash:{value:0},uNear:{value:.08},uFar:{value:75},uHasDepth:{value:this.hasDepth?1:0},uUltra:{value:1}},depthTest:!1,depthWrite:!1}),this.quadMesh=new I(this.quadGeo,this.compositeMat),this.quadScene.add(this.quadMesh)}setQuality(t){this.quality=t,this.compositeMat.uniforms.uUltra.value=t==="ultra"?1:0}setSize(t,e,n){const i=Math.max(2,Math.floor(t*n)),s=Math.max(2,Math.floor(e*n)),o=Math.max(2,Math.floor(i*.25)),a=Math.max(2,Math.floor(s*.25));this.sceneTarget.setSize(i,s),this.bloomExtractTarget.setSize(o,a),this.bloomBlurH.setSize(o,a),this.bloomBlurV.setSize(o,a),this.compositeMat.uniforms.uResolution.value.set(i,s)}render(t,e,n,i){t.setRenderTarget(this.sceneTarget),t.clear(),t.render(e,n),this.quadMesh.material=this.extractMat,this.extractMat.uniforms.tDiffuse.value=this.sceneTarget.texture,t.setRenderTarget(this.bloomExtractTarget),t.render(this.quadScene,this.quadCamera);const s=this.bloomBlurH.width,o=this.bloomBlurH.height;this.quadMesh.material=this.blurMat,this.blurMat.uniforms.tDiffuse.value=this.bloomExtractTarget.texture,this.blurMat.uniforms.uDir.value.set(1.15/s,0),t.setRenderTarget(this.bloomBlurH),t.render(this.quadScene,this.quadCamera),this.blurMat.uniforms.tDiffuse.value=this.bloomBlurH.texture,this.blurMat.uniforms.uDir.value.set(0,1.15/o),t.setRenderTarget(this.bloomBlurV),t.render(this.quadScene,this.quadCamera),this.quality==="ultra"&&(this.blurMat.uniforms.tDiffuse.value=this.bloomBlurV.texture,this.blurMat.uniforms.uDir.value.set(2.05/s,0),t.setRenderTarget(this.bloomBlurH),t.render(this.quadScene,this.quadCamera),this.blurMat.uniforms.tDiffuse.value=this.bloomBlurH.texture,this.blurMat.uniforms.uDir.value.set(0,2.05/o),t.setRenderTarget(this.bloomBlurV),t.render(this.quadScene,this.quadCamera));const a=this.compositeMat.uniforms;a.uTime.value=i.time,a.uFear.value=i.fear,a.uChase.value=i.chase,a.uGlitch.value=i.glitch,a.uExposure.value=i.exposure,a.uHeartbeat.value=i.heartbeat,a.uAutoIso.value=i.autoIso,a.uBreathFog.value=i.breathFog,a.uImpactFlash.value=i.impactFlash,a.uNear.value=i.cameraNear,a.uFar.value=i.cameraFar,this.quadMesh.material=this.compositeMat,t.setRenderTarget(null),t.render(this.quadScene,this.quadCamera)}dispose(){this.sceneTarget.dispose(),this.depthTexture?.dispose(),this.bloomExtractTarget.dispose(),this.bloomBlurH.dispose(),this.bloomBlurV.dispose(),this.quadGeo.dispose(),this.extractMat.dispose(),this.blurMat.dispose(),this.compositeMat.dispose()}}class w_{rootEl=document.documentElement;loadingScreen=document.getElementById("screen-loading");titleScreen=document.getElementById("screen-title");hudLayer=document.getElementById("hud-layer");pauseScreen=document.getElementById("screen-pause");noteScreen=document.getElementById("screen-note");gameoverScreen=document.getElementById("screen-gameover");victoryScreen=document.getElementById("screen-victory");hideOverlay=document.getElementById("hide-slats-overlay");hideBreathLabel=document.getElementById("hide-breath-label");breathMeterWrap=document.getElementById("breath-meter-wrap");breathMeterFill=document.getElementById("breath-meter-fill");breathMeterHint=document.getElementById("breath-meter-hint");balanceEl=document.getElementById("ic-balance");objectiveEl=document.getElementById("ic-objective");pipEls=Array.from(document.querySelectorAll(".ic-pip"));cctvClockEl=document.getElementById("cctv-clock");muteBtn=document.getElementById("btn-mute");crosshairEl=document.getElementById("crosshair");chargeWrapEl=document.getElementById("charge-ring-wrap");chargeFillEl=document.getElementById("charge-ring-fill");chargePctEl=document.getElementById("charge-pct");promptEl=document.getElementById("interact-prompt");promptKeyEl=document.getElementById("prompt-key");promptTextEl=document.getElementById("prompt-text");subtitleEl=document.getElementById("subtitle-bar");staminaWrapEl=document.getElementById("stamina-wrap");staminaFillEl=document.getElementById("stamina-fill");statusFlashEl=document.getElementById("status-flashlight");statusCrouchEl=document.getElementById("status-crouch");statusCoinsEl=document.getElementById("status-coins");statusMapEl=document.getElementById("status-map");lookHintEl=document.getElementById("look-hint");mapPanelEl=document.getElementById("station-map-panel");mapCanvas=document.getElementById("station-map-canvas");mapCtx=this.mapCanvas.getContext("2d");noteTitleEl=document.getElementById("note-title");noteDateEl=document.getElementById("note-date");noteBodyEl=document.getElementById("note-body");gameoverStatsEl=document.getElementById("gameover-stats");victoryStatsEl=document.getElementById("victory-stats");diffButtons=Array.from(document.querySelectorAll("[data-diff]"));subtitleTimeout=0;selectedDifficulty="normal";mapOpen=!1;constructor(t){document.getElementById("btn-start")?.addEventListener("click",()=>{t.onStartGame(this.selectedDifficulty)}),document.getElementById("btn-pause-hud")?.addEventListener("click",t.onPause),document.getElementById("btn-resume")?.addEventListener("click",t.onResume),document.getElementById("btn-pause-restart")?.addEventListener("click",t.onRestart),document.getElementById("btn-pause-title")?.addEventListener("click",t.onReturnTitle),document.getElementById("btn-note-close")?.addEventListener("click",t.onCloseNote),document.getElementById("btn-gameover-retry")?.addEventListener("click",t.onRestart),document.getElementById("btn-gameover-title")?.addEventListener("click",t.onReturnTitle),document.getElementById("btn-victory-retry")?.addEventListener("click",t.onRestart),document.getElementById("btn-victory-title")?.addEventListener("click",t.onReturnTitle),document.getElementById("btn-map-close")?.addEventListener("click",()=>{this.mapOpen&&this.toggleMap()}),this.muteBtn.addEventListener("click",()=>{const l=t.onToggleMute();this.muteBtn.textContent=l?"音声 OFF":"音声 ON"});for(const l of this.diffButtons)l.addEventListener("click",()=>{const c=l.dataset.diff==="nightmare"?"nightmare":"normal";this.selectedDifficulty=c;for(const h of this.diffButtons)h.classList.toggle("is-active",h===l)});const e=document.getElementById("slider-sens"),n=document.getElementById("val-sens");e?.addEventListener("input",()=>{const l=parseFloat(e.value);n&&(n.textContent=`${l.toFixed(1)}x`),t.onSensitivityChange(l)});const i=document.getElementById("slider-bright"),s=document.getElementById("val-bright");i?.addEventListener("input",()=>{const l=parseFloat(i.value);s&&(s.textContent=`${Math.round(l*100)}%`),t.onBrightnessChange(l)});const o=document.getElementById("select-touch-ui");o?.addEventListener("change",()=>{const l=o.value;(l==="auto"||l==="on"||l==="off")&&t.onTouchModeChange(l)});const a=document.getElementById("select-quality");a?.addEventListener("change",()=>{const l=a.value;(l==="ultra"||l==="standard")&&t.onQualityChange(l)})}setScreen(t){this.loadingScreen.hidden=t!=="LOADING",this.titleScreen.hidden=t!=="TITLE",this.hudLayer.hidden=t!=="PLAYING",this.pauseScreen.hidden=t!=="PAUSED",this.noteScreen.hidden=t!=="NOTE",this.gameoverScreen.hidden=t!=="GAMEOVER",this.victoryScreen.hidden=t!=="VICTORY",t!=="PLAYING"&&(this.setHiding(!1),this.mapOpen=!1,this.mapPanelEl.hidden=!0)}setHiding(t,e="locker"){document.body.classList.toggle("is-hiding",t),this.hideOverlay.classList.toggle("is-hiding",t),this.hideOverlay.classList.toggle("is-phonebooth",t&&e==="phonebooth"),this.breathMeterWrap.hidden=!t}updateBreathState(t,e,n,i){this.breathMeterFill.style.width=`${Math.round(t*100)}%`,this.breathMeterWrap.classList.toggle("is-danger",n),this.breathMeterWrap.classList.toggle("is-holding",e),n?(this.hideBreathLabel.textContent=e?"息を止めている…動くな…":"すぐ外にいる！！ 息を止めろ！！",this.breathMeterHint.textContent=i?"「息を止める」を長押し！":"[Space] 長押しで息を止める！"):(this.hideBreathLabel.textContent=e?"息を潜めている…":"隠れている…",this.breathMeterHint.textContent=i?"右の「息を止める」で無音化":"[Space] 長押しで息を止める")}toggleMap(){this.mapOpen=!this.mapOpen,this.mapPanelEl.hidden=!this.mapOpen,this.statusMapEl.classList.toggle("is-on",this.mapOpen)}updateChargeCount(t,e){const n=t*200;this.balanceEl.textContent=`¥${n.toLocaleString()} / ¥1,000`,this.pipEls.forEach((i,s)=>i.classList.toggle("is-filled",s<t)),t>=e?(this.objectiveEl.textContent="残高到達！ 東改札（歌舞伎町出口）へ走れ！",this.objectiveEl.classList.add("is-ready")):(this.objectiveEl.textContent=`新宿駅構内のチャージ機を探す（残り ${e-t} 箇所）`,this.objectiveEl.classList.remove("is-ready"))}setFearLevel(t,e){this.rootEl.style.setProperty("--fear",t.toFixed(3)),document.body.classList.toggle("is-chasing",e)}setInteractPrompt(t){if(!t){this.promptEl.hidden=!0,this.crosshairEl.classList.remove("is-active");return}this.promptEl.hidden=!1,this.promptKeyEl.textContent=t.key,this.promptTextEl.textContent=t.text,this.crosshairEl.classList.add("is-active")}setChargeProgress(t){if(t<=0){this.chargeWrapEl.hidden=!0;return}this.chargeWrapEl.hidden=!1;const e=2*Math.PI*28;this.chargeFillEl.style.strokeDasharray=`${e}`,this.chargeFillEl.style.strokeDashoffset=`${e*(1-t)}`,this.chargePctEl.textContent=`${Math.round(t*100)}%`}showSubtitle(t,e=4){this.subtitleEl.textContent=t,this.subtitleEl.classList.add("is-visible"),window.clearTimeout(this.subtitleTimeout),this.subtitleTimeout=window.setTimeout(()=>{this.subtitleEl.classList.remove("is-visible")},e*1e3)}updatePlayerStatus(t,e,n,i,s,o,a,l){const c=47+Math.floor(e/60),h=Math.floor(e%60),u=String(Math.floor(c/60)%24).padStart(2,"0"),f=String(c%60).padStart(2,"0"),d=String(h).padStart(2,"0");this.cctvClockEl.textContent=`SHINJUKU CAM-E04  ${u}:${f}:${d}`,this.staminaWrapEl.classList.toggle("is-visible",n<.98||i),this.staminaFillEl.style.width=`${Math.round(n*100)}%`,this.staminaFillEl.classList.toggle("is-exhausted",i),this.statusFlashEl.textContent=s?"[F] ライト ON":"[F] ライト OFF",this.statusFlashEl.classList.toggle("is-on",s),this.statusCrouchEl.textContent=o?"[C] しゃがみ":"[C] 立つ",this.statusCrouchEl.classList.toggle("is-on",o),this.statusCoinsEl.textContent=`[G] 硬貨 ×${a}`,this.statusCoinsEl.classList.toggle("is-empty",a<=0),this.lookHintEl.style.opacity=l?"0":"0.82"}renderStationMap(t,e,n,i,s){if(!this.mapOpen)return;const o=this.mapCtx,a=this.mapCanvas.width,l=this.mapCanvas.height;o.fillStyle="#090e13",o.fillRect(0,0,a,l),o.strokeStyle="rgba(130, 170, 190, 0.06)",o.lineWidth=1;for(let p=20;p<a;p+=28)o.beginPath(),o.moveTo(p,0),o.lineTo(p,l),o.stroke();for(let p=20;p<l;p+=28)o.beginPath(),o.moveTo(0,p),o.lineTo(a,p),o.stroke();const c=16,h=18,u=(a-c*2)/Jn,f=(l-h*2)/Mi;for(let p=0;p<Mi;p++)for(let y=0;y<Jn;y++){const v=Bs[p][y];if(v===1){p===5&&y>=6&&y<=8?(o.fillStyle="#1b3830",o.fillRect(c+y*u,h+p*f,u-.5,f-.5)):p===5&&y>=9&&y<=11&&(o.fillStyle="#155432",o.fillRect(c+y*u,h+p*f,u-.5,f-.5));continue}const _=y>=19&&p>=1&&p<=3,A=p>=1&&p<=4&&y<=18,E=y>=3&&y<=17&&p>=6&&p<=12;_?o.fillStyle=s?"#1f7c46":"#541c24":v===2?o.fillStyle="#5e42a4":v===4?o.fillStyle="#15221d":A?o.fillStyle="#213647":E?o.fillStyle="#1b2d25":o.fillStyle="#1e2730",o.fillRect(c+y*u,h+p*f,u-.6,f-.6)}o.fillStyle="#38d4f0",o.fillRect(c+5*u,h+1*f-3.5,11.4*u,4),o.strokeStyle="rgba(224, 186, 46, 0.36)",o.lineWidth=2,o.beginPath(),o.moveTo(c+1.5*u,h+2.65*f),o.lineTo(c+18.5*u,h+2.65*f),o.moveTo(c+1.5*u,h+11.7*f),o.lineTo(c+19.5*u,h+11.7*f),o.stroke();const d=[[4,"15·16","山手/総武","#7ac142"],[7,"13·14","総武/山手","#e8be00"],[10,"11·12","中央快速","#f15a22"],[13,"9·10","中央特急","#2888d8"],[16,"7·8","中央快速","#f15a22"]];o.textAlign="center";for(const[p,y,v,_]of d){const A=c+(p+.5)*u;o.fillStyle=_,o.fillRect(c+p*u,h+7*f,u-.6,3.5),o.fillRect(c+p*u,h+9.85*f,u-.6,3.5),o.fillStyle="#f2f6f4",o.font="bold 10.5px monospace",o.fillText(y,A,h+8.4*f),o.fillStyle="#9db4aa",o.font="600 8px sans-serif",o.fillText(v,A,h+9.2*f)}o.textAlign="center",o.fillStyle="#7ce4fa",o.font="bold 11px sans-serif",o.fillText("━━ 新宿ウォール456 (45.6m LED) ━━",c+10.7*u,h+.72*f),o.fillStyle="#e6f0f8",o.font="bold 12px sans-serif",o.fillText("← 西口地下広場      東西自由通路 (J・ADビジョン柱列)      アルプス広場 →",c+10.2*u,h+2.52*f),o.fillStyle=s?"#68f4a6":"#ff8c92",o.font="bold 10.5px sans-serif",o.fillText("東口出口",c+19.6*u,h+2.15*f),o.font="600 8.5px sans-serif",o.fillText(s?"解錠OK":"歌舞伎町",c+19.6*u,h+2.85*f),o.fillStyle="#8ef4b8",o.font="bold 11px sans-serif",o.fillText("西改札",c+4.5*u,h+5.65*f),o.fillStyle="#a4e8d0",o.font="600 9.5px sans-serif",o.fillText("きっぷ",c+7.5*u,h+5.65*f),o.fillStyle="#90f8be",o.font="bold 10.5px sans-serif",o.fillText("みどりの窓口",c+10.5*u,h+5.65*f),o.fillStyle="#8ef4b8",o.font="bold 11px sans-serif",o.fillText("東改札",c+16.5*u,h+5.65*f),o.fillStyle="#c8d6dc",o.font="bold 11px sans-serif",o.fillText("← 中央西改札 (小田急・京王のりかえ)       中央通路       中央東改札 (ルミネ) →",c+10.5*u,h+12.1*f),o.fillStyle="rgba(18, 28, 36, 0.9)",o.fillRect(a-42,8,30,24),o.strokeStyle="rgba(128, 195, 66, 0.5)",o.lineWidth=1,o.strokeRect(a-42,8,30,24),o.fillStyle="#80c342",o.font="bold 11px monospace",o.fillText("N↑",a-27,24);for(const p of _h){const y=c+p.x/F*u,v=h+p.z/F*f;o.fillStyle=p.kind==="phonebooth"?"#36c274":"#429874",o.fillRect(y-3.2,v-3.2,6.4,6.4),o.strokeStyle="#091015",o.lineWidth=1,o.strokeRect(y-3.2,v-3.2,6.4,6.4)}const g=.5+.5*Math.sin(performance.now()*.006);for(const p of i){const y=c+p.def.x/F*u,v=h+p.def.z/F*f;p.charged||(o.strokeStyle=`rgba(74, 224, 214, ${.35+g*.45})`,o.lineWidth=1.6,o.beginPath(),o.arc(y,v,7.5+g*2.8,0,Math.PI*2),o.stroke()),o.fillStyle=p.charged?"#38d884":"#4ae0d6",o.beginPath(),o.arc(y,v,5.2,0,Math.PI*2),o.fill(),o.strokeStyle="#070d12",o.lineWidth=1.6,o.stroke()}const x=c+t/F*u,m=h+e/F*f;o.save(),o.translate(x,m),o.rotate(-n),o.fillStyle="rgba(240, 192, 56, 0.34)",o.beginPath(),o.moveTo(0,0),o.lineTo(-13,-26),o.lineTo(13,-26),o.closePath(),o.fill(),o.fillStyle="#f2c43a",o.beginPath(),o.arc(0,0,5.2,0,Math.PI*2),o.fill(),o.strokeStyle="#090d11",o.lineWidth=1.6,o.stroke(),o.restore()}openNote(t){this.noteTitleEl.textContent=t.title,this.noteDateEl.textContent=t.date,this.noteBodyEl.innerHTML=t.lines.map(e=>`<p>${e}</p>`).join(""),this.setScreen("NOTE")}showEndStats(t,e){const n=Math.floor(e.elapsedSec/60),i=Math.floor(e.elapsedSec%60),s=`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`,o=`
      <div class="stat-row"><span>舞台</span><strong>JR新宿駅 B1F（東改札）</strong></div>
      <div class="stat-row"><span>難易度</span><strong>${e.difficulty==="nightmare"?"悪夢":"通常"}</strong></div>
      <div class="stat-row"><span>経過時間</span><strong>${s}</strong></div>
      <div class="stat-row"><span>Suicaチャージ</span><strong>${e.charges} / 5（¥${e.charges*200}）</strong></div>
      <div class="stat-row"><span>追跡からの生還</span><strong>${e.chasesSurvived} 回</strong></div>
      <div class="stat-row"><span>発見メモ</span><strong>${e.notesRead} / ${e.totalNotes}</strong></div>
      <div class="stat-row"><span>硬貨陽動</span><strong>${e.coinsTossed} 回</strong></div>
    `;t?(this.victoryStatsEl.innerHTML=o,this.setScreen("VICTORY")):(this.gameoverStatsEl.innerHTML=o,this.setScreen("GAMEOVER"))}}class A_{renderer;scene;camera;postFX;collision;station;rabbit;player;sound;hud;screen="LOADING";chargesCompleted=0;exitGateUnlocked=!1;difficulty="normal";pendingLandscapeLock=!1;ambientHemi;titleLight;brightnessMult=1;lastTime=performance.now();totalElapsed=0;runElapsed=0;blackoutTimer=0;jumpscareTimer=0;glitchPulse=0;currentFear=0;currentChase=0;autoIso=0;breathFog=0;impactFlash=0;dynamicFovKick=0;phantomTimer=22;phantomTrainCooldown=18;wall456SubliminalCooldown=14;photoBoothTriggered=!1;payphoneTriggered=!1;payphoneRingTimer=0;currentTarget=null;activeChargingTerminal=null;chargeTickAccum=0;pedestalCommentShown=!1;wasChasing=!1;chasesSurvived=0;notesReadCount=0;rafId=0;constructor(t){this.renderer=new kg({canvas:t,antialias:!0,powerPreference:"high-performance"});const e=Math.min(window.devicePixelRatio||1,1.75);this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Pc,this.renderer.toneMapping=Dn,this.scene=new Ba,this.scene.background=new rt(395791),this.scene.fog=new Fa(395791,.032),this.scene.environment=Ux(this.renderer);const n=window.innerWidth/Math.max(1,window.innerHeight);this.camera=new He(this.computeFov(n),n,.08,86),this.postFX=new E_(this.renderer,window.innerWidth,window.innerHeight,e),this.ambientHemi=new Bf(9216692,1449252,.34),this.scene.add(this.ambientHemi),this.titleLight=new Gr(14478568,16,22,Math.PI*.28,.68,1.4),this.titleLight.position.set(43.2,3.4,8.2),this.titleLight.target.position.set(46.8,1.25,10.1),this.scene.add(this.titleLight,this.titleLight.target),this.collision=new Wg,this.station=new Fx(this.scene),this.rabbit=new __(this.scene),this.sound=new y_,this.player=new M_(t,this.scene,{onInteractTap:()=>this.handleInteractTap(),onTogglePause:()=>this.togglePause(),onCoinLand:(i,s)=>this.handleCoinLand(i,s)},this.station.textures.flashlightCookie),this.hud=new w_({onStartGame:i=>this.startGame(i),onPause:()=>this.togglePause(),onResume:()=>this.resumeGame(),onRestart:()=>this.startGame(this.difficulty),onReturnTitle:()=>this.returnToTitle(),onCloseNote:()=>this.closeNote(),onToggleMute:()=>{this.sound.unlock();const i=!this.sound.isMuted();return this.sound.setMuted(i),i},onSensitivityChange:i=>{this.player.sensitivity=i},onBrightnessChange:i=>{this.brightnessMult=i,this.ambientHemi.intensity=.34*i},onTouchModeChange:i=>this.player.setTouchUIMode(i),onQualityChange:i=>this.postFX.setQuality(i)}),window.addEventListener("resize",()=>this.onResize()),window.addEventListener("orientationchange",()=>this.scheduleResizeSync()),screen.orientation?.addEventListener?.("change",()=>this.scheduleResizeSync()),document.addEventListener("fullscreenchange",()=>this.onFullscreenChange()),document.addEventListener("webkitfullscreenchange",()=>this.onFullscreenChange()),window.visualViewport?.addEventListener("resize",()=>this.onResize()),window.addEventListener("game:toggle-flashlight",()=>{this.screen==="PLAYING"&&this.player.toggleFlashlight(this.sound)}),window.addEventListener("game:toss-coin",()=>{this.screen==="PLAYING"&&!this.player.tossCoin(this.sound)&&this.player.coins<=0&&this.hud.showSubtitle("硬貨を持っていない…新宿駅構内の床を探してみよう",2.4)}),window.addEventListener("game:toggle-map",()=>{this.screen==="PLAYING"&&(this.hud.toggleMap(),this.sound.playPaperRustle())}),window.__GAME__=this,this.init()}async init(){this.hud.setScreen("LOADING");try{await this.rabbit.load("./models/purple_rabbit_animated.glb",{suitNormal:this.station.textures.rabbitSuitNormal,suitGrime:this.station.textures.rabbitSuitGrime,faceGrime:this.station.textures.rabbitFaceGrime})}catch(t){console.error("Failed to load purple_rabbit_animated.glb:",t)}this.screen="TITLE",this.hud.setScreen("TITLE"),this.lastTime=performance.now(),this.loop()}scheduleResizeSync(){this.onResize(),this.player.touch.refreshVisibility(),requestAnimationFrame(()=>{this.onResize(),this.player.touch.refreshVisibility()}),window.setTimeout(()=>{this.onResize(),this.player.touch.refreshVisibility()},250)}async lockLandscape(){try{const t=screen.orientation;if(t&&typeof t.lock=="function"){await t.lock("landscape");return}const e=screen,n=e.lockOrientation||e.mozLockOrientation||e.msLockOrientation;n&&n.call(screen,"landscape")}catch{}}isFullscreen(){const t=document;return!!(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)}onFullscreenChange(){const t=this.isFullscreen();t&&this.pendingLandscapeLock&&(this.pendingLandscapeLock=!1,this.lockLandscape().finally(()=>this.scheduleResizeSync())),this.scheduleResizeSync(),t&&this.screen==="PLAYING"&&!this.player.touch.enabled&&!document.pointerLockElement&&this.player.requestLock()}enterFullscreenAndLandscape(){const t=document.documentElement;if(this.pendingLandscapeLock=!0,this.isFullscreen()){this.pendingLandscapeLock=!1,this.lockLandscape().finally(()=>this.scheduleResizeSync());return}const e=()=>{const n=this.isFullscreen();this.pendingLandscapeLock?(this.pendingLandscapeLock=!1,this.lockLandscape().finally(()=>{this.scheduleResizeSync(),n&&this.screen==="PLAYING"&&!this.player.touch.enabled&&!document.pointerLockElement&&this.player.requestLock()})):this.scheduleResizeSync()};try{let n;if(typeof t.requestFullscreen=="function")try{n=t.requestFullscreen({navigationUI:"hide"})}catch{n=t.requestFullscreen()}else if(typeof t.webkitRequestFullscreen=="function")n=t.webkitRequestFullscreen();else if(typeof t.mozRequestFullScreen=="function")n=t.mozRequestFullScreen();else if(typeof t.msRequestFullscreen=="function")n=t.msRequestFullscreen();else{e();return}n&&typeof n.then=="function"&&n.then(e,e)}catch{e()}}startGame(t){this.sound.unlock(),this.enterFullscreenAndLandscape(),this.difficulty=t,this.rabbit.setDifficulty(t),this.chargesCompleted=0,this.exitGateUnlocked=!1,this.runElapsed=0,this.blackoutTimer=0,this.jumpscareTimer=0,this.glitchPulse=0,this.currentFear=0,this.currentChase=0,this.autoIso=0,this.breathFog=0,this.impactFlash=0,this.dynamicFovKick=0,this.phantomTimer=20,this.phantomTrainCooldown=16,this.wall456SubliminalCooldown=14,this.photoBoothTriggered=!1,this.payphoneTriggered=!1,this.payphoneRingTimer=0,this.currentTarget=null,this.activeChargingTerminal=null,this.pedestalCommentShown=!1,this.wasChasing=!1,this.chasesSurvived=0,this.notesReadCount=0,this.collision.setExitGateUnlocked(!1),this.station.resetVisuals(),this.player.reset(),this.rabbit.reset(),this.titleLight.intensity=0,this.screen="PLAYING",this.hud.setScreen("PLAYING"),this.hud.setHiding(!1),this.hud.updateChargeCount(0,this.station.terminals.length),this.player.setActive(!0),this.player.requestLock();const e=this.player.touch.enabled?"（右下の「構内図」で確認）":"（[M]で新宿駅構内図）";this.hud.showSubtitle(`00:47 新宿駅。終電を逃した……東改札の非常シャッターを開くには、構内5か所のチャージ機で¥1,000貯める必要がある。${e}`,6.8)}togglePause(){if(this.screen==="PLAYING"){if(this.hud.mapOpen){this.hud.toggleMap();return}this.screen="PAUSED",this.player.setActive(!1),this.hud.setScreen("PAUSED")}else this.screen==="PAUSED"?this.resumeGame():this.screen==="NOTE"&&this.closeNote()}resumeGame(){this.screen==="PAUSED"&&(this.screen="PLAYING",this.hud.setScreen("PLAYING"),this.player.setActive(!0),this.player.requestLock())}closeNote(){this.screen==="NOTE"&&(this.screen="PLAYING",this.hud.setScreen("PLAYING"),this.player.setActive(!0),this.player.requestLock())}returnToTitle(){this.screen="TITLE",this.player.setActive(!1),this.titleLight.intensity=16,this.currentFear=0,this.currentChase=0,this.glitchPulse=0,this.station.resetVisuals(),this.hud.setScreen("TITLE")}computeFov(t){return t>=1?68:Math.min(86,68+(1-t)*34)}onResize(){const t=window.innerWidth,e=Math.max(1,window.innerHeight),n=Math.min(window.devicePixelRatio||1,1.75),i=t/e;this.camera.aspect=i,this.camera.fov=this.computeFov(i)+this.dynamicFovKick,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(n),this.renderer.setSize(t,e),this.postFX.setSize(t,e,n)}loop=()=>{this.rafId=requestAnimationFrame(this.loop);const t=performance.now(),e=Math.min(.05,Math.max(.001,(t-this.lastTime)/1e3));this.lastTime=t,this.totalElapsed+=e,this.glitchPulse=Math.max(0,this.glitchPulse-e*1.45),this.impactFlash=Math.max(0,this.impactFlash-e*3.4),this.screen==="TITLE"?this.updateTitle(e):this.screen==="PLAYING"?this.updatePlaying(e):this.screen==="JUMPSCARE"&&this.updateJumpscare(e);const n=this.screen==="TITLE",i=this.screen==="JUMPSCARE",s=!n&&!i&&(!this.player.flashlightOn||this.player.hiddenCloset!==null||this.blackoutTimer>0);this.autoIso+=((s?.92:0)-this.autoIso)*Math.min(1,e*1.6);const o=n||i?0:this.player.holdingBreath?.95:this.player.hiddenCloset?.54+this.currentFear*.42:this.player.exhausted?.72:Math.max(0,this.currentFear-.65)*1.1;this.breathFog+=(o-this.breathFog)*Math.min(1,e*2.4),this.postFX.render(this.renderer,this.scene,this.camera,{time:this.totalElapsed,fear:n?.14:i?1:this.currentFear,chase:n?0:i?1:this.currentChase,glitch:i?.94:this.glitchPulse,exposure:this.brightnessMult*1.02,heartbeat:n?0:this.sound.getHeartbeatPulse(),autoIso:this.autoIso,breathFog:this.breathFog,impactFlash:this.impactFlash,cameraNear:this.camera.near,cameraFar:this.camera.far})};updateTitle(t){this.rabbit.updateTitleShowcase(t,this.totalElapsed),this.station.update(t,this.totalElapsed,1,{x:this.rabbit.root.position.x,z:this.rabbit.root.position.z},0);const e=Math.sin(this.totalElapsed*.38)*.38;this.camera.aspect<.92?(this.camera.position.set(40.2,1.54+Math.sin(this.totalElapsed*.7)*.03,9.1+e*.25),this.camera.lookAt(50,1.12,10.6)):(this.camera.position.set(41.2,1.56+Math.sin(this.totalElapsed*.7)*.04,8.7+e*.42),this.camera.lookAt(52,1.26,10.8)),this.titleLight.intensity=16*(Math.sin(this.totalElapsed*29)>.9?.3:1),this.player.hideFlashlight()}updatePlaying(t){this.runElapsed+=t,this.blackoutTimer>0&&(this.blackoutTimer=Math.max(0,this.blackoutTimer-t));const e=this.rabbit.update(t,this.totalElapsed,this.chargesCompleted,{x:this.player.position.x,z:this.player.position.z,yaw:this.player.yaw,flashlightOn:this.player.flashlightOn,crouching:this.player.crouching,sprinting:this.player.sprinting,hiddenCloset:this.player.hiddenCloset,holdingBreath:this.player.holdingBreath},this.collision,this.sound);if(this.currentFear+=(e.fearLevel-this.currentFear)*Math.min(1,t*5),this.currentChase+=((e.isChasing?1:0)-this.currentChase)*Math.min(1,t*5),e.stepShake>0&&this.player.addCameraShake(e.stepShake),e.wokeFromIntro&&(this.blackoutTimer=.7,this.glitchPulse=.8,this.player.addCameraShake(.5),this.sound.playBlackoutThunk(),this.sound.playSpotStinger(),this.hud.showSubtitle("……ッ！ 東改札の前に座っていた「あれ」が立ち上がった！",4.6)),e.justPeeked&&(this.glitchPulse=Math.max(this.glitchPulse,.32),this.sound.playStareChill(),this.hud.showSubtitle("……J・ADビジョンの白い柱の陰から、紫の大きな耳が覗いている……",3.6)),e.justStareFroze&&(this.glitchPulse=.78,this.sound.playNeckCrack(),this.sound.playStareChill(),this.hud.showSubtitle("……首が鳴った……こっちをじっと見ている……来るッ！！",3.4)),e.justKilledLight&&this.station.triggerDominoBlowout(this.rabbit.root.position.x,this.rabbit.root.position.z,this.player.position.x,this.player.position.z,11)&&(this.sound.playLightBlowout(),this.player.addCameraShake(.38)),e.justInspectingCloset){this.glitchPulse=Math.max(this.glitchPulse,.5);const i=this.player.touch.enabled?"「息を止める」を長押ししろ！":"[Space]長押しで息を止めろ！";this.hud.showSubtitle(`……扉のすぐ外にいる……${i} ライトは絶対につけるな……`,4.2)}if(e.justScratchedCloset&&(this.glitchPulse=Math.max(this.glitchPulse,.68),this.player.addCameraShake(.42),this.sound.playLockerScratch()),e.justSpotted&&(this.glitchPulse=.88,this.player.addCameraShake(.45),this.sound.playSpotStinger(),this.hud.showSubtitle("見つかった！！ 走れ！ ロッカーか公衆電話ボックスへ逃げろ！",3.6)),this.wasChasing&&!e.isChasing&&!e.caughtPlayer&&(this.chasesSurvived++,this.hud.showSubtitle("……撒いたか？ 新宿の地下はまだ静かすぎる。",3)),this.wasChasing=e.isChasing,this.updateShinjukuHorrorEvents(t,e.isChasing,e.distance),e.caughtPlayer){if(e.ripClosetId){const i=this.station.closets.find(s=>s.def.id===e.ripClosetId);i&&(i.targetAngle=-1.65),this.player.exitCloset(),this.hud.setHiding(!1)}this.startJumpscare();return}const n=this.player.sprinting?5.2:e.isChasing?3:0;if(Math.abs(n-this.dynamicFovKick)>.02&&(this.dynamicFovKick+=(n-this.dynamicFovKick)*Math.min(1,t*6),this.camera.fov=this.computeFov(this.camera.aspect)+this.dynamicFovKick,this.camera.updateProjectionMatrix()),this.player.update(t,this.totalElapsed,this.camera,this.collision,this.sound,e.fearLevel,this.brightnessMult,(i,s)=>this.station.isPointOnPuddle(i,s)),this.station.update(t,this.totalElapsed,this.chargesCompleted,{x:this.rabbit.root.position.x,z:this.rabbit.root.position.z},this.blackoutTimer,{x:this.player.position.x,z:this.player.position.z}),!this.pedestalCommentShown&&Math.hypot(this.player.position.x-Be.x,this.player.position.z-Be.z)<4.6&&(this.pedestalCommentShown=!0,this.hud.showSubtitle("東口アルプス広場の展示ケースが内側から割られている……紫色の足跡が東改札へ続いている。",5)),this.updateInteractions(t),this.exitGateUnlocked&&this.player.position.x>zg){this.triggerVictory();return}this.sound.updateContinuous(t,e.fearLevel,e.isChasing,!0,{hiding:this.player.hiddenCloset!==null,holdingBreath:this.player.holdingBreath,exhausted:this.player.exhausted,rabbitDist:e.distance,rabbitPan:e.panValue}),this.hud.setFearLevel(e.fearLevel,e.isChasing),this.player.hiddenCloset&&this.hud.updateBreathState(this.player.breath,this.player.holdingBreath,e.isInspectingCloset||e.distance<4.5,this.player.touch.enabled),this.hud.updatePlayerStatus(t,this.runElapsed,this.player.stamina,this.player.exhausted,this.player.flashlightOn,this.player.crouching,this.player.coins,this.player.pointerLocked),this.hud.renderStationMap(this.player.position.x,this.player.position.z,this.player.yaw,this.station.terminals,this.chargesCompleted>=this.station.terminals.length),this.player.touch.syncButtonVisuals({flashlightOn:this.player.flashlightOn,crouching:this.player.crouching,coins:this.player.coins,mapOpen:this.hud.mapOpen,hiding:this.player.hiddenCloset!==null,holdingBreath:this.player.holdingBreath,promptKind:this.currentTarget?this.currentTarget.kind:null})}updateShinjukuHorrorEvents(t,e,n){this.photoBoothTriggered||Math.hypot(this.player.position.x-Yn.x,this.player.position.z-Yn.z)<4.8&&(this.photoBoothTriggered=!0,this.station.triggerPhotoBoothFlash(),this.sound.playPhotoBoothFlash(),this.impactFlash=.65,this.glitchPulse=Math.max(this.glitchPulse,.52),this.player.addCameraShake(.28),this.hud.showSubtitle("……ッ！ 証明写真機の中でフラッシュが光った！ 誰も入っていないのに、カーテンの奥に大きな影が……",4.8)),!this.payphoneTriggered&&this.chargesCompleted>=1&&!this.player.hiddenCloset&&Math.hypot(this.player.position.x-gc.x,this.player.position.z-gc.z)<10.5&&(this.payphoneTriggered=!0,this.payphoneRingTimer=4.2,this.station.setPayphoneRinging(!0),this.sound.playPayphoneRing(-.45),this.hud.showSubtitle("西改札前の公衆電話が鳴っている……受話器の向こうから笑い声が漏れている……",4.6)),this.payphoneRingTimer>0&&(this.payphoneRingTimer-=t,this.payphoneRingTimer<=0&&this.station.setPayphoneRinging(!1)),this.phantomTrainCooldown-=t;const i=Math.hypot(this.player.position.x-24,this.player.position.z-32)<13.5;if(this.phantomTrainCooldown<=0&&!e&&(i||this.chargesCompleted>=1&&Math.random()<.008)&&(this.phantomTrainCooldown=36+Math.random()*24,this.station.triggerPhantomTrain(),this.sound.playPhantomTrain(),this.player.addCameraShake(.32),this.glitchPulse=Math.max(this.glitchPulse,.34),this.hud.showSubtitle("14・15番線のホームを山手線が轟音で通過した……！ 00:47、終電はもう終わったはずなのに……",5)),this.chargesCompleted>=1&&!e&&n>12&&(this.phantomTimer-=t,this.phantomTimer<=0)){this.phantomTimer=17+Math.random()*17,this.glitchPulse=Math.max(this.glitchPulse,.4);const s=Math.random()<.5?-.95:.95;Math.random()<.58?this.sound.playPhantomWhisper(s):this.sound.playPhantomScare(s*.85)}this.wall456SubliminalCooldown-=t,this.wall456SubliminalCooldown<=0&&this.chargesCompleted>=1&&!e&&!this.player.hiddenCloset&&this.player.position.z<15.5&&this.player.position.x>18&&this.player.position.x<66&&(this.wall456SubliminalCooldown=24+Math.random()*18,this.station.triggerWall456SubliminalFlash(),this.sound.playStareChill(),this.glitchPulse=Math.max(this.glitchPulse,.55),this.hud.showSubtitle("……今、新宿ウォール456の映像が一瞬赤く歪んだ……誰かの目がこっちを見ていた……",4.4))}updateInteractions(t){if(this.player.hiddenCloset){this.currentTarget={kind:"exit-closet"};const c=this.player.hiddenCloset.kind==="phonebooth"?"公衆電話ボックスから出る":"ロッカーから出る";this.hud.setInteractPrompt({key:"E",text:c}),this.hud.setChargeProgress(0),this.activeChargingTerminal=null;return}const e=this.player.position.x,n=this.player.position.z,i=-Math.sin(this.player.yaw),s=-Math.cos(this.player.yaw);let o=null,a=1/0;const l=(c,h,u,f)=>{const d=c-e,g=h-n,x=Math.hypot(d,g);if(x>u||x<.01)return null;const m=d/x*i+g/x*s;return m<f?null:x-m*.8};for(const c of this.station.terminals){if(c.charged)continue;const h=l(c.def.x,c.def.z,2.4,.45);h!==null&&h<a&&(a=h,o={kind:"terminal",item:c})}if(!this.exitGateUnlocked){const c=l(_r.x,_r.z,3,.35);c!==null&&c<a&&(a=c,o={kind:"exit-gate"})}for(const c of this.station.closets){const h=l(c.def.x,c.def.z,2.35,.45);h!==null&&h<a&&(a=h,o={kind:"closet",item:c})}for(const c of this.station.notes){const h=l(c.def.x,c.def.z,2.25,.4);h!==null&&h<a&&(a=h,o={kind:"note",item:c})}for(const c of this.station.coinPickups){if(c.collected)continue;const h=l(c.def.x,c.def.z,2.25,.3);h!==null&&h<a&&(a=h,o={kind:"coin",item:c})}if(this.currentTarget=o,!o)this.hud.setInteractPrompt(null);else switch(o.kind){case"terminal":this.hud.setInteractPrompt({key:"E長押し",text:`${o.item.def.name} にSuicaチャージ（¥200）`});break;case"closet":this.hud.setInteractPrompt({key:"E",text:`${o.item.def.name} に隠れる`});break;case"note":this.hud.setInteractPrompt({key:"E",text:`メモを読む「${o.item.def.title}」`});break;case"coin":this.hud.setInteractPrompt({key:"E",text:"¥100硬貨を拾う（陽動用）"});break;case"exit-gate":this.hud.setInteractPrompt({key:"E",text:this.chargesCompleted>=this.station.terminals.length?"Suicaをタッチして東改札シャッターを開ける！":`東改札（残高不足：${this.chargesCompleted}/${this.station.terminals.length}）`});break}if(o&&o.kind==="terminal"&&this.player.isInteractHeld()){const c=o.item;this.activeChargingTerminal=c,c.progress=Math.min(1,c.progress+t/2.35),this.station.updateTerminalVisual(c),this.hud.setChargeProgress(c.progress),this.chargeTickAccum+=t,this.chargeTickAccum>=.34&&(this.chargeTickAccum=0,this.sound.playChargeTick(c.progress)),c.progress>=1&&this.completeTerminalCharge(c)}else this.activeChargingTerminal&&!this.activeChargingTerminal.charged&&(this.activeChargingTerminal.progress=Math.max(0,this.activeChargingTerminal.progress-t*.9),this.station.updateTerminalVisual(this.activeChargingTerminal),this.activeChargingTerminal.progress<=0&&(this.activeChargingTerminal=null)),this.hud.setChargeProgress(0)}handleInteractTap(){if(this.screen==="NOTE"){this.closeNote();return}if(!(this.screen!=="PLAYING"||!this.currentTarget))switch(this.currentTarget.kind){case"closet":{const t=this.currentTarget.item;t.targetAngle=-1.35,window.setTimeout(()=>{t.targetAngle=0},380),this.sound.playLockerDoor(!0),this.player.enterCloset(t.def),this.hud.setHiding(!0,t.def.kind),this.rabbit.notifyPlayerEnteredCloset(t.def);break}case"exit-closet":{const t=this.player.exitCloset();if(t){const e=this.station.closets.find(n=>n.def.id===t.id);e&&(e.targetAngle=-1.25,window.setTimeout(()=>{e.targetAngle=0},420))}this.sound.playLockerDoor(!1),this.hud.setHiding(!1);break}case"note":{const t=this.currentTarget.item;t.read||(t.read=!0,this.notesReadCount++),this.sound.playPaperRustle(),this.screen="NOTE",this.player.setActive(!1),this.hud.openNote(t.def);break}case"coin":{const t=this.currentTarget.item;t.collected=!0,t.mesh.visible=!1,this.player.coins++,this.sound.playCoinClink(.42,0);const e=this.player.touch.enabled?"右下の「硬貨」ボタンで投げて陽動できる。":"[G] または右クリックで投げて陽動できる。";this.hud.showSubtitle(`¥100硬貨を拾った。${e}`,3.4);break}case"exit-gate":{this.chargesCompleted>=this.station.terminals.length?(this.exitGateUnlocked=!0,this.collision.setExitGateUnlocked(!0),this.station.unlockExitShutter(),this.player.addCameraShake(.38),this.sound.playGateUnlockAndShutter(),this.hud.showSubtitle("東改札・非常シャッター解錠！！ 階段を駆け上がって新宿東口へ脱出しろ！！",5.2),this.rabbit.hearSound(_r.x,_r.z,"high")):(this.sound.playGateError(),this.hud.showSubtitle(`残高不足だ……新宿駅構内であと ${this.station.terminals.length-this.chargesCompleted} 箇所チャージしないと。`,3.6));break}}}completeTerminalCharge(t){t.charged=!0,t.progress=1,this.activeChargingTerminal=null,this.chargesCompleted++,this.station.updateTerminalVisual(t),this.hud.setChargeProgress(0),this.hud.updateChargeCount(this.chargesCompleted,this.station.terminals.length),this.sound.playChargeComplete(),this.rabbit.hearSound(t.def.x,t.def.z,"high"),this.station.setSignageCorruptionStage(Math.min(4,this.chargesCompleted)),this.chargesCompleted===1?this.hud.showSubtitle("チャージ完了（1/5）！ 電子音が響いた……足音がこちらへ向かってくる！",4.5):this.chargesCompleted===2?(this.blackoutTimer=.6,this.glitchPulse=.78,this.player.addCameraShake(.4),this.sound.playBlackoutThunk(),this.sound.playDistortedPAChime(),this.hud.showSubtitle("チャージ完了（2/5）！ 新宿駅の構内放送が歪んだ……サイネージ柱の映像が変わっている！",5)):this.chargesCompleted===3?(this.glitchPulse=.62,this.hud.showSubtitle("チャージ完了（3/5）！ 発車標の文字が乱れている……あいつ、さらに速くなっている！",4.4)):this.chargesCompleted===4?(this.blackoutTimer=.78,this.glitchPulse=.9,this.player.addCameraShake(.48),this.sound.playBlackoutThunk(),this.sound.playDistortedPAChime(),this.hud.showSubtitle("チャージ完了（4/5）！ サイネージ柱が真っ赤に……あと1箇所、背後に気をつけろ！",4.8)):this.chargesCompleted>=this.station.terminals.length&&(this.station.setExitReady(!0),this.glitchPulse=.95,this.sound.playDistortedPAChime(),this.hud.showSubtitle("残高 ¥1,000 到達！！ 東改札の緑ランプが点灯した！ 全速力で東改札へ向かえ！！",6.5))}handleCoinLand(t,e){this.rabbit.hearSound(t,e,"high"),this.hud.showSubtitle("硬貨の音が響いた……紫のうさぎが音のほうへ引き寄せられている！",2.8)}startJumpscare(){this.screen="JUMPSCARE",this.jumpscareTimer=0,this.glitchPulse=1,this.impactFlash=.9,this.player.setActive(!1),this.player.flashlightOn=!1,this.player.hideFlashlight(),this.camera.position.set(this.player.position.x,1.48,this.player.position.z),this.hud.setScreen("JUMPSCARE"),this.hud.setFearLevel(1,!0),this.rabbit.triggerJumpscarePose(this.camera.position,this.player.yaw),this.sound.playJumpscare()}updateJumpscare(t){this.jumpscareTimer+=t,this.rabbit.update(t,this.totalElapsed,this.chargesCompleted,{x:this.player.position.x,z:this.player.position.z,yaw:this.player.yaw,flashlightOn:!1,crouching:!1,sprinting:!1,hiddenCloset:null,holdingBreath:!1},this.collision,this.sound);const e=(1-Math.min(1,this.jumpscareTimer/1.48))*.13,n=this.rabbit.root.position.x,i=this.rabbit.root.position.z,s=Math.sin(this.rabbit.root.rotation.y),o=Math.cos(this.rabbit.root.rotation.y);this.camera.position.set(n+s*1.02+(Math.random()-.5)*e*.4,1.42+(Math.random()-.5)*e,i+o*1.02+(Math.random()-.5)*e*.4),this.camera.lookAt(n+(Math.random()-.5)*e,1.38+(Math.random()-.5)*e,i),this.camera.rotation.z+=Math.sin(this.totalElapsed*42)*.2,this.jumpscareTimer>=1.48&&(this.screen="GAMEOVER",this.hud.showEndStats(!1,{elapsedSec:this.runElapsed,charges:this.chargesCompleted,notesRead:this.notesReadCount,totalNotes:Sa.length,coinsTossed:this.player.coinsTossed,chasesSurvived:this.chasesSurvived,difficulty:this.difficulty}))}triggerVictory(){this.screen="VICTORY",this.player.setActive(!1),this.currentFear=0,this.currentChase=0,this.glitchPulse=0,this.sound.updateContinuous(0,0,!1,!1),this.sound.playVictoryChord(),this.hud.showEndStats(!0,{elapsedSec:this.runElapsed,charges:this.chargesCompleted,notesRead:this.notesReadCount,totalNotes:Sa.length,coinsTossed:this.player.coinsTossed,chasesSurvived:this.chasesSurvived,difficulty:this.difficulty})}dispose(){cancelAnimationFrame(this.rafId),this.postFX.dispose(),this.renderer.dispose()}}const bh=document.getElementById("game-canvas");if(!bh)throw new Error("Missing #game-canvas element");new A_(bh);
