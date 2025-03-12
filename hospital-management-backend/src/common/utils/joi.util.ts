import * as Joi from 'joi';
interface IConfigProps {
  value: unknown;
  joi: Joi.Schema;
}
export type JoiConfig<T> = Record<keyof T, IConfigProps>;
class JoiUtil {
  /**
   * A description of the entire function.
   *
   * @return {Joi} description of return value
   */
  public get joi() {
    return Joi;
  }
  /**
   * Validate a configuration object using a Joi schema.
   *
   * @param {JoiConfig<T>} config - the configuration object to validate
   * @return {T} the validated configuration object
   */

  public validate<T>(config: JoiConfig<T>): T {
    const schemaObj = this.extractByPropName(config, 'joi') as Joi.SchemaMap<T>;
    const schema = Joi.object(schemaObj);
    const values = this.extractByPropName(config, 'value') as T;

    const { error } = schema.validate(values, { abortEarly: false });

    if (error !== undefined) {
      throw new Error(
        `Validation failed - Is there an environment variable missing?
        ${error.message}`,
      );
    }

    return values;
  }

  /**
   * Extract only a single property from our configuration object.
   * @param config    Entire configuration object.
   * @param propName  The property name that we want to extract.
   */
  public extractByPropName<T>(
    config: JoiConfig<T>,
    propName: keyof IConfigProps,
  ): T | Joi.SchemaMap<T> {
    const arr: object[] = Object.keys(config).map((key) => {
      return {
        [key]: config[key][propName],
      };
    });
    return Object.assign({}, ...arr) as T | Joi.SchemaMap<T>;
  }
}

export default new JoiUtil();
