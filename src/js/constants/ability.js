import { createMongoAbility, AbilityBuilder } from '@casl/ability';
import { RANK_ADMIN, RANK_USER } from './dbValues';

function subjectName(item) {
  if (!item || typeof item === 'string') {
    return item;
  }

  return item.__type;
}

function defineRulesForUser(u) {
  // const { can, cannot, rules } = new AbilityBuilder();
  const { can, rules } = new AbilityBuilder();
  const user = u ?? (JSON.parse(localStorage.getItem('user')) || {});

  can(['list'], 'Manga', { userId: user.id });

  return rules;
}

function defineRulesForAdmin() {
  // const { can, cannot, rules } = new AbilityBuilder();
  const { can, rules } = new AbilityBuilder();
  // const user = u ?? (JSON.parse(localStorage.getItem('user')) || {});

  can(['list', 'create'], 'Manga');

  return rules;
}

const userAbility = createMongoAbility(defineRulesForUser(), { subjectName });
const adminAbility = createMongoAbility(defineRulesForAdmin(), { subjectName });

export const ABILITIES = {
  [RANK_USER]: userAbility,
  [RANK_ADMIN]: adminAbility,
};

export function updateUserForAbilities(user) {
  const rank = user.roleId;
  if (!(rank in ABILITIES)) return;

  switch (rank) {
    case RANK_USER:
      ABILITIES[rank].update(defineRulesForUser(user));
      break;
    case RANK_ADMIN:
      ABILITIES[rank].update(defineRulesForAdmin(user));
      break;
    default:
      break;
  }
}
