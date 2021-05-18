import { Ability, AbilityBuilder } from '@casl/ability';
import { RANK_USER, RANK_ADMIN } from './dbValues';

export function updateUserForAbilities(user) {
  const rank = user.roleId;
  if (!(rank in ABILITIES)) return;
  
  switch (rank) {
    case RANK_USER:
      (ABILITIES[rank]).update(defineRulesForUser(user))
      break;
    case RANK_ADMIN:
      (ABILITIES[rank]).update(defineRulesForAdmin(user))
      break;
  }
}

function subjectName(item) {
  if (!item || typeof item === 'string') {
    return item;
  }

  return item.__type;
};

const user = new Ability(defineRulesForUser(), { subjectName });
const admin = new Ability(defineRulesForAdmin(), { subjectName });

function defineRulesForUser(user) {
  const { can, cannot, rules } = new AbilityBuilder();
  if (!user) user = JSON.parse(localStorage.getItem('user')) || {};
  
  can(['list'], 'Manga', { userId: user.id });

  return rules;
};

function defineRulesForAdmin(user) {
  const { can, cannot, rules } = new AbilityBuilder();
  if (!user) user = JSON.parse(localStorage.getItem('user')) || {};

  can(['list', 'create'], 'Manga');

  return rules;
};

export const ABILITIES = { [RANK_USER]: user, [RANK_ADMIN]: admin };