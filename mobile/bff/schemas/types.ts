import { Context } from '../context'

type ResolverField = Record<string, (parent: any, params: any, ctx: Context) => any>

export type ResolversMap = Record<string, ResolverField>
