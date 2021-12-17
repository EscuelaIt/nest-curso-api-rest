export enum Affiliation {
    OWNER='owner',
    ANY='any'
}
export type UserProjectAffiliationType = Affiliation.OWNER | Affiliation.ANY;
export const AffiliationQueryParam = 'affiliation';