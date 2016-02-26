const QUERIES = {
  inheritedMember: {
    query: {
      $or: [
        {
          'meta.links': {
            href: 'http://refract.link/inherited-member/',
            relation: 'origin',
          },
        },
        {
          'meta.links': {
            href: 'http://refract.link/inherited/',
            relation: 'origin',
          },
        },
      ],
    },
  },
  includedMember: {
    query: {
      'meta.links': {
        href: 'http://refract.link/included-member/',
        relation: 'origin',
      },
    },
  },
};

export { QUERIES };
