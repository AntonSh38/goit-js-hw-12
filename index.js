import{a as w,S as P,i}from"./assets/vendor-BSTwZ_tR.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function f(r,o=1){const s="https://pixabay.com",a="52236673-dfbbe0e7dd19cbeb92e7645c8",e="/api/",t={key:a,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:15};try{const n=await w.get(`${s}${e}`,{params:t});if(!n.data||typeof n.data!="object")throw new Error("Invalid response structure");return n.data}catch(n){throw console.error("API Error:",n),n}}const m=new P(".gallery a",{captionsData:"alt",captionDelay:250}),u=document.querySelector(".gallery"),y=document.querySelector(".loader"),g=document.querySelector(".load-more-btn");function h(r){return r.map(({webformatURL:o,largeImageURL:s,tags:a,likes:e,views:t,comments:n,downloads:L})=>`<li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${a}"
          />
          <div class="info">
            <div class="info-item">
              <span class="info-label">Likes</span>
              <span class="info-value">${e}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Views</span>
              <span class="info-value">${t}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Comments</span>
              <span class="info-value">${n}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Downloads</span>
              <span class="info-value">${L}</span>
            </div>
          </div>
        </a>
      </li>`).join("")}function S(r){u.innerHTML=h(r),m.refresh()}function A(r){u.insertAdjacentHTML("beforeend",h(r)),m.refresh()}function M(){u.innerHTML=""}function p(){y.classList.remove("is-hidden")}function v(){y.classList.add("is-hidden")}function q(){g.classList.remove("is-hidden")}function b(){g.classList.add("is-hidden")}const c=document.querySelector(".form"),$=document.querySelector(".load-more-btn");let d="",l=1;const E=15;c.addEventListener("submit",I);$.addEventListener("click",B);async function I(r){r.preventDefault();const o=r.currentTarget.elements["search-text"].value.trim();if(!o){i.warning({title:"Warning",message:"please enter a search query"}),c.reset();return}d=o,l=1,M(),b(),p();try{const s=await f(d,l);if(!s||!s.hits||!Array.isArray(s.hits)){i.error({title:"Error",message:"Invalide response from server. Please try again."});return}const a=s.hits,e=s.totalHits||0;if(a.length===0){i.error({title:"Error",message:"❌ Sorry, there are no images matching your search query. Please try again!"});return}S(a);const t=Math.ceil(e/E);l<t?q():i.info({title:"End of results",message:"We're sorry, but you've reached the end of search results."})}catch(s){console.error("Error fetching images:",s),i.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{v(),c.reset()}}async function B(){l+=1,p();try{const r=await f(d,l);if(!r||!r.hits||!Array.isArray(r.hits)){i.error({title:"Error",message:"Invalid response from server. Please try again"});return}const o=r.hits,s=r.totalHits||0;A(o);const a=document.querySelector(".gallery-item");if(a){const t=a.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}const e=Math.ceil(s/E);l>=e&&(b(),i.info({title:"End of results",message:"We're sorry, but you've reached the end of search results."}))}catch(r){console.error("Error fetching more images:",r),i.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{v()}}
//# sourceMappingURL=index.js.map
