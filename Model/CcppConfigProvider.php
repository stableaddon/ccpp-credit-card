<?php

namespace Stableaddon\CcppCreditCard\Model;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Framework\UrlInterface;
use Stableaddon\CcppCreditCard\Helper\Config;

/**
 * Class CcppConfigProvider
 *
 * @package Stableaddon\CcppCreditCard\Model
 */
class CcppConfigProvider implements ConfigProviderInterface
{
    /**
     * Url Builder
     *
     * @var \Magento\Framework\UrlInterface
     */
    protected $urlBuilder;

    /**
     * @var \Stableaddon\CcppCreditCard\Helper\Config
     */
    protected $config;

    /**
     * CcppConfigProvider constructor.
     *
     * @param \Magento\Framework\UrlInterface $urlBuilder
     * @param \Stableaddon\CcppCreditCard\Helper\Config $config
     */
    public function __construct(
        UrlInterface $urlBuilder,
        Config $config
    ) {
        $this->urlBuilder = $urlBuilder;
        $this->config = $config;
    }

    /**
     * @return array
     */
    public function getConfig()
    {
        return [
            'processCcppUrl' => $this->urlBuilder->getUrl('ccppcreditcard/process/redirect'),
            'payment' => [
                'ccform' => [
                    'use_name_on_card' => [
                        Config::PAYMENT_METHOD => (boolean)$this->config->isUseNameOnCard()
                    ]
                ]
            ]
        ];
    }
}
