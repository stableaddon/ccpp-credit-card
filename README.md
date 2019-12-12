# README #
Magento 2c2p Payment method integrated seamlessly to 2C2P Payment Gateway.

### What is this repository for? ###

* Module to add payment method 2C2P

Installation
    Please use composer to install the extension.
    
    conposer require stableaddon/ccpp-credit-card

### Menu and Needed Configurations ###

* Menu: Stores > Sales > Payment Methods > 2C2P Credit Card Payment

* 2c2p side:
    Acount → Options → Payment Result URL
    
    Insert information as below:
    
    Redirect API - Frontend return URL: https://{domain}/checkout/onepage/success/
    
    Server-to-server API - Frontend return URL: https://{domain}/ccppcreditcard/process/response

### Changelog ###
    * 1.0.0: Initial module
    
### Support & Contact ###
Skype: [tatdat.2610](skype:tatdat.2610)


