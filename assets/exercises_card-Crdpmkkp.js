import{n as v}from"./vendor-Bv82aGDC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const C="favourites_exercises",p=()=>{try{return JSON.parse(localStorage.getItem(C))||[]}catch(e){return console.error(e),[]}},F=e=>{localStorage.setItem(C,JSON.stringify(e))},Y=e=>{const t=p();t.some(s=>s._id===e._id)||(t.push(e),F(t))},M=e=>{const t=p().filter(s=>s._id!==e);F(t)},q="todays_quote",x="quote_time",G=24*60*60*1e3;let c=null,u=null;async function z(){if(c)return c;if(u)return u;const e=localStorage.getItem(q),t=localStorage.getItem(x);return e&&t&&Date.now()-Number(t)<G?(c=JSON.parse(e),c):(u=fetch("https://your-energy.b.goit.study/api/quote").then(s=>s.json()).then(s=>(c=s,localStorage.setItem(q,JSON.stringify(s)),localStorage.setItem(x,Date.now().toString()),s)).catch(s=>(console.error("Error fetching quote:",s),e?(c=JSON.parse(e),c):{quote:"No quote available",author:""})).finally(()=>{u=null}),u)}const V=(e,t)=>`
  <svg width="32" height="32" class="quote-text-icon">
    <use href="/home-task/icons.svg#icon-run"></use>
  </svg>
  <div>
    <h3 class="main-quote-title">Quote of the day</h3>
    <p class="main-quote-text">${e}</p>
    <p class="main-quote-author">${t}</p>
    <svg width="24" height="24" class="quote-text-icon-commas">
      <use href="/home-task/icons.svg#icon-commas"></use>
    </svg>
  </div>
