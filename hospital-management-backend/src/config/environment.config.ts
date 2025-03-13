import { registerAs } from '@nestjs/config';
import { IEnvironment } from 'src/common/interfaces/environment.interface';
import JoiUtil, { JoiConfig } from 'src/common/utils/joi.util';

export default registerAs('environment', () => validateAppConfiguration());

export function validateAppConfiguration(): IEnvironment {
  const appConfig: JoiConfig<IEnvironment> = {
    DatabaseHost: {
        value: process.env.DB_HOST,
        joi: JoiUtil.joi.string().required(),
    },
    DatabasePort: {
        value: process.env.DB_PORT,
        joi: JoiUtil.joi.string().required(),
    },
    DatabaseUser: {
        value: process.env.DB_USER,
        joi: JoiUtil.joi.string().required(),
    },
    DatabasePassword: {
        value: process.env.DB_PASSWORD,
        joi: JoiUtil.joi.string().required(),
    },
    DatabaseName: {
        value: process.env.DB_NAME,
        joi: JoiUtil.joi.string().required(),
    },
    Environment: {
        value: process.env.ENVIRONMENT,
        joi: JoiUtil.joi.string().required(),
    },
    JWTSecret: {
        value: process.env.JWT_SECRET,
        joi: JoiUtil.joi.string().required(),
    },
    Port: {
        value: process.env.PORT,
        joi: JoiUtil.joi.string().required(),
    }
  };

  return JoiUtil.validate(appConfig);
}
