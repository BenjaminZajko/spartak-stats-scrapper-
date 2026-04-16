import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

async function scrapeHraci() {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto('https://www.nikeliga.sk/statistiky/hraci?id_atribute=1&id_season=2025&id_team=8&id_position=')

    console.log('Stránka načítaná!')

    const hraci = await page.$$eval('tbody tr', (riadky) => {
        return riadky.map((riadok) => {
            const meno = riadok.querySelector('td.player a')?.textContent?.trim() ?? ''
            const hodnota = riadok.querySelector('td.item')?.textContent?.trim() ?? ''
            const poradie = riadok.querySelector('td.counter')?.textContent?.trim() ?? ''
            const narodnostClass = riadok.querySelector('td.nationality span')?.className ?? ''
            const narodnost = narodnostClass.split('flag-icon-small-').pop() ?? ''
            return { poradie, meno, hodnota, narodnost }
        })
    })

    console.log(hraci)

    writeFileSync('hraci.json', JSON.stringify(hraci, null, 2))
    console.log('Uložené do hraci.json!')

    await browser.close()
}

scrapeHraci()