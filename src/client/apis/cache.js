export default class Cache {
  constructor() {
    this.cache = {};
  }

  findOrCreate(data, create) {
    var model = this.cache[this.getIdFromData(data)];

    if (model) {
      model.updateAttributes(data);
      return model;
    }

    model = create(data);

    this.cache[this.getId(model)] = model;

    return model;
  }

  findOrCreateAll(dataSet, create) {
    var cache = {};

    var models = dataSet.map(data => {
      var model = this.findOrCreate(data, create);
      cache[this.getId(model)] = model;
      return model;
    });

    this.cache = cache;

    return models;
  }

  getIdFromData(data) {
    throw new Error('getIdFromData has not be delcared in a subclass of Cache!');
  }

  getId(model) {
    throw new Error('getId has not be delcared in a subclass of Cache!');
  }
}
