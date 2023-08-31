// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { PricingDataType } from 'src/@core/components/plan-details/types'

const data: PricingDataType = {
  pricingPlans: [
    {
      imgWidth: 100,
      title: 'Basic',
      imgHeight: 100,
      monthlyPrice: 0,
      currentPlan: true,
      popularPlan: false,
      subtitle: 'A simple start for everyone',
      imgSrc: '/images/pages/pricing-illustration-1.png',
      yearlyPlan: {
        perMonth: 0,
        totalAnnual: 0
      },
      planBenefits: [
        '100 responses a month',
        'Unlimited forms and surveys',
        'Unlimited fields',
        'Basic form creation tools',
        'Up to 2 subdomains'
      ]
    },
    {
      imgWidth: 100,
      imgHeight: 100,
      monthlyPrice: 49,
      title: 'Standard',
      popularPlan: true,
      currentPlan: false,
      subtitle: 'For small to medium businesses',
      imgSrc: '/images/pages/pricing-illustration-2.png',
      yearlyPlan: {
        perMonth: 40,
        totalAnnual: 480
      },
      planBenefits: [
        'Unlimited responses',
        'Unlimited forms and surveys',
        'Instagram profile page',
        'Google Docs integration',
        'Custom “Thank you” page'
      ]
    },
    {
      imgWidth: 100,
      imgHeight: 100,
      monthlyPrice: 99,
      popularPlan: false,
      currentPlan: false,
      title: 'Enterprise',
      subtitle: 'Solution for big organizations',
      imgSrc: '/images/pages/pricing-illustration-3.png',
      yearlyPlan: {
        perMonth: 80,
        totalAnnual: 960
      },
      planBenefits: [
        'PayPal payments',
        'Logic Jumps',
        'File upload with 5GB storage',
        'Custom domain support',
        'Stripe integration'
      ]
    }
  ],
  faq: [
    {
      id: 'general-settings',
      question: 'General settings',
      answer:
        'Sesame snaps tart bonbon tiramisu jelly beans lemon drops bear claw candy gummi bears. Caramels pudding sweet donut tootsie roll gummies macaroon. Lemon drops caramels sesame snaps dessert jujubes. Cupcake chocolate bonbon cake tiramisu. Gummies candy canes ice cream biscuit. Jelly gummies wafer danish chupa chups sugar plum cookie.'
    },
    {
      id: 'users',
      question: 'Users',
      answer:
        'Chocolate sweet roll lemon drops chocolate cake candy canes halvah. Donut fruitcake sweet roll brownie carrot cake cake. Donut jujubes pudding candy macaroon. Gummies gingerbread croissant bonbon. Cookie toffee cupcake cotton candy candy canes dessert cotton candy liquorice. Jelly beans gummi bears toffee chocolate bar chocolate cake.'
    },
    {
      id: 'advanced-settings',
      question: 'Advanced settings',
      answer:
        'Halvah liquorice pastry marshmallow sugar plum. Dessert chocolate pastry gummi bears pastry. Gingerbread bonbon pudding oat cake jujubes pie wafer tart brownie. Soufflé jujubes icing powder liquorice. Sweet donut toffee liquorice dessert dragée. Topping cake danish chupa chups chupa chups gummies. Cotton candy gummies chocolate cake oat cake.'
    }
  ]
}

mock.onGet('/pages/pricing').reply(() => [200, data])
