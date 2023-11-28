export default {
  bool: {
    inclusion: {
      within: [true],
      message: '^Required',
    },
  },

  day: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 31,
      message: '^InValid',
    },
  },

  email: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    email: {
      message: '^InValid',
    },
  },

  generic: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
  },

  integer: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    numericality: {
      greaterThan: 0,
      onlyInteger: true,
      message: '^InValid',
    },
  },

  month: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 12,
      message: '^InValid',
    },
  },


  CardName: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^[a-zA-Z,][^!-\\/:-@\\[^'.-]+$/,
      message: '^InValid',
    },


  },
  CardNumber: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },

  },

  CardDate: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      message: '^InValid',
    },
  },
  CVVNumber: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },

  },



  firstName: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^[^'.-][a-zA-Z][^'.-][^!-A-Z\\/:-@\\[^'.-]+$/,
      message: '^InValid',
    },

    // length: {
    //   minimum: 6,
    //   message:  '^InValid',
    // },
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^[^'.-][a-zA-Z][^'.-][^!-A-Z\\/:-@\\[^'.-]+$/,
      message: '^InValid',
    },
  },

  password: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,24}$/,
      message: '^InValid',
    },
    length: {
      min: 8,
      message: '^InValid',
    },
  },



  dob: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/,
      message: '^InValid',
    },
    // length: {
    //   minimum: 6,
    //   message:  '^InValid',
    // },
  },

  zipcode: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    length: {
      minimum: 2,
      message: '^InValid',
    },
  },


  phone: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^(\+\d{1,3}[ ]?)?[0-9]{3}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{5}$/,
      // pattern: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
      message: '^InValid',
    },
  },

  state: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    inclusion: {
      within: [
        'AK',
        'AL',
        'AR',
        'AZ',
        'CA',
        'CO',
        'CT',
        'DC',
        'DE',
        'FL',
        'GA',
        'HI',
        'IA',
        'ID',
        'IL',
        'IN',
        'KS',
        'KY',
        'LA',
        'MA',
        'MD',
        'ME',
        'MI',
        'MN',
        'MO',
        'MS',
        'MT',
        'NC',
        'ND',
        'NE',
        'NH',
        'NJ',
        'NM',
        'NV',
        'NY',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VA',
        'VT',
        'WA',
        'WI',
        'WV',
        'WY',
      ],
      message: '^InValid',
    },
  },

  year: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    numericality: {
      greaterThan: 1900,
      lessThanOrEqualTo: new Date().getFullYear(),
      message: '^InValid',
    },
  },

  zip: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    length: {
      is: 5,
      message: '^InValid',
    },
  },
  cities: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    numericality:
      { greaterThan: 0, onlyInteger: true, message: '^InValid', },
  },

  kitQrCode: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    length: {
      minimum: 4,
      message: '^InValid',
    },
  },

  npi: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    numericality:
    {
      greaterThan: 0, onlyInteger: true, message: '^InValid',
    },
    length: {
      is: 10,
      message: '^InValid',
    },
  },
  country: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    length: {
      minimum: 2,
      message: '^InValid',
    },
  },
  nationalId: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    length: {
      minimum: 8,
      message: '^InValid',
    },
  },
  physicianName: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^[a-zA-Z,][^!-\\/:-@\\[^'.-]+$/,
      message: '^InValid',
    },

    // length: {
    //   minimum: 6,
    //   message:  '^InValid',
    // },
  },
  contactName: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^[a-zA-Z,][^!-\\/:-@\\[^'.-]+$/,
      message: '^InValid',
    },

    // length: {
    //   minimum: 6,
    //   message:  '^InValid',
    // },
  },



};