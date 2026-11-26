/** @type {Record<string, { image: string, url?: string }>} */
const marks = {
  'House of Doge': { image: 'house-of-doge.png', url: 'https://www.houseofdoge.com/' },
  'One New Zealand': { image: 'one-nz-logo.png', url: 'https://one.nz/' },
  'Solus Designs Limited': { image: 'solus-designs.svg' },
  'Sulaco Technology': { image: 'sulaco.png' },
  'WXC Communications': { image: 'wxc.png' },
  'iHug': { image: 'ihug.png' },
};

/** @param {string} company */
export function companyMark(company) {
  return marks[company];
}
