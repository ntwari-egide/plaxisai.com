/* eslint-disable no-console */
import CryptoJS from 'crypto-js';

const secretKey = 'Aadfasdflmkmadfifasdf023dsf';

/**
 * Encrypts a stringified object.
 * @param {string} data - The stringified object to encrypt.
 * @returns {string} - The encrypted data, or an empty string if encryption fails.
 */
export const encryptData = (data: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    return ''; // Return an empty string if encryption fails
  }
};

/**
 * Decrypts an encrypted string back to its original object format.
 * @param {string} encryptedData - The encrypted data to decrypt.
 * @returns {string} - The decrypted data as a stringified object, or an empty string if decryption fails.
 */
export const decryptData = (encryptedData: string): string => {
  if (!encryptedData) {
    console.error('No data to decrypt.');
    return ''; // Return an empty string if no encrypted data is provided
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      console.error(
        'Decryption failed. Data may be corrupted or the wrong key may have been used.'
      );
      return ''; // Return an empty string if decryption fails
    }

    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    return ''; // Return an empty string if decryption fails
  }
};
