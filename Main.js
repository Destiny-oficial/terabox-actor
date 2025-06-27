import { Actor } from 'apify';
import axios from 'axios';
import * as cheerio from 'cheerio';

await Actor.init();

const input = await Actor.getInput();
const urls = input?.video_urls || [];

const resultados = [];

for (const url of urls) {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        const $ = cheerio.load(response.data);
        const titulo = $('title').text();

        resultados.push({
            original_url: url,
            title: titulo,
            nota: "Scraping básico. Enlace directo aún no extraído."
        });
    } catch (err) {
        resultados.push({
            original_url: url,
            error: err.message,
        });
    }
}

await Actor.pushData(resultados);
await Actor.exit();
