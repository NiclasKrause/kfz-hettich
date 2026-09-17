-- KFZ Hettich – HU-Terminbuchung
-- Einmal im Supabase SQL Editor ausführen.

create extension if not exists "pgcrypto";

-- Gebuchte HU/AU-Termine. Unique Constraint auf (date, time) verhindert
-- Doppelbuchung auf Datenbankebene (schützt auch bei gleichzeitigen Requests).
create table if not exists hu_appointments (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null,
  service text not null default 'HU',
  name text not null,
  email text not null,
  phone text not null,
  license_plate text not null,
  vehicle text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (date, time)
);

create index if not exists hu_appointments_date_idx on hu_appointments (date);

-- HU-Erinnerungen. Komplett getrennt von der Terminbuchung.
create table if not exists hu_reminders (
  id uuid primary key default gen_random_uuid(),
  license_plate text not null,
  name text not null,
  email text not null,
  hu_month smallint not null check (hu_month between 1 and 12),
  hu_year smallint not null,
  notified_at timestamptz,
  created_at timestamptz not null default now()
);

-- Admin-konfigurierbare Sperrtage (Urlaub, Sonderschließungen) zusätzlich zu
-- den gesetzlichen Feiertagen, die im Code berechnet werden.
create table if not exists hu_closures (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  reason text,
  created_at timestamptz not null default now()
);

-- Allgemeine Kontaktanfragen (Service, Unfall, Sonstiges).
create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- RLS aktivieren, aber keine Policies vergeben: Zugriff ausschließlich über
-- den service_role Key aus den serverseitigen API-Routen (bypasst RLS).
-- Anon/Client-seitiger Zugriff ist damit vollständig gesperrt.
alter table hu_appointments enable row level security;
alter table hu_reminders enable row level security;
alter table hu_closures enable row level security;
alter table contact_requests enable row level security;
