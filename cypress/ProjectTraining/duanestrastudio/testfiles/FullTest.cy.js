import allpages from '../pages/allpages.js'

describe('Duanestra Studio Full Test', () => {
    it('Home Elements check', () => {
        allpages.homePage();
    })

    it('About Me Elements check', () => {
        allpages.aboutMePage();
    })
})