import fetch from 'node-fetch';
import crypto from 'crypto';

const { NODE_ENV, PAYSTACK_APIS_BASE_URL: URL, PAYSTACK_SECRET_KEY } = process.env;
const headers = {
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  'Content-Type': 'application/json'
};

export const fetchBanks = async () => {
  if (NODE_ENV === 'test') {
    return [{
      id: 302,
      name: 'lorem',
      slug: 'lorem',
      code: '120001',
      longcode: '120001',
      gateway: '',
      pay_with_bank: false,
      active: true,
      country: 'Nigeria',
      currency: 'NGN',
      type: 'nuban',
      is_deleted: false,
      createdAt: '2022-05-31T06:50:27.000Z',
      updatedAt: '2022-06-23T09:33:55.000Z'
    }];
  }

  const options = { method: 'GET', headers };
  const response = await fetch(`${URL}/bank?country=nigeria`, options);

  const { data } = await response.json();
  return data;
};

export const resolveAccount = async (accountNumber, bankCode) => {
  if (NODE_ENV === 'test') {
    if (accountNumber === '1011600055') {
      return ({
        status: true,
        message: 'Account number resolved',
        data: {
          account_number: '1011600055',
          account_name: 'ADE OLU LAFE',
          bank_id: 18
        }
      });
    }

    return ({
      status: false,
      message: 'Invalid account number'
    });
  }

  const options = { method: 'GET', headers };
  const response = await fetch(`${URL}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options);

  return response.json();
};

export const confirmPayment = async (reference) => {
  if (NODE_ENV === 'test') {
    return reference === '690075529' ? {
      id: 690075529,
      reference: 'nms6uvr1pl',
      amount: 3500,
      paid_at: '2023-06-07T12:30:56.000Z',
      channel: 'card',
      currency: 'NGN'
    } : null;
  }

  const options = {
    method: 'GET',
    headers
  };

  const response = await fetch(`${URL}/transaction/verify/${reference}`, options);
  const { data } = await response.json();
  return data;
};

export const createCustomer = async (customerDetails) => {
  if (NODE_ENV === 'test') {
    return ({
      status: true,
      message: 'Customer created',
      data: {
        customer_code: 'CUS_nnmaexvjrtlviwv',
        id: 130140014,
      }
    });
  }

  const options = { method: 'POST', headers, body: JSON.stringify(customerDetails) };
  const response = await fetch(`${URL}/customer`, options);

  return response.json();
};

export const validateCustomer = async (customerDetails, customer_code) => {
  if (NODE_ENV === 'test') {
    return ({
      status: true,
      message: 'Customer Identification in progress'
    });
  }

  const options = { method: 'POST', headers, body: JSON.stringify(customerDetails) };
  const response = await fetch(`${URL}/customer/${customer_code}/identification`, options);

  return response.json();
};

export const createVirtualAccount = async (customerData) => {
  if (NODE_ENV === 'test') {
    return ({
      status: true,
      message: 'Assign dedicated account in progress'
    });
  }

  customerData.preferred_bank = NODE_ENV === 'production' ? 'titan-paystack' : 'test-bank';
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(customerData)
  };

  const response = await fetch(`${URL}/dedicated_account/assign`, options);
  return response.json();
};

export const validateWebhookHash = (body, paystackSignature) => {
  if (NODE_ENV === 'test') return paystackSignature === '5bd5d9c5c3bf9ea2799916e78';
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(body))
    .digest('hex');

  return hash === paystackSignature;
};

export const createTransferReciepient = async (reciepient) => {
  if (NODE_ENV === 'test') {
    return ({
      status: true,
      message: 'Transfer recipient created successfully',
      data: {
        active: true,
        currency: 'NGN',
        description: 'lorem ipsum',
        domain: 'test',
        email: null,
        id: 57795015,
        name: 'lorem ipsum',
        recipient_code: 'RCP_84xboxlyw2y4bnk',
        type: 'nuban',
      }
    });
  }

  reciepient.type = 'nuban';
  reciepient.currency = 'NGN';
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(reciepient)
  };

  const response = await fetch(`${URL}/transferrecipient`, options);
  return response.json();
};

export const singleTransfer = async (reciepient) => {
  if (NODE_ENV === 'test') {
    return ({
      status: true,
      message: 'Transfer has been queued',
      data: {
        transfersessionid: [],
        domain: 'test',
        amount: 200000,
        currency: 'NGN',
        reference: 'your-unique-referencesq',
        source: 'balance',
        source_details: null,
        reason: 'lorem ipsum',
        status: 'success',
        failures: null,
        transfer_code: 'TRF_r6ora1r7cpqw8nys',
        titan_code: null,
        transferred_at: null,
        id: 323429703,
        integration: 393334,
        request: 322797579,
        recipient: 57795015,
        createdAt: '2023-07-30T11:50:53.000Z',
        updatedAt: '2023-07-30T11:50:53.000Z'
      }
    });
  }

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(reciepient)
  };

  const response = await fetch(`${URL}/transfer`, options);
  return response.json();
};

export const verifyTransfer = async (reference) => {
  if (NODE_ENV === 'test') {
    return {
      amount: 100000,
      createdAt: '2024-01-30T21:04:44.000Z',
      id: 450810278,
      status: 'success',
      transfer_code: 'TRF_lbsoq98sz8lxef32',
      fee_charged: 1000,
      fees_breakdown: null
    };
  }

  const options = { method: 'GET', headers };
  const response = await fetch(`${URL}/transfer/${reference}`, options);

  const { data } = await response.json();
  return data;
};
