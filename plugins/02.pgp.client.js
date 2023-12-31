import * as openpgp from 'openpgp/lightweight';
import nuxtStorage from 'nuxt-storage';
import { v4 as uuid } from 'uuid';

export default defineNuxtPlugin(async nuxtApp => {

    const getPgpKeys = async () => {

      // Check if pgp keys have been already created and stored on local storage
      // If not generate them and store on local storage
      // Otherwise retrive them
      let armoredPgpPrivateKey = nuxtStorage.localStorage.getData('pgp_private_key');

      if (!armoredPgpPrivateKey) {

          const passphrase = uuid();
          
          const { 
            privateKey: armoredPgpPrivateKey, 
            publicKey: armoredPgpPublicKey, 
            revocationCertificate: pgpRevocationCertificate 
          } = await openpgp.generateKey({
            type: 'ecc',
            curve: 'curve25519',
            userIDs: [{ name: passphrase, email: `${passphrase}@${passphrase}.com` }],
            passphrase,
            format: 'armored'
        });

        nuxtStorage.localStorage.setData('passphrase', passphrase, 14, 'd');
        nuxtStorage.localStorage.setData('pgp_private_key', armoredPgpPrivateKey, 14, 'd');
        nuxtStorage.localStorage.setData('pgp_public_key', armoredPgpPublicKey, 14, 'd');
        nuxtStorage.localStorage.setData('pgp_revocation_certificate', pgpRevocationCertificate, 14, 'd');
      }

      armoredPgpPrivateKey = nuxtStorage.localStorage.getData('pgp_private_key');
      const armoredPgpPublicKey = nuxtStorage.localStorage.getData('pgp_public_key');
      const pgpRevocationCertificate = nuxtStorage.localStorage.getData('pgp_revocation_certificate');

      const passphrase = nuxtStorage.localStorage.getData('passphrase');

      const pgpPrivateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: armoredPgpPrivateKey }),
        passphrase,
      });

      const pgpPublicKey = await openpgp.readKey({ armoredKey: armoredPgpPublicKey });

      return {
        armoredPgpPrivateKey,
        armoredPgpPublicKey,
        passphrase,
        pgpPrivateKey,
        pgpPublicKey,
        pgpRevocationCertificate
      };
    };

    // Function to get the message signature
    const signMessage = async (text) => {
      const { passphrase, pgpPrivateKey: signingKeys } = await getPgpKeys();
      const message = await openpgp.createCleartextMessage({ text });
      const cleartextMessage = await openpgp.sign({
          message,
          signingKeys,
          signingUserIDs: [{ name: passphrase, email: `${passphrase}@${passphrase}.com` }]
      });
      const signatureRegex = /-----BEGIN PGP SIGNATURE-----([\s\S]+?)-----END PGP SIGNATURE-----/;
      const signature = cleartextMessage.match(signatureRegex);
      return signature[0];
    };

    // Function to get the encrypted message
    const encryptMessage = async (text, armoredKey) => {
      const { passphrase, pgpPrivateKey: signingKeys } = await getPgpKeys();
      const message = await openpgp.createMessage({ text });
      const counterpartyEncryptionKey = await openpgp.readKey({ armoredKey });
      const ownArmoredPgpPublicKey = nuxtStorage.localStorage.getData('pgp_public_key');
      const ownKey = await openpgp.readKey({ armoredKey: ownArmoredPgpPublicKey });
      return await openpgp.encrypt({
          message,
          encryptionKeys: [counterpartyEncryptionKey, ownKey],
          signingKeys,
          signingUserIDs: [{ name: passphrase, email: `${passphrase}@${passphrase}.com` }]
      });
    };

    // function to decrypt counterparty messages
    const decryptMessage = async (armoredMessage, armoredSignature, armoredKey, expectSigned) => {
      const { pgpPrivateKey } = await getPgpKeys();
      const verificationKeys = await openpgp.readKey({ armoredKey });
      const message = await openpgp.readMessage({ armoredMessage });
      const signature = await openpgp.readSignature({ armoredSignature });
      const { data } = await openpgp.decrypt({
        verificationKeys,
        message,
        signature,
        decryptionKeys: pgpPrivateKey,
        expectSigned,
      });
      return data;
    }

    // Export the functions as client only plugin
    return {
      provide: {
        pgp: {
          getPgpKeys,
          signMessage,
          encryptMessage,
          decryptMessage
        }
      }
    }
});