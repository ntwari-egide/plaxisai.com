/**
 * @author: Egide Ntwali
 * @description: The environment variables, used to check if the app is in production or local.
 * @returns {boolean} The environment variables
 */

export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;
