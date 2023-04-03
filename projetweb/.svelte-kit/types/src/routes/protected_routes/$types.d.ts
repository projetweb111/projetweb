import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = {  }
type RouteId = '/protected_routes';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type LayoutRouteId = RouteId | "/protected_routes/account" | "/protected_routes/account/assos" | "/protected_routes/account/assos/create" | "/protected_routes/account/assos/member" | "/protected_routes/account/auth" | "/protected_routes/account/photo" | "/protected_routes/account/posts" | "/protected_routes/account/status" | "/protected_routes/account/update" | "/protected_routes/actualite" | "/protected_routes/association" | "/protected_routes/association/[name_association]" | "/protected_routes/association/[name_association]/logo" | "/protected_routes/publish" | "/protected_routes/search"
type LayoutParams = RouteParams & { name_association?: string }
type LayoutParentData = EnsureDefined<import('../$types.js').LayoutData>;

export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;