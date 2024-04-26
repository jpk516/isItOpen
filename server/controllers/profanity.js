const express = require('express');
const router = express.Router();


/**
* @openapi
* /api/profanity/check:
*   post:
*       summary: Checks for profanity in a given text
*       tags: [Profanity]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       required:
*                           - text
*                       properties:
*                           text:
*                               type: string
*       responses:
*           200:
*               description: Profanity check result
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               hasProfanity:
*                                   type: boolean
*/
let ProfanityEngine;

router.post('/check', async (req, res) => {
    // Make sure the ProfanityEngine is loaded
    if (!ProfanityEngine) {
        try {
            const module = await import('@coffeeandfun/google-profanity-words'); // @coffeeandfun/google-profanity-words package is an ES module,
            ProfanityEngine = module.ProfanityEngine; // This loads it so we can use it in out commonJs style
        } catch (error) {
            console.error('Error importing ProfanityEngine:', error);
            return res.status(500).json({ error: 'Error loading profanity engine.' });
        }
    }

    try {
        const profanityEngine = new ProfanityEngine({ language: 'en' });  //sets to googles english list
        const sentence = req.body.text;
        const hasProfanity = await profanityEngine.hasCurseWords(sentence); //calls the api
        res.json({ hasProfanity }); //returns boolean of true or false
    } catch (error) {
        console.error('Error when checking for profanity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;