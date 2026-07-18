-- Cercle Élite Closing — schéma Supabase
-- À exécuter une fois dans l'éditeur SQL du projet Supabase (Project → SQL Editor → New query).
-- Idempotent : peut être relancé sans casser les données existantes.

-- ============================================================
-- PROFILS
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  prenom text,
  role text not null default 'student' check (role in ('student', 'admin')),

  -- onboarding (5 questions)
  onboarding_completed boolean not null default false,
  niveau_actuel text,
  type_offre text,
  challenge_principal text,
  appels_semaine text,
  objectif_3_mois text,
  parcours_recommande text[], -- ids de modules recommandés en priorité, dans l'ordre

  -- xp & jeu
  xp integer not null default 0,
  login_streak integer not null default 0,
  last_login_date date,
  defi_streak integer not null default 0,
  last_defi_date date,
  login_count integer not null default 0,
  sound_enabled boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on profiles (role);

-- ============================================================
-- PROGRESSION DES MODULES
-- ============================================================
create table if not exists module_progress (
  user_id uuid not null references profiles (id) on delete cascade,
  module_id text not null,
  score integer not null,
  quiz_total integer not null,
  perfect boolean not null default false, -- réussi sans perdre de vie
  completed_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

-- ============================================================
-- DÉFIS DU JOUR
-- ============================================================
create table if not exists defi_completions (
  user_id uuid not null references profiles (id) on delete cascade,
  defi_id integer not null,
  completed_on date not null default current_date,
  created_at timestamptz not null default now(),
  primary key (user_id, completed_on)
);

-- ============================================================
-- SESSIONS ARENA (ROLEPLAY)
-- ============================================================
create table if not exists roleplay_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  profile_key text not null, -- emotionnel / analytique / resistant / boss_final
  score integer not null,
  feedback jsonb,
  created_at timestamptz not null default now()
);

create index if not exists roleplay_sessions_user_idx on roleplay_sessions (user_id, created_at desc);

-- ============================================================
-- TENTATIVES OBJECTIONS
-- ============================================================
create table if not exists objection_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  objection_key text not null,
  score integer not null,
  created_at timestamptz not null default now()
);

create index if not exists objection_attempts_user_idx on objection_attempts (user_id, created_at desc);

-- ============================================================
-- XP — journal des gains (permet le classement hebdomadaire)
-- ============================================================
create table if not exists xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  amount integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create index if not exists xp_events_user_idx on xp_events (user_id, created_at desc);
create index if not exists xp_events_created_idx on xp_events (created_at desc);

-- ============================================================
-- BADGES
-- ============================================================
create table if not exists badges (
  slug text primary key,
  label text not null,
  description text not null,
  icon text not null default 'award'
);

insert into badges (slug, label, description, icon) values
  ('dans_larene', 'Dans l''arène', 'Premier roleplay joué', 'swords'),
  ('en_route', 'En route', 'Premier module complété', 'flag'),
  ('sharp_closer', 'Sharp Closer', 'Score 90+ en roleplay', 'target'),
  ('unstoppable', 'Unstoppable', '7 jours de streak', 'flame'),
  ('weekly_champion', 'Weekly Champion', 'Tous les défis d''une semaine complétés', 'trophy'),
  ('master_closer', 'Master Closer', 'Module Elite complété', 'crown'),
  ('speed_closer', 'Speed Closer', 'Module complété en moins de 24h', 'zap'),
  ('perfect', 'Perfect', 'Quiz réussi sans perdre de vie', 'sparkles')
on conflict (slug) do nothing;

create table if not exists user_badges (
  user_id uuid not null references profiles (id) on delete cascade,
  badge_slug text not null references badges (slug) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_slug)
);

-- ============================================================
-- NOTIFICATIONS IN-APP
-- ============================================================
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  type text not null, -- defi_du_jour / module_debloque / streak_danger / felicitations / message_coach
  title text not null,
  body text not null,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx on notifications (user_id, created_at desc);

-- ============================================================
-- MESSAGES COACH → ÉLÈVE
-- ============================================================
create table if not exists coach_messages (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references profiles (id) on delete cascade,
  to_user_id uuid not null references profiles (id) on delete cascade,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists coach_messages_to_idx on coach_messages (to_user_id, created_at desc);

-- ============================================================
-- XP — incrément atomique (appelé depuis les routes serveur de confiance)
-- ============================================================
create or replace function increment_xp(uid uuid, amount integer)
returns integer
language plpgsql
security definer set search_path = public
as $$
declare
  new_xp integer;
begin
  update profiles set xp = xp + amount, updated_at = now() where id = uid returning xp into new_xp;
  return new_xp;
end;
$$;

-- ============================================================
-- CLASSEMENT HEBDOMADAIRE — agrégat accessible à tout élève connecté
-- (contourne le RLS de xp_events juste pour ce résumé, sans exposer
-- les événements individuels des autres élèves).
-- ============================================================
create or replace function get_weekly_leaderboard()
returns table (id uuid, prenom text, weekly_xp bigint)
language sql
security definer set search_path = public
stable
as $$
  select p.id, p.prenom, coalesce(sum(x.amount), 0) as weekly_xp
  from profiles p
  left join xp_events x
    on x.user_id = p.id
    and x.created_at >= date_trunc('week', now())
  where p.role = 'student'
  group by p.id, p.prenom
  order by weekly_xp desc
  limit 50;
$$;

grant execute on function get_weekly_leaderboard() to authenticated;

-- ============================================================
-- CRÉATION AUTOMATIQUE DU PROFIL À L'INSCRIPTION
-- ============================================================
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, prenom)
  values (new.id, new.email, new.raw_user_meta_data ->> 'prenom')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- FIL D'ACTIVITÉ COMMUNAUTAIRE — célébrations visibles par tous les élèves
