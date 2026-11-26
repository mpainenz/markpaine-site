export const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
import {accentSVG} from './contours.mjs';
const p = text => `<p>${esc(text)}</p>`;
const companyAssets = {
 'House of Doge':{image:'house-of-doge.png',initials:'HD',url:'https://www.houseofdoge.com/'},
 'One New Zealand':{image:'one-nz-logo.png',initials:'NZ',url:'https://one.nz/'},
 'Solus Designs Limited':{initials:'SD'},
 'WXC Communications':{initials:'WXC'},
 'iHug':{initials:'iH'},
};
function badge(company){
 const mark=companyAssets[company];
 return `<span class="company-badge ${mark.image?'image-badge':'initial-badge'}" aria-hidden="true">${mark.image?`<img src="/cv-assets/companies/${mark.image}" alt="" width="80" height="80">`:esc(mark.initials)}</span>`;
}
function contactIcon(kind){
 const shapes={
  email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  location:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  website:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  linkedin:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="7.5" cy="8" r="1" fill="currentColor" stroke="none"/><path d="M7.5 11v6M11.5 17v-6m0 3a3 3 0 0 1 6 0v3"/>'
 };
 return `<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shapes[kind]}</svg>`;
}
function contacts(data,fullLinks=false){
 const label=url=>esc(url.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,''));
 if(fullLinks)return `<section class="contact-block full-links"><h2>Contact</h2><address><a href="mailto:${esc(data.site.email)}">${contactIcon('email')}<span>${esc(data.site.email)}</span></a><span class="contact-location">${contactIcon('location')}<span>${esc(data.site.location)}</span></span><a href="${esc(data.site.baseUrl)}">${contactIcon('website')}<span>${label(data.site.baseUrl)}</span></a><a href="${esc(data.site.social.linkedin)}">${contactIcon('linkedin')}<span>${label(data.site.social.linkedin)}</span></a></address></section>`;
 return `<section class="contact-block"><h2>Contact</h2><address><a href="mailto:${esc(data.site.email)}">${esc(data.site.email)}</a><span>${esc(data.site.location)}</span><a href="https://markpaine.dev/">markpaine.dev</a><a href="${esc(data.site.social.github)}">github.com/<wbr>mpainenz</a><a href="${esc(data.site.social.linkedin)}">linkedin.com/in/<wbr>markpainenz</a></address></section>`;
}
function portrait(){return '<figure class="portrait-wrap"><img class="portrait" src="/mark-waterfront.png" alt="Mark Paine on the waterfront" width="828" height="828"></figure>';}
function identity(data){return `<div class="identity"><h1>${esc(data.site.name)}</h1><p class="profession">Software &amp; Platform Engineer</p></div>`;}
function skills(items,title){return `<section class="skills-block"><h2>${title}</h2><dl>${items.map(item=>`<div><dt>${esc(item.group)}</dt><dd>${esc(item.items)}</dd></div>`).join('')}</dl></section>`;}
function education(data,items=data.education,title='Education & certification'){return `<section class="education"><h2>${esc(title)}</h2>${items.map(item=>`<p><strong>${esc(item.title)}</strong><span>${esc(item.detail)}</span></p>`).join('')}</section>`;}
function coreStrengths(data){
 const certification=data.education[0];
 return `<section class="core-strengths"><h2>Core strengths</h2>${data.contourStrengths.map(item=>`<div class="strength"><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></div>`).join('')}</section><section class="certification-line" aria-label="AWS certification"><p><strong>${esc(certification.title)}</strong><span>${esc(certification.detail)}</span></p></section>`;
}
function earlier(data){return `<section class="earlier"><h2>Earlier experience</h2>${data.earlierRoles.map(item=>`<div class="earlier-role">${badge(item.company)}<p><strong>${esc(item.company)}</strong><span>${esc(item.role)}</span><span>${esc(item.meta)}</span></p></div>`).join('')}</section><p class="references">References available on request.</p>`;}
function profile(data,paragraphs=[data.site.description]){return `<section class="profile"><h2>Profile</h2>${paragraphs.map(p).join('')}</section>`;}
function sidebar(data,index,type,includePortrait,theme){
 const contour=theme.id==='signal-contour';
 let html=index===1?(includePortrait?portrait():'')+contacts(data,contour):contour?'':'<div class="page-monogram" aria-hidden="true">mp<span>.</span></div>';
 if(type==='cv'){
  if(contour&&theme.sidebar!=='legacy'){
   if(index===1)html+=coreStrengths(data);
   if(index===2)html+=skills(data.skills.slice(0,3),'Development')+skills(data.skills.slice(3,10),'Platforms &amp; delivery');
   if(index===3)html+=skills(data.skills.slice(10),'Connectivity &amp; AI')+education(data,data.education.slice(1),'Education')+earlier(data);
  }else{
   if(index===1)html+=(contour?education(data):profile(data))+skills(data.skills.slice(0,3),'Development');
   if(index===2)html+=skills(data.skills.slice(3,10),'Systems &amp; delivery')+(contour?'':education(data));
   if(index===3)html+=skills(data.skills.slice(10),'Connectivity &amp; AI')+earlier(data);
  }
 }
 return `<aside class="side-panel"><div class="side-content" data-bounds>${html}</div></aside>`;
}
function section(title){return `<h2 class="section-title">${esc(title)}</h2>`;}
function job(item,{start=0,end=item.bullets.length,continued=false,links=false}={}){
 const url=links&&companyAssets[item.company]?.url;
 const name=url?`<a class="company-link" href="${esc(url)}">${esc(item.company)}</a>`:esc(item.company);
 return `<section class="job"><header class="job-head">${badge(item.company)}<div class="job-title"><h3>${name}</h3><p class="job-role">${esc(item.role)}</p><p class="job-meta">${esc(item.meta)}${continued?' · continued':''}</p>${item.focus&&!continued?`<p class="job-focus">${esc(item.focus)}</p>`:''}</div></header>${!continued?[item.blurb,item.intro].filter(Boolean).map(text=>`<p class="job-intro">${esc(text)}</p>`).join(''):''}${end>start?`<ul>${item.bullets.slice(start,end).map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:''}</section>`;
}
function sheet(data,theme,index,type,main){
 const first=index===1, banner=theme.layout==='banner', contour=theme.id==='signal-contour';
 const circle=theme.accentPattern?`<div class="page-accent" aria-hidden="true">${accentSVG(theme.accentPattern,type==='letter'?3:index-1)}</div>`:'<div class="circle-art" aria-hidden="true"></div>';
 const artwork=contour?`<div class="panel-art" aria-hidden="true">${circle}</div>`:`<div class="panel-art" aria-hidden="true"></div>${circle}`;
 const masthead=first&&banner?`<header class="masthead" data-bounds>${identity(data)}${portrait()}</header>`:'';
 const mainHead=first&&!banner?`<header class="masthead">${identity(data)}</header>`:!first?`<header class="running"><strong>${esc(data.site.name)}</strong>${contour?'':`<span>${index===2?'Experience':'Projects & capabilities'}</span>`}</header>`:'';
 return `<article class="sheet ${type} page-${index} layout-${theme.layout}" aria-label="${type==='cv'?'CV':'Cover letter'} page ${index}">${artwork}<div class="sheet-content">${masthead}<div class="document-grid">${sidebar(data,index,type,first&&!banner,theme)}<div class="main-panel" data-bounds>${mainHead}${main}</div></div></div><footer class="folio">${contour?'':'<span>markpaine.dev</span>'}<span>${index} / ${type==='cv'?3:1}</span></footer></article>`;
}
export function signalDocumentHTML(data,theme,type){
 let pages;
 if(type==='cv'){
  const contour=theme.id==='signal-contour', split=contour?9:10;
  const first=(contour?profile(data,data.contourProfile):'')+section('Experience')+job(data.experience[0],{links:contour})+(contour?'':job(data.experience[1],{end:0}));
  const second=section('Experience')+job(data.experience[1],{end:split,continued:!contour,links:contour});
  const third=section('Experience')+job(data.experience[1],{start:split,continued:true,links:contour})+section('Independent work')+job(data.experience[2],{links:contour});
  pages=[first,second,third].map((html,i)=>sheet(data,theme,i+1,type,html)).join('');
 }else{
  const html=`<div class="letter-routing"><span>${esc(data.letterDate)}</span><span>${esc(data.letterRecipient)}</span></div><h2 class="letter-subject">${esc(data.letterRole)}</h2><div class="letter-body">${data.letter.split(/\n\s*\n/).map(text=>p(text).replaceAll('\n','<br>')).join('')}</div>`;
  pages=sheet(data,theme,1,type,html);
 }
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mark Paine · ${theme.name} · ${type==='cv'?'CV':'Cover letter'}</title><link rel="stylesheet" href="/cv-assets/fonts/fonts.css"><link rel="stylesheet" href="/cv-assets/contour.css"></head><body class="${theme.id}" style="--heading:'${theme.heading}';--body:'${theme.body}'"><main>${pages}</main></body></html>`;
}
