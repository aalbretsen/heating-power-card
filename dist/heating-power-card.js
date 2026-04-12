function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,_=g.trustedTypes,f=_?_.emptyScript:"",m=g.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,S=w.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,M=`<${P}>`,U=document,O=()=>U.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,G=U.createTreeWalker(U,129);function X(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(o.lastIndex=l,c=o.exec(i),null!==c);)l=o.lastIndex,o===N?"!--"===c[1]?o=L:void 0!==c[1]?o=z:void 0!==c[2]?(B.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=D):void 0!==c[3]&&(o=D):o===D?">"===c[0]?(o=r??N,h=-1):void 0===c[1]?h=-2:(h=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?D:'"'===c[3]?I:j):o===I||o===j?o=D:o===L||o===z?o=N:(o=D,r=void 0);const d=o===D&&t[e+1].startsWith("/>")?" ":"";n+=o===N?i+M:h>=0?(s.push(a),i.slice(0,h)+C+i.slice(h)+k+d):i+k+(-2===h?e:d)}return[X(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,h]=Z(t,e);if(this.el=J.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=h[n++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),a.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=R(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=K(t,r._$AS(t,e.values),r,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);G.currentNode=s;let r=G.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=G.nextNode(),n++)}return G.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),R(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=K(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=K(this,s[i+o],e,o),a===W&&(a=this._$AH[o]),n||=!R(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(J,Y),(w.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Y(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},dt=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt={icon_active:"mdi:fire",icon_inactive:"mdi:fire-off",color_active:"var(--state-climate-heat-color)",color_inactive:"var(--disabled-text-color)",show_badge:!0,badge_text_color:"var(--primary-text-color)",badge_position:"left",max_power:15e3,gauge_mode:"gradient",gauge_gradient_from:"#FFB74D",gauge_gradient_to:"#E65100",show_scale:!0,scale_ticks:5,show_dots:!0};let _t=class extends at{setConfig(t){this._config=t}_dispatch(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}get _appearanceSchema(){return[{type:"grid",schema:[{name:"icon_active",label:"Icon — heating on",selector:{icon:{}}},{name:"icon_inactive",label:"Icon — heating off",selector:{icon:{}}},{name:"color_active",label:"Colour — active (CSS hex)",selector:{text:{}}},{name:"color_inactive",label:"Colour — inactive (CSS hex)",selector:{text:{}}}]}]}get _badgeSchema(){return[{name:"show_badge",label:"Show source count badge",selector:{boolean:{}}},{name:"badge_position",label:"Badge position",selector:{select:{options:[{value:"left",label:"Left of gauge"},{value:"right",label:"Right of gauge"}]}}},{name:"badge_background_color",label:"Badge background (CSS hex, default = active colour)",selector:{text:{}}},{name:"badge_text_color",label:"Badge text colour (CSS)",selector:{text:{}}}]}get _gaugeSchema(){return[{name:"max_power",label:"Max power (W)",selector:{number:{min:1,step:100,mode:"box"}}},{name:"gauge_mode",label:"Gauge style",selector:{select:{options:[{value:"gradient",label:"Gradient"},{value:"solid",label:"Solid colour"}]}}},..."gradient"===(this._config.gauge_mode??gt.gauge_mode)?[{name:"gauge_gradient_from",label:"Gradient start colour (CSS hex)",selector:{text:{}}},{name:"gauge_gradient_to",label:"Gradient end colour (CSS hex)",selector:{text:{}}}]:[],{name:"show_scale",label:"Show scale ticks",selector:{boolean:{}}},{name:"scale_ticks",label:"Number of ticks",selector:{number:{min:2,max:20,step:1,mode:"box"}}}]}get _dotsSchema(){return[{name:"show_dots",label:"Show active-source dots",selector:{boolean:{}}},{name:"dot_color",label:"Dot colour (CSS, default = theme white)",selector:{text:{}}}]}_formChanged(t){t.stopPropagation(),this._dispatch({...this._config,...t.detail.value})}_addEntity(){this._dispatch({...this._config,entities:[...this._config.entities,{entity:""}]})}_removeEntity(t){this._dispatch({...this._config,entities:this._config.entities.filter((e,i)=>i!==t)})}_entityChanged(t,e,i){const s=this._config.entities.map((s,r)=>{if(r!==t)return s;if("factor"===e||"subtract"===e){const t=parseFloat(i),r={...s};return""!==i&&isFinite(t)?r[e]=t:delete r[e],r}return{...s,[e]:i}});this._dispatch({...this._config,entities:s})}_entityPickerChanged(t,e){e.stopPropagation(),this._entityChanged(t,"entity",e.detail.value??"")}_renderEntityRow(t,e){return F`
      <div class="entity-card">
        <div class="entity-header">
          <span class="entity-index">${e+1}</span>
          <ha-entity-picker
            class="entity-picker"
            .hass=${this.hass}
            .value=${t.entity}
            .includeDomains=${["sensor"]}
            allow-custom-entity
            @value-changed=${t=>this._entityPickerChanged(e,t)}
          ></ha-entity-picker>
          <ha-icon-button
            .label=${"Remove"}
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${()=>this._removeEntity(e)}
          ></ha-icon-button>
        </div>
        <div class="entity-fields">
          <ha-textfield
            label="Factor"
            type="number"
            min="0"
            step="0.01"
            .value=${void 0!==t.factor?String(t.factor):""}
            placeholder="1"
            @change=${t=>this._entityChanged(e,"factor",t.target.value)}
          ></ha-textfield>
          <ha-textfield
            label="Subtract (W)"
            type="number"
            min="0"
            step="1"
            .value=${void 0!==t.subtract?String(t.subtract):""}
            placeholder="0"
            @change=${t=>this._entityChanged(e,"subtract",t.target.value)}
          ></ha-textfield>
        </div>
      </div>
    `}render(){return this._config?F`
      <div class="editor">
        <div class="section-title">Heating sources</div>
        ${this._config.entities.map((t,e)=>this._renderEntityRow(t,e))}
        <ha-button outlined @click=${this._addEntity}>Add entity</ha-button>

        <div class="section-title">Icon &amp; colours</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._appearanceSchema} @value-changed=${this._formChanged}></ha-form>

        <div class="section-title">Badge</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._badgeSchema} @value-changed=${this._formChanged}></ha-form>

        <div class="section-title">Gauge</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._gaugeSchema} @value-changed=${this._formChanged}></ha-form>

        <div class="section-title">Dots</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._dotsSchema} @value-changed=${this._formChanged}></ha-form>
      </div>
    `:q}static get styles(){return o`
      .editor {
        padding: 4px 0 8px;
      }

      .section-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin: 20px 0 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid var(--divider-color);
      }

      .entity-card {
        background: var(--secondary-background-color);
        border-radius: 8px;
        padding: 10px 12px;
        margin-bottom: 8px;
      }

      .entity-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .entity-index {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-text-color);
        min-width: 16px;
        flex-shrink: 0;
      }

      .entity-picker {
        flex: 1;
        min-width: 0;
      }

      .entity-fields {
        display: grid;
        grid-template-columns: 1fr 80px 100px;
        gap: 8px;
      }

      ha-textfield {
        display: block;
        width: 100%;
      }

      ha-button {
        display: block;
        margin-top: 4px;
      }
    `}};function ft(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t.trim());return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[128,128,128]}t([pt({attribute:!1})],_t.prototype,"hass",void 0),t([ut()],_t.prototype,"_config",void 0),_t=t([ht("heating-power-card-editor")],_t);let mt=class extends at{setConfig(t){if(!Array.isArray(t?.entities)||0===t.entities.length)throw new Error("heating-power-card: at least one entity is required.");if(t.entities.length>99)throw new Error("heating-power-card: maximum 99 entities supported.");for(const e of t.entities)if(!e.entity)throw new Error("heating-power-card: each entity entry must have an 'entity' field.");this._config=t}static getConfigElement(){return document.createElement("heating-power-card-editor")}getCardSize(){return 1}getGridOptions(){return{rows:1,min_rows:1,max_rows:1,columns:12,min_columns:4}}static getStubConfig(){return{entities:[{entity:"sensor.heating_cable_power"},{entity:"sensor.floor_heater_power"},{entity:"sensor.panel_heater_power"}],max_power:15e3,gauge_mode:"gradient",show_scale:!0,show_dots:!0}}get _c(){return{...gt,...this._config}}_renderIcon(t){const e=t>0;return F`<ha-icon .icon=${e?this._c.icon_active:this._c.icon_inactive} style="color: ${e?this._c.color_active:this._c.color_inactive};"></ha-icon>`}_renderValue(t){return F`<span class="hpc-value" style="color: ${t>0?this._c.color_active:this._c.color_inactive};"> ${e=t,(e/1e3).toFixed(e<100?2:e<1e4?1:0)}<span class="hpc-unit"> kW</span> </span>`;var e}_renderBadge(t){if(!this._c.show_badge||0===t)return F``;const e=this._config.badge_background_color??this._c.color_active;return F`<span class="hpc-badge" style="background:${e};color:${this._c.badge_text_color};">${t}</span>`}_renderGauge(t){const e=this._c.max_power,i=Math.min(100,t/e*100),s="gradient"===this._c.gauge_mode?F`<div
            class="hpc-fill"
            style="width:${i.toFixed(4)}%;background:linear-gradient(to right,${this._c.gauge_gradient_from},${function(t,e,i){const s=Math.max(0,Math.min(1,i)),[r,n,o]=ft(t),[a,c,h]=ft(e),l=(t,e)=>Math.round(t+(e-t)*s).toString(16).padStart(2,"0");return`#${l(r,a)}${l(n,c)}${l(o,h)}`}(this._c.gauge_gradient_from,this._c.gauge_gradient_to,t/e)});"
          ></div>`:F`<div class="hpc-fill" style="width:${i.toFixed(4)}%;background:${this._c.color_active};"></div>`;return F`
      <div class="hpc-gauge-wrapper">
        <div class="hpc-track">${s}</div>
        ${this._c.show_scale?this._renderScale(e):q}
      </div>
    `}_renderScale(t){const e=function(t,e){if(t<=0||e<=0)return t;const i=t/e,s=Math.pow(10,Math.floor(Math.log10(i))),r=i/s;return(r<1.5?1:r<3.5?2:r<7.5?5:10)*s}(t,this._c.scale_ticks),i=[];for(let s=0;s<=t+1e-9;s+=e)i.push(Math.round(s));return i[i.length-1]<t&&i.push(t),F`
      <div class="hpc-scale">
        ${i.map((e,s)=>{const r=e/t*100,n=e>=1e3?`${e%1e3==0?e/1e3:(e/1e3).toFixed(1)}k`:`${e}`,o=0===s?"start":s===i.length-1?"end":"mid";return F`<span class="hpc-tick hpc-tick--${o}" style="left:${r.toFixed(2)}%;">${n}</span>`})}
      </div>
    `}_renderDots(t){const e=t.filter(t=>t>0);if(0===e.length)return F``;const i=this._config.dot_color??"var(--primary-text-color)";return F` <div class="hpc-dots">${e.map(()=>F`<div class="hpc-dot" style="background:${i};"></div>`)}</div> `}render(){if(!this.hass||!this._config)return q;const t=this._config.entities.map(t=>function(t,e){const i=t.states[e.entity];if(!i)return 0;if("unavailable"===i.state||"unknown"===i.state||"none"===i.state)return 0;const s=parseFloat(i.state);if(!isFinite(s)||s<0)return 0;const r=s*function(t){switch(t?.trim().toLowerCase()){case"kw":return 1e3;case"mw":return 1e6;case"gw":return 1e9;default:return 1}}(i.attributes.unit_of_measurement)*(e.factor??1)-(e.subtract??0);return r<1?0:r}(this.hass,t)),e=t.reduce((t,e)=>t+e,0),i=t.filter(t=>t>0).length,s=this._renderBadge(i),r="left"===this._c.badge_position;return F`
      <ha-card>
        <div class="hpc-container">
          ${this._renderIcon(e)} ${this._renderValue(e)} ${r?s:q} ${this._renderGauge(e)} ${r?q:s}
          ${this._c.show_dots?this._renderDots(t):q}
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
        gap: 12px;
        padding: 0 18px;
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
        min-width: 22px;
        height: 22px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        padding: 0 6px;
        flex-shrink: 0;
        line-height: 1;
        box-sizing: border-box;
      }

      .hpc-gauge-wrapper {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 6px;
      }

      .hpc-track {
        height: 18px;
        border-radius: 6px;
        background: var(--secondary-background-color, #e0e0e0);
        overflow: hidden;
        display: flex;
        flex-shrink: 0;
      }

      .hpc-fill {
        height: 100%;
        border-radius: 6px 0 0 6px;
        flex-shrink: 0;
        transition: width 0.5s ease;
      }

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

      .hpc-tick--mid {
        transform: translateX(-50%);
      }
      .hpc-tick--start {
        transform: translateX(0);
      }
      .hpc-tick--end {
        transform: translateX(-100%);
      }

      .hpc-dots {
        display: grid;
        grid-template-rows: repeat(3, 6px);
        grid-auto-flow: column;
        grid-auto-columns: 6px;
        gap: 2px;
        flex-shrink: 0;
        align-content: center;
        align-self: center;
      }

      .hpc-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        transition: background 0.25s ease;
      }
    `}};t([pt({attribute:!1})],mt.prototype,"hass",void 0),t([ut()],mt.prototype,"_config",void 0),mt=t([ht("heating-power-card")],mt),window.customCards??(window.customCards=[]),window.customCards.push({type:"heating-power-card",name:"Heating Power Card",description:"Compact card showing accumulated heating power from multiple sources.",preview:!0,documentationURL:"https://github.com/aalbretsen/heating-power-card"});
