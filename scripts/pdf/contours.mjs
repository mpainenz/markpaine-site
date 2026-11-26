const path=(d,opacity=.5,width=3)=>`<path d="${d}" fill="none" stroke="#7ee0a3" stroke-opacity="${opacity}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
export function accentSVG(_id,page=0){
 if(_id!=='topography')throw new Error('Unsupported CV decoration');
 const n=page%4;let shapes='';
  for(let i=0;i<11;i++){
   const y=210+i*31,shift=n*47;
   shapes+=path(`M -70 ${y+shift/2} C ${90+shift} ${y-190} ${235-shift} ${y+145} ${390+shift/2} ${y-25} S 650 ${y-145+shift} 850 ${y+18-shift}`, .12+i*.045, i===5?5:2.5);
  }

 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 480" aria-hidden="true">${shapes}</svg>`;
}
