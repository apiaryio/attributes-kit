const QUERIES = {
  inheritedMember: {
    query: {
      $or: [
        {
          'meta.links': {
            href: 'http://example.com/inherited-member/',
            relation: 'origin',
          },
        },
        {
          'meta.links': {
            href: 'http://example.com/inherited/',
            relation: 'origin',
          },
        },
      ],
    },
  },
  includedMember: {
    query: {
      'meta.links': {
        href: 'http://example.com/included-member/',
        relation: 'origin',
      },
    },
  },
};

export {
  QUERIES,
};
