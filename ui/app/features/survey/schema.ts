import {
  jsonb,
  pgTable,
  varchar,
  text,
  integer,
  boolean,
  serial,
  doublePrecision,
  bigint,
} from 'drizzle-orm/pg-core';
export const survey = pgTable('survey', {
  id: varchar().notNull().primaryKey(),
  title: varchar().notNull(),
  description: text().notNull(),
  target_number: integer().notNull(),
  reward_amount: doublePrecision().notNull(),
  questions: jsonb().notNull().default([]),
  owner: varchar().notNull(),
  image: text().notNull(),
  finish: boolean().default(false),
  view: bigint({ mode: 'number' }).default(0),
});
export const answers = pgTable('answer', {
  id: serial().primaryKey(),
  answers: jsonb().default({}),
  survey_id: varchar().references(() => survey.id),
});
