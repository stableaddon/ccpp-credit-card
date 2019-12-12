/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'jquery',
        'Magento_Payment/js/view/payment/iframe',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Stableaddon_CcppCreditCard/js/action/redirect-ccpp-process',
        'Magento_Checkout/js/model/full-screen-loader',
        'Magento_Checkout/js/action/set-payment-information',
        'Magento_Checkout/js/action/place-order',
        'mage/translate'
    ],
    function ($, Component, additionalValidators, redirectCcppProcessAction, fullScreenLoader, setPaymentInformationAction, placeOrderAction, $t) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Stableaddon_CcppCreditCard/payment/ccpp-creditcard',
                timeoutMessage: $t('Sorry, but something went wrong. Please contact the seller.'),
                creditCardName: '',
            },

            initObservable: function () {
                this._super()
                    .observe([
                        'creditCardName'
                    ]);

                return this;
            },

            placeOrderHandler: null,
            validateHandler: null,

            /**
             * Check if current payment has verification
             * @returns {Boolean}
             */
            hasNameOnCard: function () {
                return window.checkoutConfig.payment.ccform.use_name_on_card[this.getCode()];
            },

            /**
             * @param {Object} handler
             */
            setPlaceOrderHandler: function (handler) {
                this.placeOrderHandler = handler;
            },

            /**
             * @param {Object} handler
             */
            setValidateHandler: function (handler) {
                this.validateHandler = handler;
            },

            /**
             * @returns {Object}
             */
            context: function () {
                return this;
            },

            /**
             * @returns {Boolean}
             */
            isShowLegend: function () {
                return true;
            },

            /**
             * @returns {String}
             */
            getCode: function () {
                return 'ccpp_creditcard';
            },

            /**
             * @returns {Boolean}
             */
            isActive: function () {
                return true;
            },
            /**
             * Place order.
             */
            placeOrder: function (data, event) {
                if (this.validateHandler() && additionalValidators.validate()) {
                    My2c2p.getEncrypted("co-transparent-form", function(errCode,errDesc){})
                    fullScreenLoader.startLoader();
                    this.isPlaceOrderActionAllowed(false);
                    $.when(placeOrderAction(
                        {
                            method: this.getCode(),
                            additional_data: {
                                'cc_owner': this.creditCardName(),
                                'cc_number_enc': $('input[name=maskedCardInfo]').val(),
                                'cc_type': this.creditCardType(),
                                'cc_exp_year': $('input[name=expYearCardInfo]').val(),
                                'cc_exp_month':  $('input[name=expMonthCardInfo]').val(),
                                'cc_last_4': this.creditCardNumber().substr(-4),
                                'additional_data': $('input[name=encryptedCardInfo]').val()
                            }
                        },
                        this.messageContainer
                    )).fail(
                        function (response) {
                            self.isPlaceOrderActionAllowed(true);
                            fullScreenLoader.stopLoader();
                        }
                    ).done(
                        function (orderId) {
                            redirectCcppProcessAction.execute(orderId);
                        }
                    );

                    this.initTimeoutHandler();
                }
            }
        });
    }
);