`,X=async e=>{const{quote:t,author:s}=await z();e.innerHTML=V(t,s)},Z=document.querySelector(".header-nav-link-favorites"),ee=document.querySelector(".header-nav-link-main"),T=window.PAGE;T==="favorites"&&Z.classList.add("active");T==="main"&&ee.classList.add("active");const te=document.querySelector(".open-mobile-menu-btn"),se=document.querySelector(".close-mobile-menu-btn"),k=document.querySelector(".mobile-menu-wrapper"),re=document.querySelector(".mobile-menu");te.addEventListener("click",()=>{k.classList.add("is-open"),document.body.classList.add("not-scrollable")});se.addEventListener("click",()=>{I()});k.addEventListener("click",()=>{I()});re.addEventListener("click",e=>{e.stopPropagation()});function I(){k.classList.remove("is-open"),document.body.classList.remove("not-scrollable")}const i={cardSet:document.querySelector(".fav_card_list"),noCards:document.querySelector(".no_cards_wrapper"),quoteContainer:document.querySelector(".quote"),noCardsContainer:document.querySelector(".no_cards_wrapper-container"),paginationCards:document.querySelector(".pagination-cards")};let l=1;const L=8,ne=(e,t)=>{const s=(t-1)*L,o=s+L;return e.slice(s,o)},oe=(e=[])=>{const t=new Set;return e.filter(s=>!(s!=null&&s._id)||t.has(s._id)?!1:(t.add(s._id),!0))},_=e=>{const t=e.map(({name:s,_id:o,burnedCalories:r,bodyPart:n,target:d,time:U=3})=>{let K=`${r} / ${U} min`;return`
        <li class="exercise-information" data-id-card="${o}" data-component="fav_card">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <button
                name="trash"
                data-id-del-btn="${o}"
                data-action="delete_fav_card"
                class="trash-btn">
                <svg class="trash-icon" width="16" height="16">
                  <use href="/coursework/symbol-defs.svg#icon-trash"></use>
                </svg>
              </button>
            </div>

            <div class="actions">
              <button
                name="start"
                data-id-start-btn="${o}"
                data-action="start_exercise_btn"
                class="details-link">
                Start
                <svg class="arrow-icon" width="16" height="16">
                  <use href="/coursework/symbol-defs.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="exercise-header">
            <svg class="icon-man" width="24" height="24">
              <use href="/coursework/symbol-defs.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${s}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${K}</li>
            <li><span>Body part:</span> ${n}</li>
            <li><span>Target:</span> ${d}</li>
          </ul>
        </li>
      `}).join("");i.cardSet.innerHTML=t},ie=e=>{const t=e.target.closest('[data-action="start_exercise_btn"]'),s=e.target.closest('[data-action="delete_fav_card"]');if(!(!t&&!s)){if(s){M(s.dataset.idDelBtn),g();return}if(t){const r=(p()||[]).find(n=>n._id===t.dataset.idStartBtn);r&&W(r,!0,!0)}}};i.cardSet&&i.cardSet.addEventListener("click",ie);function ae(e){if(i.paginationCards){if(e<=1){i.paginationCards.innerHTML="";return}i.paginationCards.innerHTML=Array.from({length:e},(t,s)=>`
      <li>
        <button
          name="pagination"
          class="pagination-btn ${l===s+1?"active":""}"
          data-page="${s+1}">
          ${s+1}
        </button>
      </li>
    `).join("")}}i.paginationCards&&i.paginationCards.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");t&&(l=Number(t.dataset.page),g())});const g=()=>{if(!document.querySelector(".favourite_exercises"))return;const e=p()||[],t=oe(e);if(!t.length){i.noCards.classList.remove("visually-hidden"),i.noCardsContainer.classList.remove("visually-hidden"),i.cardSet.classList.add("visually-hidden"),i.paginationCards.innerHTML="";return}if(i.noCards.classList.add("visually-hidden"),i.noCardsContainer.classList.add("visually-hidden"),i.cardSet.classList.remove("visually-hidden"),window.innerWidth<1440){const s=Math.ceil(t.length/L);l>s&&(l=s),_(ne(t,l)),ae(s)}else _(t),i.paginationCards.innerHTML=""};window.addEventListener("resize",()=>{l=1,g()});g();X(i.quoteContainer);let b=1,ce=window.innerWidth<768?9:12,le=window.innerWidth<768?8:10,N="Muscles",$="",P="",A="",B="",de=[];function be(e){N=e}function we(e){b=e}function Se(e){A=e}function Le(e){B=e}function Ee(e){P=e}async function ke(e=!0){e&&(b=1);let t=`https://your-energy.b.goit.study/api/filters?filter=${N}&page=${b}&limit=${ce}`;$.trim()&&(t+=`&name=${$}`);const s=await fetch(t);if(!s.ok)throw new Error("Failed to fetch filters");return await s.json()}async function qe(e=!0){e&&(de.length=0);let t=A.toLowerCase();t==="body parts"&&(t="bodypart");const s=`
    https://your-energy.b.goit.study/api/exercises?
    ${t}=${B}
    &keyword=${P}
    &page=${b}
    &limit=${le}
  `.replace(/\s+/g,""),o=await fetch(s);if(!o.ok)throw new Error("Failed to fetch exercises");return await o.json()}async function xe(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}async function ue(e,{email:t,rate:s,comment:o}){s=Number(s);const r=await fetch(`https://your-energy.b.goit.study/api/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:o})});if(!r.ok){const n=await r.json();throw new Error(n.message||"Rating failed")}return r.json()}const fe=document.getElementById("form-close-btn"),w=document.querySelector(".backdrop"),O=document.querySelector("#user-email"),H=document.getElementById("user-comment");document.querySelector(".form-send-btn");const me=document.querySelector(".rating-wrapper"),R=document.querySelector(".rating-star-value"),pe=document.querySelector(".backdrop-form");let Q=null,E=null;const a={rate:0,email:"",comment:""};function ge(){O.value="",H.value="",a.rate=0,a.comment="",a.email="",R.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(t=>{t.style.fill="var(--white-20)"})}function D(e){e.key==="Escape"&&S(!0)}function S(e=!1){w.classList.remove("is-open"),document.removeEventListener("keydown",D),e&&E&&W(E)}fe.addEventListener("click",()=>S(!0));w.addEventListener("click",e=>{e.target===w&&S(!0)});me.addEventListener("click",e=>{if(!e.target.dataset.id)return;a.rate=Number(e.target.dataset.id),R.textContent=`${a.rate}.0`;const t=document.querySelectorAll(".rating-star-icons");for(let s=0;s<5;s++)t[s].style.fill=s<a.rate?"var(--orange-color)":"var(--white-20)"});function ve(e,t=null){Q=e,E=t,w.classList.add("is-open"),document.addEventListener("keydown",D)}pe.addEventListener("submit",async e=>{if(e.preventDefault(),a.email=O.value.trim(),a.comment=H.value.trim()||void 0,!a.rate){v.Notify.failure("Please select a rating");return}if(!a.email){v.Notify.failure("Please enter your email");return}try{await ue(Q,a),v.Notify.success("Your rating has been saved!"),ge(),S()}catch(t){v.Notify.failure(t.message||"Something went wrong")}});const m=document.querySelector(".exr-card-backdrop");let J=null,f=!1;function h(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function W(e,t=!1,s=!1){J=e,f=p().some(r=>r._id===e._id),he(e),m.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),document.addEventListener("keydown",j)}function he(e){let t=e.rating;t%1===0&&(t+=".0"),t=parseFloat(t).toFixed(1);const s=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
        <svg class="close-card-icon">
          <use href="/coursework/symbol-defs.svg#icon-x"></use>
        </svg>
      </button>

      <img src="${e.gifUrl}" alt="exercise" class="exr-image" />

      <div>
        <h3 class="exercise-name">${h(e.name)}</h3>

        <div class="rating-container">
          <ul class="star-rating-list">
            <li><p class="rating-score">${t}</p></li>
            ${Array(5).fill("").map(()=>`
              <li>
                <svg class="star-rating-icon" width="14" height="14">
                  <use href="/coursework/symbol-defs.svg#icon-star"></use>
                </svg>
              </li>`).join("")}
          </ul>
        </div>

        <div class="exr-information-container">
          <div class="exr-info-block">
            <p class="info-label">Target</p>
            <p class="exr-info">${h(e.target)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Body Part</p>
            <p class="exr-info">${h(e.bodyPart)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Equipment</p>
            <p class="exr-info">${h(e.equipment)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Popular</p>
            <p class="exr-info">${e.popularity}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Burned Calories</p>
            <p class="exr-info">${e.burnedCalories}/${e.time} min</p>
          </div>
        </div>

        <p class="exr-description">${e.description}</p>

        <div class="buttons-cont">
          <button class="add-favourite-btn">
            ${f?"Remove from favourites":"Add to favourites"}
            <svg class="heart-icon" width="20" height="20">
              <use href="/coursework/symbol-defs.svg#icon-heart"></use>
            </svg>
          </button>
          <button class="give-rating-btn">Give a rating</button>
        </div>
      </div>
    </div>
  `;m.innerHTML=s;const o=document.querySelectorAll(".star-rating-icon");for(let n=0;n<Math.round(e.rating);n++)o[n].style.fill="#eea10c";const r=document.querySelector(".add-favourite-btn");r.addEventListener("click",()=>{f?(M(e._id),f=!1,r.innerHTML=`Add to favourites
        <svg class="heart-icon" width="20" height="20">
          <use href="/coursework/symbol-defs.svg#icon-heart"></use>
        </svg>`):(Y(e),f=!0,r.innerHTML=`Remove from favourites
        <svg class="heart-icon" width="20" height="20">
          <use href="/coursework/symbol-defs.svg#icon-heart"></use>
        </svg>`),g()}),document.getElementById("close-card").addEventListener("click",y),m.addEventListener("click",n=>{n.target===m&&y()}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{y(),ve(e._id,J)})}function j(e){e.key==="Escape"&&y()}function y(){m.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",j)}export{Le as a,qe as b,we as c,X as d,A as e,ke as f,be as g,W as h,Ee as i,xe as j,de as l,b as p,Se as s};
//# sourceMappingURL=exercises_card-Crdpmkkp.js.map
