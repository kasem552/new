export interface Translations {
  nav: {
    about: string;
    services: string;
    calculator: string;
    contact: string;
    getStarted: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      views: string;
      creators: string;
      successRate: string;
      support: string;
    };
    cta: {
      signUp: string;
    };
    trust: {
      creators: string;
      results: string;
      support: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    mission: {
      title: string;
      description: string;
    };
    vision: {
      title: string;
      description: string;
    };
    whyUs: {
      title: string;
      features: {
        guidance: {
          title: string;
          description: string;
        };
        support: {
          title: string;
          description: string;
        };
        results: {
          title: string;
          description: string;
        };
      };
    };
    cta: {
      title: string;
      button: string;
    };
  };
  footer: {
    quickLinks: string;
    connect: string;
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
    };
    rights: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    inputLabel: string;
    estimatedEarnings: string;
    saveCalculation: string;
    showHistory: string;
    hideHistory: string;
    clearHistory: string;
    noCalculations: string;
    diamonds: string;
    readyToGrow: string;
    joinSuccess: string;
    getStartedNow: string;
    trustIndicators: {
      activeCreators: string;
      successRate: string;
      creatorRating: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      tiktokHandle: string;
      tiktokHandlePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
    };
    info: {
      title: string;
      email: string;
      phone: string;
      whatsapp: string;
      whatsappText: string;
      location: string;
      address: string;
    };
  };
  signup: {
    title: string;
    subtitle: string;
    form: {
      invitationCode: string;
      invitationCodePlaceholder: string;
      tiktokUsername: string;
      tiktokProfileUrl: string;
      fullName: string;
      fullNamePlaceholder: string;
      emailAddress: string;
      emailAddressPlaceholder: string;
      mobileNumber: string;
      country: string;
      countryPlaceholder: string;
      tiktokFollowers: string;
      tiktokFollowersPlaceholder: string;
      diamondsEarned: string;
      diamondsEarnedPlaceholder: string;
      terms: string;
      submit: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
    items: {
      monetization: {
        title: string;
        description: string;
        features: string[];
      };
      audience: {
        title: string;
        description: string;
        features: string[];
      };
      growth: {
        title: string;
        description: string;
        features: string[];
      };
      brand: {
        title: string;
        description: string;
        features: string[];
      };
      content: {
        title: string;
        description: string;
        features: string[];
      };
      analytics: {
        title: string;
        description: string;
        features: string[];
      };
    };
    cta: string;
  };
  thankYou: {
    title: string;
    message: string;
    nextSteps: {
      title: string;
      steps: string[];
    };
    backHome: string;
  };
}