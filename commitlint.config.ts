import { utils } from '@commitlint/config-nx-scopes';

export default {
  rules: {
    'scope-enum': async (ctx) => [
      2,
      'always',
      [
        ...(await utils.getProjects(
          ctx,
          ({ name, projectType, tags }) => !tags.includes('stage:end-of-life')
            && !name.includes('e2e')
            && projectType == 'application'
        )),
      ],
    ],
  },
};
