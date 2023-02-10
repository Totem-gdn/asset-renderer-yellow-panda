'use strict'
const nftHelper = require('../../helpers/dna-parser')

class NFTController {
  async get (req, res, next) {
    const { type, id } = req.params
    let { width = 500, height = 500, glow = 'true' } = req.query
    if (!type || !id) {
      res.status(404).json({ error: 'Wrong format' })
    }

    if (type === 'avatar') {
      const nft = await nftHelper.get(type, id);
      console.log('nft',nft);
      if (nft) {
        res.setHeader('Content-Type', 'image/svg+xml');
        if (type === 'avatar') {
          nft['glow_color'] = nft.primary_color.replace(')', ', 0.5)').replace('rgb', 'rgba');
          res.render('layouts/avatar', {
            layout: 'avatar.hbs',
            ...nft,
            glow,
            width: width,
            height: height
          })
        }
      } else {
        res.status(404).json({ error: 'File not found' })
        
      }
      
    } else {
      res.status(404).json({ error: 'File not found' })
    }
  }
}

module.exports = new NFTController()
