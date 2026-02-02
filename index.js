import{d as q,f as k,s as $,a as B,b as C,l as u,p as o,c as f,h as F,e as H,g,i as h,j as I}from"./assets/exercises_card-Crdpmkkp.js";import{i as d}from"./assets/vendor-Bv82aGDC.js";const s={filters:document.querySelector(".filters"),navButtons:document.querySelector(".nav-buttons"),musclesBtn:document.querySelector(".muscles-btn"),exercisesTitle:document.querySelector(".exercises-title"),searchForm:document.querySelector(".search-form"),searchInput:document.querySelector(".search-form input"),loadMoreBtn:document.querySelector(".load-more-btn"),quoteContainer:document.querySelector(".quote"),pagination:document.querySelector(".pagination"),exercises:document.querySelector(".exercises")};q(s.quoteContainer);v();s.musclesBtn.classList.add("active-btn");s.filters.addEventListener("click",A);s.exercises.addEventListener("click",R);s.searchForm.addEventListener("submit",z);var b;(b=s.loadMoreBtn)==null||b.addEventListener("click",loadMore);var S;(S=s.pagination)==null||S.addEventListener("click",O);s.exercises.addEventListener("click",P);async function v(e=!0){e&&(s.exercises.innerHTML="");const t=await k(e);if(!t.results.length)return L();N(t.results),E(t.totalPages)}function N(e){const t=e.map(({name:a,filter:i,imgURL:c})=>`
      <li class="exercise">
        <img src="${c}" alt="${a}" loading="lazy" class="exercise-image" />
        <div class="exercise-info">
          <h2 class="exercise-subtitle">${l(a)}</h2>
          <p class="exercise-filter">${i}</p>
        </div>
      </li>
    `).join("");s.exercises.insertAdjacentHTML("beforeend",t)}function A(e){var t;e.target.tagName==="BUTTON"&&((t=document.querySelector(".active-btn"))==null||t.classList.remove("active-btn"),e.target.classList.add("active-btn"),e.target.classList.contains("muscles-btn")&&g("Muscles"),e.target.classList.contains("bodyparts-btn")&&g("Body parts"),e.target.classList.contains("equipment-btn")&&g("Equipment"),s.exercisesTitle.textContent="Exercises",s.searchForm.style.display="none",h(""),f(1),v(!0))}async function R(e){const t=e.target.closest(".exercise");if(!t)return;const a=t.querySelector(".exercise-filter"),i=t.querySelector(".exercise-subtitle");!a||!i||($(a.textContent),B(i.textContent.toLowerCase()),h(""),s.exercisesTitle.innerHTML=`Exercises / <span>${l(i.textContent)}</span>`,s.searchForm.style.display="block",s.searchInput.value="",f(1),s.exercises.innerHTML="",await x(!0))}async function x(e=!0){e&&(u.length=0);const t=await C(e);if(!t.results.length)return L();u.length=0,u.push(...t.results),j(t.results),E(t.totalPages)}function j(e){const t=`
    <ul class="exercises-cards">
      ${e.map(({name:a,_id:i,rating:c,burnedCalories:r,bodyPart:w,target:M,time:T})=>`
        <li class="exercise-information" data-id-card="${i}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <span class="rating">
                ${c}
                <svg class="star-icon" width="14" height="14">
                  <use href="/coursework/symbol-defs.svg#icon-star"></use>
                </svg>
              </span>
            </div>
            <button data-action="start" data-id="${i}" class="details-link">
              Start
              <svg class="arrow-icon" width="16" height="16">
                <use href="/coursework/symbol-defs.svg#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div class="exercise-header">
            <svg class="icon-man" width="24" height="24">
              <use href="/coursework/symbol-defs.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${l(a)}</h2>
          </div>
          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${r} / ${T} min</li>
            <li><span>Body part:</span> ${l(w)}</li>
            <li><span>Target:</span> ${l(M)}</li>
          </ul>
        </li>
      `).join("")}
    </ul>
  `;s.exercises.innerHTML=t}function z(e){e.preventDefault();const t=s.searchInput.value.trim().toLowerCase();h(t),f(1),s.exercises.innerHTML="",x(!0)}function O(e){const t=e.target.closest(".pagination-btn");if(!t)return;const a=Number(t.dataset.page);a!==o&&(f(a),s.exercises.innerHTML="",H?x(!1):v(!1))}function P(e){const t=e.target.closest('[data-action="start"]');if(!t)return;const a=u.find(i=>i._id===t.dataset.id);F(a)}function L(){var e;s.exercises.innerHTML=`
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `,(e=s.loadMoreBtn)==null||e.style.setProperty("display","none"),s.pagination&&(s.pagination.innerHTML="")}function l(e){return e?e[0].toUpperCase()+e.slice(1):""}function E(e){if(!s.pagination||e<=1){s.pagination.innerHTML="";return}let t="";const a=r=>`
    <li>
      <button class="pagination-btn ${r===o?"active":""}" data-page="${r}">
        ${r}
      </button>
    </li>
  `;let i=Math.max(1,o-1),c=Math.min(e,o+1);o===1&&(c=Math.min(e,3)),o===e&&(i=Math.max(1,e-2)),i>1&&(t+=a(1),i>2&&(t+='<li class="dots">...</li>'));for(let r=i;r<=c;r++)t+=a(r);c<e&&(c<e-1&&(t+='<li class="dots">...</li>'),t+=a(e)),s.pagination.innerHTML=t}const n=document.querySelector("input[name=email]"),m=document.querySelector(".footer-send-button"),y="feedback-form-state";function p(e){return/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)}function U(){localStorage.setItem(y,JSON.stringify({email:n.value}))}function D(){const e=localStorage.getItem(y);if(!e)return;const{email:t}=JSON.parse(e);n.value=t||"",m.disabled=!p(n.value)}D();n.addEventListener("input",()=>{U(),m.disabled=!p(n.value)});n.addEventListener("change",()=>{p(n.value)||d.info({message:"Please enter a valid email address"})});m.addEventListener("click",async e=>{if(e.preventDefault(),!!p(n.value))try{await I(n.value),d.success({title:"Success",message:"Welcome to energy.flow world!"}),n.value="",m.disabled=!0,localStorage.removeItem(y)}catch(t){t.message==="EMAIL_EXISTS"?d.warning({message:"Email already exists"}):d.error({title:"Error",message:"Something went wrong! Please try again later"})}});
//# sourceMappingURL=index.js.map
