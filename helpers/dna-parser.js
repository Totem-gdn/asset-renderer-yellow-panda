'use strict'
const { DNAParser, ContractHandler } = require('totem-dna-parser')
const totemCommonFiles = require('totem-common-files')

class NFT {
  constructor() {
    this.ApiURL = process.env.API_URL;
    this.Contracts = {
      avatar: process.env.AVATAR_CONTRACT,
      item: process.env.ITEM_CONTRACT,
      gem: process.env.GEM_CONTRACT
    }
  }
  async get (type, id) {
    try {
      let filterJson = type === 'avatar' ? totemCommonFiles.yellowPandaAvatarFilterJson : totemCommonFiles.nightshiftSurvivalItemFilterJson;
      const contractHandler = new ContractHandler(this.ApiURL, this.Contracts[type]);
      const dna = await contractHandler.getDNA(id);
      const parser = new DNAParser(filterJson, dna);
      const properties = parser.getFilterPropertiesList()
      let jsonProp = {...properties};
      let settings = {};
      for (const key in properties) {
        if (Object.hasOwnProperty.call(properties, key)) {
          settings[jsonProp[key]] = parser.getField(properties[key]);
        }
      }

      return settings;
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new NFT()