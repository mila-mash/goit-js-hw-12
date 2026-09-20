import{a as m,S as f,i as n}from"./assets/vendor-CZ1QA36h.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const p="57655866-60005b456cabde49bcceaed9d";function g(o){return m.get("https://pixabay.com/api/",{params:{key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data).catch(t=>{throw console.log("Sorry, there has been an error"),t})}const h=new f(".gallery a",{captionDelay:250}),l=document.querySelector(".gallery"),c=document.querySelector(".loader");function y(o){const t=o.map(({webformatURL:i,largeImageURL:a,tags:e,likes:r,views:s,comments:u,downloads:d})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img class="gallery-image" src="${i}" alt="${e}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b><br>${r}</p>
            <p class="info-item"><b>Views</b><br>${s}</p>
            <p class="info-item"><b>Comments</b><br>${u}</p>
            <p class="info-item"><b>Downloads</b><br>${d}</p>
          </div>
        </li>
      `).join("");l.insertAdjacentHTML("beforeend",t),h.refresh()}function b(){l.innerHTML=""}function L(){c.classList.remove("hidden")}function S(){c.classList.add("hidden")}const q=document.querySelector(".form");document.querySelector(".form-input");document.querySelector("#data-list");q.addEventListener("submit",w);function w(o){o.preventDefault();const t=o.target.elements["search-text"].value.trim();if(!t){n.error({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}b(),L(),g(t).then(i=>{if(i.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(i.hits)}).catch(i=>{n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{S(),o.target.reset()})}
//# sourceMappingURL=index.js.map
