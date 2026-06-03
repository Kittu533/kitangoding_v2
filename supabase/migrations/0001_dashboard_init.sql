create table if not exists leads (
  id text primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  phone varchar(50),
  service varchar(255),
  budget varchar(255),
  message text,
  status varchar(50) not null default 'Unread',
  created_at timestamp not null default now()
);

create table if not exists portfolios (
  id text primary key,
  name varchar(255) not null,
  category varchar(255) not null,
  thumbnail text,
  result text,
  created_at timestamp not null default now()
);

create table if not exists blog_posts (
  id text primary key,
  title varchar(255) not null,
  slug varchar(255) not null unique,
  excerpt text,
  content text,
  category varchar(120) not null,
  status varchar(50) not null default 'draft',
  thumbnail text,
  published_at timestamp,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create table if not exists users (
  id text primary key,
  name text not null,
  email text not null unique,
  "emailVerified" boolean not null,
  image text,
  "createdAt" timestamp not null,
  "updatedAt" timestamp not null
);

create table if not exists sessions (
  id text primary key,
  "expiresAt" timestamp not null,
  token text not null unique,
  "createdAt" timestamp not null,
  "updatedAt" timestamp not null,
  "ipAddress" text,
  "userAgent" text,
  "userId" text not null references users(id) on delete cascade
);

create table if not exists accounts (
  id text primary key,
  "accountId" text not null,
  "providerId" text not null,
  "userId" text not null references users(id) on delete cascade,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  scope text,
  password text,
  "createdAt" timestamp not null,
  "updatedAt" timestamp not null
);

create table if not exists verifications (
  id text primary key,
  identifier text not null,
  value text not null,
  "expiresAt" timestamp not null,
  "createdAt" timestamp,
  "updatedAt" timestamp
);
