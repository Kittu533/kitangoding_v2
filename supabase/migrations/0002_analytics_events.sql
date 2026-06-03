create table if not exists website_analytics_events (
  id text primary key,
  event_type varchar(50) not null,
  path varchar(255) not null,
  source varchar(255),
  href text,
  visitor_id text not null,
  session_id text,
  referrer text,
  user_agent text,
  ip_address text,
  created_at timestamp not null default now()
);

create index if not exists website_analytics_events_created_at_idx
  on website_analytics_events (created_at desc);

create index if not exists website_analytics_events_event_type_idx
  on website_analytics_events (event_type);

create index if not exists website_analytics_events_visitor_id_idx
  on website_analytics_events (visitor_id);
