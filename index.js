
import {
    createAuthenticatedClient,
    OpenPaymentsClientError,
    isFinalizedGrant,
  } from "@interledger/open-payments";
  
  class OpenPaymentsProcessor {
    constructor(merchantWalletUrl, privateKey, keyId) {
      this.merchantWalletUrl = merchantWalletUrl;
      this.privateKey = privateKey;
      this.keyId = keyId;
      this.client = null;
    }
  
    async initialize() {
      this.client = await createAuthenticatedClient({
        walletAddressUrl: this.merchantWalletUrl,
        privateKey: this.privateKey,
        keyId: this.keyId,
      });
    }
  
    async processPayment(buyerWalletUrl, amount) {
      if (!this.client) {
        await this.initialize();
      }
  
      const receivingWalletAddress = await this.client.walletAddress.get({
        url: this.merchantWalletUrl,
      });
      const sendingWalletAddress = await this.client.walletAddress.get({
        url: buyerWalletUrl,
      });
  
      // Step 1: Create incoming payment
      const incomingPaymentGrant = await this.client.grant.request(
        { url: receivingWalletAddress.authServer },
        {
          access_token: {
            access: [
              {
                type: "incoming-payment",
                actions: ["create"],
              },
            ],
          },
        }
      );
  
      const incomingPayment = await this.client.incomingPayment.create(
        {
          url: receivingWalletAddress.resourceServer,
          accessToken: incomingPaymentGrant.access_token.value,
        },
        {
          walletAddress: receivingWalletAddress.id,
          incomingAmount: {
            assetCode: receivingWalletAddress.assetCode,
            assetScale: receivingWalletAddress.assetScale,
            value: amount.toString(),
          },
        }
      );
  
      // Step 2: Create quote
      const quoteGrant = await this.client.grant.request(
        { url: sendingWalletAddress.authServer },
        {
          access_token: {
            access: [
              {
                type: "quote",
                actions: ["create"],
              },
            ],
          },
        }
      );
  
      const quote = await this.client.quote.create(
        {
          url: sendingWalletAddress.resourceServer,
          accessToken: quoteGrant.access_token.value,
        },
        {
          walletAddress: sendingWalletAddress.id,
          receiver: incomingPayment.id,
          method: "ilp",
        }
      );
  
      // Step 3: Request outgoing payment grant
      const outgoingPaymentGrant = await this.client.grant.request(
        { url: sendingWalletAddress.authServer },
        {
          access_token: {
            access: [
              {
                type: "outgoing-payment",
                actions: ["create"],
                limits: {
                  debitAmount: quote.debitAmount,
                },
                identifier: sendingWalletAddress.id,
              },
            ],
          },
          interact: {
            start: ["redirect"],
          },
        }
      );
  
      // Return the redirect URL for the buyer to complete the payment
      return {
        redirectUrl: outgoingPaymentGrant.interact.redirect,
        continueUrl: outgoingPaymentGrant.continue.uri,
        continueToken: outgoingPaymentGrant.continue.access_token.value,
        quoteId: quote.id,
      };
    }
  
    async finalizePayment(continueUrl, continueToken, quoteId, sendingWalletUrl) {
      try {
        const finalizedOutgoingPaymentGrant = await this.client.grant.continue({
          url: continueUrl,
          accessToken: continueToken,
        });
  
        if (!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
          throw new Error("Failed to finalize the outgoing payment grant.");
        }
  
        const sendingWalletAddress = await this.client.walletAddress.get({
          url: sendingWalletUrl,
        });
  
        const outgoingPayment = await this.client.outgoingPayment.create(
          {
            url: sendingWalletAddress.resourceServer,
            accessToken: finalizedOutgoingPaymentGrant.access_token.value,
          },
          {
            walletAddress: sendingWalletAddress.id,
            quoteId: quoteId,
          }
        );
  
        return outgoingPayment;
      } catch (err) {
        if (err instanceof OpenPaymentsClientError) {
          console.error("Error finalizing the payment:", err.message);
        }
        throw err;
      }
    }
  }
  
  export default OpenPaymentsProcessor;