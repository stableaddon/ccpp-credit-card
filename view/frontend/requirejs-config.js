/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            transparent: 'Magento_Payment/transparent'
        }
    },
    paths: {
        '2c2pValid' : 'https://demo2.2c2p.com/2C2PFrontEnd/SecurePayment/api/my2c2p.1.6.9.min'
    },
    shim: {
        '2c2pValid' : ['Stableaddon_CcppCreditCard/js/model/gibberish-aes'],
        'Stableaddon_CcppCreditCard/js/view/payment/method-renderer/ccpp-creditcard' : ['2c2pValid']
    }
};