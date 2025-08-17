import crypto from 'node:crypto';

const defaultAlgorithm: crypto.CipherGCMTypes = 'aes-256-gcm';

// Key must be 32 bytes for aes-256-gcm


/**
 * Encrypts a string using AES-256-GCM with a random IV and a SHA-256 derived key.
 *
 * The output is a concatenation of the IV (12 bytes, 24 hex chars),
 * authentication tag (16 bytes, 32 hex chars), and the encrypted data (hex).
 *
 * @param data The string to encrypt.
 *
 * @example
 *
 * const encrypted = await encrypt("String data to encrypt");
 *
 * @returns Promise<string> The encrypted string, suitable for decrypt().
 */
export async function encrypt(data: string, secretKey: string): Promise<string> {
  const key = crypto.createHash('sha256').update(secretKey).digest(); // Buffer, 32 bytes

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(defaultAlgorithm, key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();

  // Combine all encrypted data as hex
  return iv.toString('hex') + authTag.toString('hex') + encrypted;
}


/**
 * Decrypts a string previously encrypted with the encrypt function.
 *
 * The input string must be a concatenation of IV (12 bytes, 24 hex chars),
 * authentication tag (16 bytes, 32 hex chars), and the encrypted data (hex).
 *
 * @param data The encrypted string to decrypt. Must be in the format returned by encrypt().
 *
 * @example
 *
 * const encrypted = await encrypt("String data to encrypt");
 * const decrypted = await decrypt(encrypted, secretKey);
 *
 * @returns Promise<string> The decrypted original string.
 */
export async function decrypt(data: string, secretKey: string): Promise<string> {
  // iv: 12 bytes (24 hex), authTag: 16 bytes (32 hex)
  // iv hex 0 - 24 (12 byte - 24 hex) / authTagHex 24 - 56 (16 byte - 32 hex) / encrypted data 56 byte and after.
  
  const key = crypto.createHash('sha256').update(secretKey).digest(); // Buffer, 32 bytes
  
  const ivHex = data.slice(0, 24);
  const authTagHex = data.slice(24, 56);
  const encrypted = data.slice(56);

  // For decryption convert hex to buffer iv and authTag.
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  // Decipher for 'aes-256-gcm', 32 byte sha256 key and 12 byte iv.  
  const decipher = crypto.createDecipheriv(defaultAlgorithm, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