-- ============================================================
create table if not exists community_feed (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  created_at timestamptz not null default now()
);

alter table community_feed enable row level security;
drop policy if exists "community_feed_read_all" on community_feed;
create policy "community_feed_read_all" on community_feed
  for select using (auth.role() = 'authenticated');

-- ============================================================
-- REPLAYS — bibliothèque de calls de coaching (liens externes : Fathom, etc.)
-- ============================================================
create table if not exists replays (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text not null,
  created_by uuid references profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists replays_created_idx on replays (created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table profiles enable row level security;
alter table module_progress enable row level security;
alter table defi_completions enable row level security;
alter table roleplay_sessions enable row level security;
alter table objection_attempts enable row level security;
alter table xp_events enable row level security;
alter table user_badges enable row level security;
alter table notifications enable row level security;
alter table coach_messages enable row level security;

-- helper : l'utilisateur courant est-il admin ?
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- replays : lecture pour tout élève connecté, ajout/suppression admin seulement
alter table replays enable row level security;
drop policy if exists "replays_read_all" on replays;
create policy "replays_read_all" on replays
  for select using (auth.role() = 'authenticated');
drop policy if exists "replays_insert_admin" on replays;
create policy "replays_insert_admin" on replays
  for insert with check (is_admin());
drop policy if exists "replays_delete_admin" on replays;
create policy "replays_delete_admin" on replays
  for delete using (is_admin());

-- profiles : chacun voit/modifie son propre profil, les admins voient tout
drop policy if exists "profiles_select_own_or_admin" on profiles;
create policy "profiles_select_own_or_admin" on profiles
  for select using (auth.uid() = id or is_admin());
drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

-- tables élève : accès à ses propres lignes, lecture globale pour les admins
drop policy if exists "module_progress_own_or_admin" on module_progress;
create policy "module_progress_own_or_admin" on module_progress
  for select using (auth.uid() = user_id or is_admin());
drop policy if exists "module_progress_insert_own" on module_progress;
create policy "module_progress_insert_own" on module_progress
  for insert with check (auth.uid() = user_id);
drop policy if exists "module_progress_update_own" on module_progress;
create policy "module_progress_update_own" on module_progress
  for update using (auth.uid() = user_id);

drop policy if exists "defi_completions_own_or_admin" on defi_completions;
create policy "defi_completions_own_or_admin" on defi_completions
  for select using (auth.uid() = user_id or is_admin());
drop policy if exists "defi_completions_insert_own" on defi_completions;
create policy "defi_completions_insert_own" on defi_completions
  for insert with check (auth.uid() = user_id);

drop policy if exists "roleplay_sessions_own_or_admin" on roleplay_sessions;
create policy "roleplay_sessions_own_or_admin" on roleplay_sessions
  for select using (auth.uid() = user_id or is_admin());
drop policy if exists "roleplay_sessions_insert_own" on roleplay_sessions;
create policy "roleplay_sessions_insert_own" on roleplay_sessions
  for insert with check (auth.uid() = user_id);

drop policy if exists "objection_attempts_own_or_admin" on objection_attempts;
create policy "objection_attempts_own_or_admin" on objection_attempts
  for select using (auth.uid() = user_id or is_admin());
drop policy if exists "objection_attempts_insert_own" on objection_attempts;
create policy "objection_attempts_insert_own" on objection_attempts
  for insert with check (auth.uid() = user_id);

drop policy if exists "xp_events_own_or_admin" on xp_events;
create policy "xp_events_own_or_admin" on xp_events
  for select using (auth.uid() = user_id or is_admin());
drop policy if exists "xp_events_insert_own" on xp_events;
create policy "xp_events_insert_own" on xp_events
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_badges_own_or_admin" on user_badges;
create policy "user_badges_own_or_admin" on user_badges
  for select using (auth.uid() = user_id or is_admin());
drop policy if exists "user_badges_insert_own" on user_badges;
create policy "user_badges_insert_own" on user_badges
  for insert with check (auth.uid() = user_id);

drop policy if exists "notifications_own" on notifications;
create policy "notifications_own" on notifications
  for select using (auth.uid() = user_id);
drop policy if exists "notifications_update_own" on notifications;
create policy "notifications_update_own" on notifications
  for update using (auth.uid() = user_id);

drop policy if exists "coach_messages_participant" on coach_messages;
create policy "coach_messages_participant" on coach_messages
  for select using (auth.uid() = to_user_id or auth.uid() = from_user_id);
drop policy if exists "coach_messages_insert_admin" on coach_messages;
create policy "coach_messages_insert_admin" on coach_messages
  for insert with check (is_admin());
drop policy if exists "coach_messages_update_recipient" on coach_messages;
create policy "coach_messages_update_recipient" on coach_messages
  for update using (auth.uid() = to_user_id);

-- badges (catalogue) : lecture publique
alter table badges enable row level security;
drop policy if exists "badges_public_read" on badges;
create policy "badges_public_read" on badges for select using (true);
