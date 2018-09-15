DROP FUNCTION public.signup_user(text, text, text, text, text) CASCADE;

create extension if not exists "pgcrypto";

create function signup_user(
  firstname text,
  lastname text,
  phone text,
  email text,
  password text
) returns users as $$
declare
  user users;
begin
  insert into users (first_name, last_name, phone, email, password) values
    (firstname, lastname, phone, email, crypt(password, gen_salt('bf')));

  return user;
end;
$$ language plpgsql volatile strict security definer;

comment on function public.signup_user(text, text, text, text, text) is 'Creates user with encrypted password';
