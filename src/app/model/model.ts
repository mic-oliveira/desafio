
export abstract class Model {
  protected fillable = [];

  public fill(attributes: Array<object>) {
    const attr = Object.keys(attributes);
    attr.forEach((attribute) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.fillable.some( (attr) => attr === attribute ? this[attr] = attributes[attr] : null);
    });
    return this;
  }

  public toArray()
  {
    const array = [];
    const attr = this.fillable;
    for (const [key, value] of Object.entries(this)) {
      console.log(`${key}: ${value}`);
    }
    attr.forEach((attribute) => {
      // tslint:disable-next-line:no-shadowed-variable
      console.log(attribute + ' ' + this[attribute]);

      console.log(array);
      // tslint:disable-next-line:no-shadowed-variable
      this.fillable.some( (attr) => attr === attribute ? this[attr] = this.fillable[attr] : null);
    });
    return this;
  }
}
