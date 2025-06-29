/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ariannyrivasagency.com',   
  generateRobotsTxt: true,                          
  sitemapSize: 1000,                                
  transform: async (config, url) => {
    
    return {
      loc: url,
      changefreq: 'weekly',
      priority: url === config.siteUrl ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  
  additionalPaths: async (config) => {
    const dataRaw = require('./data/models.json');
    const models = Array.isArray(dataRaw) ? dataRaw : dataRaw.default || [];

    return models.map((m) => ({
      loc: `${config.siteUrl}/modelos/${m.slug}`, 
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
