function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,$=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!h(t,e),A={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??v)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,b=t=>t,E=x.trustedTypes,C=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,M=`<${k}>`,U=document,O=()=>U.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,D=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,G=U.createTreeWalker(U,129);function X(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<s;e++){const s=t[e];let a,h,c=-1,l=0;for(;l<s.length&&(o.lastIndex=l,h=o.exec(s),null!==h);)l=o.lastIndex,o===N?"!--"===h[1]?o=F:void 0!==h[1]?o=D:void 0!==h[2]?(I.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=z):void 0!==h[3]&&(o=z):o===z?">"===h[0]?(o=r??N,c=-1):void 0===h[1]?c=-2:(c=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?z:'"'===h[3]?B:j):o===B||o===j?o=z:o===F||o===D?o=N:(o=z,r=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";n+=o===N?s+M:c>=0?(i.push(a),s.slice(0,c)+S+s.slice(c)+P+d):s+P+(-2===c?e:d)}return[X(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[h,c]=J(t,e);if(this.el=K.createElement(h,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[n++],s=i.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),G.nextNode(),a.push({type:2,index:++r});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===q)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=R(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);G.currentNode=i;let r=G.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=G.nextNode(),n++)}return G.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),R(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(X(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Y(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=b(t).nextSibling;b(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Z(this,i[s+o],e,o),a===q&&(a=this._$AH[o]),n||=!R(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends tt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===q)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(K,Y),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Y(e.insertBefore(O(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ht=ot.litElementPolyfillSupport;ht?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},lt=(t=ct,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function dt(t){return(e,s)=>"object"==typeof s?lt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}const pt={icon_active:"mdi:fire",icon_inactive:"mdi:fire-off",color_active:"#F57C00",color_inactive:"#9E9E9E",badge_text_color:"#FFFFFF",max_power:15e3,gauge_mode:"solid",gauge_gradient_from:"#1565C0",gauge_gradient_to:"#D32F2F",show_scale:!0,scale_ticks:5,show_dots:!0,dot_mode:"gradient",dot_off_color:"#E0E0E0",dot_use_source_colors:!1},ut=["#1565C0","#F57C00","#D32F2F","#388E3C","#7B1FA2","#00838F","#F9A825","#558B2F","#AD1457","#0277BD","#6A1B9A","#2E7D32","#BF360C","#00695C","#4527A0","#283593"],_t=[{maxCount:20,containerPx:14,maxR:6,minR:2},{maxCount:40,containerPx:11,maxR:4.5,minR:1.5},{maxCount:99,containerPx:9,maxR:3.5,minR:1}];function ft(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t.trim());return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[128,128,128]}function $t(t,e,s){const i=Math.max(0,Math.min(1,s)),[r,n,o]=ft(t),[a,h,c]=ft(e),l=(t,e)=>Math.round(t+(e-t)*i).toString(16).padStart(2,"0");return`#${l(r,a)}${l(n,h)}${l(o,c)}`}let gt=class extends at{setConfig(t){if(!Array.isArray(t?.entities)||0===t.entities.length)throw new Error("heating-power-card: at least one entity is required.");if(t.entities.length>99)throw new Error("heating-power-card: maximum 99 entities supported.");for(const e of t.entities)if(!e.entity)throw new Error("heating-power-card: each entity entry must have an 'entity' field.");this._config=t}getCardSize(){return 1}getGridOptions(){return{rows:1,min_rows:1,max_rows:1,columns:12,min_columns:4}}static getStubConfig(){return{entities:[{entity:"sensor.heating_cable_power",color:"#1565C0"},{entity:"sensor.floor_heater_power",color:"#F57C00"},{entity:"sensor.panel_heater_power",color:"#D32F2F"}],max_power:15e3,gauge_mode:"stacked",show_scale:!0,show_dots:!0,dot_mode:"gradient",dot_use_source_colors:!0}}get _c(){return{...pt,...this._config}}_srcColor(t){return this._config.entities[t]?.color??ut[t%ut.length]}_activeColor(){return this._c.color_active}_inactiveColor(){return this._c.color_inactive}_renderIcon(t){const e=t>0;return L`
      <ha-icon
        .icon=${e?this._c.icon_active:this._c.icon_inactive}
        style="color: ${e?this._activeColor():this._inactiveColor()};"
      ></ha-icon>
    `}_renderValue(t){return L`
      <span class="hpc-value" style="color: ${t>0?this._activeColor():this._inactiveColor()};">
        ${e=t,(e/1e3).toFixed(e<100?2:e<1e4?1:0)}<span class="hpc-unit"> kW</span>
      </span>
    `;var e}_renderBadge(t){return 0===t?L``:L`
      <span class="hpc-badge"
        style="background:${this._activeColor()};color:${this._c.badge_text_color};">
        ${t}
      </span>
    `}_renderGauge(t,e){const s=this._c.max_power,i=this._c.gauge_mode;let r;if("stacked"===i){const i=e>s?s/e:1;r=L`
        ${t.map((t,e)=>{const r=t*i/s*100;return r>.005?L`<div class="hpc-segment"
                style="width:${r.toFixed(4)}%;background:${this._srcColor(e)};"></div>`:V})}
      `}else if("gradient"===i){const t=Math.min(100,e/s*100),i=this._c.gauge_gradient_from,n=$t(i,this._c.gauge_gradient_to,e/s);r=L`
        <div class="hpc-fill"
          style="width:${t.toFixed(4)}%;background:linear-gradient(to right,${i},${n});"></div>
      `}else{const t=Math.min(100,e/s*100),i=this._config.gauge_color??this._activeColor();r=L`<div class="hpc-fill" style="width:${t.toFixed(4)}%;background:${i};"></div>`}return L`
      <div class="hpc-gauge-wrapper">
        <div class="hpc-track">${r}</div>
        ${this._c.show_scale?this._renderScale(s):V}
      </div>
    `}_renderScale(t){const e=function(t,e){if(t<=0||e<=0)return t;const s=t/e,i=Math.pow(10,Math.floor(Math.log10(s))),r=s/i;return(r<1.5?1:r<3.5?2:r<7.5?5:10)*i}(t,this._c.scale_ticks),s=[];for(let i=0;i<=t+1e-9;i+=e)s.push(Math.round(i));return s[s.length-1]<t&&s.push(t),L`
      <div class="hpc-scale">
        ${s.map((e,i)=>{const r=e/t*100,n=e>=1e3?`${e%1e3==0?e/1e3:(e/1e3).toFixed(1)}k`:`${e}`,o=0===i?"start":i===s.length-1?"end":"mid";return L`
            <span class="hpc-tick hpc-tick--${o}" style="left:${r.toFixed(2)}%;">${n}</span>
          `})}
      </div>
    `}_renderDots(t){const e=this._c.max_power,s=t.length,i=s>0?e/s:e,r=this._c.dot_mode,n=this._c.dot_off_color,o=this._config.dot_on_color??this._activeColor(),a=this._c.dot_use_source_colors,{containerPx:h,maxR:c,minR:l}=(d=s,_t.find(t=>d<=t.maxCount)??_t[_t.length-1]);var d;const p=h/2;return L`
      <div class="hpc-dots">
        ${t.map((t,e)=>{const s=i>0?Math.min(1,t/i):0,d=this._srcColor(e);let u,_;switch(r){case"growth":u=t>0?a?d:o:n,_=t>0?l+(c-l)*s:l;break;case"steady":u=t>0?a?d:o:n,_=c;break;default:_=c,u=$t(n,a?d:o,s)}return L`
            <svg width="${h}" height="${h}"
                 viewBox="0 0 ${h} ${h}"
                 class="hpc-dot">
              <circle cx="${p}" cy="${p}" r="${_.toFixed(2)}" fill="${u}" />
            </svg>
          `})}
      </div>
    `}render(){if(!this.hass||!this._config)return V;const t=this._config.entities.map(t=>function(t,e){const s=t.states[e.entity];if(!s)return 0;if("unavailable"===s.state||"unknown"===s.state||"none"===s.state)return 0;const i=parseFloat(s.state);return!isFinite(i)||i<0?0:i*function(t){switch(t?.trim().toLowerCase()){case"kw":return 1e3;case"mw":return 1e6;case"gw":return 1e9;default:return 1}}(s.attributes.unit_of_measurement)*(e.factor??1)}(this.hass,t)),e=t.reduce((t,e)=>t+e,0),s=t.filter(t=>t>0).length;return L`
      <ha-card>
        <div class="hpc-container">
          ${this._renderIcon(e)}
          ${this._renderValue(e)}
          ${this._renderBadge(s)}
          ${this._renderGauge(t,e)}
          ${this._c.show_dots?this._renderDots(t):V}
        </div>
      </ha-card>
    `}static get styles(){return o`
      :host {
        display: block;
      }

      ha-card {
        display: flex;
        align-items: stretch;
        height: 100%;
        box-sizing: border-box;
      }

      .hpc-container {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 14px;
        flex: 1;
        min-width: 0;
        height: 56px;
        box-sizing: border-box;
      }

      ha-icon {
        --mdc-icon-size: 28px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }

      .hpc-value {
        font-size: 18px;
        font-weight: 500;
        line-height: 1;
        white-space: nowrap;
        flex-shrink: 0;
        letter-spacing: -0.02em;
      }

      .hpc-unit {
        font-size: 12px;
        font-weight: 400;
        opacity: 0.75;
      }

      .hpc-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 600;
        padding: 0 5px;
        flex-shrink: 0;
        line-height: 1;
        box-sizing: border-box;
      }

      /* ── Gauge ── */

      .hpc-gauge-wrapper {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
      }

      .hpc-track {
        height: 10px;
        border-radius: 5px;
        background: var(--secondary-background-color, #e0e0e0);
        overflow: hidden;
        display: flex;
        flex-shrink: 0;
      }

      /* Solid and gradient fills */
      .hpc-fill {
        height: 100%;
        border-radius: 5px 0 0 5px;
        flex-shrink: 0;
        transition: width 0.5s ease;
      }

      /* Stacked mode segments */
      .hpc-segment {
        height: 100%;
        flex-shrink: 0;
        transition: width 0.5s ease;
      }

      /* ── Scale ── */

      .hpc-scale {
        position: relative;
        height: 13px;
        font-size: 9px;
        color: var(--secondary-text-color, #888888);
        flex-shrink: 0;
        user-select: none;
      }

      .hpc-tick {
        position: absolute;
        top: 0;
        line-height: 1;
        white-space: nowrap;
      }
      .hpc-tick--mid   { transform: translateX(-50%); }
      .hpc-tick--start { transform: translateX(0); }
      .hpc-tick--end   { transform: translateX(-100%); }

      /* ── Dots ── */

      .hpc-dots {
        display: flex;
        align-items: center;
        gap: 2px;
        flex-shrink: 0;
      }

      .hpc-dot {
        display: block;
        flex-shrink: 0;
      }

      .hpc-dot circle {
        transition: r 0.45s ease, fill 0.45s ease;
      }
    `}};t([dt({attribute:!1})],gt.prototype,"hass",void 0),t([function(t){return dt({...t,state:!0,attribute:!1})}()],gt.prototype,"_config",void 0),gt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("heating-power-card")],gt),window.customCards=window.customCards||[],window.customCards.push({type:"heating-power-card",name:"Heating Power Card",description:"Compact 1-row card showing accumulated heating power from multiple sources.",preview:!0,documentationURL:"https://github.com/aalbretsen/heating-power-card"});export{gt as HeatingPowerCard};
